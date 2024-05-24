const productRouter = require("express").Router();

const {
  createProductController,
  getAllProductController,
  getDetailBySlugController,
  UpdateDetailBySlugController,
  DeleteProductController,
} = require("../controller/Product.controller");

const multer = require("multer");

//const storage = multer.diskStorage({
//  destination: function (req, file, cb) {
//    cb(null, "./public/image");
//  },
//  filename: function (req, file, cb) {
//    req.originalname = Date.now() + "-" + file.originalname;
//    cb(null, req.originalname);
//  },
//});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/app/public/image"); // Sử dụng đường dẫn tuyệt đối
  },
  filename: function (req, file, cb) {
    req.originalname = Date.now() + "-" + file.originalname;
    cb(null, req.originalname);
  },
});

//const upload = multer({ storage: storage });

const upload = multer({ storage: storage }).fields([
  { name: "img[0][color][0]" },
  { name: "img[1][color][0]" },
]);

//const upload = multer({ storage: storage }).array("images", 10); // Xử lý tối đa 10 tệp hình ảnh được gửi

//    [https://huytranfullstack.id.vn/product/create]
productRouter.post("/create", upload, createProductController);

//    https://huytranfullstack.id.vn/product/update/:slug
productRouter.put("/update/:slug", upload, UpdateDetailBySlugController);

// https://huytranfullstack.id.vn/product/:id
productRouter.get("/:slug", getDetailBySlugController);

//   https://huytranfullstack.id.vn/product/
productRouter.get("/", getAllProductController);

//   https://huytranfullstack.id.vn/product/delete/:slug
productRouter.delete("/delete/:slug", DeleteProductController);

//   https://huytranfullstack.id.vn/product/delete/:slug
productRouter.delete("/delete/", DeleteProductController);

module.exports = { productRouter };
