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
  auctionStart: String,
  auctionEnd: String,
  members: [{    
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'}],
  bet:
  {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;