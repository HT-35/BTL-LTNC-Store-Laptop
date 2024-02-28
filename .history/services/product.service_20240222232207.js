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

const getDetailProductById = async (slug) => {
  try {
    const findDetailProduct = await productModel.findOne({ slug }).exec();
    if (!findDetailProduct) {
      return null;
    } else {
      return findDetailProduct;
    }
  } catch (error) {
    return error.message;
  }
};

const updateDataProductbySlug = async (slug, data) => {
  try {
    if (!slug) {
      return null;
    }
    const updateProduct = await productModel.findOneAndUpdate({ slug }, data, {
      new: true,
    });

    return updateProduct;
  } catch (error) {
    return error;
  }
};


const deleteProductBySlug = as
module.exports = {
  createProductService,
  getAllService,
  getDetailProductById,
  updateDataProductbySlug,
};
