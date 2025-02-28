module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
      name: { type: DataTypes.STRING, allowNull: false },
      description: DataTypes.TEXT
    });
  
    Category.associate = models => {
      Category.hasMany(models.Product, { foreignKey: 'CategoryId' });
    };
  
    return Category;
  };