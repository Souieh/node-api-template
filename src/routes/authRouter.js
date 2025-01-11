const AuthController = require("@/controllers/authController");
const { initializeRoutes } = require("@/utils/routeUtils");
const express = require("express");
//const AuthController = require("../controllers/authController");;

const authRouter = express.Router();

const routes = [
  {
    path: "/login",
    methodType: "post",
    controllers: [AuthController.login],
  },
  {
    path: "/register",
    methodType: "post",
    controllers: [AuthController.register, AuthController.login],
  },
  {
    path: "/logout",
    methodType: "post",
    controllers: [AuthController.logOut],
  },
  {
    path: "/authstate",
    methodType: "post",
    controllers: [AuthController.checkAuthState],
  },
];

initializeRoutes(authRouter, routes, "/auth");

module.exports = authRouter;
