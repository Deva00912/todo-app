const express = require("express");
const { validateLogin } = require("../Repository/Controllers.js");

const loginRouter = express.Router();

loginRouter.post("/check", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const response = await validateLogin(userName, password);
    res.status(200).json(response).end();
  } catch (error) {
    if (
      error.code === 11000 ||
      error.code === 5220 ||
      error.code === 5310 ||
      error.code === 5400 ||
      error.code === 5211 ||
      error.code === 5130 ||
      error.code === 5301
    ) {
      res.status(400).json({ message: error.message }).end();
    } else {
      res.status(500).json({ message: error.message }).end();
    }
  }
});

module.exports = {
  loginRouter,
};
