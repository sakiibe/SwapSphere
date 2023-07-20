const mongoose = require("mongoose");

const product = new mongoose.Schema({
  productID: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },

  fileUpload: {
    type: String, // TODO: change later
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", product);
