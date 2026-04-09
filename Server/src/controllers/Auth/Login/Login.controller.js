import UserModel from "../../../models/User.model.js";
import GenerateOtp from "../../../utils/GenerateOtp.js";
import sendEmail from "../../../utils/Email.js";
import sendSMS from "../../../utils/SMS.js";
import redis from "../../../configs/redis.js";

const LoginControllerByOtp = async (req, res) => {
  try {
    const { identity } = req.body;

    const user = await UserModel.findOne({
      $or: [{ email: identity }, { mobile: identity }]
    });

    if (!user) {
      return res.status(404).json({
        message: "User Not Found"
      });
    }

    const otp = GenerateOtp();

    // Store OTP in Redis
    await redis.set(
      `login:${identity}`,
      JSON.stringify({ otp }),
      { ex: 300 }
    );

    //  Send OTP
    if (identity.includes("@")) {
      await sendEmail({
        email: identity,
        subject: "Login OTP",
        html: `<h3>Your OTP is ${otp}</h3>`
      });
    } else {
      await sendSMS(identity, otp);
    }

    return res.json({
      message: "OTP sent successfully"
    });

  } catch (e) {
    console.error("Login OTP Error:", e);
    res.status(500).json({
      message: "Login Failed",
      error: e.message
    });
  }
};

export default LoginControllerByOtp;