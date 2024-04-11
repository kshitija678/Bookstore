const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('../Model/schema');

mongoose.connect('mongodb://localhost:27017/Bookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const app = express();
app.use(express.json());
app.use(cors());

// Insert new book
app.post("/books", async (req, res) => {
    try {
        const newBook = new Book(req.body);
        const result = await newBook.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get all books
app.get("/books", async (req, res) => {
    try {
        const result = await Book.find();
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update a book by ID
app.put("/books/:bookId", async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.send(updatedBook);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Delete a book by ID
app.delete("/books/:bookId", async (req, res) => {
    try {
        const result = await Book.findByIdAndDelete(req.params.bookId);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get a book by ID
app.get("/books/:bookId", async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.send(book);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Add a book
app.post("/addBook", async (req, res) => {
    try {
        const newBook = new Book(req.body);
        const result = await newBook.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(4000, () => {
    console.log("Server listening on Port 4000");
});
