'use strict';
require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./bookSchema.js');
const express = require('express');
const cors = require('cors');
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL);
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
console.log("HERE");

//This is where we "get" and send our inital request

app.get('/test', (req, res) => {
  res.send('SERVER TEST');
});

app.get('/books', async (req, res) => {
  try  {
    const books = await Book.find({});
    console.log("HERE");
    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Failed to retrieve books'});
  }
});

app.post('/books', async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const newBook = new Book({
      title,
      description,
      status,
    });

    const savedBook = await newBook.save();
     res.status(201).json(savedBook);
     } catch (error) {
       console.log(error);
        res.status(500).json({ error: 'Couldnt make a new book :(' });
     }
  });



  app.delete('/books/:id', async (req,res) => {
    try{
      if(!req.params.id) {
        res.status(404).send("Please give a book Id");
      }else{
        await Book.deleteOne({_id: req.params.id});
      }
      return res.send("REQUEST RECIEVED!");
    }catch(error){
      console.log(error);
      res.status(500).json({error: 'Server cannot process your request.'})
    }
  });
  
  app.put('/books/:id', async (req,res) => {
    let id = req.params.id;
    try{
      await Book.replaceOne({_id: id}, req.body); // req.body - the express object for all data.
      let freshBook = await Book.findOne({_id: id});
      res.status(200).json(freshBook);
    }catch (error){
      console.log('The error is: ' , error);
      res.status(400).send(error);
    }  

  });
  
  

app.listen(PORT, () => console.log(`listening on ${PORT}`));
