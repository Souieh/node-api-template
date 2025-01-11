// src/controllers/authController.ts
const jwt = require("jsonwebtoken");
const passport = require("../config/passportConfig.js");
const getLogger = require("../utils/consoleLoggerUtils.js");
const { SignUpCredentialsValidator } = require("@/utils/validator.js");
const userModel = require("@/models/userModels/userModel.js");
const picker = require("@/utils/picker.js");

class AuthController {
  static login = async (req, res, next) => {
    passport.authenticate("User", { session: true }, (err, user, ops) => {
      try {
        if (err || !user) {
          return res.status(401).json({
            message: ops?.message ?? "Hmmm, Authentication failed",
          });
        }

        req.login(user, { session: false }, async (loginErr) => {
          if (loginErr) {
            return next(loginErr);
          }

          const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET || "",
            {
              expiresIn: "1h",
            }
          );
          const auth = {
            uid: user._id,
            token,
            username: user.username,
            _id: user._id,
          };
          return res.json(auth);
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  };

  static logOut = (req, res) => {
    req.logout(function (err) {
      if (err) {
        // Handle error
        getLogger("Error loggin out ", "red")(err);
        return res.status(500).json({ success: false, error: err });
      }
      // Logout successful
      return res.json({ success: true });
    });
  };
  static checkAuthState = async (req, res, next) => {
    res.json({ authenticated: req.isAuthenticated() });
  };

  static register = async (req, res, next) => {
    try {
      const userCredentials = picker(req.body, [
        "name",
        "userType",
        "username",
        "password",
      ]);

      let validationResult = SignUpCredentialsValidator(userCredentials);

      if (!validationResult.valid) {
        return res.status(400).json({
          message: validationResult.message ?? "Uknown reason",
        });
      }
      const userExists = await userModel.exists({
        username: userCredentials.username,
      });
      if (userExists) {
        return res.status(400).json({
          message: "User already exists",
        });
      }
      const newUser = new userModel(userCredentials);
      await newUser.save();

      next();
    } catch (error) {
      getLogger("Error register", "red")(error);
      res.status(400).json({ message: "Uknown error" });
    }
  };
}

module.exports = AuthController;
