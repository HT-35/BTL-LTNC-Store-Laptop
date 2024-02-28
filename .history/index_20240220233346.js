const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const { sequelize } = require("./config/connectDBMysql");
const { connectDBMongoDB } = require("./config/connectDBMongoDB");
const router = require("./router/root.router");
const port = process.env.PORT;

sequelize;
connectDBMongoDB();

app.use("/", router);




app.listen(port, () => {
  console.log("run at http://localhost:3000");
});
