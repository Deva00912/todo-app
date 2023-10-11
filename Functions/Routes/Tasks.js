const express = require("express");
const jwtAuth = require("../ApiValidation/Auth/authJwt.js");
const { addTask } = require("../Repository/Controllers.js");
const { editTask } = require("../Repository/Controllers.js");
const { deleteTask } = require("../Repository/Controllers.js");
const { getUserTask } = require("../Repository/Controllers.js");
const { validateSchema } = require("../ApiValidation/ApiValidator.js");

const identifyTasksErrors = (error) => {
  if (error.name === "TaskError") {
    return { statusCode: 400, message: error.message };
  } else {
    return { statusCode: 500, message: error.message };
  }
};

const tasksRouter = express.Router();

tasksRouter.put(
  "/addTask",
  validateSchema("newTasks"),
  jwtAuth,
  async (req, res) => {
    try {
      console.log("req.user", req.user);
      const task = req.body;
      const response = await addTask(task);
      res
        .status(201)
        .json({ ...response, ackStatus: "completed" })
        .end();
    } catch (error) {
      const result = identifyTasksErrors(error);
      res
        .status(result.statusCode)
        .json({ message: result.message, ackStatus: "completed" })
        .end();
    }
  }
);

tasksRouter.patch(
  "/editTask",
  validateSchema("editTask"),
  jwtAuth,
  async (req, res) => {
    try {
      const { taskId, entry } = req.body;
      const response = await editTask(taskId, entry);
      res
        .status(200)
        .json({ ...response, ackStatus: "completed" })
        .end();
    } catch (error) {
      const result = identifyTasksErrors(error);
      res
        .status(result.statusCode)
        .json({ message: result.message, ackStatus: "completed" })
        .end();
    }
  }
);

tasksRouter.delete("/deleteTask/:id", jwtAuth, async (req, res) => {
  try {
    const taskId = req.params.id;
    const response = await deleteTask(taskId);
    res
      .status(200)
      .json({ ...response, ackStatus: "completed" })
      .end();
  } catch (error) {
    const result = identifyTasksErrors(error);
    res
      .status(result.statusCode)
      .json({ message: result.message, ackStatus: "completed" })
      .end();
  }
});

tasksRouter.get("/findUserTasks/:id", jwtAuth, async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await getUserTask(userId);
    res
      .status(200)
      .json({ ...response, ackStatus: "completed" })
      .end();
  } catch (error) {
    const result = identifyTasksErrors(error);
    res
      .status(result.statusCode)
      .json({ message: result.message, ackStatus: "completed" })
      .end();
  }
});

module.exports = {
  tasksRouter,
};
