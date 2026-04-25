import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../Store/Slice/auth";

import { FaLocationDot, FaPlaneUp } from "react-icons/fa6";
import { IoCartOutline, IoPersonOutline } from "react-icons/io5";
import { BsThreeDotsVertical, BsChatDots } from "react-icons/bs";
import { InputSearch } from "../../Common/input";
import OptionsHover from "../../Common/OptionsHover";
import { CgProfile } from "react-icons/cg";
import CategoryBar from "./CategoryBar";

import {
  FaBox,
  FaHeart,
  FaSignOutAlt,
  FaSearch,
} from "react-icons/fa";

import { MdOutlineDashboard, MdLocalOffer } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiCustomerService2Line } from "react-icons/ri";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const role = user?.role;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-bg_white border-b-2 border-gray-300 text-lg ">

        {/* 🔹 Top Row */}
        <div className="flex w-full p-2 justify-around gap-4 md:w-1/4">

          <Link to="/" className="flex text-color_bg_yellow bg-bgGradient items-center justify-center rounded-lg w-1/2 py-2">
            <h2 className="text-2xl italic font-bold">S</h2>
            <h3 className="text-lg italic font-bold text-color_bg_yellow">
              tore For All
            </h3>
          </Link>

          <div className="flex bg-bg_light items-center justify-center rounded-lg gap-2 w-1/2 py-2">
            <FaPlaneUp />
            <h3 className="text-sm italic font-bold">Travel</h3>
          </div>
        </div>

        {/* 🔹 Location */}
        <div className="flex text-xs items-center gap-2 px-3 md:absolute md:right-0 md:top-3 md:text-lg font-bold">
          <FaLocationDot />
          <span>
            Location not set{" "}
            <Link className="text-blue-700 cursor-pointer">
              Select delivery location
            </Link>
          </span>
        </div>

        {/* 🔹 Search + Menu */}
        <div className="flex items-center gap-2 justify-evenly px-2 py-2 w-full ">

          {/* SEARCH */}
          <div className="flex items-center justify-center w-full relative max-w-3xl border-3 border-primary rounded-lg p-2">
            <FaSearch className="absolute left-3 text-gray-400" />

            <InputSearch
              className="w-full pl-10 outline-none"
              placeholder="Search for products, brands and more"
            />
          </div>

          {/* MENU */}
          <div className="hidden md:flex items-center justify-center gap-6 text-sm font-medium">

            {/* ACCOUNT */}
            <OptionsHover
              children={
                !isAuthenticated ? (
                  <Link
                    to="/login"
                    className="flex items-center gap-1 md:text-xl hover:text-blue-600"
                  >
                    <IoPersonOutline />
                    <span>Login</span>
                  </Link>
                ) : (
                  <Link
                    to="/profile"
                    className="flex items-center gap-1 md:text-xl cursor-pointer hover:text-blue-600"
                  >
                    <CgProfile />
                    <span>{user?.name || "Profile"}</span>
                  </Link>
                )
              }
              options={
                <div className="flex flex-col text-sm min-w-[150px]">

                  {!isAuthenticated ? (
                    <span className="p-3 border-b-2 border-gray-100 flex items-center justify-between gap-2 hover:bg-bgGradientLight cursor-pointer">
                      <span className="font-semibold">New Customer?</span>
                      <Link to="/register" className="text-blue-600 font-bold ml-2">
                        Sign Up
                      </Link>
                    </span>
                  ) : (
                    <Link
                      to="/profile"
                      className="p-2 flex items-center gap-2 hover:bg-bgGradientLight cursor-pointer"
                    >
                      <CgProfile size={18} /> My Profile
                    </Link>
                  )}

                  <Link
                    to="/orders"
                    className="p-2 flex items-center gap-2 hover:bg-bgGradientLight cursor-pointer"
                  >
                    <FaBox /> Orders
                  </Link>

                  <Link
                    to="/wishlist"
                    className="p-2 flex items-center gap-2 hover:bg-bgGradientLight cursor-pointer"
                  >
                    <FaHeart /> Wishlist
                  </Link>

                  {role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      className="p-2 flex items-center gap-2 hover:bg-bgGradientLight cursor-pointer"
                    >
                      <MdOutlineDashboard /> Dashboard
                    </Link>
                  )}

                  {isAuthenticated && (
                    <span
                      onClick={handleLogout}
                      className="p-2 flex items-center gap-2 text-red-500 cursor-pointer border-t border-gray-200"
                    >
                      <FaSignOutAlt /> Logout
                    </span>
                  )}
                </div>
              }
            />

            {/* MORE */}
            <OptionsHover
              children={
                <div className="flex items-center gap-1 md:text-xl cursor-pointer hover:text-blue-600">
                  <BsThreeDotsVertical />
                  <span>More</span>
                </div>
              }
              options={
                <div className="flex flex-col text-sm">

                  <span className="p-2 flex items-center gap-2 hover:bg-bgGradientLight cursor-pointer">
                    <IoIosNotificationsOutline /> Notifications
                  </span>

                  <span className="p-2 flex items-center gap-2 hover:bg-bgGradientLight cursor-pointer">
                    <MdLocalOffer /> Offers
                  </span>

                  <span className="p-2 flex items-center gap-2 hover:bg-bgGradientLight cursor-pointer">
                    <BsChatDots /> Customer Care
                  </span>

                  <span className="p-2 flex items-center gap-2 hover:bg-bgGradientLight cursor-pointer">
                    <RiCustomerService2Line /> Help Center
                  </span>

                </div>
              }
            />

            {/* CART */}
            <Link
              to="/cart"
              className="flex items-center gap-1 md:text-xl cursor-pointer hover:text-blue-600"
            >
              <IoCartOutline />
              <span>Cart</span>
            </Link>

          </div>
        </div>
      </nav>

      <CategoryBar />
    </>
  );
}

export default Navbar;