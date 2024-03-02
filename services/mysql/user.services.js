const { UserMysql } = require("../../models/index");
const { Op } = require("sequelize");
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
  const findAllUser = await UserMysql.findAll({
    attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
  });
  return findAllUser;
};

const findUserByNumberPhoneOrEmailService = async (slug) => {
  const findUserByEmail = await UserMysql.findOne({
    where: {
      [Op.or]: [{ email: slug }, { numberPhone: slug }],
    },
    attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
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

const deletedSoftbyNumberPhoneOrEmailService = async (slug) => {
  if (!slug) {
    return null;
  }
  const deleteSoft = await UserMysql.destroy({
    where: {
      [Op.or]: [{ email: slug }, { numberPhone: slug }],
    },
  });

  return deleteSoft;
};

const findUserAllUserSoftDeletedService = async () => {
  const findAllUserSoftDeleted = await UserMysql.findAll({
    paranoid: false,
    where: {
      deletedAt: {
        [Op.ne]: null,
      },
    },
    attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
  });
  if (findAllUserSoftDeleted.length === 0) {
    return null;
  }
  return findAllUserSoftDeleted;
};

const findDetailUserSoftDeletedService = async (slug) => {
  const findDetailUserSoftDeleted = await UserMysql.findAll({
    paranoid: false,
    where: {
      [Op.or]: [{ email: slug }, { numberPhone: slug }],
      deletedAt: {
        [Op.ne]: null,
      },
    },
    attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
  });
  if (findDetailUserSoftDeleted.length == 0) {
    return null;
  }
  return findDetailUserSoftDeleted;
};

const restoreAllUserSoftDeletedService = async () => {
  const restoreAllUser = UserMysql.restore();
  return restoreAllUser;
};

const restoreUserSoftDeletedService = async (slug) => {
  // console.log("====================================");
  // console.log("service:  ", slug);
  // console.log("====================================");
  const restoreAllUser = await UserMysql.restore({
    where: {
      [Op.or]: [{ email: slug }, { numberPhone: slug }],
      deletedAt: {
        [Op.ne]: null,
      },
    },
  });

  return restoreAllUser;
};

module.exports = {
  createUserService,
  findUserAllUserService,
  findUserByNumberPhoneOrEmailService,

  updateUserbyNumberPhoneOrEmailService,
  deletedSoftbyNumberPhoneOrEmailService,
  findUserAllUserSoftDeletedService,
  findDetailUserSoftDeletedService,
  restoreAllUserSoftDeletedService,

  restoreUserSoftDeletedService,
};
