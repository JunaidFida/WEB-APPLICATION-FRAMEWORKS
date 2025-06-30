const express = require('express');
const router = express.Router();
const cricketController = require('../controllers/cricketController');

router.get('/', cricketController.homepage);

router.get('/scoreboard', cricketController.scoreboard);

router.get('/series', cricketController.seriesInfo);

router.get('/teams', cricketController.teams);

router.get('/player/:id', cricketController.playerDetails);

router.get('/searchPlayer', (req, res) => {
    res.render('searchPlayer');
});
router.post('/searchPlayer', cricketController.searchPlayer);

module.exports = router;
