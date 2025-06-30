const axios = require('axios');
require('dotenv').config();

const BASE_URL = 'https://api.cricketdata.org/v1';
const API_KEY = process.env.CRICKET_API_KEY;

const getRecentMatches = async () => {
    const response = await axios.get(`${BASE_URL}/recent-matches`, {
        headers: { 'x-api-key': API_KEY },
    });
    return response.data;
};

module.exports = { getRecentMatches };
