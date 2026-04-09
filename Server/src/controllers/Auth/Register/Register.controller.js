import User from "../../../models/User.model.js";
import bcrypt from "bcryptjs";
import GenerateOtp from "../../../utils/GenerateOtp.js";
import sendEmail from "../../../utils/Email.js";
import sendSMS from "../../../utils/SMS.js";
import redis from "../../../configs/redis.js";

const RegisterController = async (req, res) => {
  try {
    const { name, identity, password } = req.body;

    console.log("RegisterController called with:", {
      name,
      identity,
      password,
    });

    if (!name || !identity || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Detect if identity is email or phone
    const isEmail = identity.includes("@");
    const query = isEmail ? { email: identity } : { phone: identity };

    // Check if user already exists
    const existingUser = await User.findOne(query);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate OTP
    const otp = GenerateOtp();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user data + OTP in Redis for 5 minutes
    await redis.set(
      `register:${identity}`,
      JSON.stringify({ name, password: hashedPassword, otp, identity }),
      { ex: 300 },
    );

    // Send OTP via email or SMS
    if (isEmail) {
      await sendEmail({
        email: identity,
        subject: "OTP for registration",
        html: `<h3>Your OTP is ${otp}</h3>`,
      });
    } else {
      const formattedPhone = identity.startsWith("+91")
        ? identity
        : `+91${identity}`;

      await sendSMS({
        phone: formattedPhone,
        message: `Your OTP is ${otp}`,
      });
    }

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (e) {
    console.error("Error in RegisterController:", e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default RegisterController;
