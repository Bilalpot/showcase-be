const { DataTypes } = require('sequelize');
const User = require('../user');
const Institute = require('../institute');

module.exports = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  instituteId: {
    type: DataTypes.INTEGER,
    references: {
      model: Institute,
      key: 'id',
    },
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  startYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1900,
    },
  },
  endYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1900,
    },
  },
  degree: {
    type: DataTypes.STRING(1024),
    allowNull: false,
  },
};
