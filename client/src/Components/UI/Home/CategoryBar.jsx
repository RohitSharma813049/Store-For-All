import React from "react";
import {
  FaMobileAlt,
  FaTshirt,
  FaHome,
  FaHeartbeat,
  FaLaptop,
  FaCouch,
  FaBaby,
  FaAppleAlt,
  FaCar,
  FaMotorcycle,
  FaDumbbell,
  FaBook,
  FaGamepad,
} from "react-icons/fa";
import { MdShoppingBasket } from "react-icons/md";
import { NavLink } from "react-router-dom";

function CategoryBar() {
  const categories = [
    { name: "For You", icon: <MdShoppingBasket /> },

    { name: "Fashion", icon: <FaTshirt /> },

    { name: "Mobiles", icon: <FaMobileAlt /> },

    { name: "Beauty", icon: <FaHeartbeat /> },

    { name: "Electronics", icon: <FaLaptop /> },

    { name: "Home", icon: <FaHome /> },

    { name: "Appliances", icon: <FaGamepad /> },

    { name: "Toys & Babycare", icon: <FaBaby /> },

    { name: "Food & Health", icon: <FaAppleAlt /> },

    { name: "Auto Accessories", icon: <FaCar /> },

    { name: "2 Wheelers", icon: <FaMotorcycle /> },

    { name: "Sports & Fitness", icon: <FaDumbbell /> },

    { name: "Books & Stationery", icon: <FaBook /> },

    { name: "Furniture", icon: <FaCouch /> },
  ];

  return (
    <div className="flex gap-4 overflow-x-auto p-2 justify-center items-center bg-bg_white border-b-2 border-gray-300">
      {categories.map((item, index) => (
        <NavLink
          to={item.name}
          key={index}
          end={item.name === "For You"}
          className={({ isActive }) =>
            `flex flex-col items-center text-xs min-w-[60px] pb-1 overflow-x-auto ${
              isActive
                ? "border-b-2 border-blue-500 font-bold text-blue-500"
                : "text-gray-600 hover:text-blue-600"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div
                className={`text-xl ${isActive ? `bg-linear-to-r from-blue-300 to-white rounded-lg p-1` : ""} scroll-smooth scrollbar-hide`}
              >
                {item.icon}
              </div>
              <span className="text-center flex-wrap font-extrabold text-black">
                {item.name}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
}

export default CategoryBar;
