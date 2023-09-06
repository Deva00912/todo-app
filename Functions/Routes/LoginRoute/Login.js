const express = require("express");
const { logInUser } = require("../../LoginController/LogInController.js");

const loginRouter = express.Router();

loginRouter.post("/check", logInUser);

module.exports = {
  loginRouter,
};
