const { User } = require("../Models/UsersModel.js");

const logInUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName: userName });
    const statusCode = user?.password === password ? 200 : 401;
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).send({
      message:
        user?.password === password ? "Logged in" : "Password does not match",
      data: user?.password === password ? user : {},
      statusCode: statusCode,
    });
  } catch (error) {
    res.status(200).json({ statusCode: 401, message: error.message, data: {} });
  }
};

module.exports = { logInUser };
