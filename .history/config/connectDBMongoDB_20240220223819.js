const mongoose = require("mongoose");

const connectDBMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/myapp");
    console.log(`connect DB MongoDB ${myapp} successfull`);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
    
}
