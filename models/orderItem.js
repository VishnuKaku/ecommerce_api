// models/orderItem.js
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    OrderId: { // Explicitly define the foreign key
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ProductId: { // Explicitly define the foreign key
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  // Define associations
  OrderItem.associate = models => {
    // Many-to-one relationship: Each order item belongs to one product
    OrderItem.belongsTo(models.Product, { foreignKey: 'ProductId' }); // Explicitly define the foreign key
    // Many-to-one relationship: Each order item belongs to one order
    OrderItem.belongsTo(models.Order, { foreignKey: 'OrderId' }); 
  };

  return OrderItem;
};