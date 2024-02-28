const productRouter = require("express").Router();
const {
  createProductController,
} = require("../controller/createProduct.controller");

productRouter.get("/create", createProductController);

//

module.exports = { productRouter };
