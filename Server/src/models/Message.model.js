// models/Message/message.model.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  content: String,
  isRead: { type: Boolean, default: false }

}, { timestamps: true });

export default mongoose.model("Message", messageSchema);