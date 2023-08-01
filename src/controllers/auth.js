const argon2 = require('argon2');

const { loginValidator } = require('../joiValidations/auth');
const { BAD_REQUEST, SERVER_ERROR } = require('../utils/httpStatus');
const { signSessionToken } = require('../utils/jwt');
const User = require('../models/user');

const login = async (req, res, next) => {
  try {
    const { error, value } = loginValidator(req.body);
    if (error) {
      return next({ error: `${error.details[0].message}.`, code: BAD_REQUEST });
    }
    const { email, password } = value;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next({ error: 'Incorrect credentials!', code: BAD_REQUEST });
    }
    const isPasswordVerified = await argon2.verify(user.password, password);
    if (!isPasswordVerified) {
      return next({ error: 'Incorrect credentials!', code: BAD_REQUEST });
    }
    const accessToken = signSessionToken({ userId: user.id });
    res.response({
      userData: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      accessToken,
    });
    next();
  } catch (err) {
    console.log(err);
    next({ error: 'Internal Server Error', code: SERVER_ERROR });
  }
};

module.exports = {
  login,
};
