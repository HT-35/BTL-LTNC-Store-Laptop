const mongoose = require("mongoose");
const { productModel } = require("../models/Product.model.mongodb");


const createProductService = as (data) => {
     const createProductDatabase = await productModel.create(data);
}