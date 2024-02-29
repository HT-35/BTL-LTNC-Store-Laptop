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

module.exports = {
  createUserService,
  findUserAllUserService,
};
