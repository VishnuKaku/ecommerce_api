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
  
    Product.associate = models => {
      Product.belongsTo(models.Category, { foreignKey: 'CategoryId' }); // Explicitly define the foreign key
      Product.hasMany(models.OrderItem, { foreignKey: 'ProductId' });
      Product.hasMany(models.Cart, { foreignKey: 'productId' }); 
    };
  
    return Product;
  };