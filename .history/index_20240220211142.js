const express = require("express");
const app = express();
require("dotenv").config();
app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    data: "helo",
  });
});

app.listen();
