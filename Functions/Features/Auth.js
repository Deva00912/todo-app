/**
 * @module Authentication
 */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { regex } = require("../Services/Utils/Constants");
const {
  createUserInDB,
  getAllUsersFromDB,
  getUserFromDB,
} = require("../Services/MongoDB/UserServices");

/**
 * Validates user-entered details.
 *
 * @param {Object} userData - User data including username, firstName, lastName, password, and confirmPassword.
 * @returns {boolean} - `true` if the entered details are valid, otherwise `false`.
 */
const validate = (userData) => {
  return userData.username &&
    userData.firstName &&
    userData.lastName &&
    userData.confirmPassword &&
    userData.password &&
    userData.password === userData.confirmPassword &&
    regex.username.test(userData.username) &&
    regex.password.test(userData.password) &&
    regex.text.test(userData.firstName) &&
    regex.text.test(userData.lastName)
    ? true
    : false;
};

/**
 * @param {string} username - The username to validate.
 * @returns {boolean} - `true` if the entered username is valid, otherwise `false`.
 */
const validateUsername = (username) => {
  return regex?.username.test(username) ? true : false;
};

/**
 * Throws an authentication error.
 *
 * @param {String} message - Error message to throw.
 * @throws {AuthError} Authentication error with the provided message.
 */
const throwAuthError = (message) => {
  const error = new Error(message);
  error.name = "AuthError";
  throw error;
};

/**
 * Creates a new user in the database.
 *
 * @param {Object} userData - User data to be created in the database.
 * @returns {Object} An object containing a message and user data.
 */
const postCreateUser = async (userData) => {
  const encryptedPassword = await bcrypt.hash(userData.password, 10);
  userData.password = encryptedPassword;

  const user = await createUserInDB(userData);

  user.token = generateJwtToken(user.userId, user.username);

  return { message: "User created", data: user };
};

/**
 * Retrieves all existing users in the database.
 *
 * @async
 * @throws {AuthError} Throws an error if there are no users in the database.
 * @returns {Object} An object containing a message and an array of user data.
 */
const getGetAllUsers = async () => {
  const allUsers = await getAllUsersFromDB();
  if (!allUsers.length) {
    throwAuthError("No users");
  }
  return {
    message: "All Users",
    data: allUsers,
  };
};

/**
 * Checks if a username already exists in the database.
 *
 * @param {String} username - The username to check.
 * @returns {Object} An object with a message and data indicating the availability of the username.
 */
const postIsUsernameExist = async (username) => {
  const response = await getUserFromDB(username);
  const message = !response
    ? "Username is available"
    : "Username is already in use";
  return {
    message: message,
    data: !response ? [] : response,
  };
};

/**
 * Checks user credentials and generates a JWT token for login.
 *
 * @param {String} username - The username to check.
 * @param {String} password - The user's password.
 * @throws {AuthError} Throws an error if no user exists in the database or invalid credentials.
 * @returns {Object} An object with a message and user data if login is successful.
 */
const checkPasswordAndLogin = async (username, password) => {
  const user = await getUserFromDB(username);
  if (!user) {
    throwAuthError("User does not exists");
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    user.token = generateJwtToken(user.userId, user.username);
  } else {
    throwAuthError("Invalid credentials");
  }
  return {
    message: "Logged in",
    data: user,
  };
};

/**
 * Generates a JWT token for a user.
 *
 * @param {String} userId - The user's ID.
 * @param {String} username - The user's username.
 * @returns {String} The generated JWT token.
 */
const generateJwtToken = (userId, username) => {
  const token = jwt.sign({ userId, username }, process.env.TOKEN_KEY, {
    expiresIn: "1h",
  });
  return token;
};

module.exports = {
  validate,
  validateUsername,
  postCreateUser,
  getGetAllUsers,
  postIsUsernameExist,
  checkPasswordAndLogin,
};
