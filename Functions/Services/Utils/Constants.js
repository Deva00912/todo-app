const MONGO_URL =
  "mongodb+srv://devendran0912:devendran0912@cluster0.haipxq7.mongodb.net/TODO-LIST-API?retryWrites=true&w=majority";

// const PORT = 7000;

const regex = {
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
  text: /^[a-zA-Z]{1,}$/,
};

module.exports = { MONGO_URL, regex };
