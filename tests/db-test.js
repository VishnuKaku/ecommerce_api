require('dotenv').config();
const { sequelize } = require('../models');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection successful!');
    await sequelize.close();
  } catch (error) {
    console.error('❌ Connection failed:', error);
  }
})();