const { default: mongoose } = require("mongoose");
const { Task } = require("../Models/TaskModel.js");

const addTask = async (req, res) => {
  try {
    const task = req.body;
    if (!task) {
      throw new Error("Task cannot be empty");
    }
    if (!task.entry) {
      throw new Error("Task cannot be empty");
    }
    const createTask = await Task.create({
      ...task,
      taskId: new mongoose.Types.ObjectId(),
    });
    res
      .status(201)
      .json({ statusCode: 201, message: "Task Added!", data: createTask })
      .end();
  } catch (error) {
    res.status(400).send({ statusCode: 400, message: error.message, data: {} });
  }
};

const editTask = async (req, res) => {
  try {
    const { taskId, entry } = req.body;
    if (!taskId) {
      throw new Error("Task not found!");
    }
    if (!entry) {
      throw new Error("Task cannot be empty");
    }
    // eslint-disable-next-line
    const updatedTask = await Task.findOneAndUpdate(
      { taskId: taskId },
      { entry: entry },
      { new: true }
    );
    res.status(200).send({ statusCode: 200, message: "Task edited" });
  } catch (error) {
    res.status(400).send({ statusCode: 400, message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    if (!taskId) {
      throw new Error("Task not found!");
    }
    const findTaskByTaskId = await Task.findOne({ taskId: taskId });
    if (!findTaskByTaskId) {
      throw new Error("Task not found");
    }
    await Task.findOneAndDelete({ taskId: taskId });
    res.status(200).send({ statusCode: 200, message: "Task Deleted" }).end();
  } catch (error) {
    res.status(400).send({ statusCode: 400, message: error.message }).end();
  }
};

const getUserTask = async (req, res) => {
  try {
    const userId = req.params.id;
    const userTasks = await Task.find({ userId: userId });
    if (!userTasks) {
      throw new Error("No tasks");
    }
    res
      .status(200)
      .send({ statusCode: 200, message: "User Tasks", data: userTasks });
  } catch (error) {
    res.status(400).send({ statusCode: 400, message: error.message });
  }
};

const clearUserTasks = async (req, res) => {
  try {
    const { userId } = req.body;
    // eslint-disable-next-line
    const clearTasks = await Task.findByIdAndDelete(userId);
    res.status(204).send({ statusCode: 204, message: "All Cleared" });
  } catch (error) {
    res.status(400).send({ statusCode: 400, message: error.message });
  }
};

module.exports = {
  addTask,
  editTask,
  deleteTask,
  getUserTask,
  clearUserTasks,
};
