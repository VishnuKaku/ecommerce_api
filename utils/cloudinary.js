// utils/cloudinary.js
const cloudinary = require('cloudinary').v2; // Import Cloudinary module and use the v2 API

// Configure Cloudinary with environment variables
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, // Cloudinary cloud name
  api_key: process.env.API_KEY, // Cloudinary API key
  api_secret: process.env.API_SECRET // Cloudinary API secret
});

module.exports = cloudinary; // Export the configured Cloudinary instance