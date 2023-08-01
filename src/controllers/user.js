const argon2 = require('argon2');

const { createUserValidator } = require('../joiValidations/user');
const { BAD_REQUEST, SERVER_ERROR } = require('../utils/httpStatus');
const User = require('../models/user');

const createUser = async (req, res, next) => {
  try {
    const { error, value } = createUserValidator(req.body);
    if (error) {
      return next({ error: `${error.details[0].message}.`, code: BAD_REQUEST });
    }
    const { email, password, fullName } = value;
    const checkUser = await User.findOne({ where: { email } });
    if (checkUser) {
      return next({
        error: 'User already exists with this email.',
        code: BAD_REQUEST,
      });
    }

    const hashedPassword = await argon2.hash(password);
    await User.create({
      email,
      fullName,
      password: hashedPassword,
    });

    res.response({
      message: 'User is created successfully.',
    });
    next();
  } catch (e) {
    console.log(e);
    next({
      code: SERVER_ERROR,
      error: 'Internal Server Error!',
    });
  }
};

const getMyData = async (req, res, next) => {
  res.response({
    user: {
      id: req.user.id,
      email: req.user.email,
      fullName: req.user.fullName,
    },
  });
  next();
};

module.exports = {
  createUser,
  getMyData,
};
