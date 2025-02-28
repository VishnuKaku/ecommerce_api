const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/register', authController.validateRegister, authController.register);
router.post('/login', authController.validateLogin, authController.login);

module.exports = router;