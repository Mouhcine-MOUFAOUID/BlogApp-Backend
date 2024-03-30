const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/blogApp")
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log("Error: ", error));

module.exports = mongoose;
