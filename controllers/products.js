const { body, param, query, validationResult } = require('express-validator');
const { Product, Category } = require('../models');
const cloudinary = require('../utils/cloudinary');
const { Op } = require('sequelize');
const multer = require('multer');

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validation chains
exports.validateProduct = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Invalid price'),
  body('stock').isInt({ gt: -1 }).withMessage('Invalid stock quantity'),
  body('categoryId').isInt().withMessage('Invalid category ID'),
  handleValidationErrors
];

exports.validateProductFilters = [
  query('minPrice').optional().isFloat({ gt: 0 }),
  query('maxPrice').optional().isFloat({ gt: 0 }),
  query('categoryId').optional().isInt(),
  query('page').optional().isInt({ gt: 0 }),
  query('limit').optional().isInt({ gt: 0 }),
  handleValidationErrors
];

exports.validateObjectId = [
  param('id').isInt().withMessage('Invalid product ID'),
  handleValidationErrors
];

// Controller methods
exports.createProduct = async (req, res) => {
    try {
      const { name, price, stock, categoryId } = req.body;
  
      // Validate categoryId if provided
      if (categoryId) {
        const category = await Category.findByPk(categoryId);
        if (!category) {
          return res.status(400).json({ error: 'Invalid category ID' });
        }
      }
  
      // Create the product with CategoryId
      const product = await Product.create({
        name,
        price,
        stock,
        CategoryId: categoryId // Maps to the model's "CategoryId" field
      });
  
      // Include the Category in the response
      const productWithCategory = await Product.findByPk(product.id, {
        include: Category
      });
  
      res.status(201).json(productWithCategory);
    } catch (error) {
      console.error('Error in createProduct:', error);
      res.status(500).json({ error: 'Product creation failed' });
    }
  };

exports.updateProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);
    if (isNaN(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const { name, price, stock, categoryId } = req.body;

    // Validate categoryId if provided
    if (categoryId) {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(400).json({ error: 'Invalid category ID' });
      }
    }

    await product.update({ name, price, stock, CategoryId: categoryId });
    res.json(product);
  } catch (error) {
    console.error('Error in updateProduct:', error); // Log the error
    res.status(500).json({ error: 'Product update failed' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);
    if (isNaN(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error in deleteProduct:', error); // Log the error
    res.status(500).json({ error: 'Product deletion failed' });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { minPrice, maxPrice, categoryId, search, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const where = {};

    if (minPrice) where.price = { [Op.gte]: Number(minPrice) };
    if (maxPrice) where.price = { ...where.price, [Op.lte]: Number(maxPrice) };
    if (categoryId) where.CategoryId = Number(categoryId); // Ensure this matches the column name
    if (search) where.name = { [Op.iLike]: `%${search}%` };

    const products = await Product.findAll({
      where,
      include: [{ model: Category, as: 'Category' }], // Ensure this matches the association
      limit: Number(limit),
      offset: Number(offset)
    });

    res.status(200).json(products);
  } catch (error) {
    console.error('Error in getProducts:', error); // Log the error
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    console.log('Request File:', req.file); // Log the uploaded file

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('Uploading file to Cloudinary...');
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log('Cloudinary Upload Result:', result);

    const productId = parseInt(req.params.id, 10);
    if (isNaN(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    console.log('Updating product with image URL...');
    await product.update({ imageUrl: result.secure_url });
    res.json(product);
  } catch (error) {
    console.error('Error in uploadImage:', error); // Log the full error
    res.status(500).json({ error: 'Image upload failed' });
  }
};