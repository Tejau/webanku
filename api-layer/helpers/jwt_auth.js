const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_secret_key'; // Replace with a secure secret key

const generateAuthToken = (userId, role) => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '3600s' });
};

const verifyAuthToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded)
} catch (error) {
    console.log(error)
    return null; // Token verification failed
  }
};
// console.log(generateAuthToken('655a1cd6c0b41242d062dfce'))
// verifyAuthToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTVhMWNkNmMwYjQxMjQyZDA2MmRmY2UiLCJpYXQiOjE3MDI0NzgxODQsImV4cCI6MTcwMjQ4MTc4NH0.hkR27OfEhsSEHbOIa0qmGGHK72jczzL9ISRtZV6VDYA')
// console.log(x)
module.exports = {
  generateAuthToken,
  verifyAuthToken,
};
