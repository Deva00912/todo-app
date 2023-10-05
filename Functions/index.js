const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { MONGO_URL, PORT } = require("./Services/Utils/Constants.js");
const { registerRouter } = require("./Routes/Register.js");
const { loginRouter } = require("./Routes/Login.js");
const { tasksRouter } = require("./Routes/Tasks.js");

const app = express();
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log("Server is running at port: ", PORT);
    });
  })
  .catch((error) => console.log(error.message));

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/task", tasksRouter);
app.use("/random", (req, res) => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  res
    .status(200)
    .json({
      randomValue: getRandomInt(3),
    })
    .end();
});
