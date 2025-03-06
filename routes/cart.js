const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');
const auth = require('../middleware/auth');

// Route to add an item to the cart
router.post(
  '/',
  auth('customer'), // Middleware to check if the user is authenticated and has the 'customer' role
  cartController.validateCartItem, // Middleware to validate the cart item
  cartController.addToCart // Controller method to add the item to the cart
);

// Route to get the user's cart
router.get(
  '/',
  auth('customer'), // Middleware to check if the user is authenticated and has the 'customer' role
  cartController.getCart // Controller method to get the user's cart
);

// Route to remove an item from the cart
router.delete(
  '/:id',
  auth('customer'), // Middleware to check if the user is authenticated and has the 'customer' role
  cartController.removeFromCart // Controller method to remove the item from the cart
);

module.exports = router;