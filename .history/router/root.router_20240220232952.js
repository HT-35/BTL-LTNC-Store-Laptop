const router = require("express").Router();

const { HomePageRouter } = require("./homepage.router");
router.use("/", HomePageRouter);
router.use("/", HomePageRouter);

module.exports = router;
