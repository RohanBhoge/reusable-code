"use client";

import React, { useEffect, useRef } from "react";
import styles from "./ModalComponents.module.css";

const CommonModal = ({
  isOpen = false,
  onClose = () => {},
  children = null,
  title = "",
}) => {
  const modalRef = useRef(null);

  // Handle click outside modal container
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

  // Handle ESC key press
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
    <div className={styles.modalOverlay}>
      <div ref={modalRef} className={styles.modalContainer}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close modal"
          type="button"
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

        {/* Modal Title */}
        {title && (
          <h2 className="h5 font-semibold text-dark mb-3 pe-4">
            {title}
          </h2>
        )}

        {/* Modal Content */}
        <div className="py-2">
          {children || (
            <p className="text-muted text-center py-4 mb-0">
              This modal is empty. Pass children to populate it!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommonModal;