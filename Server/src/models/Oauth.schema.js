// models/OAuth/oauth.schema.js
import mongoose from "mongoose";

const oAuthSchema = new mongoose.Schema({
  provider: {
    type: String,
    enum: ["google", "facebook", "github"]
  },
  providerId: String,
  accessToken: String,
  refreshToken: String
}, { _id: false });

export default oAuthSchema;