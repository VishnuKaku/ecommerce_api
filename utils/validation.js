const { body, param, query } = require('express-validator');
const { User } = require('../models');

// Validation chain for user registration
const validateRegister = [
  body('email')
    .isEmail().withMessage('Invalid email format')
    .custom(async email => {
      const user = await User.findOne({ where: { email } });
      if (user) throw new Error('Email already in use');
    }),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

// Validation chain for user login
const validateLogin = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').exists().withMessage('Password is required')
];

// Validation chain for product creation and updates
const validateProduct = [
  body('name')
    .notEmpty().withMessage('Product name is required'),
  body('price')
    .isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
  body('stock')
    .isInt({ gt: -1 }).withMessage('Stock must be a non-negative integer'),
  body('categoryId')
    .isInt().withMessage('Invalid category ID')
];

// Validation chain for category creation and updates
const validateCategory = [
  body('name')
    .notEmpty().withMessage('Category name is required')
];

// Validation chain for product filters
const validateProductFilters = [
  query('minPrice')
    .optional()
    .isFloat({ gt: 0 }).withMessage('Minimum price must be a positive number'),
  query('maxPrice')
    .optional()
    .isFloat({ gt: 0 }).withMessage('Maximum price must be a positive number'),
  query('categoryId')
    .optional()
    .isInt().withMessage('Invalid category ID'),
  query('page')
    .optional()
    .isInt({ gt: 0 }).withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ gt: 0 }).withMessage('Limit must be a positive integer')
];

// Validation chain for adding items to the cart
const validateCartItem = [
  body('productId')
    .isInt().withMessage('Invalid product ID'),
  body('quantity')
    .isInt({ gt: 0 }).withMessage('Quantity must be at least 1')
];

// Validation chain for creating an order
const validateOrder = [
  body('items.*.productId')
    .isInt().withMessage('Invalid product ID'),
  body('items.*.quantity')
    .isInt({ gt: 0 }).withMessage('Quantity must be at least 1')
];

// Validation chain for validating object IDs
const validateObjectId = [
  param('id')
    .isInt().withMessage('Invalid ID format')
];

module.exports = {
  validateRegister,
  validateLogin,
  validateProduct,
  validateCategory,
  validateProductFilters,
  validateCartItem,
  validateOrder,
  validateObjectId
};