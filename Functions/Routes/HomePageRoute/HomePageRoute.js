const express = require("express");
const {
  addTask,
  editTask,
  deleteTask,
  getUserTask,
  clearUserTasks,
} = require("../../Controllers/HomePageController/HomePageController");

const homePageRouter = express.Router();

homePageRouter.post("/add", addTask);

homePageRouter.patch("/edit", editTask);

homePageRouter.delete("/delete/:id", deleteTask);

homePageRouter.delete("/clear", clearUserTasks);

homePageRouter.get("/find/:id", getUserTask);

module.exports = {
  homePageRouter,
};
