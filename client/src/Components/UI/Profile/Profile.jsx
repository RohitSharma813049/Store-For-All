import React from "react";
import { Outlet } from "react-router-dom";

const ProfileNavbar = () => {


  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-6">

      {/* LEFT SIDEBAR */}
      <div className="md:w-1/4 bg-white shadow-md rounded-xl p-4 h-fit">
        <h2 className="text-lg font-bold mb-4">My Account</h2>

        <ul className="space-y-3 text-gray-700 text-sm">
          <li className="font-semibold text-blue-600 cursor-pointer">Profile Information</li>
          <li className="hover:text-blue-600 cursor-pointer">Orders</li>
          <li className="hover:text-blue-600 cursor-pointer">Wishlist</li>
          <li className="hover:text-blue-600 cursor-pointer">Saved Cards</li>
          <li className="hover:text-blue-600 cursor-pointer">Addresses</li>
          <li className="hover:text-blue-600 cursor-pointer">Logout</li>
        </ul>
      </div>

  <div className=" w-full">
    <Outlet/>
  </div>
    </div>
  );
};

export default ProfileNavbar;