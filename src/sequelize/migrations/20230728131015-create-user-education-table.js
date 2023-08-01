'use strict';

const { USER_EDUCATION, USER, INSTITUTE } = require('../../utils/tables');
const { DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable(USER_EDUCATION, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: USER,
          key: 'id',
        },
        allowNull: false,
      },
      instituteId: {
        type: DataTypes.INTEGER,
        references: {
          model: INSTITUTE,
          key: 'id',
        },
        allowNull: false,
      },
      degree: {
        type: Sequelize.DataTypes.STRING(2048),
        allowNull: false,
      },
      startYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      endYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable(USER_EDUCATION);
  },
};
