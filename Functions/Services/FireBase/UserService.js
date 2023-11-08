const { db } = require("./Utils/admin.js");

const userDB = db.collection("Users");

const createUserFDB = async (user) => {
  return await userDB.add(user);
};

const getUsersFDB = async () => {
  return await userDB.get();
};

const getUserFDB = async (email) => {
  return await userDB.where("email", "==", email).get();
};

module.exports = {
  getUsersFDB,
  createUserFDB,
  getUserFDB,
};
