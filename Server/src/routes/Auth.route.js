import express from "express";
import RegisterController from "../controllers/Auth/Register/Register.controller.js";
import VerifyRegisterOtpController from "../controllers/Auth/Register/VerifyRegisterOtp.controller.js";
import ValidateRegister from "../middlewares/Auth/validateRegister.js";
import LoginOtpController from "../controllers/Auth/Login/LoginOtp.controller.js";
import VerifyLoginOtpController from "../controllers/Auth/Login/VerifyLoginOtp.controller.js";
import LoginPasswordController from "../controllers/Auth/Login/LoginPassword.controller.js";
const router = express.Router();

// Example route
router.get("/", (req, res) => {
  res.json({ message: "Auth routes" });
});
router.post("/register", ValidateRegister, RegisterController);
router.post("/verify-register-otp", VerifyRegisterOtpController);
router.post("/login-otp", LoginOtpController);
router.post("/verify-login-otp", VerifyLoginOtpController);
router.post("/login-by-password", LoginPasswordController);
export default router;
