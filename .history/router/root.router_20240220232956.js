const router = require("express").Router();

const { HomePageRouter } = require("./homepage.router");
router.use("/", HomePageRouter);
router.use("/product", HomePageRouter);

module.exports = router;
