/**
 * @module API
 */

const {
  validateUserEmail,
  checkPasswordAndLogin,
  putCreateUser,
  getGetAllUsers,
  postIsUserEmailExists,
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
 * @param {String} email - The user's email.
 * @param {String} password - The user's password.
 * @throws {AuthError} Throws an AuthError if the entered email is invalid.
 * @returns {Object} An object containing a message and user data if login is successful.
 */
const validateLogin = async (email, password) => {
  if (!validateUserEmail(email)) {
    throwError("Entered email is invalid", "AuthError");
  }
  return await checkPasswordAndLogin(email, password);
};

/**
 * Creates a new user with the provided user data.
 *
 * @param {Object} userData - User data including { email, firstName, lastName, password, confirmPassword }.
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
 * Checks if a email already exists in the database.
 *
 * @param {String} email - The email to check.
 * @throws {AuthError} Throws an AuthError if the provided email is invalid.
 * @returns {Object} An object with a message and data indicating the availability of the email.
 */
const isUsernameExist = async (email) => {
  if (!validateUserEmail(email)) {
    throwError("Invalid email", "AuthError");
  }

  return await postIsUserEmailExists(email);
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
 * @param {String} email - The ID of the user whose tasks are to be retrieved.
 * @returns {Object} An object containing a message and an array of task data.
 */
const getUserTask = async (email) => {
  return await getUserTasksFeature(email);
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
