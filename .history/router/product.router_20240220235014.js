const productRouter = require("express").Router();
const multer = require("multer");
const upload = multer();
const {
  createProductController,
} = require("../controller/createProduct.controller");

productRouter.get("/create", createProductController);

//

module.exports = { productRouter };
