// models/order.js
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    status: {
      type: DataTypes.ENUM('pending', 'completed'),
      defaultValue: 'pending'
    },
    UserId: { // Explicitly define the foreign key
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  // Define associations
  Order.associate = models => {
    // Many-to-one relationship: Each order belongs to one user
    Order.belongsTo(models.User, { foreignKey: 'UserId' }); // Explicitly define the foreign key
    // One-to-many relationship: Each order can have multiple order items
    Order.hasMany(models.OrderItem, { foreignKey: 'OrderId' });
  };

  return Order;
};