require('dotenv').config(); // Load environment variables from a .env file
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const routes = require('./routes');
const cartRoutes = require('./routes/cart');
const { sequelize } = require('./models/index');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

// Middleware
app.use(helmet()); // Security middleware to set various HTTP headers
app.use(cors()); // Middleware to enable Cross-Origin Resource Sharing
app.use(express.json()); // Middleware to parse JSON request bodies
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc)); // Serve API documentation using Swagger

// Routes
app.use('/auth', routes.auth); // Authentication routes
app.use('/products', routes.products); // Product routes
app.use('/categories', routes.categories); // Category routes
app.use('/orders', routes.orders); // Order routes
app.use('/cart', cartRoutes); // Cart routes

// Database connection
sequelize.sync()
  .then(() => {
    console.log('Database connected');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch(err => console.error('Database connection failed:', err));