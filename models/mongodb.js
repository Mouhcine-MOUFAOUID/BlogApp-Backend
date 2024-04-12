const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://moufaouidmouhcine:sKrkJj6OWyYm6pBy@cluster0.riljri2.mongodb.net/")
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log("Error: ", error));

module.exports = mongoose;

//mongodb+srv://moufaouidmouhcine:sKrkJj6OWyYm6pBy@cluster0.riljri2.mongodb.net/