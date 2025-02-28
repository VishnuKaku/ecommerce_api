// models/cart.js
module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      priceAtAddition: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    });
  
    Cart.associate = models => {
      Cart.belongsTo(models.User, { foreignKey: 'userId' });
      Cart.belongsTo(models.Product, { foreignKey: 'productId' });
    };
  
    return Cart;
  };