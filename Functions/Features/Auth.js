const { regex } = require("../Services/Constants");
const {
  createUserInDB,
  getAllUsersFromDB,
  getUserFromDB,
} = require("../Services/MongoDB/UserServices");

const validate = (userData) => {
  return userData.userName &&
    userData.firstName &&
    userData.lastName &&
    userData.confirmPassword &&
    userData.password &&
    userData.password === userData.confirmPassword &&
    regex.userName.test(userData.userName) &&
    regex.password.test(userData.password) &&
    regex.text.test(userData.firstName) &&
    regex.text.test(userData.lastName)
    ? true
    : false;
};

const validateUsername = (username) => {
  return regex?.userName.test(username) ? true : false;
};

//Creating a user
const postCreateUser = async (userData) => {
  try {
    const user = await createUserInDB(userData);
    return { statusCode: 201, message: "User created", data: user };
  } catch (error) {
    if (error.message.includes("E11000 duplicate key")) {
      return { statusCode: 400, message: "Username is already in use" };
    }
    return { message: error.message, statusCode: 400 };
  }
};

const getGetAllUsers = async () => {
  try {
    const allUsers = await getAllUsersFromDB();
    if (allUsers.length < 0) {
      throw new Error("No users");
    }
    return {
      statusCode: 200,
      message: "All Users",
      data: allUsers,
    };
  } catch (error) {
    return { statusCode: 400, message: error.message, data: [] };
  }
};

const postIsUsernameExist = async (username) => {
  try {
    const response = await getUserFromDB(username);

    const message = !response
      ? "Username is available"
      : "Username is already in use";

    return {
      statusCode: !response ? 200 : 400,
      message: message,
      data: [],
    };
  } catch (error) {
    return { statusCode: 400, message: error.message, data: [] };
  }
};

const checkPasswordAndLogin = async (username, password) => {
  try {
    const user = await getUserFromDB(username);
    if (!user) {
      throw new Error("User does not exists");
    }
    const statusCode = user?.password === password ? 200 : 401;
    return {
      message:
        user?.password === password ? "Logged in" : "Invalid credentials",
      data: user?.password === password ? user : {},
      statusCode: statusCode,
    };
  } catch (error) {
    return { statusCode: 401, message: error.message, data: {} };
  }
};

module.exports = {
  validate,
  validateUsername,
  postCreateUser,
  getGetAllUsers,
  postIsUsernameExist,
  checkPasswordAndLogin,
};
