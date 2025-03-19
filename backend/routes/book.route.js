const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { auth, isAdmin } = require("../middlewares/auth.middleware.js");
const { getBooks, getBookDetails, editBook, deleteBook } = require("../controllers/book.controller.js");
const Book = require("../models/book.model.js");
const cloudinary = require("../config/cloudinary.js");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json({ books });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// Get book details by ID
router.get("/:id", getBookDetails);

// Add a new book
router.post("/add", auth, isAdmin, upload.single("coverImage"), async (req, res) => {
  const { title, author, genre, publicationYear, description } = req.body;
  const file = req.file; // Uploaded file

  if (!title || !author || !genre || !publicationYear) {
    // Clean up uploaded file if validation fails
    if (file) {
      fs.unlinkSync(file.path);
    }
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    let coverImageUrl = "";
    if (file) {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "book_covers",
      });

      // Clean up local file after upload
      fs.unlinkSync(file.path);

      coverImageUrl = result.secure_url; // Save Cloudinary URL
    }

    // Create new book
    const book = new Book({
      title,
      author,
      genre,
      publicationYear,
      description,
      coverImage: coverImageUrl,
    });

    await book.save();
    res.status(201).json({ message: "Book added successfully", book });
  } catch (err) {
    console.error("Error adding book:", err);

    // Clean up uploaded file if an error occurs
    if (file && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    res.status(400).json({
      message: "Failed to add book",
      error: err.message,
      cloudinaryError: err.message.includes("Invalid Signature")
        ? "Cloudinary authentication failed. Please check your API credentials."
        : null,
    });
  }
});

// Edit a book by ID
router.put(
  "/edit/:id",
  auth, // Middleware to verify the token
  isAdmin, // Middleware to ensure the user is an admin
  upload.single("coverImage"), // Middleware to handle file upload
  async (req, res) => {
    const { id } = req.params;
    const { title, author, genre, publicationYear, description } = req.body;
    const file = req.file; // Uploaded file

    try {
      const book = await Book.findById(id);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      let coverImageUrl = book.coverImage;
      if (file) {
        // Upload new image to Cloudinary
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "book_covers",
        });

        // Clean up local file after upload
        fs.unlinkSync(file.path);

        coverImageUrl = result.secure_url; // Save new Cloudinary URL
      }

      // Update book fields
      book.title = title || book.title;
      book.author = author || book.author;
      book.genre = genre || book.genre;
      book.publicationYear = publicationYear || book.publicationYear;
      book.description = description || book.description;
      book.coverImage = coverImageUrl;

      await book.save();
      res.status(200).json({ message: "Book updated successfully", book });
    } catch (err) {
      console.error("Error updating book:", err);

      // Clean up uploaded file if an error occurs
      if (file && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }

      res.status(400).json({
        message: "Failed to update book",
        error: err.message,
      });
    }
  }
);

// Delete a book by ID
router.delete("/delete/:id", auth, isAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete book", error: err.message });
  }
});

module.exports = router;