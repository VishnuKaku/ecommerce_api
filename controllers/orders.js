const { body, validationResult } = require('express-validator');
const { Order, OrderItem, Product } = require('../models');

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validation chains
exports.validateOrder = [
  body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
  body('items.*.productId').isInt().withMessage('Invalid product ID'),
  body('items.*.quantity').isInt({ gt: 0 }).withMessage('Quantity must be at least 1'),
  handleValidationErrors
];

// Controller methods
exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    // Verify all products exist
    const products = await Promise.all(
      items.map(item => Product.findByPk(item.productId))
    );
    if (products.some(product => !product)) {
      return res.status(404).json({ error: 'One or more products not found' });
    }

    const order = await Order.create({ userId: req.user.id });

    const orderItems = await Promise.all(items.map(async item => {
      const product = await Product.findByPk(item.productId);
      return OrderItem.create({
        orderId: order.id,
        productId: product.id,
        quantity: item.quantity,
        price: product.price
      });
    }));

    res.status(201).json({ order, orderItems });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

exports.getOrderHistory = async (req, res) => {
    try {
      const orders = await Order.findAll({
        where: { UserId: req.user.id }, // Ensure this matches the column name
        include: [
          {
            model: OrderItem,
            include: [Product] // Include Product in OrderItem
          }
        ]
      });
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ error: 'No orders found for this user' });
      }
  
      res.json(orders);
    } catch (error) {
      console.error('Error in getOrderHistory:', error); // Log the error
      res.status(500).json({ error: 'Failed to fetch order history' });
    }
  };
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: { model: OrderItem, include: Product }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch all orders' });
  }
};