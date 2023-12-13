const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Update the path to your User model
const JWT_SECRET = 'your_secret_key'; // Replace with a secure secret key

const authenticateUser = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization.split("Bearer ")[1];
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token not provided' });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // Check if the user exists in the database
    try {
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized: User not found' });
      }

      // Attach the user information to the request for further processing
      req.user = user;

      // Move to the next middleware or route handler
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
};

module.exports = authenticateUser;
