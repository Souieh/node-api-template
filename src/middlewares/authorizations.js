const passport = require("../config/passportConfig.js");
const { getLogger } = require("../utils/consoleLoggerUtils.js");

export const verifyToken = async (req, res, next) => {
  try {
    passport.authenticate("jwt", { session: false }, (err, user, ops) => {
      if (!!err) {
        return res.status(403).json({ message: "Unauthorized" });
      } else if (!user) {
        return res.status(403).json({ message: "Unauthorized" });
      } else {
        req.user = { id: user._id, _id: user._id };
        next();
      }
    })(req, res);
  } catch (error) {
    getLogger("Error verifing token", "red")(error);
  }
};
