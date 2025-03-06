const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories');
const auth = require('../middleware/auth');

// Route to create a category
router.post(
  '/',
  auth('admin'), // Middleware to check if the user is authenticated and has the 'admin' role
  categoriesController.validateCategory, // Middleware to validate the category
  categoriesController.createCategory // Controller method to create the category
);

// Route to update a category
router.put(
  '/:id',
  auth('admin'), // Middleware to check if the user is authenticated and has the 'admin' role
  categoriesController.validateObjectId, // Middleware to validate the category ID
  categoriesController.validateCategory, // Middleware to validate the category
  categoriesController.updateCategory // Controller method to update the category
);

// Route to delete a category
router.delete(
  '/:id',
  auth('admin'), // Middleware to check if the user is authenticated and has the 'admin' role
  categoriesController.validateObjectId, // Middleware to validate the category ID
  categoriesController.deleteCategory // Controller method to delete the category
);

// Route to list all categories
router.get(
  '/',
  categoriesController.listCategories // Controller method to list all categories
);

module.exports = router;