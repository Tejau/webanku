const mongoose = require('mongoose');
require('dotenv').config();
// console.log(process.env)
const dbHost = process.env.MONGO_CONNECTION_STRING 
// || "mongodb://127.0.0.1:27017/ippopay";
// console.log(dbHost)
const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbHost, {});
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

module.exports = connectToDatabase;
