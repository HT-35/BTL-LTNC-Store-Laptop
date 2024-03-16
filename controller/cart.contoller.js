const { findCartbyIdUser } = require("../services/mysql/cart.servers");
const { getDetailProductByID } = require("../services/product.service");

const productModel = require("../models/models Mongodb/Product.model.mongodb");
const { default: mongoose } = require("mongoose");

const findCartUserController = async (req, res) => {
  try {
    console.log("=================================");
    const { id } = req.data;
    const findCartbyUserId = await findCartbyIdUser(id);
    const listIDProduct = findCartbyUserId.map((item) => {
      return item.dataValues;
    });
    const product = [];
    for (const [index, item] of listIDProduct.entries()) {
      const { id_product, quantity } = item;
      const _id = new mongoose.Types.ObjectId(id_product);
      const findProduct = await getDetailProductByID({ _id });
      // console.log("item    :  ", item);
      // product.push({ ...findProduct._doc, quantity, index });
      let number = index + 1;
      product.push({ number, ...findProduct._doc, quantity });
    }
    res.status(200).json({
      status: true,
      data: product,
    });
  } catch (error) {
    console.error("Lỗi khi xử lý yêu cầu giỏ hàng:", error);
    res.status(400).json({
      status: false,
      data: error.message,
    });
  }
};

module.exports = {
  findCartUserController,
};
