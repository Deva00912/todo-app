const {
  validateUsername,
  checkPasswordAndLogin,
  postCreateUser,
  getGetAllUsers,
  postIsUsernameExist,
  validate,
} = require("../Features/Auth");
const {
  addTaskFeature,
  updateTask,
  deleteTaskFeature,
  getUserTasksFeature,
} = require("../Features/Tasks");

const throwError = (message, name) => {
  const error = new Error(message);
  error.name = name;
  throw error;
};

const validateLogin = async (username, password) => {
  if (!validateUsername(username)) {
    throwError("Entered Username is invalid", "AuthError");
  }
  return await checkPasswordAndLogin(username, password);
};

const createUser = async (userData) => {
  if (!validate(userData)) {
    throwError("Enter details correctly", "AuthError");
  }
  return await postCreateUser(userData);
};

const getAllUsers = async () => {
  return await getGetAllUsers();
};

const isUsernameExist = async (username) => {
  if (!validateUsername(username)) {
    throwError("Invalid username", "AuthError");
  }

  return await postIsUsernameExist(username);
};

const addTask = async (task) => {
  return await addTaskFeature(task);
};

const editTask = async (taskId, entry) => {
  return await updateTask(taskId, entry);
};

const deleteTask = async (taskId) => {
  return await deleteTaskFeature(taskId);
};

const getUserTask = async (userId) => {
  return await getUserTasksFeature(userId);
};

module.exports = {
  createUser,
  getAllUsers,
  isUsernameExist,
  validateLogin,
  addTask,
  editTask,
  deleteTask,
  getUserTask,
};
