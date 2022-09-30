const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  image: String,

  category: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Category",
  },

  private: Boolean,
  description: String,
  priceStart: Number,
  priceFinal: Number,
  
  timer: Number,
  timeNow: Number,

  bet: [],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;