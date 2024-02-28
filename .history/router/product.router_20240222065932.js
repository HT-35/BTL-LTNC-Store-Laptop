const productRouter = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/image");
  },
  filename: function (req, file, cb) {
    req.originalname = Date.now() + "-" + file.originalname;
    cb(null, req.originalname);
  },
});
const upload = multer({ storage: storage });

//    [http://localhost:3000/product/create]
const { createProductController } = require("../controller/Product.controller");


// 
productRouter.post(
  "/create",
  upload.array("photos", 12),
  createProductController
);

module.exports = { productRouter };
