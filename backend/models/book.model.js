const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publicationYear: { type: Number, required: true },
  description: { type: String },
  coverImage: { type: String }, // Cloudinary URL
});

module.exports = mongoose.model("Book", bookSchema);