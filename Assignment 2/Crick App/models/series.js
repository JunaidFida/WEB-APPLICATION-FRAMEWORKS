const mongoose = require('mongoose');

const seriesSchema = new mongoose.Schema({
    name: String,
    startDate: Date,
    endDate: Date,
    teams: [String],
    location: String,
    status: String, 
});

module.exports = mongoose.model('Series', seriesSchema);
