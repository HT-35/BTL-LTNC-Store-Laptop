const { cartUser } = require("../controller/cart.contoller");

const {
  authenticationLogin,
} = require("../middlewares/authentication.middlewates");
const {
  authorizationAdmin,
} = require("../middlewares/authorization.middleware");

const cartRouter = require("express").Router();

cartRouter.get("/", authenticationLogin, cartUser);

module.exports = {
  cartRouter,
};
