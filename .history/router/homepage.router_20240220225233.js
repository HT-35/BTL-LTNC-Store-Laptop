const HomePageRouter = require("express").Router();

HomePageRouter.get("/", (req, res) => {
  res.status(200).Json({
    status: true,
    data: "welcome to IUH",
  });
});

module.exports = {
  HomePageRouter,
};
