const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { auth, isAdmin } = require("../middlewares/auth.middleware.js");
const { getBooks, getBookDetails } = require("../controllers/book.controller.js");
const Book = require("../models/book.model.js");
const cloudinary = require("../config/cloudinary.js");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); 

router.get("/", getBooks);


router.get("/:id", getBookDetails);


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
      cloudinaryError: err.message.includes("Invalid Signature") ? 
        "Cloudinary authentication failed. Please check your API credentials." : null
    });
  }
});

module.exports = router;