const { SERVER_ERROR } = require('../utils/httpStatus');
const Institute = require('../models/institute');

const getInstitutes = async (req, res, next) => {
  try {
    const institutes = await Institute.findAll();
    res.response({
      institutes,
    });
    next();
  } catch (err) {
    console.log(err);
    next({ error: 'Internal Server Error', code: SERVER_ERROR });
  }
};

module.exports = {
  getInstitutes,
};
