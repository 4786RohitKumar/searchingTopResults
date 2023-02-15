const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3500;
const dotenv = require("dotenv").config();
const fs = require("fs");

const data = fs.readFileSync("totalResults.json");
const parseData = JSON.parse(data);
// console.log(parseData);

//Routes
const resultRoute = require("./Router/result");

const connect = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.MONGO_URI);
  console.log("mongoose connected");
};

mongoose.connection.on("connected", () => {
  console.log("database connected");
});
mongoose.connection.on("disconnected", () => {
  console.log("database disconnected");
});

app.use(express.json());

app.use("/api/result", resultRoute);

app.listen(port, () => {
  console.log(`the app is listening on http://localhost:${port}`);
  connect();
});

app.get("/", (req, res) => {
  res.send("hello ji");
});
