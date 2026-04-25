import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/auth";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;