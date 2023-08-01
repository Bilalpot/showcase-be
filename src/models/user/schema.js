const { DataTypes } = require('sequelize');
const { emailRegex } = require('../../utils');

module.exports = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { is: emailRegex },
  },
  password: {
    type: DataTypes.STRING(2048),
    allowNull: false,
  },
};
