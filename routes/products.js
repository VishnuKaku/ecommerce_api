const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Route to create a product
router.post(
  '/', 
  auth('admin'), // Middleware to check if the user is authenticated and has the 'admin' role
  productsController.validateProduct, // Middleware to validate the product
  productsController.createProduct // Controller method to create the product
);

// Route to upload a product image
router.post(
  '/:id/upload', 
  auth('admin'), // Middleware to check if the user is authenticated and has the 'admin' role
  upload.single('image'), // Middleware to handle image upload
  productsController.uploadImage // Controller method to upload the image
);

// Route to get products with filters
router.get(
  '/', 
  productsController.validateProductFilters, // Middleware to validate product filters
  productsController.getProducts // Controller method to get products
);

// Route to update a product
router.put(
  '/:id', 
  auth('admin'), // Middleware to check if the user is authenticated and has the 'admin' role
  productsController.validateObjectId, // Middleware to validate the product ID
  productsController.validateProduct, // Middleware to validate the product
  productsController.updateProduct // Controller method to update the product
);

// Route to delete a product
router.delete(
  '/:id', 
  auth('admin'), // Middleware to check if the user is authenticated and has the 'admin' role
  productsController.validateObjectId, // Middleware to validate the product ID
  productsController.deleteProduct // Controller method to delete the product
);

module.exports = router;