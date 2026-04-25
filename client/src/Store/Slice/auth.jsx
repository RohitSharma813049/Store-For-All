import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  verifyRegisterOtp,
  loginUser,
} from "./../Thunks/Auth/auththunks.js";

const AuthSlice = createSlice({
  name: "auth",

  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    loading: false,
    error: null,
    role: localStorage.getItem("user").role || null,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // safer cleanup
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    // ================= REGISTER =================
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        // OTP step only
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed";
      });

    // ================= VERIFY OTP =================
    builder
      .addCase(verifyRegisterOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyRegisterOtp.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload?.user;
        state.token = action.payload?.token;
        state.isAuthenticated = true;

        // persist
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user)
        );
      })
      .addCase(verifyRegisterOtp.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "OTP verification failed";
      });

    // ================= LOGIN =================
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload?.user;
        state.token = action.payload?.token;
        state.isAuthenticated = true;

        // persist
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user)
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      });
  },
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;