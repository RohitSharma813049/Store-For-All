import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [step, setStep] = useState("mobile"); // "mobile" | "password"
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleContinue = (e) => {
    e.preventDefault();
    if (step === "mobile" && mobile.length === 10) {
      setStep("password");
    } else if (step === "password") {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    }
  };

  return (
    <div className=" bg-gray-100 flex items-center justify-center px-4">
      <div className="my-12 flex w-full max-w-3xl shadow-2xl rounded-sm overflow-hidden bg-white">

        {/* ── Left Blue Panel ── */}
        <div className="hidden md:flex flex-col justify-between bg-[#2874f0] text-white w-[38%] px-8 pt-10 pb-0 min-h-[480px]">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-1 mb-8">
              <span className="text-yellow-400 font-black text-2xl italic">S</span>
              <span className="font-bold text-lg italic">tore For All</span>
            </div>
            <h2 className="text-[1.6rem] font-bold leading-snug mb-3">
              {step === "mobile"
                ? "Looks like you're new here!"
                : "Welcome back!"}
            </h2>
            <p className="text-blue-200 text-sm leading-relaxed">
              {step === "mobile"
                ? "Sign up with your mobile number to get started"
                : "Enter your password to log in to your account"}
            </p>
          </div>

          {/* Bottom illustration (CSS shapes mimicking the laptop/shopping scene) */}
          <div className="relative h-48 mt-6 flex items-end justify-center">
            {/* Laptop base */}
            <div className="absolute bottom-0 w-44 h-3 bg-blue-400 rounded-full opacity-60" />
            {/* Laptop screen */}
            <div className="absolute bottom-3 w-28 h-20 bg-[#1a5dc8] border-4 border-blue-300 rounded-md flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
              </div>
            </div>
            {/* Yellow cloud */}
            <div className="absolute top-4 right-8 w-10 h-6 bg-yellow-400 rounded-full" />
            <div className="absolute top-2 right-10 w-7 h-7 bg-yellow-400 rounded-full" />
            {/* Red box */}
            <div className="absolute bottom-4 left-6 w-10 h-12 bg-red-500 rounded-sm flex items-end justify-center pb-1">
              <div className="w-4 h-1.5 bg-white rounded-full opacity-60" />
            </div>
            {/* Yellow box */}
            <div className="absolute bottom-4 right-6 w-12 h-10 bg-yellow-400 rounded-sm" />
            {/* Flipkart F on yellow box */}
            <div className="absolute bottom-6 right-8 text-blue-700 font-black text-lg">S</div>
          </div>
        </div>

        {/* ── Right Form Panel ── */}
        <div className="flex-1 px-8 py-10 flex flex-col justify-center">

          {/* Mobile logo (small screens) */}
          <div className="flex md:hidden items-center gap-0 mb-6">
            <span className="text-[#2874f0] font-black text-2xl italic">S</span>
            <span className="font-bold text-lg italic text-[#2874f0]">tore For All</span>
          </div>

          <form onSubmit={handleContinue} className="flex flex-col gap-6">

            {step === "mobile" ? (
              /* ── Mobile Number Input ── */
              <div className="flex flex-col gap-1">
                <input
                  type="tel"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/, ""))}
                  placeholder="Enter Mobile number"
                  className="border-b-2 border-gray-300 focus:border-[#2874f0] outline-none py-2 text-sm text-gray-800 placeholder-gray-400 transition-colors bg-transparent"
                  required
                  autoFocus
                />
              </div>
            ) : (
              /* ── Password Input ── */
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500 mb-1">
                  Logging in as <span className="text-[#2874f0] font-semibold">+91 {mobile}</span>
                  <button
                    type="button"
                    onClick={() => setStep("mobile")}
                    className="ml-2 text-xs text-[#2874f0] underline"
                  >
                    Change
                  </button>
                </p>
                <div className="flex items-center border-b-2 border-gray-300 focus-within:border-[#2874f0] transition-colors">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="flex-1 outline-none py-2 text-sm text-gray-800 placeholder-gray-400 bg-transparent"
                    required
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[#2874f0] text-xs font-semibold ml-2"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <Link
                  to="/forgot-password"
                  className="self-end text-xs text-[#2874f0] hover:underline mt-1"
                >
                  Forgot?
                </Link>
              </div>
            )}

            {/* Terms */}
            <p className="text-xs text-gray-500">
              By continuing, you agree to Store For All's{" "}
              <Link className="text-[#2874f0] hover:underline">Terms of Use</Link> and{" "}
              <Link className="text-[#2874f0] hover:underline">Privacy Policy</Link>.
            </p>

            {/* Continue / Login Button */}
            <button
              type="submit"
              disabled={loading || (step === "mobile" && mobile.length !== 10)}
              className="w-full bg-[#fb641b] hover:bg-[#e05510] disabled:bg-orange-300 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-sm tracking-widest text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Please wait...
                </>
              ) : (
                step === "mobile" ? "CONTINUE" : "LOGIN"
              )}
            </button>

            {/* Existing user / New user toggle */}
            <button
              type="button"
              onClick={() => setStep(step === "mobile" ? "password" : "mobile")}
              className="w-full border border-gray-300 hover:bg-gray-50 text-[#2874f0] font-bold py-3.5 rounded-sm text-sm transition-all active:scale-95"
            >
              {step === "mobile" ? "Existing User? Log in" : "New User? Sign Up"}
            </button>

            {/* Divider + Google */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <button
              type="button"
              className="w-full border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-sm transition-all flex items-center justify-center gap-3 text-sm active:scale-95"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}