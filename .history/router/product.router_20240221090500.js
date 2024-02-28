const productRouter = require("express").Router();
const multer = require("multer");
const upload = multer({ storage: storage });

const {
  createProductController,
} = require("../controller/createProduct.controller");

productRouter.get("/create", upload.none(), createProductController);

module.exports = { productRouter };
