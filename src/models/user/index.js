const userSchema = require('./schema');
const sequelize = require('../../connections/db');
const { USER } = require('../../utils/tables');

module.exports = sequelize.define('User', userSchema, { tableName: USER });
