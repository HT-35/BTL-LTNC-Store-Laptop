const { CartUser } = require("../../models/index");

const findCartbyIdUser = async (id) => {
  const findCart = await CartUse.findOne({
    id_user: id,
  });

  return findCart;
};

module.exports = {
  findCartbyIdUser,
};
