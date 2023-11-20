// helpers/checkers.js

// Assume you have access to your User model
const User = require('../models/User');

// Function to check if an email and mobile number are available
const areEmailAndMobileAvailable = async (email, mobile) => {
  try {
    // Check if the email is already registered
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return { emailAvailable: false, message: 'Email is already registered' };
    }

    // Check if the mobile number is already registered
    const existingMobile = await User.findOne({ mobile });
    if (existingMobile) {
      return { mobileAvailable: false, message: 'Mobile number is already registered' };
    }

    // If both email and mobile are available
    return { emailAvailable: true, mobileAvailable: true, message: 'Email and mobile are available' };
  } catch (error) {
    console.error(error);
    throw new Error('Error checking availability');
  }
};

module.exports = {
  areEmailAndMobileAvailable,
};
