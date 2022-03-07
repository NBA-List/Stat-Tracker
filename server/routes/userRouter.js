const express = require('express');
const userController = require('../controllers/UserController');
const router = express.Router();

router.post(
  '/addTeam/:teamId',
  userController.addTeam,
  (req, res) => {
    return res.status(200).json({teams: res.locals.teams});
  }
);

router.post(
  '/addPlayer/:playerId',
  userController.addPlayer,
  (req, res) => {
    return res.status(200).json({players: res.locals.players});
  }
);

router.post(
  '/removeTeam/:teamId',
  userController.removeTeam,
  (req, res) => {
    return res.status(200).json({teams: res.locals.teams});
  }
);

router.post(
  '/removePlayer/:playerId',
  userController.removePlayer,
  (req, res) => {
    return res.status(200).json({players: res.locals.players});
  }
);

module.exports = router;
