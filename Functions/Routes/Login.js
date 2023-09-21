const express = require("express");
const { validateLogin } = require("../Repository/Controllers.js");
const { validateSchema } = require("../ApiValidation/ApiValidator.js");

const identifyAuthError = (error) => {
  if (
    error.code === 11000 ||
    error.code === 5220 ||
    error.code === 5310 ||
    error.code === 5400 ||
    error.code === 5211 ||
    error.code === 5130 ||
    error.code === 5301
  ) {
    return { statusCode: 400, message: error.message };
  } else {
    return { statusCode: 500, message: error.message };
  }
};

const loginRouter = express.Router();

loginRouter.post(
  "/authUserAndLogin",
  validateSchema("loginUser"),
  async (req, res) => {
    try {
      const { username, password } = req.body;
      const response = await validateLogin(username, password);
      res
        .status(200)
        .json({ ...response, ackStatus: "completed" })
        .end();
    } catch (error) {
      const result = identifyAuthError(error);
      res
        .status(result.statusCode)
        .json({ message: result.message, ackStatus: "completed" })
        .end();
    }
  }
);

module.exports = {
  loginRouter,
};
