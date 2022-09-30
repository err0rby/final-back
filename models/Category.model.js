const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  image: String,
  
  title: String,
  description: String,
  century: String
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;