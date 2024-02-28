const productModel = require("../models/Product.model.mongodb");

const createProductController = (req, res) => {
  const data = req.files;

  const pathImg = [];

  if (data.length === 0) {
    return res.status(404).json({
      status: false,
      data: "Missing Image",
    });
  }
  for (const i of data) {
    pathImg.push(i.path);
  }
  console.log(pathImg);

  res.status(200).json({
    status: true,
    data: data,
  });
};

module.exports = {
  createProductController,
};
