const { productModel } = require("../models/Product.model.mongodb");

const createProductController = async (req, res) => {
  const image = req.files;
  const data = req.body;

  const pathImg = image.map((item) => ({ path: item.path }));
  if (image.length === 0) {
    return res.status(404).json({
      status: false,
      data: "Missing Image",
    });
  }

  const pathObj = pathImg.reduce((acc, item, index) => {
    acc[index] = { path: item.path };
    return acc;
  }, {});

  data.image = pathObj;
  console.log(data);

  const createProductDatabase = await productModel.create({
    data,
    image:
  });

  res.status(200).json({
    status: true,
    data: createProductDatabase,
  });
};

module.exports = {
  createProductController,
};
