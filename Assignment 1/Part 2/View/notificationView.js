const nodemailer = require("nodemailer");
const axios = require("axios");

const sendEmail = async (subject, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: "your_email_password", 
}});

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject,
    text: message,
  };

  await transporter.sendMail(mailOptions);
  console.log("Email sent!");
};

const sendSMS = async (message) => {
  const API_URL = "https://d7sms.p.rapidapi.com/secure/send";
  const headers = {
    "content-type": "application/json",
    "X-RapidAPI-Key": process.env.D7_SMS_API_KEY,
  };

  const body = {
    to: process.env.SMS_RECIPIENT,
    from: "WeatherAlert",
    content: message,
  };

  await axios.post(API_URL, body, { headers });
  console.log("SMS sent!");
};

module.exports = { sendEmail, sendSMS };
