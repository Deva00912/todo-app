/**
 * @module API
 */

const {
  validateUsername,
  checkPasswordAndLogin,
  putCreateUser,
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

/**
 * Throws an error with a custom name.
 *
 * @param {String} message - The error message.
 * @param {String} name - The custom error name.
 * @throws {TypeError} An error with the provided message and name.
 */
const throwError = (message, name) => {
  const error = new Error(message);
  error.name = name;
  throw error;
};

/**
 * Validates user login and returns user data.
 *
 * @param {String} username - The user's username.
 * @param {String} password - The user's password.
 * @throws {AuthError} Throws an AuthError if the entered username is invalid.
 * @returns {Object} An object containing a message and user data if login is successful.
 */
const validateLogin = async (username, password) => {
  if (!validateUsername(username)) {
    throwError("Entered Username is invalid", "AuthError");
  }
  return await checkPasswordAndLogin(username, password);
};

/**
 * Creates a new user with the provided user data.
 *
 * @param {Object} userData - User data including { username, firstName, lastName, password, confirmPassword }.
 * @throws {AuthError} Throws an AuthError if the entered details are not valid.
 * @returns {Object} An object containing a message and user data if the user creation is successful.
 */
const createUser = async (userData) => {
  if (!validate(userData)) {
    throwError("Enter details correctly", "AuthError");
  }
  return await putCreateUser(userData);
};

/**
 * Retrieves all existing users from the database.
 *
 * @returns {Object} An object containing a message and an array of user data.
 */
const getAllUsers = async () => {
  return await getGetAllUsers();
};

/**
 * Checks if a username already exists in the database.
 *
 * @param {String} username - The username to check.
 * @throws {AuthError} Throws an AuthError if the provided username is invalid.
 * @returns {Object} An object with a message and data indicating the availability of the username.
 */
const isUsernameExist = async (username) => {
  if (!validateUsername(username)) {
    throwError("Invalid username", "AuthError");
  }

  return await postIsUsernameExist(username);
};

/**
 * Adds a new task to the database.
 *
 * @param {Object} task - The task object to be added to the database.
 * @returns {Object} An object containing a message indicating success.
 */
const addTask = async (task) => {
  return await addTaskFeature(task);
};

/**
 * Updates a task in the database by task ID.
 *
 * @param {String} taskId - The ID of the task to be updated.
 * @param {String} entry - The new entry for the task.
 * @returns {Object} An object containing a message and updated task data if successful.
 */
const editTask = async (taskId, entry) => {
  return await updateTask(taskId, entry);
};

/**
 * Deletes a task from the database by task ID.
 *
 * @param {String} taskId - The ID of the task to be deleted.
 * @returns {Object} An object containing a message and data indicating success.
 */
const deleteTask = async (taskId) => {
  return await deleteTaskFeature(taskId);
};

/**
 * Retrieves all tasks of a user from the database.
 *
 * @param {String} userId - The ID of the user whose tasks are to be retrieved.
 * @returns {Object} An object containing a message and an array of task data.
 */
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
