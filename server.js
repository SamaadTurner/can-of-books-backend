'use strict';
require('dotenv').config();
// const bookSchema = require("./bookSchema");
const mongoose = require('mongoose');
const Book = require('./bookSchema.js');
const express = require('express');
const cors = require('cors');
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL);
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
console.log("HERE");
app.get('/books', async (req, res) => {
  try  {
    const books = await Book.find({status: 'Checked Out'});
    console.log("HERE");
    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Failed to retrieve books'});
  }

  // res.send('test request received')

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
