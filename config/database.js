require('dotenv').config(); // Load environment variables from a .env file

require('sequelize'); // Import Sequelize ORM

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL', // Use the DATABASE_URL environment variable for the database connection
    dialect: 'postgres', // Specify the database dialect (PostgreSQL)
    logging: false // Disable logging of SQL queries
  },
  production: {
    use_env_variable: 'DATABASE_URL', // Use the DATABASE_URL environment variable for the database connection
    dialect: 'postgres', // Specify the database dialect (PostgreSQL)
    dialectOptions: {
      ssl: {
        require: true, // Require SSL for the database connection
        rejectUnauthorized: false // Disable rejection of unauthorized SSL certificates
      }
    }
  }
};