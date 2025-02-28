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
  
    Order.associate = models => {
      Order.belongsTo(models.User, { foreignKey: 'UserId' }); // Explicitly define the foreign key
      Order.hasMany(models.OrderItem, { foreignKey: 'OrderId' }); 
    };
  
    return Order;
  };