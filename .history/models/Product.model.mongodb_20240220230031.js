const mongoose = require("mongoose");
import { type } from "./../node_modules/raw-body/index.d";

const product = new Schema({
  name_Laptop: {
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
  Product information: {
    type: String,
  },
});
