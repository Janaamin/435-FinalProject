const express = require('express');
const connectDB = require('./config/db');   // Import the database connection
require('dotenv').config();                 // Loading environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to the database (from db.js)
connectDB();

// Root route
app.get('/', (req, res) => {
  res.send('Hello Node and Express API');
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
