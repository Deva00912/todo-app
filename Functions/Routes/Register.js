const express = require("express");
const { createUser } = require("../Repository/Controllers.js");
const { getAllUsers } = require("../Repository/Controllers.js");
const { isUsernameExist } = require("../Repository/Controllers.js");
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
    if (error.code === 11000) {
      return { statusCode: 400, message: "User already exists" };
    }
    return { statusCode: 400, message: error.message };
  } else {
    return { statusCode: 500, message: error.message };
  }
};

const registerRouter = express.Router();

registerRouter.put(
  "/createUser",
  validateSchema("registerUser"),
  async (req, res) => {
    try {
      const { username, password, firstName, lastName, confirmPassword } =
        req.body;

      const response = await createUser({
        username,
        password,
        confirmPassword,
        firstName,
        lastName,
      });

      return res
        .status(201)
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

registerRouter.get("/getUsers", async (req, res) => {
  try {
    const response = await getAllUsers();
    res
      .status(200)
      .json({ ...response, ackStatus: "completed" })
      .end();
  } catch (error) {
    res.status(500).json(error.message).end();
  }
});

registerRouter.post(
  "/isUsernameExists",
  validateSchema("isUsernameAvailable"),
  async (req, res) => {
    try {
      const { username } = req.body;
      const response = await isUsernameExist(username);
      const statusCode =
        response.message === "Username is available" ? 200 : 400;
      res
        .status(statusCode)
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

module.exports = { registerRouter };
