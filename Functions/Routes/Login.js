const express = require("express");
const { validateLogin } = require("../Repository/Controllers.js");
const { validateSchema } = require("../ApiValidation/ApiValidator.js");

const identifyAuthError = (error) => {
  if (error.name === "AuthError") {
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
