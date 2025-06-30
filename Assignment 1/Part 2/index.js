const { notifyWeather } = require("./Controller/weatherController");
require("dotenv").config();

const main = async () => {
  console.log("Starting Weather Notification System...");
  await notifyWeather();
};


main();
setInterval(main, 24 * 60 * 60 * 1000);

const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendSMS = async (message) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.SMS_RECIPIENT,
    });
    console.log("SMS sent successfully!", response.sid);
  } catch (error) {
    console.error("Failed to send SMS:", error.message);
  }
};

