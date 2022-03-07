const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const User = require(path.resolve(__dirname, './models/UserModels'));
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { OAuth2Client } = require('google-auth-library');
const passport = require('passport');
const cors = require('cors');
const dotenv = require('dotenv');
const authroutes = require('./routes/auth.route');
const UserController = require('./controllers/UserController');

dotenv.config();

const app = express();
const PORT = 3000;

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());

/**
 * handle requests for static files
 */
app.get('/build', (req, res) => {
});
app.use(express.static(path.resolve(__dirname, '../build')));

// Create a user in the database
// http://localhost:3000/signup
app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../client/index.html')));

// Create a user in the database
// handle google oauth
app.post('/', UserController.authUser, (req, res) => res.status(200).json(res.locals));

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
