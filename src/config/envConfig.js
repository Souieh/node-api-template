const { config } = require("dotenv");
const path = require("path");
const { fileURLToPath } = require("url");

// Emulate __dirname
const envPath = path.join(__dirname, "..", "..", ".env.developement");

if (process.env.NODE_ENV === "production") {
  config({ path: path.join(__dirname, "..", "..", ".env.production") });
} else {
  config({ path: envPath });
}

module.exports = {
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  PORT: process.env.PORT,
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
  JWT_SECRET: process.env.JWT_SECRET,
  AUTH_SECRET_KEY: process.env.AUTH_SECRET_KEY,
  MAX_LOGIN_ATTEMPTS: process.env.MAX_LOGIN_ATTEMPTS,
  MIN_DELAY_BETWEEN_LOGIN_ATTEMPTS:
    process.env.MIN_DELAY_BETWEEN_LOGIN_ATTEMPTS,
  LOGIN_BAN_DURATION: process.env.LOGIN_BAN_DURATION,
  EXCESSIVE_LOGIN_THRESHOLD: process.env.EXCESSIVE_LOGIN_THRESHOLD,
  BASE_NAME: process.env.BASE_NAME,
  CLIENT_URL: process.env.CLIENT_URL,
};
