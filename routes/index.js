// routes/index.js
const auth = require('./auth');
const products = require('./products');
const categories = require('./categories');
const orders = require('./orders');

module.exports = {
  auth,
  products,
  categories,
  orders
};