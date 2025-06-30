const express = require('express');
const router = express.Router();
const { getRecentMatches } = require('../services/cricketService');

router.get('/', async (req, res) => {
    try {
        const recentMatches = await getRecentMatches();
        res.render('homepage', { matches: recentMatches });
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

router.get('/', async (req, res) => {
    const recentMatches = await Match.find().limit(5); // Fetch from DB or API
    res.render('homepage', { matches: recentMatches });
});


module.exports = router;
