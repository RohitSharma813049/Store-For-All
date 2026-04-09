import UserModel from "../../../models/User.model.js";
import redis from "../../../configs/redis.js";

const VerifyLoginOtpController = async (req, res) => {
  try {
    const { identity, otp } = req.body;

    const data = await redis.get(`login:${identity}`);

    if (!data) {
      return res.status(400).json({
        message: "OTP expired"
      });
    }

    const { otp: storedOtp } = data;

    // ✅ Fix type issue
    if (String(otp) !== String(storedOtp)) {
      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    const user = await UserModel.findOne({
      $or: [{ email: identity }, { mobile: identity }]
    });

    // 🧹 delete OTP
    await redis.del(`login:${identity}`);

    return res.json({
      message: "Login successful ✅",
      user
    });

  } catch (e) {
    console.error("Verify Login OTP Error:", e);
    res.status(500).json({
      message: "Login Failed",
      error: e.message
    });
  }
};

export default VerifyLoginOtpController;