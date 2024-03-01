const { UserMysql } = require("../../models/index");

const createUserService = async (data) => {
  try {
    if (!data) {
      return null;
    }
    const createUser = await UserMysql.create(data);

    return await createUser;
  } catch (error) {
    return error;
  }
};

const findUserAllUserService = async () => {
  const findAllUser = await UserMysql.findAll();
  return findAllUser;
};

const findUserByEmailService = async (email) => {
  const findUserByEmail = await UserMysql.findOne({
    where: {
      email: email,
    },
  });

  return findUserByEmail;
};

const findUserByNumberPhoneService = async (numberPhone) => {
  const findUserByEmail = await UserMysql.findOne({
    where: {
      numberPhone: numberPhone,
    },
  });

  return findUserByEmail;
};

const updateUserbyNumberPhoneOrEmailService = async (
  slug,
  email,
  numberPhone,
  fullName,
  role
) => {
  const updateUser = await UserMysql.update(
    { email, numberPhone, fullName, role },
    {
      where: {
        email: slug,
      },
    }
  );
  console.log(updateUser);
  return updateUser;
};

module.exports = {
  createUserService,
  findUserAllUserService,
  findUserByEmailService,
  findUserByNumberPhoneService,
  updateUserbyNumberPhoneOrEmailService,
};
