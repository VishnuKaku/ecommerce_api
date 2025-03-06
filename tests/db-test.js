require('dotenv').config(); // Load environment variables from a .env file
const { sequelize } = require('../models'); // Import the Sequelize instance from the models

(async () => {
  try {
    await sequelize.authenticate(); // Authenticate the database connection
    console.log('✅ Database connection successful!');
    await sequelize.close(); // Close the database connection
  } catch (error) {
    console.error('❌ Connection failed:', error); // Log any connection errors
  }
})();