// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/Users/index');

// Create user endpoint
router.post('/create', userController.createUser);
router.post('/login', userController.loginUser)
module.exports = router;
