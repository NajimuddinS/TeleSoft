const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.route.js");
const bookRoutes = require("./routes/book.route.js");
const connectDB = require("./config/db.js")

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// Start Server
const PORT = process.env.port || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    connectDB()
});