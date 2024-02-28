const router = require("express").Router();

const { HomePageRouter } = require("./homepage.router");
const { productRouter } = require("./product.router");
router.use("/", HomePageRouter);
router.use("/product", productRouter);

module.exports = router;
