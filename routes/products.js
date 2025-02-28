const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post(
  '/', 
  auth('admin'), 
  productsController.validateProduct, 
  productsController.createProduct
);

router.post(
  '/:id/upload', 
  auth('admin'), 
  upload.single('image'), 
  productsController.uploadImage
);

router.get(
  '/', 
  productsController.validateProductFilters, 
  productsController.getProducts
);

router.put(
  '/:id', 
  auth('admin'), 
  productsController.validateObjectId, 
  productsController.validateProduct, 
  productsController.updateProduct
);

router.delete(
  '/:id', 
  auth('admin'), 
  productsController.validateObjectId, 
  productsController.deleteProduct
);

module.exports = router;