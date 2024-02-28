const express = require("express");
require("dotenv").config();
const { sequelize } = require("./config/connectDBMysql");
const { connectDBMongoDB } = require("./config/connectDBMongoDB");
const port = process.env.PORT;

sequelize;
connectDBMongoDB();
const app = express();

app.use("/", HomePageRouter);

app.listen(port, () => {
  console.log("run at http://localhost:3000");
});
