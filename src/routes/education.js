const router = require('express').Router();
const {
  afterMiddlewareLoader,
  responseSender,
} = require('../middlewares/response');
const { errorHandler } = require('../middlewares/error');
const {
  getUserEducations,
  addUserEducations,
  deleteUserEducations,
  updateUserEducations,
} = require('../controllers/education');
const { authSessionMiddleware } = require('../middlewares/auth');

router.get(
  '/',
  afterMiddlewareLoader,
  authSessionMiddleware,
  getUserEducations,
  errorHandler,
  responseSender
);

router.post(
  '/',
  afterMiddlewareLoader,
  authSessionMiddleware,
  addUserEducations,
  errorHandler,
  responseSender
);

router.delete(
  '/:educationId',
  afterMiddlewareLoader,
  authSessionMiddleware,
  deleteUserEducations,
  errorHandler,
  responseSender
);

router.put(
  '/:educationId',
  afterMiddlewareLoader,
  authSessionMiddleware,
  updateUserEducations,
  errorHandler,
  responseSender
);

module.exports = router;
