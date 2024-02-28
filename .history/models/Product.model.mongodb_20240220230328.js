const mongoose = require("mongoose");

const processor = new Schema({
    +CPU technology: string
+Multiplier string
+Number of streams: string
+PU Speed: string
+Max speed: string
});

const product = new Schema({
  nameLaptop: {
    type: String,
  },
  color: {
    type: String,
  },
  price: {
    type: String,
  },
  image: {
    type: String,
  },
  productInformation: {
    type: String,
  },
  Specifications: [],
});
