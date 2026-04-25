import { Link, useNavigate } from "react-router-dom";
import AuthSidebar from "./AuthSidebar";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  registerUser,
  verifyRegisterOtp,
} from "../../../Store/Thunks/Auth/auththunks";
import { toast } from "react-toastify";

export default function Register() {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userinfo, setUserinfo] = useState({
    name: "",
    identity: "",
    password: "",
    otp: "",
  });

  const handleChange = (e) => {
    setUserinfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // ================= STEP 1 =================
    if (step === 1) {
      if (!userinfo.name || !userinfo.identity || !userinfo.password) {
        toast.error("All fields are required");
        return;
      }

      const toastId = toast.loading("Sending OTP...");

      try {
        const res = await dispatch(
          registerUser({
            name: userinfo.name.trim(),
            identity: userinfo.identity.toLowerCase().trim(),
            password: userinfo.password,
          })
        ).unwrap();

        toast.update(toastId, {
          render: res?.message || "OTP sent successfully ✅",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        setStep(2);
      } catch (err) {
        toast.update(toastId, {
          render: err?.message || "Something went wrong",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    }

    // ================= STEP 2 =================
    else {
      if (userinfo.otp.length !== 6) {
        toast.error("Enter valid 6-digit OTP");
        return;
      }

      const toastId = toast.loading("Verifying OTP...");

      try {
        await dispatch(
          verifyRegisterOtp({
            identity: userinfo.identity,
            otp:userinfo.otp,
          })
        ).unwrap();

        toast.update(toastId, {
          render: "Registration Successful 🎉",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        navigate("/login");
      } catch (err) {
        toast.update(toastId, {
          render: err?.message || "Invalid OTP ❌",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center px-4">
      <div className="my-12 flex w-full max-w-3xl shadow-2xl rounded-sm overflow-hidden bg-white min-h-[550px]">
        <AuthSidebar />

        <div className="flex-1 px-8 py-10 flex flex-col justify-center">
          <form className="flex flex-col gap-5" onSubmit={handleRegister}>
            
            {/* STEP 1 */}
            {step === 1 && (
              <>
                <input
                  name="name"
                  placeholder="Full Name"
                  value={userinfo.name}
                  onChange={handleChange}
                  className="border-b-2 border-gray-300 focus:border-primary outline-none py-2"
                />

                <input
                  name="identity"
                  placeholder="Mobile Number / Email"
                  value={userinfo.identity}
                  onChange={handleChange}
                  className="border-b-2 border-gray-300 focus:border-primary outline-none py-2"
                />

                <input
                  type="password"
                  name="password"
                  value={userinfo.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="border-b-2 border-gray-300 focus:border-primary outline-none py-2"
                />
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <p className="text-sm text-gray-500">
                  OTP sent to{" "}
                  <span className="text-primary font-semibold">
                    {userinfo.identity}
                  </span>
                </p>

                <input
                  name="otp"
                  placeholder="Enter 6-digit OTP"
                  value={userinfo.otp}
                  onChange={handleChange}
                  maxLength={6}
                  className="border-b-2 border-gray-300 focus:border-primary outline-none py-2 text-center tracking-[0.5em] font-bold"
                />

                <button
                  type="button"
                  className="text-xs text-primary"
                  onClick={async () => {
                    const toastId = toast.loading("Resending OTP...");

                    try {
                      await dispatch(
                        registerUser({
                          name: userinfo.name.trim(),
                          identity: userinfo.identity.toLowerCase().trim(),
                          password: userinfo.password,
                        })
                      ).unwrap();

                      toast.update(toastId, {
                        render: "OTP Resent ✅",
                        type: "success",
                        isLoading: false,
                        autoClose: 2000,
                      });
                    } catch (err) {
                      toast.update(toastId, {
                        render: err?.message || "Failed to resend OTP",
                        type: "error",
                        isLoading: false,
                        autoClose: 2000,
                      });
                    }
                  }}
                >
                  Resend OTP
                </button>
              </>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-secondary text-white font-bold py-3 rounded-sm"
            >
              {step === 1 ? "Register" : "Verify OTP"}
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