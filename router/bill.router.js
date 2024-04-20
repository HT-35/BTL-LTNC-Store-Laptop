const billRouter = require("express").Router();

const {
  createBillController,
  getDetailBillByIdController,
  getBillAllController,
} = require("../controller/bill.controller");
const {
  authenticationLogin,
} = require("../middlewares/authentication.middlewates");
const {
  authorizationAdmin,
} = require("../middlewares/authorization.middleware");

billRouter.post("/", authenticationLogin, createBillController);

billRouter.get("/detail/:id", authenticationLogin, getDetailBillByIdController);
billRouter.get("/", authenticationLogin, getBillAllController);

module.exports = {
  billRouter,
};
