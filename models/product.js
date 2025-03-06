// models/product.js
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    CategoryId: { // Explicitly define the foreign key
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  // Define associations
  Product.associate = models => {
    // Many-to-one relationship: Each product belongs to one category
    Product.belongsTo(models.Category, { foreignKey: 'CategoryId' }); // Explicitly define the foreign key
    // One-to-many relationship: Each product can have multiple order items
    Product.hasMany(models.OrderItem, { foreignKey: 'ProductId' });
    // One-to-many relationship: Each product can be in multiple carts
    Product.hasMany(models.Cart, { foreignKey: 'productId' }); 
  };

  return Product;
};