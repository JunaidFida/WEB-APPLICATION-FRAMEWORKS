require('dotenv').config();

const express = require('express');
const connectDB = require('./server/config/db');

const app = express();
const port = process.env.PORT || 8000;

connectDB();

//Middleware
app.use(express.json());

// Routes
app.use('/', require('./server/routes/product'));


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});