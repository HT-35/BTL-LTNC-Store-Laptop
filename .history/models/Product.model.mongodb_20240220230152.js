const mongoose = require("mongoose");
import { type } from "./../node_modules/raw-body/index.d";

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
    Specifications: [
      
  ],
});
