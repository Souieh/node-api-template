// config/dbConfig.ts
const mongoose = require("mongoose");
const envConfig = require("./envConfig.js");
const getLogger = require("@/utils/consoleLoggerUtils.js");

module.exports = async function connectDB() {
  try {
    await mongoose.connect(envConfig.DB_CONNECTION_STRING);
    getLogger(
      "Connected to MongoDB",
      "green"
    )("Connection string: " + envConfig.DB_CONNECTION_STRING);
  } catch (error) {
    getLogger(
      "Connected to MongoDB",
      "red"
    )("The Error : \n" + JSON.stringify(error, null, 2));
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};
