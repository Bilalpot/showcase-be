module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  isDevelopmentEnv: process.env.NODE_ENV === 'development',
  isProductionEnv: process.env.NODE_ENV === 'production',
  SERVER_PORT: process.env.PORT || 3000,

  DB_URL: process.env.DB_URL,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  ACCESS_TOKEN_PREFIX: 'Bearer',
};
