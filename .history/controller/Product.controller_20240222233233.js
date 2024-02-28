const mongoose = require("mongoose");
const { productModel } = require("../models/Product.model.mongodb");

const {
  createProductService,
  getAllService,
  getDetailProductById,
  updateDataProductbySlug,
  deleteProductBySlug,
} = require("../services/product.service");

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
    const createProduct = await createProductService(data);
    console.log(createProduct);
    res.status(200).json({
      status: true,
      data: createProduct,
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
    const getAllProduct = await getAllService();
    res.status(200).json({
      status: true,
      data: getAllProduct,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      data: error.message,
    });
  }
};

const getDetailBySlugController = async (req, res) => {
  try {
    const { slug } = req.params;
    const findDetailBySlug = await getDetailProductById(slug);
    if (findDetailBySlug == null) {
      return res.status(400).json({
        status: false,
        data: "not found !!!",
      });
    }
    res.status(200).json({
      status: true,
      data: findDetailBySlug,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "An error occurred",
      error: error.message,
    });
  }
};

const UpdateDetailBySlugController = async (req, res) => {
  try {
    const image = req.files;

    // console.log(image);
    const pathImg = image.map((item) => ({ path: item.path }));
    // if (image.length === 0) {
    //   return res.status(404).json({
    //     status: false,
    //     data: "Missing Image",
    //   });
    // }

    // Hoặc sử dụng phương thức map
    const stringArr = pathImg.map((img) => img.path);

    // console.log(pathObj);
    req.body.image = stringArr;

    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({ status: false, data: "missing slug" });
    }
    const findProduct = await getDetailProductById(slug);

    const data = req.body;
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    const { nameLaptop } = data;

    // Bước 1: Xác định và loại bỏ các phần không mong muốn
    const desiredPart = nameLaptop.split("/").shift(); // Lấy phần trước dấu "/"
    const cleanedName = desiredPart.replace(/[^\w\s]/gi, ""); // Loại bỏ các ký tự không phải là chữ cái hoặc số

    // Bước 2: Thay thế khoảng trắng bằng dấu gạch ngang
    const Reslug = cleanedName.replace(/\s+/g, "-");

    data.slug = Reslug;

    const updateData = await updateDataProductbySlug(slug, data);
    if (findProduct == null) {
      return res.status(404).json({
        status: false,
        data: "not found !!!",
      });
    } else if (updateData == null) {
      return res.status(404).json({
        status: false,
        data: "update fail",
      });
    }
    // console.log(findProduct);
    res.status(200).json({
      status: true,
      data: updateData,
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({
      status: false,
      erro: "an error occurred",
      data: error.message,
    });
  }
};

const DeleteProductController = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({
        status: false,
        // erro: "an error occurred",
        data: "Missing Slug",
      });
    }
    const findProduct = await getDetailProductById(slug);
    if (findProduct == null) {
      return res.status(400).json({
        status: false,
        // erro: "an error occurred",
        data: "Not Found !!!",
      });
    }

    const deleteProduct = await deleteProductBySlug(slug);
    return res.status(200).json({
      status: true,
      // erro: "an error occurred",
      delete: "1",
      data: findProduct,
    });
  } catch (error) {
    return res.status(400).json
  }
};

module.exports = {
  createProductController,
  getAllProductController,
  getDetailBySlugController,
  UpdateDetailBySlugController,
  DeleteProductController,
};
