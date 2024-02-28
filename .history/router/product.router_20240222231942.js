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

const {
  createProductController,
  getAllProductController,
  getDetailBySlugController,
  UpdateDetailBySlugController,
  DeleteProductController,
} = require("../controller/Product.controller");

//    [http://localhost:3000/product/create]
productRouter.post(
  "/create",
  upload.array("photos", 12),
  createProductController
);

//    http://localhost:3000/product/update/:slug
productRouter.put(
  "/update/:slug",
  upload.array("photos", 12),
  UpdateDetailBySlugController
);

// http://localhost:3000/product/:id
productRouter.get("/:slug", getDetailBySlugController);

//   http://localhost:3000/product/
productRouter.get("/", getAllProductController);

//   http://localhost:3000/product/delete/:slug
productRouter.get("/delete/:id", DeleteProductController);

module.exports = { productRouter };
