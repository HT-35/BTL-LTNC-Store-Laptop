const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    data: "helo",
  });
});

app.listen()