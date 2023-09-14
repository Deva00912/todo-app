const express = require("express");
const {
  createUser,
  getAllUsers,
  isUsernameExist,
} = require("../Controllers/RegisterController.js");

const registerRouter = express.Router();

registerRouter.post("/create-user", async (req, res) => {
  const { userName, password, firstName, lastName, confirmPassword } = req.body;

  const response = await createUser({
    userName,
    password,
    confirmPassword,
    firstName,
    lastName,
  });

  res.status(response.statusCode).json(response).end();
});

registerRouter.get("/get-user", async (req, res) => {
  const response = await getAllUsers();
  res.status(response.statusCode).json(response).end();
});

registerRouter.post("/username-check", async (req, res) => {
  const { userName } = req.body;
  const response = await isUsernameExist(userName);
  res.status(response.statusCode).json(response).end();
});

module.exports = { registerRouter };
