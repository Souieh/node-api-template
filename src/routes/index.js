const { BASE_NAME } = require("@/config/envConfig.js");
const authRouter = require("./authRouter.js");

const initRoutes = (app) => {
  app.use(BASE_NAME, authRouter);

  app.use(`${BASE_NAME}/*`, (req, res) => {
    res.status(404).json({
      error: "Not Found",
      message: "The requested resource does not exist.",
    });
  });
};

module.exports = initRoutes;
