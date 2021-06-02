const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

port = process.env.PORT || 4000;

const User = require("./models/userSchema");

const app = express();
app.use(express.json());

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}

app.listen(port, () => console.log("app running"));

app.get("/", (req, res) => {
  res.send("wow");
});

mongoose
  .connect(
    process.env.DATABASE,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("connected to DB"))
  .catch((error) => console.log(error));

app.post("/post", async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    console.log(error);
  }
});

app.get("/get", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});
