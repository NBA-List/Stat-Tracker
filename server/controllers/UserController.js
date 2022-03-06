// const path = require("path");
// const User = require("../models/UserModels");
// const {OAuth2Client} = require("google-auth-library");
// const { Request, Response } = require("express");

const User = require("../models/UserModels");
const {OAuth2Client} = require("google-auth-library");

// const userController = {}

// const googleClient = new OAuth2Client({
//   clientId: `${process.env.GOOGLE_CLIENT_ID}`,
//   clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
// });

// const authenticateUser = async (req, res) => {
//   const {idToken} = req.body;
  
//   const ticket = await googleClient.verifyIdToken({
//     idToken,
//     audience: `${process.env.GOOGLE_CLIENT_ID}`,
//   });

// };


// module.exports = {
//   authenticateUser
// };



const UserController = {
  // Create a new user in the Database
  // Their information will be sent in the request body
  // This should send the created user

  getJWT(req, res, next) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: req.body.credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      console.log("req.body: ->");
      console.log(req.body);
      const payload = ticket.getPayload();
      console.log('req.body.credential: ->');
      console.log(req.body.credential);
      console.log('payload: -> ');
      console.log(payload);
      // next();
      return res.status(200).send(payload);
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
