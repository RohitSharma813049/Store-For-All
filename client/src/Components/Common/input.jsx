import React from "react";

export function InputField({ type = "text", name, placeholder, ...props }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className=" "
      {...props}
    />
  );
}

export function InputSearch({ type = "text", name, placeholder, ...props }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="
        w-full h-12 
        px-4 py-2 
        border-2 border-blue-700 
        rounded-lg 
        outline-none 
        focus:ring-2 focus:ring-blue-500 
        focus:border-blue-500
        transition
        bg-white
        mx-4
      "
      {...props}
    />
  );
}
