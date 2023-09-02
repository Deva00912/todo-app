const express = require("express");
const {
  createUser,
  getAllUsers,
  checkUsernameAvailability,
} = require("../../Controllers/RegisterController/RegisterController.js");

const registerRouter = express.Router();

registerRouter.post("/create-user", createUser);
registerRouter.get("/get-user", getAllUsers);
registerRouter.post("/username-check", checkUsernameAvailability);

module.exports = { registerRouter };
