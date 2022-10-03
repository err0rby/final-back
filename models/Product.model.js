const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  image: String,

  category: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Category",
  },

  name: String,
  private: Boolean,
  description: String,
  priceStart: Number,
  priceFinal: Number,
  
  timer: Number,
  timeNow: Number,

  bet: [],
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;