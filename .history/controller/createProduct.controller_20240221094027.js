const productModel = require("../models/Product.model.mongodb");

const createProductController = (req, res) => {
  const data = req.files;
  if (!data) {
    return res.status(404).json({
      status: false,
      data: data,
    });
  }
  for (const i of data) {
    console.log(i.path);
  }
  res.status(200).json({
    status: true,
    data: data,
  });
};

module.exports = {
  createProductController,
};
