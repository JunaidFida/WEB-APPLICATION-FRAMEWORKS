const cricketDataService = require('../services/cricketDataService');
const Player = require('../models/player');
const Team = require('../models/team');
const Series = require('../models/series');

exports.homepage = async (req, res) => {
    try {
        const series = await cricketDataService.getSeriesInfo();
        
console.log(series);  


        if (!series || series.length === 0) {
            return res.render('index', { series: [], message: 'No series data available.' });
        }

        res.render('index', { series });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.scoreboard = async (req, res) => {
    try {
       
        const matches = await cricketDataService.getRecentMatches();
        res.render('scoreboard', { matches });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.seriesInfo = async (req, res) => {
    try {
        const series = await cricketDataService.getSeriesInfo();
        res.render('series', { series });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.teams = async (req, res) => {
    try {
        const teams = await cricketDataService.getTeamDetails();
        res.render('teams', { teams });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.playerDetails = async (req, res) => {
    try {
        const playerId = req.params.id;  
        const player = await cricketDataService.getPlayerDetails(playerId);
        res.render('player', { player });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchPlayer = async (req, res) => {
    try {
        const playerName = req.body.name;  
        const players = await Player.find({ name: new RegExp(playerName, 'i') });  
        
        if (players.length > 0) {
            res.render('player', { player: players[0] });
        } else {
            res.render('searchPlayer', { message: 'Player not found' });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
