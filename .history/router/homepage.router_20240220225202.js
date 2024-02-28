const HomePageRouter = require("express").Router();

HomePageRouter.get("/", (req, res) => {
  req.statusCode(200).Json({
    status: true,
    data: "welcome to IUH",
  });
});

module.exports = {
  HomePageRouter,
};
