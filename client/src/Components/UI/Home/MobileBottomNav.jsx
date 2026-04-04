import React, { useState } from 'react'
import { IoHome, IoGridOutline, IoCartOutline, IoPersonOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

function MobileBottomNav() {

  const [activeTab, setActiveTab] = useState("home")

  const navItems = [
    { name: "home", label: "Home", icon: IoHome, path:"/" },
    { name: "category", label: "Categories", icon: IoGridOutline, path:"/category" },
    { name: "account", label: "Account", icon: IoPersonOutline, path:"/account" },
    { name: "cart", label: "Cart", icon: IoCartOutline, path:"/cart" },
  ]

  return (
    <div className="
      fixed bottom-0 left-0 
      w-full 
      bg-white 
      border-t 
      flex justify-around items-center 
      py-2
    ">

      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = activeTab === item.name

        return (
          <Link
            to={item.path}
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            className="flex flex-col items-center cursor-pointer"
          >
            <Icon
              className={`
                text-xl 
                ${isActive ? "text-blue-600" : "text-gray-400"}
              `}
            />
            <p
              className={`
                text-xs mt-1 font-medium
                ${isActive ? "text-blue-600" : "text-gray-500"}
              `}
            >
              {item.label}
            </p>
          </Link>
        )
      })}

    </div>
  )
}

export default MobileBottomNav