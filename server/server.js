const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserController = require("./controllers/UserController");
const User = require(path.resolve(__dirname, "./models/UserModels"));
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { OAuth2Client } = require("google-auth-library");

const PORT = 3000;

/**
 * handle parsing request body
 */
console.log("hi");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

/**
 * handle requests for static files
 */
app.get("/build", (req, res) => {
  console.log("hi");
});
app.use(express.static(path.resolve(__dirname, "../build")));

// Create a user in the database
// http://localhost:3000/signup
app.get("/", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../client/index.html"));
});

app.post("/", UserController.getJWT, (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../client/index.html"));
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
