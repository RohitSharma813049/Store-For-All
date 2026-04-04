import React from "react";

function OptionsHover({ children, options }) {
  return (
    <div className="relative group cursor-pointer">
      
      {/* 🔹 Trigger */}
      <div className="flex items-center gap-1">
        {children}

        {/* 🔻 Arrow */}
        <span className="transition-transform duration-200 group-hover:rotate-180">
          
        </span>
      </div>

      {/* 🔹 Dropdown */}
      <div className="absolute top-full right-0 z-50 mt-0
        opacity-0 scale-95 pointer-events-none
        group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
        transition-all duration-200
        bg-white shadow-xl rounded-lg border p-2 min-w-[220px]">

        {options}
      </div>
    </div>
  );
}

export default OptionsHover;