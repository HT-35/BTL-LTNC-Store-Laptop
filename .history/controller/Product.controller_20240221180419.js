const { productModel } = require("../models/Product.model.mongodb");

const createProductController = async (req, res) => {
  const image = req.files;
  const data = req.body;

  const pathImg = image.filter((item) => {
    console.log("item: ", item.path);
    // const path = item.path;
    return { ...[path] };
  });
  if (image.length === 0) {
    return res.status(404).json({
      status: false,
      data: "Missing Image",
    });
  }
  console.log(pathImg);
  // const createProductDatabase = await productModel.create(data);

  res.status(200).json({
    status: true,
    data: data,
  });
};

module.exports = {
  createProductController,
};
