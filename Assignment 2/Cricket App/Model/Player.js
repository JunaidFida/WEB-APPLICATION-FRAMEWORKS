const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: String,
    team: String,
    role: String,
    stats: Object, // Additional details like batting average, bowling stats, etc.
});

module.exports = mongoose.model('Player', playerSchema);
