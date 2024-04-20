const express = require("express");
const {
  createDeliveryAddressController,
  getAllDeliveryAddressController,
  updateDeliveryAddressController,
  deleteDeliveryAddressController,
  getDetailbyIdDeliveryAddressController,
} = require("../controller/deliveryAddress.controller");

const {
  authenticationLogin,
} = require("../middlewares/authentication.middlewates");
const {
  authorizationAdmin,
} = require("../middlewares/authorization.middleware");

const deliveryAddressRouter = express.Router();

deliveryAddressRouter.post(
  "/",
  authenticationLogin,
  createDeliveryAddressController
);
deliveryAddressRouter.get(
  "/",
  authenticationLogin,
  getAllDeliveryAddressController
);
deliveryAddressRouter.get(
  "/detail/:idAddress",
  authenticationLogin,
  getDetailbyIdDeliveryAddressController
);

deliveryAddressRouter.patch(
  "/",
  authenticationLogin,
  updateDeliveryAddressController
);
deliveryAddressRouter.delete(
  "/:id",
  authenticationLogin,
  deleteDeliveryAddressController
);
module.exports = {
  deliveryAddressRouter,
};
