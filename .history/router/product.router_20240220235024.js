const productRouter = require("express").Router();
const multer = require("multer");
const upload = multer();
const {
  createProductController,
} = require("../controller/createProduct.controller");

productRouter.get("/create", upload.none(), createProductController);

module.exports = { productRouter };
