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
    <div
      className="position-relative w-100 border rounded-3 mb-4"
      style={{ maxWidth: "28rem" }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="btn d-flex w-100 align-items-center justify-content-between rounded-3 bg-body-tertiary px-3 py-2 text-start text-dark shadow-none border-0"
      >
        <span className="fw-normal">{selected}</span>

        {/* Chevron Icon */}
        <svg
          style={{
            width: "1.25rem",
            height: "1.25rem",
            transition: "transform 0.2s ease-in-out",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
          className="text-secondary"
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

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="position-absolute start-0 top-100 z-3 mt-2 w-100 rounded-3 bg-white shadow border py-1">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              className={`btn btn-link text-decoration-none d-block w-100 px-4 py-2 text-start rounded-0 ${
                selected === option
                  ? "bg-light text-dark fw-medium"
                  : "text-secondary hover-bg-light"
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