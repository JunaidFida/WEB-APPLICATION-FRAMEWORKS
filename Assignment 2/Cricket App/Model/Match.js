const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    date: Date,
    team1: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    team2: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    result: {
        winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
        margin: String,
    },
    venue: String,
});

module.exports = mongoose.model('Match', matchSchema);
