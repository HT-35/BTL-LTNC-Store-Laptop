const { default: mongoose } = require("mongoose");
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
{}
    const slug = ``
    if (!data) {
      return res.status(404).json({
        status: false,
        data: "missing data !!",
      });
    }
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

const getAllProductController = async (req, res) => {
  try {
    const getAllProduct = await productModel.find();
    res.status(200).json({
      status: true,
      data: getAllProduct,
    });
  } catch (error) {
    res.status(404).json({
      status: true,
      data: error,
    });
  }
};

const getDetailByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const _id = new mongoose.Types.ObjectId(id);
    const findDetailById = await productModel.findById({ _id });

    if (!id) {
      res.status(400).json({
        status: false,
        data: "missing id !!",
      });
    }
    res.status(200).json({
      status: true,
      data: findDetailById,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "An error occurred",
      error: error.message,
    });
  }
};

module.exports = {
  createProductController,
  getAllProductController,
  getDetailByIdController,
};
