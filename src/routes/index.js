const express = require('express');
const playerService = require('../services/player');
const teamService = require('../services/teams')
const bodyParser = require('body-parser');
const router = express.Router();


router.get('/players', (req, res) => {
    playerService.getPlayers()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json(err))
});


router.get('/non_bid_players', (req, res) => {
    playerService.getNonBidPlayers()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json(err))
});

router.post('/players', bodyParser.json(),(req, res) => {
    console.log(req.body)
    playerService.addPlayers(req.body)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json(err))
});


router.put('/players', bodyParser.json(),(req, res) => {
    console.log(req.body)
    playerService.updatePlayers(req.body)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json(err))
});

router.post('/upload', bodyParser.json(),(req, res) => {
    console.log(req.body)
    playerService.getUploadUrl(req.body)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json(err))
});

router.post('/download', bodyParser.json(),(req, res) => {
    console.log(req.body)
    playerService.getDownloadUrl(req.body)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json(err))
});

router.get('/teams', (req, res) => {
    teamService.getTeams()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json(err))
});

router.post('/teams', bodyParser.json(),(req, res) => {
    console.log(req.body)
    teamService.addTeams(req.body)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json(err))
});

router.get('/teamNames', (req, res) => {
    teamService.getTeamNames()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json(err))
});




module.exports = router;