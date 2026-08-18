"use client";

import React from "react";
import Toast from "./Toast";

/**
 * Toast Container component positioned at top-right corner of viewport
 */
export const ToastContainer = ({ toasts = [], removeToast }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="position-fixed top-0 end-0 p-3 z-3 d-flex flex-column gap-2 pe-none w-100"
      style={{ maxWidth: "380px", zIndex: 9999 }}
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          duration={toast.duration}
          onClose={removeToast}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
