const mongoose = require("mongoose");

const connectDB = (url) => {
  mongoose.set("strictQuery", false);
  return mongoose
    .connect(url)
    .then(() => {
      console.log("DB connected");
    })
    .catch((error) => {
      console.log(`DB connection error : ${error}`);
    });
};

module.exports = connectDB;
