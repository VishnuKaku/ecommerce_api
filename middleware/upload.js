const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Configure Multer with Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ecommerce', // Folder name in Cloudinary where images will be stored
    allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed image formats
    transformation: [{ width: 500, height: 500, crop: 'limit' }] // Image transformation settings
  }
});

// Initialize Multer with the configured Cloudinary storage
const upload = multer({ storage: storage });

module.exports = upload;