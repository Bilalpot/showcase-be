const instituteSchema = require('./schema');
const sequelize = require('../../connections/db');
const { INSTITUTE } = require('../../utils/tables');

module.exports = sequelize.define('Institute', instituteSchema, {
  tableName: INSTITUTE,
});
