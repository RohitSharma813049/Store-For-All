import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./Pages/Loader";
import Layout from "./Pages/Layout";

const HomePages = lazy(() => import("./Pages/Home"));
const Category = lazy(() => import("./Components/UI/Home/Category"));
const Login = lazy(() => import("./Components/UI/Accounts/Login"));
const Register = lazy(() => import("./Components/UI/Accounts/Register"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePages />} />
          <Route path="category" element={<Category />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Suspense>
  );
}

export default App;
