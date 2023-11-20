const mongoose = require('mongoose');
require('dotenv').config();

const dbHost = process.env.MONGO_CONNECTION_STRING;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbHost, {});
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

module.exports = connectToDatabase;
