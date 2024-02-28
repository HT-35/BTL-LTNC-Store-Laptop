const mongoose = require("mongoose");
const { productModel } = require("../models/Product.model.mongodb");

const createProductService = async (data) => {
  try {
    if (!data) {
      throw new Error("Không có dữ liệu đầu vào!");
    }
    const createProductDatabase = await productModel.create(data);
    return createProductDatabase;
  } catch (error) {
    return error;
  }
};

const getAllService = async () => {
  try {
    const getAllProduct = await productModel.find();
    return getAllProduct;
  } catch (error) {
    return error;
  }
};

const getDetailProductById = async () => {
  const findDetailProduct = await productModel.findOne({ slug }).exec();
};
module.exports = {
  createProductService,
  getAllService,
};
