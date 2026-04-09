import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import addressSchema from "./Address.schema.js";
import oAuthSchema from "./Oauth.schema.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
  },

  mobile: {
    type: String,
    unique: true,
    sparse: true,
    match: [/^[0-9]{10}$/, "Invalid mobile number"]
  },

  password: {
    type: String,
    minlength: 6
  },

  isVerified: {
    type: Boolean,
    default: false
  },

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

  coins: {
    type: Number,
    default: 0
  }

}, { timestamps: true });


// 🔐 Auto hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model("User", userSchema);