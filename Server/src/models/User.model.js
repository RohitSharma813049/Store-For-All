// models/User/user.model.js
import mongoose from "mongoose";
import addressSchema from "./Address.schema.js";
import oAuthSchema from "./Oauth.schema.js";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, sparse: true },
  mobile: { type: String, unique: true, sparse: true },
  password: String,
  isVerified: { type: Boolean, default: false },

  role: {
    type: String,
    enum: [
      "user","seller","delivery","technician",
      "support","marketing","manager","admin","superadmin"
    ],
    default: "user"
  },

  addresses: [addressSchema],
  oAuthProviders: [oAuthSchema],

  coins: { type: Number, default: 0 }

}, { timestamps: true });

export default mongoose.model("User", userSchema);