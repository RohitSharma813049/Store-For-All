import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateMobile, validateEmail, validateOTP } from "../../../utils/Validation";
import AuthSidebar from "./AuthSidebar";
import API from "../../../api/instance";
import { toast } from "react-toastify";
import Loader from "../../../Pages/Loader";


export default function Login() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    step: "identifier",
    identifier: "",
    type: "mobile",
    otp: "",
    loading: false,
    timer: 0
  });

  const update = (obj) =>
    setState(prev => ({ ...prev, ...obj }));

  // ⏱ Timer
  useEffect(() => {
    let interval;
    if (state.timer > 0) {
      interval = setInterval(() => {
        setState(prev => ({ ...prev, timer: prev.timer - 1 }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state.timer]);

  // 📱 Detect type
  const handleIdentifierChange = (val) => {
    let type = "mobile";
    if (val.includes("@")) type = "email";
    update({ identifier: val, type });
  };

  // 🚀 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 👉 STEP 1
    if (state.step === "identifier") {
      const err =
        state.type === "email"
          ? validateEmail(state.identifier)
          : validateMobile(state.identifier);

      if (err) return toast.error(err);

      update({ loading: true });

      try {
        const { data } = await API.post("/auth/login-otp", {
          identity: state.identifier
        });

        update({ loading: false });

        if (data.message) {
          toast.success("OTP sent ✅");
          update({ step: "otp", timer: 30 });
        }
      } catch (err) {
        update({ loading: false });
        toast.error(err.response?.data?.message || "Failed to send OTP");
      }
    }

    // 👉 STEP 2
    else {
      const err = validateOTP(state.otp);
      if (err) return toast.error(err);

      update({ loading: true });

      try {
        const { data } = await API.post("/auth/verify-login-otp", {
          identity: state.identifier,
          otp: state.otp
        });

        update({ loading: false });

        if (data.token) {
          toast.success("Login successful 🎉");

          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          navigate("/");
        }
      } catch (err) {
        update({ loading: false });
        toast.error(err.response?.data?.message || "Invalid OTP");
      }
    }
  };

  // 🔁 Resend OTP
  const handleResendOtp = async () => {
    try {
      const { data } = await API.post("/auth/login-otp", {
        identity: state.identifier
      });

      if (data.message) {
        toast.success("OTP resent ✅");
        update({ timer: 30 });
      }
    } catch (err) {
      toast.error("Failed to resend OTP");
    }
  };

  // 🔄 Loader
  if (state.loading) return <Loader />;

  return (
    <div className="bg-gray-100 flex items-center justify-center px-4 overflow-auto">
      <div className="my-12 flex w-full max-w-3xl shadow-2xl rounded-sm overflow-hidden bg-white min-h-[500px]">

        <AuthSidebar
          title="Login"
          subtitle="Get access to your Orders, Wishlist and Recommendations"
        />

        <div className="flex-1 px-8 py-10 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {state.step === "identifier" ? (
              <div className="flex flex-col gap-1">
                <input
                  value={state.identifier}
                  onChange={(e) => handleIdentifierChange(e.target.value)}
                  placeholder="Enter Email / Mobile number"
                  className="border-b-2 border-gray-300 focus:border-primary outline-none py-2 text-sm"
                  required
                />
                <p className="text-[10px] text-gray-400 uppercase">
                  Detecting: {state.type}
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500">
                  OTP sent to{" "}
                  <span className="text-primary font-semibold">
                    {state.identifier}
                  </span>
                </p>

                <input
                  maxLength={6}
                  value={state.otp}
                  onChange={(e) =>
                    update({
                      otp: e.target.value.replace(/\D/g, "")
                    })
                  }
                  placeholder="Enter 6-digit OTP"
                  className="border-b-2 border-gray-300 py-2 text-sm tracking-[0.5em]"
                  required
                />

                <button
                  type="button"
                  disabled={state.timer > 0}
                  onClick={handleResendOtp}
                  className="text-xs text-primary"
                >
                  Resend OTP {state.timer > 0 && `(${state.timer}s)`}
                </button>
              </>
            )}

            <button className="w-full bg-secondary text-white py-3 rounded">
              {state.step === "identifier" ? "CONTINUE" : "VERIFY OTP"}
            </button>

            <Link to="/login-password" className="text-center text-primary">
              Login with Password
            </Link>

            <Link to="/register" className="text-center text-primary">
              New user? Create account
            </Link>

          </form>
        </div>
      </div>
    </div>
  );
}