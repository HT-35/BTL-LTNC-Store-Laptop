const productRouter = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/image");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9) + '';
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const {
  createProductController,
} = require("../controller/createProduct.controller");

productRouter.get(
  "/create",
  upload.array("photos", 12),
  createProductController
);

module.exports = { productRouter };
