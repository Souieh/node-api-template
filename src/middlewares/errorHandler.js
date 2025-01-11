// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack || err); // Log the error for debugging (optional)

  res.status(500).json({
    message: "Unknown error occurred, please try again",
  });
};

module.exports = errorHandler;
