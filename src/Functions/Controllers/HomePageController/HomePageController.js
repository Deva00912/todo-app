const { default: mongoose } = require("mongoose");
const { Task } = require("../../Models/TaskModel");

const addTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      taskId: new mongoose.Types.ObjectId(),
    });
    res.status(200).json({ message: "Task Added!", data: task }).end();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const editTask = async (req, res) => {
  try {
    const { taskId, entry } = req.body;
    const updatedTask = await Task.findOneAndUpdate(
      { taskId: taskId },
      { entry: entry },
      { new: true }
    );
    res.status(200).send({ message: "Task edited", data: updatedTask });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    await Task.findOneAndDelete({ taskId: taskId });
    res.status(200).send({ message: "Task Deleted" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getUserTask = async (req, res) => {
  try {
    const userId = req.params.id;
    const userTasks = await Task.find({ userId: userId });
    if (!userTasks) {
      throw new Error("No tasks");
    }
    res.status(200).send({ message: "User Tasks", data: userTasks });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const clearUserTasks = async (req, res) => {
  try {
    const { userId } = req.body;
    const clearTasks = await Task.findByIdAndDelete(userId);
    // if (!clearTasks) {
    //   res.status(500).send({ message: "No tasks to Delete" });
    // }
    res.status(200).send({ message: "All Cleared" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  addTask,
  editTask,
  deleteTask,
  getUserTask,
  clearUserTasks,
};
