const {
  createUserController,
  findAllUserController,
  findUserByEmail,
  findUserByNumberPhone,
  updateUserbyNumberPhoneOrEmail,
  deleteUserbyNumberPhoneOrEmail,
} = require("../controller/user.controller");

const userRouter = require("express").Router();

//   localhost:3000/user/create
userRouter.post("/create", createUserController);

//   localhost:3000/user/:mail
userRouter.get("/mail/:email", findUserByEmail);

//   localhost:3000/user/:numberPhone
userRouter.get("/numberPhone/:numberPhone", findUserByNumberPhone);

//   localhost:3000/user/:slug
userRouter.patch("/:slug", updateUserbyNumberPhoneOrEmail);

//   localhost:3000/user/
userRouter.get("/", findAllUserController);

//   localhost:3000/user/
userRouter.get("/", findAllUserController);

//   localhost:3000/user/:slug
userRouter.delete("/:slug", deleteUserbyNumberPhoneOrEmail);

module.exports = {
  userRouter,
};
