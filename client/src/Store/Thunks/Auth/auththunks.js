import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/Axios";


// ================= REGISTER =================
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/register", userData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Registration failed" }
      );
    }
  }
);


// ================= VERIFY REGISTER OTP =================
export const verifyRegisterOtp = createAsyncThunk(
  "auth/verifyRegisterOtp",
  async (otpData, { rejectWithValue }) => {
    try {
      const { data } = await API.post(
        "/auth/verify-register-otp",
        otpData
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "OTP verification failed" }
      );
    }
  }
);


// ================= LOGIN OTP (SEND OTP) =================
export const loginOtp = createAsyncThunk(
  "auth/loginOtp",
  async (loginData, { rejectWithValue }) => {
    try {
      const { data } = await API.post(
        "/auth/login-otp",
        loginData
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Login OTP failed" }
      );
    }
  }
);


// ================= VERIFY LOGIN OTP =================
export const verifyLoginOtp = createAsyncThunk(
  "auth/verifyLoginOtp",
  async (otpData, { rejectWithValue }) => {
    try {
      const { data } = await API.post(
        "/auth/verify-login-otp",
        otpData
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Login OTP verification failed" }
      );
    }
  }
);


// ================= LOGIN BY PASSWORD =================
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const { data } = await API.post(
        "/auth/login-by-password",
        loginData
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Login failed" }
      );
    }
  }
);