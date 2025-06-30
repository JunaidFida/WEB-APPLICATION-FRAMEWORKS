const express = require('express');
const router = express.Router();
const Team = require('../Model/Team');

router.get('/teams', async (req, res) => {
    try {
        const teams = await Team.find().populate('players');
        res.render('teams', { teams });
    } catch (error) {
        res.status(500).send('Error loading teams');
    }
});

module.exports = router;
