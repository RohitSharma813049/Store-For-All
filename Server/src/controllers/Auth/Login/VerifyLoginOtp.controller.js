import UserModel from "../../../models/User.model.js";
import redis from "../../../configs/redis.js";
import jwt from "jsonwebtoken";

const VerifyLoginOtpController = async (req, res) => {
  try {
    let { identity, otp } = req.body;

    // 🔥 Normalize identity (same as above)
    const isEmail = identity.includes("@");

    if (!isEmail) {
      identity = identity.startsWith("+91")
        ? identity
        : `+91${identity}`;
    }

    const data = await redis.get(`login:${identity}`);

    if (!data) {
      return res.status(400).json({
        message: "OTP expired"
      });
    }

    // ✅ FIX: Parse JSON
    const parsedData = data;
    const storedOtp = parsedData.otp;

    if (String(otp) !== String(storedOtp)) {
      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    const user = await UserModel.findOne(
      isEmail ? { email: identity } : { phone: identity }
    );

    // 🧹 delete OTP
    await redis.del(`login:${identity}`);

    // 🔥 Generate TOKEN (MAIN FIX)
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔒 hide password
    user.password = undefined;

    return res.json({
      message: "Login successful ✅",
      token,
      user,
    });

  } catch (e) {
    console.error("Verify Login OTP Error:", e);
    res.status(500).json({
      message: "Login Failed"
    });
  }
};

export default VerifyLoginOtpController;