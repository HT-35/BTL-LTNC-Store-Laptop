const express = require("express");
const app = express();
require()
app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    data: "helo",
  });
});

app.listen()