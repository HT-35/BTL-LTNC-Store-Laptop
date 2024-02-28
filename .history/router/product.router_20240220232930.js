const productRouter = require("express").Router();

productRouter.get("/", createProductController);

//

module.exports = { productRouter };
