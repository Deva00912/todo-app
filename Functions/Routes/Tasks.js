const express = require("express");
const { addTask } = require("../Repository/Controllers.js");
const { editTask } = require("../Repository/Controllers.js");
const { deleteTask } = require("../Repository/Controllers.js");
const { getUserTask } = require("../Repository/Controllers.js");

const tasksRouter = express.Router();

tasksRouter.post("/add", async (req, res) => {
  try {
    const task = req.body;
    const response = await addTask(task);
    res.status(200).json(response).end();
  } catch (error) {
    if (
      error.code === 3330 ||
      error.code === 3321 ||
      error.code === 3402 ||
      error.code === 3600
    ) {
      res.status(400).json({ message: error.message }).end();
    } else {
      res.status(500).json({ message: error.message }).end();
    }
  }
});

tasksRouter.patch("/edit", async (req, res) => {
  try {
    const { taskId, entry } = req.body;
    const response = await editTask(taskId, entry);
    res.status(200).json(response).end();
  } catch (error) {
    if (
      error.code === 3330 ||
      error.code === 3321 ||
      error.code === 3402 ||
      error.code === 3600
    ) {
      res.status(400).json({ message: error.message }).end();
    } else {
      res.status(500).json({ message: error.message }).end();
    }
  }
});

tasksRouter.delete("/delete/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const response = await deleteTask(taskId);
    res.status(200).json(response).end();
  } catch (error) {
    if (
      error.code === 3330 ||
      error.code === 3321 ||
      error.code === 3402 ||
      error.code === 3600
    ) {
      res.status(400).json({ message: error.message }).end();
    } else {
      res.status(500).json({ message: error.message }).end();
    }
  }
});

tasksRouter.get("/find/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await getUserTask(userId);
    res.status(200).json(response).end();
  } catch (error) {
    if (
      error.code === 3330 ||
      error.code === 3321 ||
      error.code === 3402 ||
      error.code === 3600
    ) {
      res.status(400).json({ message: error.message }).end();
    } else {
      res.status(500).json({ message: error.message }).end();
    }
  }
});

module.exports = {
  tasksRouter,
};
