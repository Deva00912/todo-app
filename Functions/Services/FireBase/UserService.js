const { db } = require("./Utils/admin.js");

const userDB = db.collection("Users");

const createUserFDB = async (user) => {
  return await userDB.add(user);
};

const getUsersFDB = async () => {
  return await userDB.get();
};

const getUserFDB = async (username) => {
  return await userDB.where("username", "==", username).get();
};

module.exports = {
  getUsersFDB,
  createUserFDB,
  getUserFDB,
};
