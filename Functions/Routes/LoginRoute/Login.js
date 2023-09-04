const express = require("express");
const {
  logInUser,
} = require("../../Controllers/LoginController/LogInController");

const loginRouter = express.Router();

loginRouter.post("/check", logInUser);

module.exports = {
  loginRouter,
};
