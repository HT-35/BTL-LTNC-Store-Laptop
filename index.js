const express = require("express");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const exampleProxy = createProxyMiddleware({
  target: "http://localhost:3000", // target host with the same base path
  changeOrigin: true, // needed for virtual hosted sites
});
app.use("/", exampleProxy);

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    origin: [
      "http://localhost:3000",
      "http://221.132.33.175",
      "http://221.132.33.175:3000",
    ],
  })
);

const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const { sequelize } = require("./config/connectDBMysql");
const { connectDBMongoDB } = require("./config/connectDBMongoDB");
const router = require("./router/root.router");
const port = process.env.PORT;
sequelize;
connectDBMongoDB();

// xử lý CORS headers
//app.use((req, res, next) => {
//  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
//  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//  next();
//});

//localhost:3000/public/image/abc.jpg
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.json()); // Middleware để xử lý JSON data
app.use(express.urlencoded({ extended: true })); // Middleware để xử lý urlencoded data

app.use("/", router);

app.listen(port, () => {
  console.log("run at http://localhost:3000");
});
