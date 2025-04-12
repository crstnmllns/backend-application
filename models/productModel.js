const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: [true, "El precio es obligatorio"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
