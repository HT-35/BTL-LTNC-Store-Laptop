const router = require("express").Router();

const { HomePageRouter } = require("./homepage.router");
const { productRouter } = require("./product.router");
const { userRouter } = require("./user.router");
router.use("/", HomePageRouter);
router.use("/product", productRouter);
router.use("/user", userRouter);

module.exports = router;
