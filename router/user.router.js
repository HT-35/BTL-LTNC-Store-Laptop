const {
  createUserController,
  findAllUserController,
} = require("../controller/user.controller");

const userRouter = require("express").Router();

//   localhost:3000/user/create
userRouter.post("/create", createUserController);

//   localhost:3000/user/
userRouter.get("/", findAllUserController);

module.exports = {
  userRouter,
};
