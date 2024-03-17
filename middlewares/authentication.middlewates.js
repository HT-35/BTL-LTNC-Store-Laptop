const {
  findUserByNumberPhoneOrEmailService,
} = require("../services/mysql/user.services");
const { DecodeUtils } = require("../utils/SignVerifyToken.utils");

require("dotenv").config();

const authenticationLogin = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        status: false,
        data: "login request !!",
      });
    }

    const Decode = await DecodeUtils(token);

    const { email, numberPhone } = Decode;

    const findUser = await findUserByNumberPhoneOrEmailService(email);

    if (findUser === null) {
      return res.status(404).json({
        status: false,
        data: "username or password wrong !!!",
      });
    }

    // console.log(findUser);

    req.infoUser = findUser;

    next();

    //   console.log(token);
  } catch (error) {
    return res.status(404).json({
      status: false,
      data: error.message,
    });
  }
};

module.exports = {
  authenticationLogin,
};
