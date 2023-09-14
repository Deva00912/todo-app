const {
  validate,
  validateUsername,
  postCreateUser,
  getGetAllUsers,
  postIsUsernameExist,
} = require("../Features/Auth.js");

//Creating a user
const createUser = async (userData) => {
  try {
    if (!validate(userData)) {
      throw new Error("Enter details correctly");
    }
    const response = await postCreateUser(userData);
    return response;
  } catch (error) {
    return { message: error.message, statusCode: 400 };
  }
};

const getAllUsers = async () => {
  const response = await getGetAllUsers();
  return response;
};

const isUsernameExist = async (username) => {
  try {
    if (!validateUsername(username)) {
      throw new Error("Username is invalid");
    }
    const response = await postIsUsernameExist(username);
    return response;
  } catch (error) {
    return { statusCode: 400, message: error.message };
  }
};

module.exports = {
  createUser,
  getAllUsers,
  isUsernameExist,
};
