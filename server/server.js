const path = require('path');
const express = require('express');
<<<<<<< HEAD
const app = express();
const mongoose = require('mongoose');

const userRouter = require('./routers/userRouter');
=======
const mongoose = require('mongoose');
>>>>>>> 1edfeaa835b16189694caf46893c18644056fd56

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { OAuth2Client } = require('google-auth-library');
const passport = require('passport');
const cors = require('cors');
const dotenv = require('dotenv');
const authroutes = require('./routes/auth.route');
const UserController = require('./controllers/UserController');
<<<<<<< Updated upstream
=======

dotenv.config();
>>>>>>> Stashed changes

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
app.use(express.static(path.resolve(__dirname, '../build')));

app.get('/', (req, res) =>
  res.status(200).sendFile(path.join(__dirname, '../client/index.html'))
);

app.use('/user', userRouter);

<<<<<<< Updated upstream
<<<<<<< HEAD
app.post('/', UserController.getJWT, (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});
=======
// Create a user in the database
// handle google oauth
app.post('/', UserController.authUser, (req, res) => res.status(200).json(res.locals));
>>>>>>> 1edfeaa835b16189694caf46893c18644056fd56
=======
// Create a user in the database
// handle google oauth
app.post('/', UserController.authUser, (req, res) =>
  res.status(200).json(res.locals)
);
>>>>>>> Stashed changes

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
