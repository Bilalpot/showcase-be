const router = require('express').Router();

const { OK } = require('../utils/httpStatus');

const userRouter = require('./user');
const authRouter = require('./auth');
const instituteRouter = require('./institute');
const educationRouter = require('./education');

router.get('/check-health', (req, res) => {
  res.status(OK).json({ healthStatus: 'OK' });
});

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/institutes', instituteRouter);
router.use('/educations', educationRouter);

module.exports = router;
