const mongoose = require("mongoose");
require('dotenv').config(); //Loading environment variables

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.DB_URI, {
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
      });
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error.message);
      process.exit(1); // Exit the process if the connection fails
    }
  };
  
  module.exports = connectDB;