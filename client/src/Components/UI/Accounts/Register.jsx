import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  validateMobile,
  validateEmail,
  validateOTP,
  validateName,
} from "../../../utils/Validation";
import AuthSidebar from "./AuthSidebar";
import API from "../../../api/Axios";
import { toast } from "react-toastify";
import Loader from "../../../Pages/Loader";

export default function Register() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    step: "details",
    formData: { name: "", identifier: "", password: "" },
    type: "mobile",
    otp: "",
    loading: false,
    timer: 0,
  });

  const update = (obj) =>
    setState((prev) => ({ ...prev, ...obj }));

  // ⏱ OTP Timer
  useEffect(() => {
    let interval;
    if (state.timer > 0) {
      interval = setInterval(() => {
        setState((prev) => ({
          ...prev,
          timer: prev.timer - 1,
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state.timer]);

  // 📱 Detect email or mobile (improved)
  const handleIdentifierChange = (val) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    let type = "mobile";
    if (emailRegex.test(val)) type = "email";
    else if (mobileRegex.test(val)) type = "mobile";

    update({
      formData: { ...state.formData, identifier: val },
      type,
    });
  };

  // 🔒 Mask identifier
  const maskedIdentifier = state.formData.identifier.includes("@")
    ? state.formData.identifier.replace(/(.{2}).+(@.+)/, "$1****$2")
    : state.formData.identifier.replace(/(\d{2})\d{6}(\d{2})/, "$1******$2");

  // 🚀 Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 👉 STEP 1: SEND OTP
    if (state.step === "details") {
      const { name, identifier, password } = state.formData;

      const nameErr = validateName(name);
      const identErr =
        state.type === "email"
          ? validateEmail(identifier)
          : validateMobile(identifier);

      if (nameErr || identErr) {
        return toast.error(nameErr || identErr);
      }

      if (!password) {
        return toast.error("Password is required");
      }

      update({ loading: true });

      try {
        const { data } = await API.post("/auth/register", {
          name,
          identity: identifier,
          password,
        });

        update({ loading: false });

        if (data.message) {
          toast.success("OTP sent successfully ✅");
          update({ step: "otp", timer: 30 });
        }
      } catch (err) {
        update({ loading: false });
        toast.error(
          err.response?.data?.message || "Failed to send OTP"
        );
      }
    }

    // 👉 STEP 2: VERIFY OTP
    else {
      const err = validateOTP(state.otp);
      if (err) return toast.error(err);

      update({ loading: true });

      try {
        const { data } = await API.post(
          "/auth/verify-register-otp",
          {
            identity: state.formData.identifier,
            otp: state.otp,
          }
        );

        update({ loading: false });

        if (data.user) {
          toast.success("User registered successfully 🎉");
          navigate("/login");
        }
      } catch (err) {
        update({ loading: false });
        toast.error(
          err.response?.data?.message || "Invalid OTP"
        );
      }
    }
  };

  // 🔁 Resend OTP
  const handleResendOtp = async () => {
    try {
      const { data } = await API.post("/auth/register", {
        name: state.formData.name,
        identity: state.formData.identifier,
        password: state.formData.password,
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
  if (state.loading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center px-4 overflow-auto">
      <div className="my-12 flex w-full max-w-3xl shadow-2xl rounded-sm overflow-hidden bg-white min-h-[550px]">

        <AuthSidebar
          title={state.step === "details" ? "Signup" : "Verify OTP"}
          subtitle={
            state.step === "details"
              ? "We recommend you to sign up with your mobile number"
              : `Enter the OTP sent to ${maskedIdentifier}`
          }
        />

        <div className="flex-1 px-8 py-10 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {state.step === "details" ? (
              <>
                {/* Name */}
                <input
                  value={state.formData.name}
                  onChange={(e) =>
                    update({
                      formData: {
                        ...state.formData,
                        name: e.target.value,
                      },
                    })
                  }
                  placeholder="Full Name"
                  className="border-b-2 border-gray-300 focus:border-primary outline-none py-2 text-sm bg-transparent"
                  required
                />

                {/* Identifier */}
                <input
                  value={state.formData.identifier}
                  onChange={(e) =>
                    handleIdentifierChange(e.target.value)
                  }
                  placeholder="Mobile Number / Email Address"
                  className="border-b-2 border-gray-300 focus:border-primary outline-none py-2 text-sm bg-transparent"
                  required
                />

                <p className="text-[10px] text-gray-400 uppercase font-semibold">
                  Registering with: {state.type}
                </p>

                {/* Password */}
                <input
                  type="password"
                  value={state.formData.password}
                  onChange={(e) =>
                    update({
                      formData: {
                        ...state.formData,
                        password: e.target.value,
                      },
                    })
                  }
                  placeholder="Password"
                  className="border-b-2 border-gray-300 focus:border-primary outline-none py-2 text-sm bg-transparent"
                  required
                />
              </>
            ) : (
              <>
                <p className="text-sm text-gray-500">
                  OTP sent to{" "}
                  <span className="text-primary font-semibold">
                    {maskedIdentifier}
                  </span>
                </p>

                <input
                  maxLength={6}
                  value={state.otp}
                  onChange={(e) =>
                    update({
                      otp: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  placeholder="Enter 6-digit OTP"
                  className="border-b-2 border-gray-300 focus:border-primary outline-none py-2 text-sm tracking-[0.5em] font-bold bg-transparent"
                  required
                />

                <button
                  type="button"
                  disabled={state.timer > 0}
                  className="text-xs text-primary"
                  onClick={handleResendOtp}
                >
                  Resend OTP {state.timer > 0 && `(${state.timer}s)`}
                </button>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-secondary text-white font-bold py-3.5 rounded-sm"
            >
              {state.step === "details" ? "CONTINUE" : "VERIFY OTP"}
            </button>

            <Link to="/login" className="text-center text-primary">
              Existing User? Log in
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}