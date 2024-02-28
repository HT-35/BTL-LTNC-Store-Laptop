const { log } = require("console");
const express = require("express");
require("dotenv").config();
const { sequelize } = require("./config/connectDBMysql");
const { connectDBMongoDB } = require("./config/connectDBMongoDB");

sequelize;
connectDBMongoDB();
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    data: "helo",
  });
});

app.listen(port, () => {
  log("run at http://localhost:3000");
});
