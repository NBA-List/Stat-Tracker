const path = require('path');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/UserModels');
const { OAuth2Client } = require('google-auth-library');

const { CLIENT_ID } = process.env;
const client = new OAuth2Client(CLIENT_ID);


const UserController = {
  // Create a new user in the Database
  // Their information will be sent in the request body
  // This should send the created user back to the client

  authUser: async (req, res, next) => {
    try {
      // pul JWT from the request header
      const { credential } = req.body;



  authUser: async (req, res, next) => {
    try {
      // pul JWT from the request header
      const { credential } = req.body;

      // use the JWT to get the user's profile from Google
      const ticket = await client.verifyIdToken({
        // pass the JWT to verify
        idToken: credential,
        audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        requiredAudience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      });

      // get the user's profile from Google
      const payload = ticket.getPayload();
      // pull the user's profile information from the profile
      const { name, email, picture } = payload;

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

      // get the user's profile from Google
      const payload = ticket.getPayload();
      // pull the user's profile information from the profile
      const { name, email, picture } = payload;

      // check if the user is already in our database
      let user = await User.findOne({ email });
      if (!user) {
        // create a new user if the user is not in our database
        user = await User.create({ name, email, picture });
      }

      // send the user back to the client
      res.locals.user = user;
      res.locals.credential = credential;
      next();
    } catch (err) {
      next(err);
    }
  },

  addTeam(req, res, next) {
    console.log(req.body);
    const { teamId } = req.body;
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
      },
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
    const { playerId } = req.body;
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
      },
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
//   createUser(req, res, next) {
//     User.create(
//       {
//         name: req.body.name,
//         favorited_teams: req.body.teams,
//         favorited_players: req.body.players,
//       },
//       (err, data) => {
//         if (err) {
//           return res.sendStatus(404);
//         }
//         console.log("here");

//         res.locals.createdUser = data;
//         return next();
//       }
//     );
//   },
// };

module.exports = UserController;
