const { ACCESS_TOKEN_PREFIX } = require('../../config');
const { UN_AUTHORIZED } = require('../utils/httpStatus');
const { decodeSessionToken } = require('../utils/jwt');
const User = require('../models/user');

const authSessionMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next({
      code: UN_AUTHORIZED,
      error: 'Authorization token is not provided.',
    });
  }
  const headerParts = authHeader.split(' ');
  if (headerParts.length !== 2) {
    return next({
      code: UN_AUTHORIZED,
      error: 'Authorization header is not valid.',
    });
  }
  if (headerParts[0] !== ACCESS_TOKEN_PREFIX) {
    return next({
      code: UN_AUTHORIZED,
      error: 'Authorization token type is not valid.',
    });
  }
  const authToken = headerParts[1];
  const payload = decodeSessionToken(authToken);
  if (!payload) {
    return next({
      code: UN_AUTHORIZED,
      error: 'Authorization token is not valid.',
    });
  }
  const { userId } = payload;
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    return next({
      code: UN_AUTHORIZED,
      error: 'Authorization token is not valid.',
    });
  }
  req.user = user;
  next();
};

module.exports = {
  authSessionMiddleware,
};
