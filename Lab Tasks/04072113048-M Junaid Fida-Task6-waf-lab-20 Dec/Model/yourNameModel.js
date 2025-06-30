const mongoose = require('mongoose');

// City Schema
const citySchema = new mongoose.Schema({
  cityCode: { type: String, required: false, unique: true },
  cityName: { type: String, required: false },
});
const City = mongoose.model('City', citySchema);

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  cityCode: { type: String, required: false },
  dob: { type: Date, required: true },
  occupation: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

module.exports = { City, User };
