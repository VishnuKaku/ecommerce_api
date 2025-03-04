require('dotenv').config();
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
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// Routes
app.use('/auth', routes.auth);
app.use('/products', routes.products);
app.use('/categories', routes.categories);
app.use('/orders', routes.orders);
app.use('/cart', cartRoutes);

// Database connection
sequelize.sync()
  .then(() => {
    console.log('Database connected');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch(err => console.error('Database connection failed:', err));