const express = require("express");
const { createUser } = require("../Repository/Controllers.js");
const { getAllUsers } = require("../Repository/Controllers.js");
const { isUsernameExist } = require("../Repository/Controllers.js");

const registerRouter = express.Router();

registerRouter.post("/create-user", async (req, res) => {
  try {
    const { userName, password, firstName, lastName, confirmPassword } =
      req.body;

    const response = await createUser({
      userName,
      password,
      confirmPassword,
      firstName,
      lastName,
    });

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

registerRouter.get("/get-user", async (req, res) => {
  try {
    const response = await getAllUsers();
    res.status(200).json(response).end();
  } catch (error) {
    res.status(500).json(error.message).end();
  }
});

registerRouter.post("/username-check", async (req, res) => {
  try {
    const { userName } = req.body;
    const response = await isUsernameExist(userName);
    res.status(response.statusCode).json(response).end();
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

module.exports = { registerRouter };
