import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateMobile, validateEmail } from "../../../utils/Validation";
import AuthSidebar from "./AuthSidebar";
import API from "../../../api/instance";
import { toast } from "react-toastify";
import Loader from "../../../Pages/Loader";

export default function LoginPassword() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    identifier: "",
    password: "",
    type: "mobile",
    loading: false,
  });

  const update = (obj) =>
    setState((prev) => ({ ...prev, ...obj }));

  // 📱 Detect email or mobile
  const handleIdentifierChange = (val) => {
    let type = "mobile";
    if (val.includes("@")) type = "email";

    update({ identifier: val, type });
  };

  // 🚀 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const err =
      state.type === "email"
        ? validateEmail(state.identifier)
        : validateMobile(state.identifier);

    if (err) return toast.error(err);

    if (!state.password) {
      return toast.error("Password is required");
    }

    update({ loading: true });

    try {
      const { data } = await API.post("/auth/login-by-password", {
        identity: state.identifier,
        password: state.password,
      });

      update({ loading: false });

      if (data.token) {
        toast.success("Login successful ✅");

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/");
      }
    } catch (err) {
      update({ loading: false });
      toast.error(
        err.response?.data?.message || "Login failed"
      );
    }
  };

  // 🔄 Loader
  if (state.loading) return <Loader />;

  return (
    <div className="bg-gray-100 flex items-center justify-center px-4 overflow-auto">
      <div className="my-12 flex w-full max-w-3xl shadow-2xl rounded-sm overflow-hidden bg-white min-h-[500px]">

        <AuthSidebar
          title="Login with Password"
          subtitle="Access your account using email or mobile number"
        />

        <div className="flex-1 px-8 py-10 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* Identifier */}
            <div className="flex flex-col gap-1">
              <input
                type="text"
                value={state.identifier}
                onChange={(e) =>
                  handleIdentifierChange(e.target.value)
                }
                placeholder="Enter Email / Mobile number"
                className="border-b-2 border-gray-300 focus:border-primary outline-none py-2 text-sm bg-transparent"
                required
              />
              <p className="text-[10px] text-gray-400 uppercase font-semibold">
                Detecting: {state.type}
              </p>
            </div>

            {/* Password */}
            <input
              type="password"
              value={state.password}
              onChange={(e) =>
                update({ password: e.target.value })
              }
              placeholder="Enter Password"
              className="border-b-2 border-gray-300 focus:border-primary outline-none py-2 text-sm bg-transparent"
              required
            />

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-secondary text-white font-bold py-3.5 rounded-sm"
            >
              LOGIN
            </button>

            {/* Switch Options */}
            <Link
              to="/login"
              className="text-center text-primary text-sm hover:underline"
            >
              Login with OTP instead
            </Link>

            <Link
              to="/register"
              className="text-center text-primary text-sm hover:underline"
            >
              New user? Create account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}