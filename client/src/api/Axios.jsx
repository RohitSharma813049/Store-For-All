import axios from "axios";


const Apis = axios.create({
  baseURL: "http://localhost:5000/api", // your backend
  withCredentials: true,
});

// 🔐 Attach token automatically
Apis.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default Apis;