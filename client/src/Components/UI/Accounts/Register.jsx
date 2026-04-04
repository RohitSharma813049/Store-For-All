import React, { useState } from "react";
import { Link } from "react-router-dom";
import { validateMobile, validateEmail, validatePassword, validateName } from "../../../utils/Validation";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const mobileError = validateMobile(formData.mobile);
    const passwordError = validatePassword(formData.password);

    if (nameError || emailError || mobileError || passwordError) {
      setError(nameError || emailError || mobileError || passwordError);
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Successful registration logic
    }, 2000);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center px-4">
      <div className="my-12 flex w-full max-w-3xl shadow-2xl rounded-sm overflow-hidden bg-white">
        
        {/* ── Left Blue Panel ── */}
        <div className="hidden md:flex flex-col justify-between bg-primary text-white w-[38%] px-8 pt-10 pb-10 min-h-[550px]">
          <div>
            <div className="flex items-center gap-1 mb-8">
              <span className="text-yellow-400 font-black text-2xl italic">S</span>
              <span className="font-bold text-lg italic">tore For All</span>
            </div>
            <h2 className="text-[1.6rem] font-bold leading-snug mb-3">
              Signup
            </h2>
            <p className="text-blue-200 text-sm leading-relaxed">
              We recommend you to sign up with your mobile number which will be used for all future communications.
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

            <div className="flex flex-col gap-1">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="border-b-2 border-gray-300 focus:border-primary outline-none py-2 text-sm text-gray-800 placeholder-gray-400 bg-transparent transition-colors"
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
                className="border-b-2 border-gray-300 focus:border-primary outline-none py-2 text-sm text-gray-800 placeholder-gray-400 bg-transparent transition-colors"
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
                className="border-b-2 border-gray-300 focus:border-primary outline-none py-2 text-sm text-gray-800 placeholder-gray-400 bg-transparent transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Set Password"
                className="border-b-2 border-gray-300 focus:border-primary outline-none py-2 text-sm text-gray-800 placeholder-gray-400 bg-transparent transition-colors"
                required
              />
            </div>

            <p className="text-xs text-gray-500 mt-2">
              By creating an account, you agree to Store For All's{" "}
              <Link className="text-primary hover:underline">Terms of Use</Link> and{" "}
              <Link className="text-primary hover:underline">Privacy Policy</Link>.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary hover:bg-[#e05510] text-white font-bold py-3.5 rounded-sm tracking-widest text-sm transition-all active:scale-95 mt-4 flex items-center justify-center gap-2"
            >
              {loading ? "CREATING ACCOUNT..." : "CONTINUE"}
            </button>

            <Link
              to="/login"
              className="w-full border border-gray-300 hover:bg-gray-50 text-primary font-bold py-3.5 rounded-sm text-sm transition-all active:scale-95 text-center"
            >
              Existing User? Log in
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
