const mongoose = require("mongoose");

const connectDB = async (url) => {
  console.log("Connecting with database...");
  return mongoose.connect(url);
};

module.exports = connectDB;
