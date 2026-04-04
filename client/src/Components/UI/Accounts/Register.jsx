import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { validateMobile, validateEmail, validateOTP, validateName } from "../../../utils/Validation";

export default function Register() {
  const [step, setStep] = useState("details"); // "details" | "otp"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    if (step === "details") {
      const nameError = validateName(formData.name);
      const emailError = validateEmail(formData.email);
      const mobileError = validateMobile(formData.mobile);

      if (nameError || emailError || mobileError) {
        setError(nameError || emailError || mobileError);
        return;
      }

      setLoading(true);
      // Mock sending OTP
      setTimeout(() => {
        setLoading(false);
        setStep("otp");
        setResendTimer(30);
      }, 1500);
    } else {
      const otpError = validateOTP(otp);
      if (otpError) {
        setError(otpError);
        return;
      }
      setLoading(true);
      // Simulate API verification
      setTimeout(() => {
        setLoading(false);
        // Successful registration logic
      }, 2000);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center px-4">
      <div className="my-12 flex w-full max-w-3xl shadow-2xl rounded-sm overflow-hidden bg-white">
        
        {/* ── Left Blue Panel ── */}
        <div className="hidden md:flex flex-col justify-between bg-[#2874f0] text-white w-[38%] px-8 pt-10 pb-10 min-h-[550px]">
          <div>
            <div className="flex items-center gap-1 mb-8">
              <span className="text-yellow-400 font-black text-2xl italic">S</span>
              <span className="font-bold text-lg italic">tore For All</span>
            </div>
            <h2 className="text-[1.6rem] font-bold leading-snug mb-3">
              {step === "details" ? "Signup" : "Verify OTP"}
            </h2>
            <p className="text-blue-200 text-sm leading-relaxed">
              {step === "details" 
                ? "We recommend you to sign up with your mobile number which will be used for all future communications."
                : `Enter the 6-digit OTP sent to +91 ${formData.mobile}`}
            </p>
          </div>
          
          <div className="flex justify-center">
             <div className="w-32 h-32 bg-blue-400 rounded-full flex items-center justify-center opacity-80 backdrop-blur-sm">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
             </div>
          </div>
        </div>

        {/* ── Right Form Panel ── */}
        <div className="flex-1 px-8 py-10 flex flex-col justify-center">
          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            {error && (
              <div className="bg-red-50 text-red-600 text-xs py-2 px-3 rounded-sm border border-red-100 italic">
                {error}
              </div>
            )}

            {step === "details" ? (
              <>
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="border-b-2 border-gray-300 focus:border-[#2874f0] outline-none py-2 text-sm text-gray-800 placeholder-gray-400 bg-transparent transition-colors"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="border-b-2 border-gray-300 focus:border-[#2874f0] outline-none py-2 text-sm text-gray-800 placeholder-gray-400 bg-transparent transition-colors"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <input
                    type="tel"
                    name="mobile"
                    maxLength={10}
                    value={formData.mobile}
                    onChange={(e) => setFormData(prev => ({...prev, mobile: e.target.value.replace(/\D/, "")}))}
                    placeholder="Mobile Number"
                    className="border-b-2 border-gray-300 focus:border-[#2874f0] outline-none py-2 text-sm text-gray-800 placeholder-gray-400 bg-transparent transition-colors"
                    required
                  />
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500 mb-1">
                  OTP sent to <span className="text-[#2874f0] font-semibold">+91 {formData.mobile}</span>
                  <button
                    type="button"
                    onClick={() => setStep("details")}
                    className="ml-2 text-xs text-[#2874f0] underline"
                  >
                    Change
                  </button>
                </p>
                <div className="flex items-center border-b-2 border-gray-300 focus-within:border-[#2874f0] transition-colors">
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))}
                    placeholder="Enter 6-digit OTP"
                    className="flex-1 outline-none py-2 text-sm text-gray-800 placeholder-gray-400 bg-transparent tracking-[0.5em] font-bold"
                    required
                    autoFocus
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                   <button 
                    type="button"
                    disabled={resendTimer > 0}
                    className="text-xs text-[#2874f0] font-semibold disabled:text-gray-400"
                    onClick={() => {
                        setResendTimer(30);
                        // Trigger resend API
                    }}
                   >
                     Resend OTP {resendTimer > 0 && `(${resendTimer}s)`}
                   </button>
                </div>
              </div>
            )}

            <p className="text-xs text-gray-500 mt-2">
              By continuing, you agree to Store For All's{" "}
              <Link className="text-[#2874f0] hover:underline">Terms of Use</Link> and{" "}
              <Link className="text-[#2874f0] hover:underline">Privacy Policy</Link>.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary hover:bg-[#e05510] text-white font-bold py-3.5 rounded-sm tracking-widest text-sm transition-all active:scale-95 mt-4 flex items-center justify-center gap-2"
            >
              {loading ? (
                 <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Processing...
                </>
              ) : (
                step === "details" ? "CONTINUE" : "VERIFY OTP"
              )}
            </button>

            <Link
              to="/login"
              className="w-full border border-gray-300 hover:bg-gray-50 text-[#2874f0] font-bold py-3.5 rounded-sm text-sm transition-all active:scale-95 text-center"
            >
              Existing User? Log in
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
