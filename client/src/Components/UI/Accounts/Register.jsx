import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateMobile, validateEmail, validateOTP, validateName } from "../../../utils/Validation";
import AuthSidebar from "./AuthSidebar";
import API from "../../../api/instance";

export default function Register() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    step: "details", // "details" | "otp"
    formData: { name: "", identifier: "" },
    type: "mobile", // "mobile" | "email"
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
  
  const handleIdentifierChange = (val) => {
    let type = "mobile";
    if (val.includes("@")) {
      type = "email";
    }
    update({ formData: { ...state.formData, identifier: val }, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    update({ error: "" });

    if (state.step === "details") {
      const { name, identifier } = state.formData;
      const nameErr = validateName(name);
      const identErr = state.type === "email" ? validateEmail(identifier) : validateMobile(identifier);
      
      if (nameErr || identErr) return update({ error: nameErr || identErr });

      update({ loading: true });
      try {
        const payload = {
          [state.type]: identifier,
          type: state.type
        };
        const { data } = await API.post("/auth/send-otp", payload);
        if (data.success) {
          update({ step: "otp", loading: false, timer: 30 });
        } else {
          update({ error: data.message, loading: false });
        }
      } catch (err) {
        update({ error: err.response?.data?.message || "Failed to send OTP", loading: false });
      }
    } else {
      const err = validateOTP(state.otp);
      if (err) return update({ error: err });

      update({ loading: true });
      try {
        const payload = {
          name: state.formData.name,
          [state.type]: state.formData.identifier,
          type: state.type,
          otp: state.otp
        };
        const { data } = await API.post("/auth/verify-otp", payload);
        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/");
        } else {
          update({ error: data.message, loading: false });
        }
      } catch (err) {
        update({ error: err.response?.data?.message || "Verification failed", loading: false });
      }
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center px-4 overflow-auto">
      <div className="my-12 flex w-full max-w-3xl shadow-2xl rounded-sm overflow-hidden bg-white min-h-[550px]">
        
        <AuthSidebar 
          title={state.step === "details" ? "Signup" : "Verify OTP"} 
          subtitle={state.step === "details" ? "We recommend you to sign up with your mobile number" : `Enter the OTP sent to ${state.formData.identifier}`}
        />

        <div className="flex-1 px-8 py-10 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {state.error && (
              <div className="bg-red-50 text-red-600 text-xs py-2 px-3 rounded-sm border border-red-100 font-medium">
                {state.error}
              </div>
            )}

            {state.step === "details" ? (
              <>
                <div className="flex flex-col gap-1">
                  <input 
                    name="name" 
                    value={state.formData.name} 
                    onChange={(e) => update({ formData: { ...state.formData, name: e.target.value } })} 
                    placeholder="Full Name" 
                    className="border-b-2 border-gray-300 focus:border-primary outline-none py-2 text-sm bg-transparent" 
                    required 
                  />
                </div>
                <div className="flex flex-col gap-1 text-inter">
                  <input 
                    name="identifier" 
                    value={state.formData.identifier} 
                    onChange={(e) => handleIdentifierChange(e.target.value)} 
                    placeholder="Mobile Number / Email Address" 
                    className="border-b-2 border-gray-300 focus:border-primary outline-none py-2 text-sm bg-transparent" 
                    required 
                  />
                  <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-semibold">
                    Registering with: {state.type}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500 mb-1">
                  OTP sent to <span className="text-primary font-semibold">{state.formData.identifier}</span>
                  <button type="button" onClick={() => update({ step: "details" })} className="ml-2 text-xs underline hover:text-primary transition-colors">Change</button>
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
                  className={`text-xs font-semibold mt-2 text-left ${state.timer > 0 ? "text-gray-400" : "text-primary hover:underline transition-colors"}`}
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

            <button type="submit" disabled={state.loading} className="w-full bg-secondary hover:brightness-95 disabled:bg-orange-300 text-white font-bold py-3.5 rounded-sm text-sm transition-all flex items-center justify-center gap-2 shadow-sm">
              {state.loading ? "PROCESSING..." : (state.step === "details" ? "CONTINUE" : "VERIFY OTP")}
            </button>

            <Link to="/login" className="w-full text-center text-primary font-bold py-3.5 text-sm border border-gray-100 rounded-sm hover:bg-gray-50 transition-colors">
              Existing User? Log in
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
