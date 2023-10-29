const mongoose = require("mongoose");

const connectDB = async (url) => {
  console.log("Connecting with database...");
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
