
const User = require('../models/User');

const areEmailAndMobileAvailable = async (email, mobile) => {
  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return { emailAvailable: false, message: 'Email is already registered' };
    }

    const existingMobile = await User.findOne({ mobile });
    if (existingMobile) {
      return { mobileAvailable: false, message: 'Mobile number is already registered' };
    }

    return { emailAvailable: true, mobileAvailable: true, message: 'Email and mobile are available' };
  } catch (error) {
    console.error(error);
    throw new Error('Error checking availability');
  }
};

module.exports = {
  areEmailAndMobileAvailable,
};
