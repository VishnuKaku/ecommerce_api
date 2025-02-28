const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders');
const auth = require('../middleware/auth');

router.post(
  '/', 
  auth('customer'), 
  ordersController.validateOrder, 
  ordersController.createOrder
);

router.get(
  '/history', 
  auth('customer'), 
  ordersController.getOrderHistory
);

router.get(
  '/', 
  auth('admin'), 
  ordersController.getAllOrders
);

module.exports = router;