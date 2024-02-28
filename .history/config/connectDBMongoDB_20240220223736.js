const mongoose = require("mongoose");

const connectDBMongoDB = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/myapp");
  console.log(`connect DB MongoDB ${}`);
};
