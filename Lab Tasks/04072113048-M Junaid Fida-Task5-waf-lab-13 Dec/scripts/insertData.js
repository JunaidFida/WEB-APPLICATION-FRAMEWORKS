require('dotenv').config();

const mongoose = require('mongoose');
const Product = require('../server/models/Product');
const data = require('../MOCK_DATA.json');
const connectDB = require('../server/config/db');

const insertData = async () => {
  try {
    await connectDB();
    await Product.insertMany(data);
    console.log('Data inserted');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

insertData();