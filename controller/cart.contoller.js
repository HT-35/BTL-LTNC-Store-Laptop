const { findCartbyIdUser } = require("../services/mysql/cart.servers");

const cartUser = async (req, res) => {
  try {
    const { id } = req.data;

    //   cart : id , id_user ,id_product,

    const findCartbyEmailOrNumberPhone = await findCartbyIdUser(id);
    console.log(findCartbyEmailOrNumberPhone);
    res.status(200).json({
      status: true,
      data: findCartbyEmailOrNumberPhone,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      data: error,
    });
  }
};

module.exports = {
  cartUser,
};
