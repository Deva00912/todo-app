const mongoose = require("mongoose");
const { Task } = require("./Models/TaskModel");

mongoose.set("bufferCommands", true);
const addTaskInDB = async (task) => {
  return await Task.create({
    ...task,
    taskId: new mongoose.Types.ObjectId(),
  });
};

const updateTaskInDB = async (taskId, entry) => {
  return await Task.findOneAndUpdate(
    { taskId: taskId },
    { entry: entry },
    { new: true }
  );
};

const deleteTaskInDB = async (taskId) => {
  return await Task.findOneAndDelete({ taskId: taskId });
};

const findTaskByTaskId = async (taskId) => {
  return await Task.findOne({ taskId: taskId });
};

const getUserTasksFromDB = async (userId) => {
  return await Task.find({ userId: userId });
};

module.exports = {
  addTaskInDB,
  updateTaskInDB,
  deleteTaskInDB,
  findTaskByTaskId,
  getUserTasksFromDB,
};
