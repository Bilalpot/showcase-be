const { Sequelize } = require('sequelize');
const { DB_URL, isDevelopmentEnv, DB_NAME } = require('../../config');
const logger = require('../utils/logger');

const sequelize = new Sequelize(DB_URL, {
  logging: isDevelopmentEnv ? console.log : false,
});

const connectToDB = async () => {
  try {
    logger.info('Connecting to DB...');
    await sequelize.authenticate();
    logger.success(`Successfully connected to ${DB_NAME} DB...`);
  } catch (e) {
    logger.error('Cannot connect to the DB...');
  }
};

connectToDB().then(() => {});
module.exports = sequelize;
