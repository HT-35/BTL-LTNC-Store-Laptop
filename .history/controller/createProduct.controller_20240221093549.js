const productModel = require("../models/Product.model.mongodb");

const createProductController = (req, res) => {
  const data = req.files;
  for (const i of data) {
    console.log(i.path);
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
