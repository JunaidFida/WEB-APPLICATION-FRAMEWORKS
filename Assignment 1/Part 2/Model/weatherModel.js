const axios = require("axios");

const fetchWeatherData = async () => {
  const API_URL = "http://www.7timer.info/bin/api.pl";
  const params = {
    lon: 67.0099, 
    lat: 24.8615, 
    product: "civillight",
    output: "json",
  };

  try {
    const response = await axios.get(API_URL, { params });
    const data = response.data.dataseries[0]; 
    return {
      temperature: {
        min: data.temp2m.min,
        max: data.temp2m.max,
      },
      rain: data.weather.includes("rain"), 
    };
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    throw error;
  }
};

module.exports = { fetchWeatherData };
