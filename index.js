const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    origin: [
      "http://localhost:3000",
      "http://221.132.33.175",
      "http://221.132.33.175:3000",
      "http://huytranfullstack.id.vn",
      "http://huytranfullstack.id.vn:3000",
    ],
    credentials: true, // cho phép chia sẻ cookie qua các miền
  })
);

const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const { sequelize } = require("./config/connectDBMysql");
const { connectDBMongoDB } = require("./config/connectDBMongoDB");
const router = require("./router/root.router");
const port = process.env.PORT || 3000; // Nếu không có PORT được cung cấp từ file .env, sẽ sử dụng PORT mặc định là 3000
sequelize;
connectDBMongoDB();

// Serve static files
app.use("/app/public", express.static(path.join(__dirname, "public")));

app.use(express.json()); // Middleware để xử lý JSON data
app.use(express.urlencoded({ extended: true })); // Middleware để xử lý urlencoded data

app.use("/", router);

// Xử lý lỗi khi kết nối thất bại
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
