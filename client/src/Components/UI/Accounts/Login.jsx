import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateMobile, validateEmail, validateOTP } from "../../../utils/Validation";
import AuthSidebar from "./AuthSidebar";
import API from "../../../api/instance";

export default function Login() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    step: "identifier", // "identifier" | "otp"
    identifier: "", // Can be email or mobile
    type: "mobile", // "mobile" | "email"
    otp: "",
    loading: false,
    error: "",
    timer: 0
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
    // Basic detection: if it contains @, it's email. If it's only digits, it's mobile.
    let type = "mobile";
    if (val.includes("@")) {
      type = "email";
    }
    update({ identifier: val, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    update({ error: "" });

    if (state.step === "identifier") {
      const err = state.type === "email" ? validateEmail(state.identifier) : validateMobile(state.identifier);
      if (err) return update({ error: err });

      update({ loading: true });
      try {
        const payload = state.type === "email" ? { email: state.identifier, type: "email" } : { mobile: state.identifier, type: "mobile" };
        const { data } = await API.post("/auth/send-otp", payload);
        if (data.success) {
          update({ step: "otp", loading: false, timer: 30 });
        } else {
          update({ error: data.message, loading: false });
        }
      } catch (err) {
        update({ error: err.response?.data?.message || "Something went wrong", loading: false });
      }
    } else {
      const err = validateOTP(state.otp);
      if (err) return update({ error: err });

      update({ loading: true });
      try {
        const payload = {
          [state.type]: state.identifier,
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
      <div className="my-12 flex w-full max-w-3xl shadow-2xl rounded-sm overflow-hidden bg-white min-h-[500px]">
        
        <AuthSidebar 
          title="Login" 
          subtitle="Get access to your Orders, Wishlist and Recommendations" 
        />

        <div className="flex-1 px-8 py-10 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {state.error && (
              <div className="bg-red-50 text-red-600 text-xs py-2 px-3 rounded-sm border border-red-100 font-medium">
                {state.error}
              </div>
            )}

            {state.step === "identifier" ? (
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  value={state.identifier}
                  onChange={(e) => handleIdentifierChange(e.target.value)}
                  placeholder="Enter Email / Mobile number"
                  className="border-b-2 border-gray-300 focus:border-primary outline-none py-2 text-sm bg-transparent transition-colors"
                  required autoFocus
                />
                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-semibold">
                  Detecting: {state.type}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500 mb-1">
                  OTP sent to <span className="text-primary font-semibold">{state.identifier}</span>
                  <button type="button" onClick={() => update({ step: "identifier" })} className="ml-2 text-xs underline hover:text-primary transition-colors">Change</button>
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

            <p className="text-xs text-gray-500">
              By continuing, you agree to Store For All's{" "}
              <Link className="text-primary hover:underline">Terms of Use</Link> and{" "}
              <Link className="text-primary hover:underline">Privacy Policy</Link>.
            </p>

            <button
              type="submit" disabled={state.loading}
              className="w-full bg-secondary hover:brightness-95 disabled:bg-orange-300 text-white font-bold py-3.5 rounded-sm text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              {state.loading ? "PLEASE WAIT..." : (state.step === "identifier" ? "CONTINUE" : "VERIFY OTP")}
            </button>

            <Link to="/register" className="w-full text-center text-primary font-bold py-3.5 text-sm border border-gray-100 rounded-sm hover:bg-gray-50 transition-colors">
              New to Store For All? Create an account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}