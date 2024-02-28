const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    data: "helo",
  });
});

app.listen(port, () => {
    log
}
);
