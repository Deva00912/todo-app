const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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
  const encryptedPassword = await bcrypt.hash(userData.password, 10);
  userData.password = encryptedPassword;

  const user = await createUserInDB(userData);

  user.token = generateJwtToken(user.userId, user.username);

  return { message: "User created", data: user };
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
  console.log("bcrypt", await bcrypt.compare(password, user.password));

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
