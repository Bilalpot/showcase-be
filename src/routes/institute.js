const router = require('express').Router();
const {
  afterMiddlewareLoader,
  responseSender,
} = require('../middlewares/response');
const { errorHandler } = require('../middlewares/error');
const { getInstitutes } = require('../controllers/institutes');
const { authSessionMiddleware } = require('../middlewares/auth');

router.get(
  '/',
  afterMiddlewareLoader,
  authSessionMiddleware,
  getInstitutes,
  errorHandler,
  responseSender
);

module.exports = router;
