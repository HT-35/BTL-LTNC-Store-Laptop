const productModel = require("../models/Product.model.mongodb");

const createProductController = (req, res) => {
  const data = req.files.length;
  for (const i of req.files.length) {
    console.log(data.path);
  }
  console.log(data);
  res.status(200).json({
    status: true,
    data: data,
  });
};

module.exports = {
  createProductController,
};
