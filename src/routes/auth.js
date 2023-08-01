const router = require('express').Router();
const {
  afterMiddlewareLoader,
  responseSender,
} = require('../middlewares/response');
const { errorHandler } = require('../middlewares/error');
const { login } = require('../controllers/auth');

router.post(
  '/login',
  afterMiddlewareLoader,
  login,
  errorHandler,
  responseSender
);

module.exports = router;
