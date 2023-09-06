const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { registerRouter } = require("./Routes/RegisterRoute/Register.js");
const { loginRouter } = require("./Routes/LoginRoute/Login.js");
const { homePageRouter } = require("./Routes/HomePageRoute/HomePageRoute.js");
const { MONGO_URL, PORT } = require("./Utils/Constants.js");

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
app.use("/task", homePageRouter);
// app.use("/", (req, res) => {
//   res.status(200).json({ message: "Hello Home Page" }).end();
// });
