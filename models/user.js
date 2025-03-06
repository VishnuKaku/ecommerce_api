module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: { 
      type: DataTypes.STRING, 
      unique: true 
    },
    password: DataTypes.STRING,
    role: { 
      type: DataTypes.ENUM('admin', 'customer'),
      defaultValue: 'customer',
      allowNull: false
    }
  });

  return User;
};