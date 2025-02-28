const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');
const auth = require('../middleware/auth');

router.post(
  '/',
  auth('customer'),
  cartController.validateCartItem,
  cartController.addToCart
);

router.get(
  '/',
  auth('customer'),
  cartController.getCart
);

router.delete(
  '/:id',
  auth('customer'),
  cartController.removeFromCart
);

module.exports = router;