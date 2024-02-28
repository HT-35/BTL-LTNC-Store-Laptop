const router = require("express").Router();

const { HomePageRouter}=require('./')
router.use("/", HomePageRouter);
module.exports = router;
