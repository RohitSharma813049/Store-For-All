// models/Store/store.model.js
import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  storeName: { type: String, unique: true },
  description: String,

  isVerified: { type: Boolean, default: false },

  totalSales: { type: Number, default: 0 }

}, { timestamps: true });

export default mongoose.model("Store", storeSchema);