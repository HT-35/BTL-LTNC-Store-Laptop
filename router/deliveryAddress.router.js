const express = require("express");
const {
  createDeliveryAddress,
} = require("../controller/deliveryAddress.controller");

const {
  authenticationLogin,
} = require("../middlewares/authentication.middlewates");
const {
  authorizationAdmin,
} = require("../middlewares/authorization.middleware");

const deliveryAddressRouter = express.Router();

deliveryAddressRouter.post("/", authenticationLogin, createDeliveryAddress);

module.exports = {
  deliveryAddressRouter,
};
