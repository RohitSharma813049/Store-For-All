// models/Order/order.model.js
import mongoose from "mongoose";
import addressSchema from "./Address.schema.js";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      price: Number
    }
  ],

  address: addressSchema,

  totalAmount: Number,

  paymentMethod: {
    type: String,
    enum: ["COD","UPI","card"]
  },

  paymentStatus: {
    type: String,
    enum: ["pending","paid","failed"]
  },

  orderStatus: {
    type: String,
    enum: ["pending","confirmed","shipped","delivered","cancelled"]
  }

}, { timestamps: true });

export default mongoose.model("Order", orderSchema);