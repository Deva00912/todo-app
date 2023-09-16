const mongoose = require("mongoose");
const { Task } = require("./Models/TaskModel");

mongoose.set("bufferCommands", true);
const addTaskInDB = async (task) => {
  const response = await Task.create({
    ...task,
    taskId: new mongoose.Types.ObjectId(),
  });
  return response;
};

const updateTaskInDB = async (taskId, entry) => {
  const response = await Task.findOneAndUpdate(
    { taskId: taskId },
    { entry: entry },
    { new: true }
  );
  return response;
};

const deleteTaskInDB = async (taskId) => {
  const response = await Task.findOneAndDelete({ taskId: taskId });
  return response;
};

const findTaskByTaskId = async (taskId) => {
  const response = await Task.findOne({ taskId: taskId });
  return response;
};

const getUserTasksFromDB = async (userId) => {
  const response = await Task.find({ userId: userId });
  return response;
};

module.exports = {
  addTaskInDB,
  updateTaskInDB,
  deleteTaskInDB,
  findTaskByTaskId,
  getUserTasksFromDB,
};
