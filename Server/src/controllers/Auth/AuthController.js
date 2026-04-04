import User from "../../models/User.model.js";
import redis from "../../configs/Redis.js";
import sendEmail from "../../utils/Email.js";
import sendSms from "../../utils/Sms.js";
import jwt from "jsonwebtoken";

// Function to generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendOTP = async (req, res) => {
  try {
    const { email, mobile, type } = req.body; // type: 'email' or 'mobile'
    const identifier = type === 'email' ? email : mobile;

    if (!identifier) {
      return res.status(400).json({ success: false, message: "Please provide email or mobile number" });
    }

    const otp = generateOTP();
    
    // Save OTP to Redis with 5 min expiration
    await redis.set(`otp:${identifier}`, otp, { ex: 300 });

    if (type === 'email') {
      await sendEmail({
        email,
        subject: "Your OTP for Store For All",
        html: `<h1>Welcome to Store For All</h1><p>Your OTP is <b>${otp}</b>. It is valid for 5 minutes.</p>`
      });
    } else {
      await sendSms({
        phoneNumber: mobile,
        message: `Your Store For All OTP is ${otp}. Valid for 5 mins.`
      });
    }

    res.status(200).json({ success: true, message: `OTP sent to your ${type}` });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP", error: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, mobile, type, otp, name } = req.body;
    const identifier = type === 'email' ? email : mobile;

    if (!identifier || !otp) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const storedOtp = await redis.get(`otp:${identifier}`);

    if (!storedOtp) {
      return res.status(400).json({ success: false, message: "OTP expired or not found" });
    }

    if (storedOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // OTP verified, now check if user exists
    let user;
    if (type === 'email') {
      user = await User.findOne({ email });
    } else {
      user = await User.findOne({ mobile });
    }

    if (!user) {
      // Register if name is provided (sign-up flow)
      if (name) {
         user = await User.create({
            name,
            email: type === 'email' ? email : undefined,
            mobile: type === 'mobile' ? mobile : undefined,
            isVerified: true
         });
      } else {
        return res.status(404).json({ success: false, message: "User not found. Please register." });
      }
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

    // Remove OTP from Redis after verification
    await redis.del(`otp:${identifier}`);

    res.status(200).json({
      success: true,
      message: "Authentication successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, message: "Verification failed", error: error.message });
  }
};
