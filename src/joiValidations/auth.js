const Joi = require('joi');
const { emailRegex } = require('../utils');

const loginValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().pattern(emailRegex).not().empty().messages({
      'string.pattern.base': '"email" is not valid',
    }),
    password: Joi.string().required().not().empty(),
  });
  return schema.validate(data);
};

module.exports = { loginValidator };
