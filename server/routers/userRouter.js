const express = require('express');
const userController = require('../controllers/UserController');
const router = express.Router();

router.post(
  '/addTeam',
  userController.addTeam,
  userController.getTeams,
  (req, res) => {
    return res.status(200).json(res.locals.teams);
  }
);

router.post(
  '/addPlayer',
  userController.addPlayer,
  userController.getPlayers,
  (req, res) => {
    return res.status(200).json(res.locals.players);
  }
);

module.exports = router;
