const userEducationSchema = require('./schema');
const sequelize = require('../../connections/db');
const { USER_EDUCATION } = require('../../utils/tables');
const User = require('../user');
const Institute = require('../institute');

const UserEducation = sequelize.define('UserEducation', userEducationSchema, {
  tableName: USER_EDUCATION,
  validate: {
    startYearLessThanEndYear() {
      if (this.startYear <= this.endYear) return;
      throw new Error('startYear is greater than endYear!');
    },
  },
});

User.belongsToMany(Institute, {
  through: UserEducation,
  foreignKey: 'userId',
});
Institute.belongsToMany(User, {
  through: UserEducation,
  foreignKey: 'instituteId',
});
UserEducation.belongsTo(Institute, {
  foreignKey: 'instituteId',
  as: 'institute',
});
module.exports = UserEducation;
