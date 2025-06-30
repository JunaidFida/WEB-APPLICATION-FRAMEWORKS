const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: String,
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
    coach: String,
    captain: String,
});

module.exports = mongoose.model('Team', teamSchema);
