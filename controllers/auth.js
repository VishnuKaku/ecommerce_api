const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Validation middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validation chains for user registration
exports.validateRegister = [
  body('email')
    .isEmail().withMessage('Invalid email format')
    .custom(async email => {
      const user = await User.findOne({ where: { email } });
      if (user) throw new Error('Email already in use');
    }),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  handleValidationErrors
];

// Validation chains for user login
exports.validateLogin = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').exists().withMessage('Password is required'),
  handleValidationErrors
];

// Controller method for user registration
exports.register = async (req, res) => {
  try {
    const { email, password, role = 'customer' } = req.body; // Default to 'customer' if role is not provided

    // Check if the email is already in use
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with the provided role
    const user = await User.create({
      email,
      password: hashedPassword,
      role // Use the role from the request body
    });

    res.status(201).json({
      id: user.id,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

// Controller method for user login
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    
    // Check if the user exists and the password is correct
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ 
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};