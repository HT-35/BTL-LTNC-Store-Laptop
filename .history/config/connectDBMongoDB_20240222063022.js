const mongoose = require("mongoose");

const connectDBMongoDB = async () => {
  try {
    await mongoose.connect("  ");
    console.log(`connect DB MongoDB Store successfull`);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  connectDBMongoDB,
};
