const path = require('path');
const User = require('../models/UserModels');

const UserController = {
  // Create a new student in the Database
  // Their information will be sent in the request body
  // This should send the created student
  createUser(req, res, next) {
    User.create(
      { name: req.body.name, favorited_teams: req.body.teams, favorited_players: req.body.players },
      (err, data) => {
        if (err) {
          return res.sendStatus(404);
        }
        console.log('here');

        res.locals.createdUser = data;
        return next();
      },
    );
  }};

  module.exports = UserController;
