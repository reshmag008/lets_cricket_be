const express = require('express');
const playerService = require('../services/player');
const teamService = require('../services/teams')
const bodyParser = require('body-parser');
const s3Service = require('../services/s3Service');
const router = express.Router();


router.get('/players', (req, res) => {
    playerService.getPlayers()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json(err))
});

router.get('/players/:id', (req, res) => {
    console.log(req.params)
    playerService.getPlayers(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json(err))
});


router.get('/non_bid_players', (req, res) => {
    playerService.getNonBidPlayers()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json(err))
});

router.get('/non_bid_players/:id', (req, res) => {
    playerService.getNonBidPlayers(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json(err))
});

router.get('/sold_players', (req, res) => {
    playerService.getSoldPlayers(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json(err))
});

router.post('/players', bodyParser.json(),(req, res) => {
    console.log(req.body)
    playerService.addPlayers(req.body)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json(err))
});

router.post('/player_display', bodyParser.json(),(req, res) => {
    console.log(req.body)
    playerService.displayPlayer(req.body)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json(err))
});

router.post('/team_call', bodyParser.json(),(req, res) => {
    console.log(req.body)
    playerService.teamCall(req.body)
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
    s3Service.getUploadUrl(req.body)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json(err))
});

router.post('/download', bodyParser.json(),(req, res) => {
    console.log(req.body)
    s3Service.getDownloadUrl(req.body)
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