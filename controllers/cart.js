const { body, validationResult } = require('express-validator');
const { Cart, Product } = require('../models');

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validation chains
exports.validateCartItem = [
  body('productId').isInt().withMessage('Invalid product ID'),
  body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be at least 1'),
  handleValidationErrors
];

// Controller methods
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Verify the product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Find or create the cart item
    const [cartItem, created] = await Cart.findOrCreate({
      where: {
        userId: req.user.id,
        productId: product.id
      },
      defaults: {
        quantity: quantity,
        priceAtAddition: product.price
      }
    });

    // If the item already exists, update the quantity
    if (!created) {
      cartItem.quantity += quantity;
      await cartItem.save();
    }

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

exports.getCart = async (req, res) => {
    try {
      const cart = await Cart.findAll({
        where: { userId: req.user.id },
        include: [
          {
            model: Product,
            as: 'Product' // Ensure this matches the association alias
          }
        ]
      });
  
      if (!cart || cart.length === 0) {
        return res.status(404).json({ error: 'Cart is empty' });
      }
  
      res.json(cart);
    } catch (error) {
      console.error('Error in getCart:', error); // Log the error
      res.status(500).json({ error: 'Failed to fetch cart' });
    }
  };

exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    // Verify the cart item belongs to the user
    const cartItem = await Cart.findOne({
      where: {
        id: id,
        userId: req.user.id
      }
    });

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    await cartItem.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
};