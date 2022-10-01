const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  verified: {
    type: Boolean,
    default: false,
  },
  purchasedProduct: [
    { type: mongoose.SchemaTypes.ObjectId, ref: "Product"},
  ],
  ban: {type: Boolean, default: false},
  role: {type: String, default: "USER"},
  wallet: {
    type:Number,
    default:0
}
});

const User = mongoose.model("User", userSchema);

module.exports = User;
