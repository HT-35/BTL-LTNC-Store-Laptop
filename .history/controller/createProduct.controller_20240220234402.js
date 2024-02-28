const productModel = require("../models/Product.model.mongodb");

const createProductController = (req, res) => {
  const { body } = req;
  console.log(body);
  res.status(200).json({
    status: true,
    data: body,
  });
};

module.exports = {
  createProductController,
};
