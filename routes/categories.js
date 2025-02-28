const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories');
const auth = require('../middleware/auth');

router.post(
  '/',
  auth('admin'),
  categoriesController.validateCategory,
  categoriesController.createCategory
);

router.put(
  '/:id',
  auth('admin'),
  categoriesController.validateObjectId,
  categoriesController.validateCategory,
  categoriesController.updateCategory
);

router.delete(
  '/:id',
  auth('admin'),
  categoriesController.validateObjectId,
  categoriesController.deleteCategory
);

router.get(
  '/',
  categoriesController.listCategories
);

module.exports = router;