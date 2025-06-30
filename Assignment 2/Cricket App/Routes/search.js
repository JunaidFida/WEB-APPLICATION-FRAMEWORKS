const express = require('express');
const router = express.Router();
router.get('/search', (req, res) => {
    res.render('search');
});

router.post('/search', async (req, res) => {
    const { name } = req.body;
    const player = await Player.findOne({ name: new RegExp(name, 'i') });
    if (player) {
        res.redirect(`/players/${player._id}`);
    } else {
        res.render('search', { error: 'Player not found' });
    }
});
