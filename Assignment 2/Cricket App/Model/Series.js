const mongoose = require('mongoose');

const seriesSchema = new mongoose.Schema({
    name: String,
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
    startDate: Date,
    endDate: Date,
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],
});

module.exports = mongoose.model('Series', seriesSchema);
