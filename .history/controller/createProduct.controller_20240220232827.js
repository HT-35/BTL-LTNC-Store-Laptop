const productModel = require("../models/Product.model.mongodb");

const createProductController = (req, res) => {
  const data = req.body;
    console.log(data);
    res.status(200)
};
