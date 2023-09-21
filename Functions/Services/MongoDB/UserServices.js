const mongoose = require("mongoose");
const { User } = require("./Models/UsersModel");

const createUserInDB = async (user) => {
  return await User.create({
    ...user,
    userId: new mongoose.Types.ObjectId(),
  });
};

const getAllUsersFromDB = async () => {
  return await User.find({});
};

const getUserFromDB = async (username) => {
  return await User.findOne({ username: username });
};

module.exports = {
  createUserInDB,
  getAllUsersFromDB,
  getUserFromDB,
};
