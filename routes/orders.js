const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders');
const auth = require('../middleware/auth');

// Route to create an order
router.post(
  '/', 
  auth('customer'), // Middleware to check if the user is authenticated and has the 'customer' role
  ordersController.validateOrder, // Middleware to validate the order
  ordersController.createOrder // Controller method to create the order
);

// Route to get the user's order history
router.get(
  '/history', 
  auth('customer'), // Middleware to check if the user is authenticated and has the 'customer' role
  ordersController.getOrderHistory // Controller method to get the user's order history
);

// Route to get all orders (admin)
router.get(
  '/', 
  auth('admin'), // Middleware to check if the user is authenticated and has the 'admin' role
  ordersController.getAllOrders // Controller method to get all orders
);

module.exports = router;