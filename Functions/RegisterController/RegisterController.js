const mongoose = require("mongoose");
const { User } = require("../Models/UsersModel.js");

//Creating a user
const createUser = async (req, res) => {
  try {
    const user = await User.create({
      ...req.body,
      userId: new mongoose.Types.ObjectId(),
    });
    res
      .status(201)
      .json({ statusCode: 201, message: "User created", data: user })
      .end();
  } catch (error) {
    if (error.message.includes("E11000 duplicate key")) {
      res
        .status(200)
        .send({ statusCode: 400, message: "Username is already in use" });
    } else {
      res.status(200).send({ message: error.message, statusCode: 400 });
    }
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    if (allUsers.length < 0) {
      throw new Error("No users");
    }
    res.status(200).send({
      statusCode: 200,
      message: "All Users",
      data: allUsers,
    });
  } catch (error) {
    res.status(200).send({ statusCode: 400, message: error.message, data: [] });
  }
};

const checkUsernameAvailability = async (req, res) => {
  try {
    const { userName } = req.body;
    const findUser = await User.find({ userName: userName });
    if (findUser.length > 0) {
      return res.status(200).send({
        message: "UserName is already in use",
        statusCode: 400,
      });
    }
    return res.status(200).send({
      statusCode: 200,
      message: "UserName is available",
      data: findUser,
    });
  } catch (error) {
    res.status(200).send({ statusCode: 400, message: error.message });
  }
};

// eslint-disable-next-line
const getUser = async (req, res) => {
  const { userName } = req.body;
  const user = await User.find({ userName: userName });

  const statusCode = Object.values(user).length > 0 ? 200 : 400;

  return res.status(200).send({
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
