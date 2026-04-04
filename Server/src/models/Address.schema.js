// models/Address/address.schema.js
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  fullName: String,
  phone: String,
  street: String,
  city: String,
  state: String,
  pincode: String,
  country: { type: String, default: "India" },
  isDefault: { type: Boolean, default: false }
});

export default addressSchema;