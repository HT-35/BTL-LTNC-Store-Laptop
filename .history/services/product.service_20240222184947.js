const mongoose = require("mongoose");
const { productModel } = require("../models/Product.model.mongodb");

const createProductService = async (data) => {
  if (data) return "";
  const createProductDatabase = await productModel.create(data);
  return createProductDatabase;
};

module.exports = {
  createProductService,
};
