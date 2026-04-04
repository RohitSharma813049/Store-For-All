import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { validateMobile, validateEmail, validateOTP, validateName } from "../../../utils/Validation";
import AuthSidebar from "./AuthSidebar";

export default function Register() {
  const [state, setState] = useState({
    step: "details", // "details" | "otp"
    formData: { name: "", email: "", mobile: "" },
    otp: "",
    error: "",
    loading: false,
    timer: 0,
  });

  useEffect(() => {
    let interval;
    if (state.timer > 0) {
      interval = setInterval(() => {
        setState(prev => ({ ...prev, timer: prev.timer - 1 }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state.timer]);

  const update = (obj) => setState(prev => ({ ...prev, ...obj }));
  const changeFields = (e) => update({ formData: { ...state.formData, [e.target.name]: e.target.value } });

  const handleSubmit = (e) => {
    e.preventDefault();
    update({ error: "" });

    if (state.step === "details") {
      const { name, email, mobile } = state.formData;
      const err = validateName(name) || validateEmail(email) || validateMobile(mobile);
      if (err) return update({ error: err });

      update({ loading: true });
      setTimeout(() => update({ step: "otp", loading: false, timer: 30 }), 1500);
    } else {
      const err = validateOTP(state.otp);
      if (err) return update({ error: err });

      update({ loading: true });
      setTimeout(() => update({ loading: false }), 2000);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center px-4 overflow-auto">
      <div className="my-12 flex w-full max-w-3xl shadow-2xl rounded-sm overflow-hidden bg-white min-h-[550px]">
        
        {/* Modular Sidebar */}
        <AuthSidebar 
          title={state.step === "details" ? "Signup" : "Verify OTP"} 
          subtitle={state.step === "details" ? "We recommend you to sign up with your mobile number" : `Enter the OTP sent to +91 ${state.formData.mobile}`}
        />

        {/* Form Panel */}
        <div className="flex-1 px-8 py-10 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {state.error && (
              <div className="bg-red-50 text-red-600 text-xs py-2 px-3 rounded-sm border border-red-100">
                {state.error}
              </div>
            )}

            {state.step === "details" ? (
              <>
                <input name="name" value={state.formData.name} onChange={changeFields} placeholder="Full Name" className="border-b-2 border-gray-300 focus:border-primary outline-none py-2 text-sm bg-transparent" required />
                <input name="email" value={state.formData.email} onChange={changeFields} placeholder="Email Address" className="border-b-2 border-gray-300 focus:border-primary outline-none py-2 text-sm bg-transparent" required />
                <input name="mobile" value={state.formData.mobile} onChange={(e) => update({ formData: { ...state.formData, mobile: e.target.value.replace(/\D/, "") } })} placeholder="Mobile Number" className="border-b-2 border-gray-300 focus:border-primary outline-none py-2 text-sm bg-transparent" required maxLength={10} />
              </>
            ) : (
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500 mb-1">
                  OTP sent to <span className="text-primary font-semibold font-inter">+91 {state.formData.mobile}</span>
                  <button type="button" onClick={() => update({ step: "details" })} className="ml-2 text-xs underline">Change</button>
                </p>
                <input
                  type="text" maxLength={6}
                  value={state.otp}
                  onChange={(e) => update({ otp: e.target.value.replace(/\D/, "") })}
                  placeholder="Enter 6-digit OTP"
                  className="border-b-2 border-gray-300 focus:border-primary outline-none py-2 text-sm tracking-[0.5em] font-bold bg-transparent"
                  required autoFocus
                />
                <button 
                  type="button" disabled={state.timer > 0} 
                  className={`text-xs font-semibold mt-2 text-left ${state.timer > 0 ? "text-gray-400" : "text-primary"}`}
                  onClick={() => update({ timer: 30 })}
                >
                  Resend OTP {state.timer > 0 && `(${state.timer}s)`}
                </button>
              </div>
            )}

            <p className="text-xs text-gray-500 mt-2">
              By continuing, you agree to Store For All's{" "}
              <Link className="text-primary hover:underline">Terms of Use</Link> and{" "}
              <Link className="text-primary hover:underline">Privacy Policy</Link>.
            </p>

            <button type="submit" disabled={state.loading} className="w-full bg-secondary hover:brightness-95 text-white font-bold py-3.5 rounded-sm text-sm transition-all flex items-center justify-center gap-2">
              {state.loading ? "PROCESSING..." : (state.step === "details" ? "CONTINUE" : "VERIFY OTP")}
            </button>

            <Link to="/login" className="w-full text-center text-primary font-bold py-3.5 text-sm border border-gray-100 rounded-sm hover:bg-gray-50">
              Existing User? Log in
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
