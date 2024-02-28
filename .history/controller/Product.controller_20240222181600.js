const mongoose = require("mongoose");
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
    console.log("====================================");
    console.log(data);
    console.log("====================================");

    const { nameLaptop } = data;

    // Bước 1: Xác định và loại bỏ các phần không mong muốn
    const desiredPart = nameLaptop.split("/").shift(); // Lấy phần trước dấu "/"
    const cleanedName = desiredPart.replace(/[^\w\s]/gi, ""); // Loại bỏ các ký tự không phải là chữ cái hoặc số

    // Bước 2: Thay thế khoảng trắng bằng dấu gạch ngang
    const slug = cleanedName.replace(/\s+/g, "-");

    data.slug = slug;
    // console.log(slug);
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

const getDetailBySlugController = async (req, res) => {
  try {
    const { slug } = req.params;
    const findDetailBySlug = await productModel.findOne({ slug }).exec();
    if (!findDetailBySlug) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
    // Nếu tìm thấy sản phẩm, tiếp tục xử lý ở đây
    // Ví dụ: trả về sản phẩm đã tìm thấy
    res.status(200).json(findDetailBySlug);

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

const UpdateDetailBySlugController = as

module.exports = {
  createProductController,
  getAllProductController,
  getDetailBySlugController,
};
