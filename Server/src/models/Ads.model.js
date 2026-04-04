// models/Ads/ads.model.js
import mongoose from "mongoose";

const adsSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,

  isActive: Boolean,

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }

}, { timestamps: true });

export default mongoose.model("Ads", adsSchema);