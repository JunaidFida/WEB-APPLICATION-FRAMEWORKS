const axios = require('axios');

const API_KEY = '71d773fc-9bc5-4408-98bd-d5c7a1d03409'; 

// Base URL for the API
const BASE_URL = 'https://cricketdata.org/api/v1/';

const getRecentMatches = async () => {
    try {
        const response = await axios.get(`${BASE_URL}matches?apiKey=${API_KEY}`);
        return response.data.matches;  
    } catch (error) {
        console.error('Error fetching recent matches:', error);
        throw new Error('Failed to fetch recent matches');
    }
};

const getSeriesInfo = async () => {
    try {
        const response = await axios.get(`${BASE_URL}series?apiKey=${API_KEY}`);
        return response.data.series;  
    } catch (error) {
        console.error('Error fetching series information:', error);
        throw new Error('Failed to fetch series information');
    }
};

const getPlayerDetails = async (playerId) => {
    try {
        const response = await axios.get(`${BASE_URL}players/${playerId}?apiKey=${API_KEY}`);
        return response.data.player; 
    } catch (error) {
        console.error('Error fetching player details:', error);
        throw new Error('Failed to fetch player details');
    }
};

const getTeamDetails = async () => {
    try {
        const response = await axios.get(`${BASE_URL}teams?apiKey=${API_KEY}`);
        return response.data.teams; 
    } catch (error) {
        console.error('Error fetching team details:', error);
        throw new Error('Failed to fetch team details');
    }
};

module.exports = {
    getRecentMatches,
    getSeriesInfo,
    getPlayerDetails,
    getTeamDetails
};
