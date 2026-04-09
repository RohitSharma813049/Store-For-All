import User from "../../../models/User.model.js";
import redis from "../../../configs/redis.js";

const VerifyRegisterOtpController = async (req, res) => {
  try {
    const { identity, otp } = req.body;

    const rawData = await redis.get(`register:${identity}`);

    if (!rawData) {
      return res.status(400).json({ message: "OTP expired or not found" });
    }

    // ✅ Handle both cases (string OR object)
    const data = typeof rawData === "string" ? JSON.parse(rawData) : rawData;

    const { name, password, otp: storedOtp } = data;

    if (String(otp) !== String(storedOtp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Prevent duplicate user
    const existingUser = await User.findOne({
      $or: [{ email: identity }, { phone: identity }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const isEmail = identity.includes("@");

    const userData = {
      name,
      password,
      isVerified: true,
    };

    if (isEmail) userData.email = identity;
    else userData.phone = identity;

    const user = await User.create(userData);

    await redis.del(`register:${identity}`);

    return res.status(201).json({
      message: "User registered successfully ✅",
      user,
    });
  } catch (e) {
    console.error("Error in VerifyOtpController:", e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default VerifyRegisterOtpController;
