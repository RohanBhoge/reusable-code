"use client";

import React, { useState, useEffect, useRef } from "react";

const CommonModal = ({
  isOpen = false,
  onClose = () => {},
  children = null,
  title = "",
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl p-6 mx-4 animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {title && (
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pr-6">
            {title}
          </h2>
        )}

        <div className="py-2">
          {children || (
            <p className="text-gray-500 text-center py-6">
              This modal is empty. Pass children to populate it!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const CommonModalWithTrigger = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="">
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-[#111827] text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
      >
        Pop Up
      </button>

      <CommonModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Basic Modal"
      >
        <div className="text-gray-600 text-sm">
          <p>This is an empty modal ready for your content!</p>
        </div>
      </CommonModal>
    </div>
  );
};

export default CommonModalWithTrigger;
