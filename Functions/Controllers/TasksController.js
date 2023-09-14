const {
  updateTask,
  deleteTaskFeature,
  getUserTasksFeature,
  addTaskFeature,
} = require("../Features/Tasks.js");

const addTask = async (task) => {
  const response = await addTaskFeature(task);
  return response;
};

const editTask = async (taskId, entry) => {
  const response = await updateTask(taskId, entry);
  return response;
};

const deleteTask = async (taskId) => {
  const response = await deleteTaskFeature(taskId);
  return response;
};

const getUserTask = async (userId) => {
  const response = await getUserTasksFeature(userId);
  return response;
};

module.exports = {
  addTask,
  editTask,
  deleteTask,
  getUserTask,
};
