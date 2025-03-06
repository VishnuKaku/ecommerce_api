const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Middleware function to check user authentication and authorization
module.exports = (requiredRole) => {
  return async (req, res, next) => {
    try {
      console.log('Authorization Header:', req.headers.authorization);
      
      // Extract the token from the Authorization header
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        console.log('No token provided');
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded Token:', decoded);

      // Find the user by ID from the decoded token
      const user = await User.findByPk(decoded.id);
      console.log('Database User:', JSON.stringify(user, null, 2));

      // Check if the user exists and has the required role
      if (!user || user.role !== requiredRole) {
        console.log(`Role mismatch: Expected ${requiredRole}, Found ${user?.role}`);
        return res.status(403).json({ error: 'Forbidden' });
      }

      // Attach the user to the request object
      req.user = user;
      next();
    } catch (error) {
      console.error('Auth Middleware Error:', error);
      res.status(401).json({ error: 'Unauthorized' });
    }
  };
};