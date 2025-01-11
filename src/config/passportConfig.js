const passport = require("passport");
const { ExtractJwt, Strategy: JwtStrategy } = require("passport-jwt");
const { Strategy: LocalStrategy } = require("passport-local");
const envConfig = require("@/config/envConfig.js");
const { LoginCredentialsValidator } = require("@/utils/validator.js");
const userModel = require("@/models/userModels/userModel.js");

const {
  JWT_SECRET,
  MAX_LOGIN_ATTEMPTS,
  MIN_DELAY_BETWEEN_LOGIN_ATTEMPTS,
  LOGIN_BAN_DURATION,
  EXCESSIVE_LOGIN_THRESHOLD,
} = envConfig;

passport.use(
  "User",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const validationResult = LoginCredentialsValidator({
          username,
          password,
        });
        if (!validationResult.valid) {
          return done(null, false, {
            message: validationResult.message ?? "Uknown reason",
          });
        }
        const user = await userModel.findOne({ username });

        if (!user) {
          return done(null, false, { message: "You are not one of us" });
        }
        // Check if the user is banned from login
        const loginAttempts = await LoginHistory.find({ user: user._id })
          .sort({ timestamp: -1 })
          .limit(MAX_LOGIN_ATTEMPTS);

        // Check if the user is banned from login
        const lastLoginAttempt =
          loginAttempts.length > 0
            ? new Date(loginAttempts[0].timestamp).getTime()
            : 0;
        const failedLoginAttemptsWithoutSuccess = loginAttempts.filter(
          (a) => !a.success
        ).length;

        if (
          failedLoginAttemptsWithoutSuccess >= MAX_LOGIN_ATTEMPTS &&
          Date.now() - lastLoginAttempt < LOGIN_BAN_DURATION
        ) {
          return done(null, false, {
            message: `Account locked. Try again after ${
              parseFloat(LOGIN_BAN_DURATION) / (60 * 1000)
            } minutes you fucken idiot.`,
          });
        }

        const isValidPassword = await user.comparePassword(password);
        delete user.password;

        if (!isValidPassword) {
          return done(null, false, { message: "Ah ah ah incorrect password." });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET || "",
    },
    async (jwtPayload, done) => {
      try {
        const user = await userModel.findById(jwtPayload.id);
        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

module.exports = passport;
