import React from "react";

/**
 * Reusable Sidebar for Auth Pages (Login/Register)
 * @param {string} title - Main heading
 * @param {string} subtitle - Supporting text
 * @param {React.ReactNode} icon - Optional icon/illustration to display
 */
const AuthSidebar = ({ title, subtitle, icon }) => {
  return (
    <div className="hidden md:flex flex-col justify-between bg-[#2874f0] text-white w-[38%] px-8 pt-10 pb-10 min-h-[500px]">
      <div>
        <div className="flex items-center gap-1 mb-8">
          <span className="text-yellow-400 font-black text-2xl italic">S</span>
          <span className="font-bold text-lg italic">tore For All</span>
        </div>
        <h2 className="text-[1.6rem] font-bold leading-snug mb-3">
          {title}
        </h2>
        <p className="text-blue-200 text-sm leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="flex justify-center flex-1 items-center mt-6">
        {icon || (
          <div className="relative h-48 w-full flex items-end justify-center">
            {/* Default Laptop/Shopping Illustration */}
            <div className="absolute bottom-0 w-44 h-3 bg-blue-400 rounded-full opacity-60" />
            <div className="absolute bottom-3 w-28 h-20 bg-[#1a5dc8] border-4 border-blue-300 rounded-md flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
            </div>
            <div className="absolute top-4 right-8 w-10 h-6 bg-yellow-400 rounded-full" />
            <div className="absolute bottom-4 left-6 w-10 h-12 bg-red-500 rounded-sm" />
            <div className="absolute bottom-4 right-6 w-12 h-10 bg-yellow-400 rounded-sm" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthSidebar;
