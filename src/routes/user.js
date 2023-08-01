const router = require('express').Router();
const {
  afterMiddlewareLoader,
  responseSender,
} = require('../middlewares/response');
const { errorHandler } = require('../middlewares/error');
const { createUser, getMyData } = require('../controllers/user');
const { authSessionMiddleware } = require('../middlewares/auth');

router.post(
  '/signup',
  afterMiddlewareLoader,
  createUser,
  errorHandler,
  responseSender
);

router.get(
  '/me',
  afterMiddlewareLoader,
  authSessionMiddleware,
  getMyData,
  errorHandler,
  responseSender
);

module.exports = router;
