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
  
    OrderItem.associate = models => {
      OrderItem.belongsTo(models.Product, { foreignKey: 'ProductId' }); // Explicitly define the foreign key
      OrderItem.belongsTo(models.Order, { foreignKey: 'OrderId' }); 
    };
  
    return OrderItem;
  };