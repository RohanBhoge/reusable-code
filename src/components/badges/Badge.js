import React from "react";

const Badge = ({
  children = "Badge",
  text = "Badge",
  variant = "default",
  className = "",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl mb-6 px-4 py-2 text-base font-medium transition-colors";

  const variants = {
    default: "bg-[#ECEEF2] text-[#111827]",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
    outline: "bg-transparent border border-gray-200 text-gray-700",
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant] || variants.default} ${className}`}
    >
      {children || text}
    </div>
  );
};

export default Badge;
