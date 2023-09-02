const mongoose = require("mongoose");
const { User } = require("../../Models/UsersModel");

//Creating a user
const createUser = async (req, res) => {
  try {
    const user = await User.create({
      ...req.body,
      userId: new mongoose.Types.ObjectId(),
    });
    res
      .status(200)
      .json({ statusCode: 200, message: "User created", data: user })
      .end();
  } catch (error) {
    res.status(500).send({ message: error.message, statusCode: 500 });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).send({
      message: "All Users",
      data: allUsers,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const checkUsernameAvailability = async (req, res) => {
  try {
    const { userName } = req.body;
    const findUser = await User.find({ userName: userName });
    if (findUser.length > 0) {
      return res.status(500).send({
        message: "UserName is already in use",
        statusCode: 500,
      });
    }
    return res.status(200).send({
      statusCode: 200,
      message: "UserName is available",
      data: findUser,
    });
  } catch (error) {
    res.status(500).send({ statusCode: 500, message: error.message });
  }
};

const getUser = async (req, res) => {
  const { userName } = req.body;
  const user = await User.find({ userName: userName });

  const statusCode = user.length > 0 ? 200 : 500;

  return res.status(statusCode).send({
    message: statusCode === 200 ? "User found" : "User not found",
    data: user,
    statusCode: statusCode,
  });
};

module.exports = {
  createUser,
  getAllUsers,
  checkUsernameAvailability,
};
