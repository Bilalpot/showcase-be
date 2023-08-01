const Joi = require('joi');

const addEducationValidator = (data) => {
  const schema = Joi.object({
    institute: Joi.string().required().max(2048).not().empty(),
    startYear: Joi.number().required().min(1900).not().empty(),
    endYear: Joi.number().required().min(1900).not().empty(),
    degree: Joi.string().required().max(1024).not().empty(),
  });
  return schema.validate(data);
};

module.exports = {
  addEducationValidator,
};
