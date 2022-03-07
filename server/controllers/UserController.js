const path = require('path');
const User = require('../models/UserModels');
const { OAuth2Client } = require('google-auth-library');

const UserController = {
  // Create a new user in the Database
  // Their information will be sent in the request body
  // This should send the created user

  getJWT(req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: req.body.credential,
        audience: process.env.CLIENT_ID,
      });
      const payload = ticket.getPayload();
      console.log(payload);
      next();
    }
    verify();
  },

  createUser(req, res, next) {
    User.create(
      {
        name: req.body.name,
        email,
      },
      (err, data) => {
        if (err) {
          return res.sendStatus(404);
        }
        console.log('here');

        res.locals.createdUser = data;
        return next();
      }
    );
  },

  addTeam(req, res, next) {
    console.log(req.body);
    const teamId = req.body.teamId;
    const query = {};
    query.favorited_teams = teamId;
    User.findOneAndUpdate(
      { email: req.cookies.email },
      { $push: query },
      (err, user) => {
        if (err) {
          return next({
            log: 'Error in addTeam middleware',
            message: { err: 'An error occurred while trying to add a team' },
          });
        }
        return next();
      }
    );
  },

  getTeams(req, res, next) {
    User.findOne({ email: req.cookies.email }, (err, user) => {
      if (err) {
        return next({
          log: 'Error in getTeams middleware',
          message: {
            err: 'An error occurred while trying to get teams',
          },
        });
      }
      res.locals.teams = user.favorited_teams;
      return next();
    });
  },

  addPlayer(req, res, next) {
    const playerId = req.body.playerId;
    const query = {};
    query.favorited_players = playerId;
    User.findOneAndUpdate(
      { email: req.cookies.email },
      { $push: query },
      (err, user) => {
        if (err) {
          return next({
            log: 'Error in addPlayer middleware',
            message: {
              err: 'An error occurred while trying to add a player',
            },
          });
        }
        return next();
      }
    );
  },

  getPlayers(req, res, next) {
    User.findOne({ email: req.cookies.email }, (err, user) => {
      if (err) {
        return next({
          log: 'Error in getPlayers middleware',
          message: {
            err: 'An error occurred while trying to get players',
          },
        });
      }
      res.locals.players = user.favorited_players;
      return next();
    });
  },
};

module.exports = UserController;
