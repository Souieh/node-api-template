require("module-alias/register.js");

const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const envConfig = require("./config/envConfig.js");
const connectDB = require("./config/mongodbConfig.js");
const passport = require("./config/passportConfig.js");
const initRoutes = require("./routes/index.js");
const getLogger = require("./utils/consoleLoggerUtils.js");
const errorHandler = require("./middlewares/errorHandler.js");

dotenv.config();

const { PORT, AUTH_SECRET_KEY } = envConfig;

const app = express();

connectDB();
// Middleware

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (envConfig.IS_PRODUCTION) {
      // In production, only allow the specified client URL
      if (origin === envConfig.CLIENT_URL || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    } else {
      // In development, allow all origins
      callback(null, true);
    }
  }, // Replace with your client URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow specific HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  credentials: true, // Allow credentials (cookies, HTTP authentication)
};

app.use(cors(corsOptions)); // Use CORS with options

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add session middleware
app.use(
  session({
    secret: AUTH_SECRET_KEY, // Replace with a secure random string
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport.js
app.use(passport.initialize());

// Global error handler (last middleware)
app.use(errorHandler);

// Initialize Routes
initRoutes(app);

// Start the server
app.listen(PORT, () => {
  getLogger(
    "Server started",
    "green"
  )(
    "You can access the api from http://localhost:" + PORT + envConfig.BASE_NAME
  );
});
