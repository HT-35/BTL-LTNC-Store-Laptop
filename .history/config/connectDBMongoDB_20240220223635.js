const mongoose = require("mongoose");

const connectDBMongoDB = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/myapp");
}