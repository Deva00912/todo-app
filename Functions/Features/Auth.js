const { regex } = require("../Services/Utils/Constants");
const {
  createUserInDB,
  getAllUsersFromDB,
  getUserFromDB,
} = require("../Services/MongoDB/UserServices");

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

const validateUsername = (username) => {
  return regex?.username.test(username) ? true : false;
};

const throwAuthError = (message) => {
  const error = new Error(message);
  error.name = "AuthError";
  throw error;
};

//Creating a user
const postCreateUser = async (userData) => {
  await createUserInDB(userData);
  return { message: "User created" };
};

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

const checkPasswordAndLogin = async (username, password) => {
  const user = await getUserFromDB(username);
  if (!user) {
    throwAuthError("User does not exists");
  }
  if (user?.password !== password) {
    throwAuthError("Invalid credentials");
  }
  return {
    message: "Logged in",
    data: user,
  };
};

module.exports = {
  validate,
  validateUsername,
  postCreateUser,
  getGetAllUsers,
  postIsUsernameExist,
  checkPasswordAndLogin,
};
