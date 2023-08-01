const { OK } = require('../utils/httpStatus');

const afterMiddlewareLoader = (req, res, next) => {
  res.response = function (responseData) {
    req.responseData = responseData;
  };
  next();
};

const responseSender = (req, res) => {
  res.status(OK).send({ error: null, statusCode: OK, data: req.responseData });
};

module.exports = {
  afterMiddlewareLoader,
  responseSender,
};
