const Joi = require('joi');
const { emailRegex } = require('../utils');

const createUserValidator = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().required().max(1024).not().empty(),
    email: Joi.string()
      .required()
      .pattern(emailRegex)
      .max(128)
      .not()
      .empty()
      .messages({
        'string.pattern.base': '"email" is not valid',
      }),
    password: Joi.string().required().not().empty(),
  });
  return schema.validate(data);
};

module.exports = {
  createUserValidator,
};
