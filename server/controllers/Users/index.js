// controllers/userController.js
const bcrypt = require('bcrypt');
const { User } = require('../../models');

// Generate a random constant salt (you should generate and securely store this)
const constantSalt = bcrypt.genSaltSync(10);

const createUser = async (req, res) => {
  try {
    const { email, fullName, age, gender, address, City, State, phoneNumber, password } = req.body;

    // Hash and salt the password using the random constant salt
    const hashedPassword = await bcrypt.hash(password, constantSalt);

    // Create a new user with the hashed and salted password
    const newUser = new User({
      email,
      fullName,
      age,
      gender,
      City,
      State,
      phoneNumber,
      address,
      salted_password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser, userid: newUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      // User not found
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the password using the random constant salt
    const isPasswordValid = await bcrypt.compare(password, user.salted_password);

    if (!isPasswordValid) {
      // Incorrect password
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Password is valid, you can proceed with authentication logic

    res.status(200).json({ message: 'Login successful', user: user, userid: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createUser,
  loginUser,
};
