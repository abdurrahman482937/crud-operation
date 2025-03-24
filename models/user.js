const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  imageUrl: String,
});

module.exports = mongoose.model("User", userSchema);