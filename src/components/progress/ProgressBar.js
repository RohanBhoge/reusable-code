"use client";

import React from "react";

const ProgressBar = ({
  label = "BCA",
  amount = "56,500",
  maxValue = 100,
  color = "#2563EB",
}) => {
  const percentage = Math.min(Math.max((amount / maxValue) * 100, 0), 100);

  return (
    <div className="flex flex-col gap-1.5 w-full mb-6">
      {/* Label & Amount ABOVE the bar */}
      <div className="flex justify-between items-baseline w-full">
        <span className="text-base font-medium text-gray-900">{label}</span>
        <span className="text-md font-medium text-gray-600">
          ₹{amount.toLocaleString()}
        </span>
      </div>

      {/* The Gray Bar Track */}
      <div className="w-full h-2.5 bg-[#EEEEF0] rounded-full overflow-hidden relative">
        {/* The Blue Highlighted Fill */}
        <div
          className="absolute h-full rounded-full transition-all duration-500 ease-out"
          style={{
            left: `0%`,
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
