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

  // Define associations
  Cart.associate = models => {
    // Many-to-one relationship: Each cart item belongs to one user
    Cart.belongsTo(models.User, { foreignKey: 'userId' });
    // Many-to-one relationship: Each cart item belongs to one product
    Cart.belongsTo(models.Product, { foreignKey: 'productId' });
  };

  return Cart;
};