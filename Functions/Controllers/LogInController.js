const { validateUsername, checkPasswordAndLogin } = require("../Features/Auth");

const validateLogin = async (username, password) => {
  try {
    if (!validateUsername(username)) {
      throw new Error("Entered Username is invalid");
    }
    const response = await checkPasswordAndLogin(username, password);
    return response;
  } catch (error) {
    return { statusCode: 401, message: error.message, data: {} };
  }
};

module.exports = { validateLogin };
