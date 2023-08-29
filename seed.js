"use strict";

require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./bookSchema.js');
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL).catch(error => {
    console.log('ERROR!!! ', error);
});



let harryPotter1 = new Book({
    title: 'Harry Potter and the Sorcerers Stone',
    description: 'The first book in the magical Harry Potter series.',
    status: 'Available'
});

let harryPotter2 = new Book({
    title: 'Harry Potter and the Chamber of Secrets',
    description: 'The second book in the enchanting Harry Potter series.',
    status: 'Checked Out'
 
});

let harryPotter3 = new Book({
    title: 'Harry Potter and the Prisoner of Azkaban',
    description: 'The third book in the captivating Harry Potter series.',
    status: 'Available'
});



// const seeds = [
//   {
//     title: 'Harry Potter and the Sorcerers Stone',
//     description: 'The first book in the magical Harry Potter series.',
//     status: 'Available'
//   },
//   {
//     title: 'Harry Potter and the Chamber of Secrets',
//     description: 'The second book in the enchanting Harry Potter series.',
//     status: 'Checked Out'
//   },
//   {
//     title: 'Harry Potter and the Prisoner of Azkaban',
//     description: 'The third book in the captivating Harry Potter series.',
//     status: 'Available'
//   }];
// ];
// const insertPromises = seeds.map(seed => Book.create(seed));

// Promise.all(insertPromises)
// .then(() => {
//     console.log("Seeds inserted successfully");
// })
// .catch(err => {
//     console.log("Error inserting seeds: ", err);
// });



Promise.all([
harryPotter1.save(),
harryPotter2.save(),
harryPotter3.save(),
]).then(documents => {
    console.log(documents);
}).catch(error =>{
    console.log('ERROR!', error);
});
