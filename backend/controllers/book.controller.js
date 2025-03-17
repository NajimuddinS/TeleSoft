const Book = require('../models/book.model');

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

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getBookDetails = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { addBook, getBooks, getBookDetails };