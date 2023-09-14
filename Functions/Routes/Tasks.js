const express = require("express");
const {
  addTask,
  editTask,
  deleteTask,
  getUserTask,
} = require("../Controllers/TasksController");

const tasksRouter = express.Router();

tasksRouter.post("/add", async (req, res) => {
  const task = req.body;
  const response = await addTask(task);
  res.status(response.statusCode).json(response).end();
});

tasksRouter.patch("/edit", async (req, res) => {
  const { taskId, entry } = req.body;
  const response = await editTask(taskId, entry);
  res.status(response.statusCode).json(response).end();
});

tasksRouter.delete("/delete/:id", async (req, res) => {
  const taskId = req.params.id;
  const response = await deleteTask(taskId);
  res.status(response.statusCode).json(response).end();
});

tasksRouter.get("/find/:id", async (req, res) => {
  const userId = req.params.id;
  const response = await getUserTask(userId);
  res.status(response.statusCode).json(response).end();
});

module.exports = {
  tasksRouter,
};
