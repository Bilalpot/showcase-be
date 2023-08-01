const { SERVER_ERROR, BAD_REQUEST, FORBIDDEN } = require('../utils/httpStatus');
const UserEducation = require('../models/userEducation');
const Institute = require('../models/institute');
const { addEducationValidator } = require('../joiValidations/educations');

const getInstitute = async (instituteName) => {
  let institute;
  if (instituteName) {
    institute = await Institute.findOne({ where: { name: instituteName } });
    if (!institute) {
      institute = await Institute.create({ name: instituteName });
    }
  } else {
    institute = await Institute.findByPk(value.instituteId);
  }
  return institute;
};

const addUserEducations = async (req, res, next) => {
  try {
    const { error, value } = addEducationValidator(req.body);
    if (error) {
      return next({ error: `${error.details[0].message}.`, code: BAD_REQUEST });
    }

    const { startYear, endYear, degree } = value;
    if (startYear > endYear) {
      return next({
        error: '"start year" is greater than "end year"',
        code: BAD_REQUEST,
      });
    }

    const institute = await getInstitute(value.institute);

    const userEducation = await UserEducation.findOne({
      where: {
        userId: req.user.id,
        instituteId: institute.id,
        startYear,
        endYear,
        degree,
      },
    });
    if (!userEducation) {
      await UserEducation.create({
        userId: req.user.id,
        instituteId: institute.id,
        startYear,
        endYear,
        degree,
      });
    }
    res.response({
      message: 'User education added successfully',
    });
    next();
  } catch (err) {
    console.log(err);
    next({ error: 'Internal Server Error', code: SERVER_ERROR });
  }
};

const updateUserEducations = async (req, res, next) => {
  try {
    const { educationId } = req.params;
    const userEducation = await UserEducation.findByPk(educationId);
    if (!userEducation || userEducation.userId !== req.user.id) {
      next({ error: 'Operation not allowed!', code: FORBIDDEN });
      return;
    }
    const { error, value } = addEducationValidator(req.body);
    if (error) {
      return next({ error: `${error.details[0].message}.`, code: BAD_REQUEST });
    }

    const { startYear, endYear, degree } = value;
    if (startYear > endYear) {
      return next({
        error: '"start year" is greater than "end year"',
        code: BAD_REQUEST,
      });
    }

    const institute = await getInstitute(value.institute);

    userEducation.set({
      degree,
      startYear,
      endYear,
      instituteId: institute.id,
    });
    await userEducation.save();
    res.response({
      message: 'User education updated successfully',
    });
    next();
  } catch (err) {
    console.log(err);
    next({ error: 'Internal Server Error', code: SERVER_ERROR });
  }
};

const getUserEducations = async (req, res, next) => {
  try {
    let educations = await UserEducation.findAll({
      include: {
        model: Institute,
        as: 'institute',
        nested: false,
        attributes: ['name'],
      },
      where: { userId: req.user.id },
    });
    educations = educations.map((education) => ({
      ...education.dataValues,
      institute: education.dataValues.institute.name,
    }));
    res.response({
      educations,
    });
    next();
  } catch (err) {
    console.log(err);
    next({ error: 'Internal Server Error', code: SERVER_ERROR });
  }
};

const deleteUserEducations = async (req, res, next) => {
  try {
    const { educationId } = req.params;
    const userEducation = await UserEducation.findByPk(educationId);
    if (!userEducation || userEducation.userId !== req.user.id) {
      next({ error: 'Operation not allowed!', code: FORBIDDEN });
      return;
    }
    await userEducation.destroy();
    res.response({
      message: 'User education deleted successfully!',
    });
    next();
  } catch (err) {
    console.log(err);
    next({ error: 'Internal Server Error', code: SERVER_ERROR });
  }
};

module.exports = {
  getUserEducations,
  addUserEducations,
  deleteUserEducations,
  updateUserEducations,
};
