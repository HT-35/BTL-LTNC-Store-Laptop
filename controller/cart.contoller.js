const {
  findCartbyIdUserService,
  addProductToCartService,
  findProductDetailCardService,
  increaseQuantityCartServer,
} = require("../services/mysql/cart.servers");

const { getDetailProductByID } = require("../services/product.service");

const productModel = require("../models/models Mongodb/Product.model.mongodb");
const { default: mongoose } = require("mongoose");

const findCartUserController = async (req, res) => {
  try {
    const { id } = req.infoUser;
    const findCartbyUserId = await findCartbyIdUserService(id);
    const listIDProduct = findCartbyUserId.map((item) => {
      return item.dataValues;
    });
    const product = [];
    for (const [index, item] of listIDProduct.entries()) {
      const { id_product, quantity } = item;
      const _id = new mongoose.Types.ObjectId(id_product);
      const findProduct = await getDetailProductByID({ _id });

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

const addProductToCartController = async (req, res) => {
  try {
    const { id_product, quantity } = req.body;
    const id_user = req.infoUser.id;

    const newProduct = { id_user, id_product, quantity };

    // const id = "65e48eae2800f32258331de2";

    const findProduct = await findProductDetailCardService(id_user, id_product);
    console.log("====================================");
    console.log("findProduct:    ", findProduct);
    console.log("====================================");
    if (findProduct !== null) {
      const arrQuatity = findProduct.map((item) => item.quantity);

      const newQuantity = arrQuatity.reduce((newValue, currentValue) => {
        return Number(newValue + currentValue);
      }, Number(quantity));

      const updateCart = await increaseQuantityCartServer({
        id_user,
        id_product,
        newQuantity,
      });
      console.log(updateCart);
      const findProductCurrent = await findProductDetailCardService(
        id_user,

        id_product
      );
      return res.status(200).json({
        status: true,
        type: "sp da ton tai",
        data: findProductCurrent,
      });
    }
    const addProduct = await addProductToCartService(newProduct);
    res.status(200).json({
      status: true,
      data: addProduct,
    });
  } catch (error) {
    res.status(404).json({
      status: true,
      data: error.message,
    });
  }
};

const reduceQuantityProductInCartController = async (req, res) => {
  const { id_product, quantity } = req.body;
  const id_user = req.infoUser.id;
  const findProduct = await findProductDetailCardService(id_user, id_product);

  console.log("now    :", findProduct);

  if (!findProduct) {
    return res.status(200).json({
      status: true,
      data: "Not Found  Product",
    });
  }

  console.log(findProduct[0].dataValues.quantity);

  console.log(quantity);

  const newQuantity =
    Number(findProduct[0].dataValues.quantity) - Number(quantity);
  console.log(newQuantity);

  if (newQuantity <= 1) {
    let defaultQuantity = 1;
    const updateCartQuantityOne = await increaseQuantityCartServer({
      id_user,
      id_product,
      defaultQuantity,
    });
    console.log(updateCartQuantityOne);
    const findCurrentProduct = await findProductDetailCardService(
      id_user,
      id_product
    );
    return res.status(200).json({
      status: true,
      data: findCurrentProduct,
    });
  }

  const updateCart = await increaseQuantityCartServer({
    id_user,
    id_product,
    newQuantity,
  });
  console.log(updateCart);
  const findCurrentProduct = await findProductDetailCardService(
    id_user,
    id_product
  );
  return res.status(200).json({
    status: true,
    data: findCurrentProduct,
  });

  // console.log(findProduct);
};

module.exports = {
  findCartUserController,
  addProductToCartController,
  reduceQuantityProductInCartController,
};
