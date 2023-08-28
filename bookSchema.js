"use strict";
const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    description:{
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['Available', 'Checked', 'On Hold'],

    },

});
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;