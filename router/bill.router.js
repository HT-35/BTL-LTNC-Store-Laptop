const billRouter = require("express").Router();

const { createBillController } = require("../controller/bill.controller");
const {
  authenticationLogin,
} = require("../middlewares/authentication.middlewates");
const {
  authorizationAdmin,
} = require("../middlewares/authorization.middleware");

billRouter.post("/", authenticationLogin, createBillController);

module.exports = {
  billRouter,
};
