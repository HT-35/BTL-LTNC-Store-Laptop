const {
  findCartUserController,
  addProductToCartController,
  reduceQuantityProductInCartController,
  removeProductInCartController,
} = require("../controller/cart.contoller");

const {
  authenticationLogin,
} = require("../middlewares/authentication.middlewates");
const {
  authorizationAdmin,
} = require("../middlewares/authorization.middleware");

const cartRouter = require("express").Router();

cartRouter.get("/", authenticationLogin, findCartUserController);

cartRouter.post("/", authenticationLogin, addProductToCartController);

cartRouter.patch(
  "/reduce-quantity",
  authenticationLogin,
  reduceQuantityProductInCartController
);

cartRouter.delete(
  "/remove-product",
  authenticationLogin,
  removeProductInCartController
);
module.exports = {
  cartRouter,
};
