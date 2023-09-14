const express = require("express");
const { validateLogin } = require("../Controllers/LogInController.js");

const loginRouter = express.Router();

loginRouter.post("/check", async (req, res) => {
  const { userName, password } = req.body;
  const response = await validateLogin(userName, password);
  res.status(response.statusCode).json(response).end();
});

module.exports = {
  loginRouter,
};
