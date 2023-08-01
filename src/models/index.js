const logger = require('../utils/logger');

logger.info('Initializing models...');
require('./user');
logger.success('Models initialized...');
