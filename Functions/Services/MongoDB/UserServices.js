const mongoose = require("mongoose");
const { User } = require("./Models/UsersModel");

const createUserInDB = async (user) => {
  const response = await User.create({
    ...user,
    userId: new mongoose.Types.ObjectId(),
  });
  return response;
};

const getAllUsersFromDB = async () => {
  const response = await User.find({});
  return response;
};

const getUserFromDB = async (username) => {
  const response = await User.findOne({ userName: username });
  return response;
};

module.exports = {
  createUserInDB,
  getAllUsersFromDB,
  getUserFromDB,
};
