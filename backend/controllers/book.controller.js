const Book = require('../models/book.model');

// Add a new book
const addBook = async (req, res) => {
  const { title, author, genre, publicationYear, description } = req.body;
  const coverImage = req.file ? req.file.path : null;
  try {
    const book = new Book({ title, author, genre, publicationYear, description, coverImage });
    await book.save();
    res.status(201).json({ message: 'Book added successfully', book });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get book details by ID
const getBookDetails = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Edit a book by ID
const editBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, publicationYear, description } = req.body;
  const coverImage = req.file ? req.file.path : null;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Update book fields
    book.title = title || book.title;
    book.author = author || book.author;
    book.genre = genre || book.genre;
    book.publicationYear = publicationYear || book.publicationYear;
    book.description = description || book.description;
    book.coverImage = coverImage || book.coverImage;

    await book.save();
    res.status(200).json({ message: 'Book updated successfully', book });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a book by ID
const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { addBook, getBooks, getBookDetails, editBook, deleteBook };