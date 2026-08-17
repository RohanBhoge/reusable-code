"use client";

import React, { useState } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("All Roles");

  const options = ["All Roles", "Admin", "User", "Editor", "Viewer"];

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md border border-gray-300 rounded-xl mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl bg-[#F3F3F5] px-3 py-2 text-left text-gray-800 transition-colors focus:outline-none"
      >
        <span className="font-normal">{selected}</span>

        {/* Chevron Icon */}
        <svg
          className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* The Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-xl bg-white shadow-lg border border-gray-100 py-1">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`block w-full px-4 py-2.5 text-left transition-colors ${
                selected === option
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
