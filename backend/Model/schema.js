const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title: String,
    author: String,
    isbn: String,
    publicationDate: Date,
    publisher: String,
    price: Number,
    image: String
    
});

module.exports = mongoose.model("Bookstore", BookSchema);
