const mongoose = require("mongoose");

const connectDBMongoDB = async () => {
  //try {
  //  //await mongoose.connect("mongodb://root:abc@127.0.0.1:27039/Store");
  //  console.log(`connect DB MongoDB Store successfull`);
  //} catch (error) {
  //  console.log(error);
  //}

  try {
    // Sử dụng URL của Docker Compose để kết nối đến container MongoDB
    await mongoose.connect("mongodb://mongo_store/Store");
    console.log(`Kết nối CSDL MongoDB Store thành công`);
  } catch (error) {
    console.error("Lỗi kết nối đến CSDL MongoDB:", error.message);
    process.exit(1); // Thoát chương trình nếu không thể kết nối
  }
};
module.exports = {
  connectDBMongoDB,
};
