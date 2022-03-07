const { OAuth2Client } = require('google-auth-library');
const User = require('../models/UserModels');

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
