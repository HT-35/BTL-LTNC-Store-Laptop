const {
  createProductController,
} = require("../controller/createProduct.controller");

const productRouter = require("express").Router();

productRouter.get("/create", createProductController);

//

module.exports = { productRouter };
