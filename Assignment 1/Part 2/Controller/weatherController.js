const { fetchWeatherData } = require("../Model/weatherModel");
const { sendEmail, sendSMS } = require("../View/notificationView");

const notifyWeather = async () => {
  try {
    const weather = await fetchWeatherData();
    const message = `
      Weather Update:
      - Temperature: ${weather.temperature.min}°C to ${weather.temperature.max}°C
      - Rain Expected: ${weather.rain ? "Yes" : "No"}
    `;

    console.log(message);

    // Send notifications
    await sendEmail("Daily Weather Update", message);
    await sendSMS(message);
  } catch (error) {
    console.error("Error notifying weather updates:", error.message);
  }
};

module.exports = { notifyWeather };
