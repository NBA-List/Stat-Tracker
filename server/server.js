const path = require('path');
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const UserController = require('./controllers/UserController');
const User = require(path.resolve(__dirname, './models/UserModels'));


const PORT = 3000;

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * handle requests for static files
 */
app.use(express.static(path.resolve(__dirname, '../client')));


// Create a student in the database
// http://localhost:3000/student
app.post('/signup', UserController.createUser, (req, res) => {
    res.send(res.locals.createdUser);
  });


/**
 * start server
 */
 app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
  });
  
  module.exports = app;
  