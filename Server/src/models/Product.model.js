// models/Product/product.model.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPrice: Number,

  category: String,
  subcatogery: String,
  brand: String,

  images: [String],

  stock: Number,

  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" }

}, { timestamps: true });

export default mongoose.model("Product", productSchema);