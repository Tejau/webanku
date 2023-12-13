const bcrypt = require('bcrypt');
const { User } = require('../../models');
const {generateAuthToken} = require('../../helpers/jwt_auth')
const constantSalt = bcrypt.genSaltSync(10);

const createUser = async (req, res) => {
  try {
    const { email, fullName, age, gender, address, City, State, phoneNumber, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, constantSalt);

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

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.salted_password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate JWT token using the jwtAuth module
    const token = generateAuthToken(user._id, 'user'); // You can pass more user information as needed

    res.status(200).json({ message: 'Login successful', user: user, userid: user._id, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createUser,
  loginUser,
};
