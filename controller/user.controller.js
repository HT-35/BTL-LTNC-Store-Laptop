const {
  createUserService,
  findUserAllUserService,
} = require("../services/mysql/user.services");

const createUserController = async (req, res) => {
  try {
    const data = req.body;

    if (!data) {
      res.status(200).json({
        status: false,
        data: createUser,
      });
    }
    const createUser = await createUserService(data);
    console.log("====================================");
    console.log(createUser);
    console.log("====================================");

    if (createUser.errors) {
      return res.status(404).json({
        status: false,
        data: createUser.errors[0],
      });
    }
    res.status(200).json({
      status: true,
      data: createUser,
    });
  } catch (error) {
    res.status(200).json({
      status: false,
      data: error,
    });
  }
};

const findAllUserController = async (req, res) => {
  try {
    const findUser = await findUserAllUserService();
    res.status(200).json({
      status: true,
      data: findUser,
    });
  } catch (error) {
    res.status(200).json({
      status: true,
      data: error,
    });
  }
};

module.exports = {
  createUserController,
  findAllUserController,
};
