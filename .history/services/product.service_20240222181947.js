const mongoose = require("mongoose");
const { productModel } = require("../models/Product.model.mongodb");


const createProductService = (data) => {
     const createProductDatabase = await productModel.create(data);
}