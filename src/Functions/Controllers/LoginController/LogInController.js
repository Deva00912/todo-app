const { syncIndexes } = require("mongoose");
const { User } = require("../../Models/UsersModel");

const logInUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName: userName });
    const statusCode = user?.password === password ? 200 : 500;
    if (!user) {
      throw new Error("User not found");
    }
    res.status(statusCode).send({
      message: "Logged in",
      data: user,
      statusCode: statusCode,
    });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};

module.exports = { logInUser };
