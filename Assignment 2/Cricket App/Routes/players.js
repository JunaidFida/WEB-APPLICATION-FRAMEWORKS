const express = require('express');
const router = express.Router();
const Player = require('../Model/Player');

router.get('/players/:id', async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        if (!player) return res.status(404).send('Player not found');
        res.render('playerInfo', { player });
    } catch (error) {
        res.status(500).send('Error loading player info');
    }
});

module.exports = router;
