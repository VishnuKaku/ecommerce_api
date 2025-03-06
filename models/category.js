module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    description: DataTypes.TEXT
  });

  // Define associations
  Category.associate = models => {
    // One-to-many relationship: Each category can have multiple products
    Category.hasMany(models.Product, { foreignKey: 'CategoryId' });
  };

  return Category;
};