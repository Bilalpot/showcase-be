const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../config');

const signSessionToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET_KEY);
};

const decodeSessionToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET_KEY);
  } catch (e) {
    return null;
  }
};

module.exports = {
  signSessionToken,
  decodeSessionToken,
};
