const productModel = require("../models/Product.model.mongodb");

const createProductController = (req, res) => {
  const data = req.files[0].path;
  console.log(data);
  res.status(200).json({
    status: true,
    data: data,
  });
};

module.exports = {
  createProductController,
};
