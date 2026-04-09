import UserModel from "../../../models/User.model.js";
import GenerateOtp from "../../../utils/GenerateOtp.js";
import sendEmail from "../../../utils/Email.js";
import sendSMS from "../../../utils/SMS.js";
import redis from "../../../configs/redis.js";

const LoginOtpController = async (req, res) => {
  try {
    let { identity } = req.body;

    // 🔥 Normalize identity
    const isEmail = identity.includes("@");

    if (!isEmail) {
      identity = identity.startsWith("+91")
        ? identity
        : `+91${identity}`;
    }

    const user = await UserModel.findOne(
      isEmail ? { email: identity } : { phone: identity }
    );

    if (!user) {
      return res.status(404).json({
        message: "User Not Found"
      });
    }

    const otp = GenerateOtp();

    await redis.set(
      `login:${identity}`,
      JSON.stringify({ otp }),
      { ex: 300 }
    );

    if (isEmail) {
      await sendEmail({
        email: identity,
        subject: "Login OTP",
        html: `<h3>Your OTP is ${otp}</h3>`
      });
    } else {
      await sendSMS({
        phone: identity,
        message: `Your OTP is ${otp}`
      });
    }

    return res.json({
      message: "OTP sent successfully"
    });

  } catch (e) {
    console.error("Login OTP Error:", e);
    res.status(500).json({
      message: "Login Failed"
    });
  }
};

export default LoginOtpController;