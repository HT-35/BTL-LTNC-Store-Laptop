const productModel = require("../models/Product.model.mongodb");

const createProductController = (req, res) => {
  const image = req.files;
  const data = req.body;

  const pathImg = [];

  if (image.length === 0) {
    return res.status(404).json({
      status: false,
      data: "Missing Image",
    });
  }
  for (const i of image) {
    pathImg.push(i.path);
  }

  res.status(200).json({
    status: true,
    data: image,
  });
};

module.exports = {
  createProductController,
};
