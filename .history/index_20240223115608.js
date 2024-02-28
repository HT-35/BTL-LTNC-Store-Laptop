const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const { sequelize } = require("./config/connectDBMysql");
const { connectDBMongoDB } = require("./config/connectDBMongoDB");
const router = require("./router/root.router");
const port = process.env.PORT;
sequelize;
connectDBMongoDB();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // Middleware để xử lý JSON data
app.use(express.urlencoded({ extended: true })); // Middleware để xử lý urlencoded data


app.use("/", router);

app.listen(port, () => {
  console.log("run at http://localhost:3000");
});
