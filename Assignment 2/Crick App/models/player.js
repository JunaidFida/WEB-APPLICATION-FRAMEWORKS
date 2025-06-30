const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: String,
    team: String,
    position: String,
    stats: {
        matches: Number,
        runs: Number,
        wickets: Number,
    }
});

module.exports = mongoose.model('Player', playerSchema);
