const mongoose = require('mongoose')
const conn = mongoose.connect("mongodb://localhost:27017/Bookstore")
if(conn){
    console.log("Connected");
}