import UserModel from "../../../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const LoginPasswordController = async (req, res) => {
  try {
    const { identity, password } = req.body;

    if (!identity || !password) {
      return res.status(400).json({
        message: "Email/Phone and password are required",
      });
    }

    const isEmail = identity.includes("@");

    let normalizedIdentity = identity;
    if (!isEmail) {
      normalizedIdentity = identity.startsWith("+91")
        ? identity
        : `+91${identity}`;
    }

    const user = await UserModel.findOne(
      isEmail
        ? { email: normalizedIdentity }
        : { phone: normalizedIdentity }
    );

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your account first",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔒 Hide password
    user.password = undefined;

    return res.status(200).json({
      message: "Login successful ✅",
      token,
      user,
    });

  } catch (e) {
    console.error("Login Password Error:", e);
    res.status(500).json({
      message: "Login Failed",
      error: e.message,
    });
  }
};

export default LoginPasswordController;