const {
  createUserService,
  findUserAllUserService,
  findUserByEmailService,
  findUserByNumberPhoneService,
  updateUserbyNumberPhoneOrEmailService,
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

const findUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      res.status(400).json({
        status: false,
        data: "Missing Email",
      });
    }

    const findUserByEmail = await findUserByEmailService(email);
    if (findUserByEmail == null) {
      res.status(400).json({
        status: false,
        data: "Not Found User !!!",
      });
    }
    res.status(200).json({
      status: true,
      data: findUserByEmail,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      data: error,
    });
  }
};

const findUserByNumberPhone = async (req, res) => {
  try {
    const { numberPhone } = req.params;
    if (!numberPhone) {
      return res.status(400).json({
        status: false,
        data: "Missing Email",
      });
    }

    const findUserByNumberPhone = await findUserByNumberPhoneService(
      numberPhone
    );
    if (findUserByNumberPhone == null) {
      return res.status(400).json({
        status: false,
        data: "Not Found User !!!",
      });
    }
    res.status(200).json({
      status: true,
      data: findUserByNumberPhone,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      data: error,
    });
  }
};

const updateUserbyNumberPhoneOrEmail = async (req, res) => {
  const { slug } = req.params;
  const { email, numberPhone, fullName, role } = req.body;

  if (!slug) {
    return res.status(404).json({
      status: false,
      data: "missing !!",
    });
  }

  const updateUser = await updateUserbyNumberPhoneOrEmailService(
    slug,
    email,
    numberPhone,
    fullName,
    role
  );

  res.status(200).json({
    status: true,
    data: updateUser,
  });
};

const deleteUserbyNumberPhoneOrEmail = async (req, res) => {
  const { slug } = req.params;
  if (!slug) {
    return res.status(200).json({
      status: true,
      delete: "delete",
      data: slug,
    });
  }
  res.status(200).json({
    status: true,
    delete: "delete",
    data: slug,
  });
};

module.exports = {
  createUserController,
  findAllUserController,
  findUserByEmail,
  findUserByNumberPhone,
  updateUserbyNumberPhoneOrEmail,
  deleteUserbyNumberPhoneOrEmail,
};
