const { db } = require("./Utils/admin");

const tasksDB = db.collection("Tasks");

const addTaskFDB = async (task) => {
  return await tasksDB.add(task);
};

const updateTaskFDB = async (task) => {
  return await tasksDB.doc(task.taskId).update({
    entry: task.entry,
  });
};

const deleteTaskFDB = async (taskId) => {
  return await tasksDB.doc(taskId).delete();
};

const getUserTasksFDB = async (email) => {
  return await tasksDB.where("email", "==", email).get();
};

const getTasksByTaskIdFDB = async (taskId) => {
  return await tasksDB.doc(taskId).get();
};

module.exports = {
  addTaskFDB,
  updateTaskFDB,
  deleteTaskFDB,
  getUserTasksFDB,
  getTasksByTaskIdFDB,
};
