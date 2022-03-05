const path = require("path");
const User = require("../models/UserModels");
const { OAuth2Client } = require("google-auth-library");

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
        favorited_teams: req.body.teams,
        favorited_players: req.body.players,
      },
      (err, data) => {
        if (err) {
          return res.sendStatus(404);
        }
        console.log("here");

        res.locals.createdUser = data;
        return next();
      }
    );
  },
};

module.exports = UserController;
