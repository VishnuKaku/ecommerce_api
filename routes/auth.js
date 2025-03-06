const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Route for user registration
router.post('/register', authController.validateRegister, authController.register);

// Route for user login
router.post('/login', authController.validateLogin, authController.login);

module.exports = router;