const express = require('express');
const router = express.Router();
const Series = require('../Model/Series');

router.get('/series', async (req, res) => {
    try {
        const seriesList = await Series.find().populate('teams');
        res.render('seriesInfo', { seriesList });
    } catch (error) {
        res.status(500).send('Error loading series info');
    }
});

module.exports = router;
