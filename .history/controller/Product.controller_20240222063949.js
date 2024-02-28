const { productModel } = require("../models/Product.model.mongodb");

const createProductController = async (req, res) => {
  try {
    const image = req.files;

    const pathImg = image.map((item) => ({ path: item.path }));
    if (image.length === 0) {
      return res.status(404).json({
        status: false,
        data: "Missing Image",
      });
    }

    // Hoặc sử dụng phương thức map
    const stringArr = pathImg.map((img) => img.path);

    // console.log(pathObj);
    req.body.image = stringArr;

    const data = req.body;
    const createProductDatabase = await productModel.create(data);

    res.status(200).json({
      status: true,
      data: createProductDatabase,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      data: error,
    });
  }
};

module.exports = {
  createProductController,
};
