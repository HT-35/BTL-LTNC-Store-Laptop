const mongoose = require("mongoose");

const connectDBMongoDB = as () => {
    mongoose.connect("mongodb://127.0.0.1:27017/myapp");
}