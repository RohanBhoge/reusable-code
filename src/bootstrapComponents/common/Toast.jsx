"use client";

import React, { useEffect, useState } from "react";
import styles from "./Toast.module.css";

/**
 * Toast type icons
 */
const TYPE_ICONS = {
  success: (className = "w-100 h-100") => (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      style={{ width: "1.25rem", height: "1.25rem" }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  error: (className = "w-100 h-100") => (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      style={{ width: "1.25rem", height: "1.25rem" }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  warning: (className = "w-100 h-100") => (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      style={{ width: "1.25rem", height: "1.25rem" }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  info: (className = "w-100 h-100") => (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      style={{ width: "1.25rem", height: "1.25rem" }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
};

/**
 * Toast type styles mapping
 */
const TYPE_STYLES = {
  success: {
    border: "border-success-subtle",
    bg: "bg-white",
    iconBg: "bg-success-subtle text-success",
    progressBar: "bg-success",
    title: "text-dark",
  },
  error: {
    border: "border-danger-subtle",
    bg: "bg-white",
    iconBg: "bg-danger-subtle text-danger",
    progressBar: "bg-danger",
    title: "text-dark",
  },
  warning: {
    border: "border-warning-subtle",
    bg: "bg-white",
    iconBg: "bg-warning-subtle text-warning-emphasis",
    progressBar: "bg-warning",
    title: "text-dark",
  },
  info: {
    border: "border-primary-subtle",
    bg: "bg-white",
    iconBg: "bg-primary-subtle text-primary",
    progressBar: "bg-primary",
    title: "text-dark",
  },
};

/**
 * Single Toast Component
 */
export const Toast = ({
  id,
  type = "info",
  title = "Toast",
  message = "Toast information",
  duration = 4000,
  onClose,
}) => {
  const [isLeaving, setIsLeaving] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const style = TYPE_STYLES[type] || TYPE_STYLES.info;
  const renderIcon = TYPE_ICONS[type] || TYPE_ICONS.info;

  const handleDismiss = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose(id);
    }, 250);
  };

  useEffect(() => {
    if (!duration || duration <= 0) return;

    let timer;
    if (!isPaused && !isLeaving) {
      timer = setTimeout(() => {
        handleDismiss();
      }, duration);
    }

    return () => clearTimeout(timer);
  }, [duration, isPaused, isLeaving]);

  return (
    <div
      role="alert"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`
        position-relative overflow-hidden d-flex align-items-start gap-3 p-3 rounded-3 border
        shadow-sm pointer-event-auto
        ${styles.toastItem}
        ${style.bg} ${style.border}
        ${isLeaving ? styles.toastLeaving : ""}
      `
        .trim()
        .replace(/\s+/g, " ")}
    >
      {/* Type Icon */}
      <div
        className={`p-2 rounded-2 flex-shrink-0 d-flex align-items-center justify-content-center ${style.iconBg}`}
      >
        {renderIcon()}
      </div>

      {/* Content */}
      <div className="flex-grow-1 min-w-0 pt-1">
        {title && (
          <h4 className={`small fw-semibold lh-1 mb-1 ${style.title}`}>
            {title}
          </h4>
        )}
        {message && (
          <p className="small text-secondary mb-0 lh-sm">{message}</p>
        )}
      </div>

      {/* Close Button */}
      <button
        onClick={handleDismiss}
        className="btn-close flex-shrink-0 ms-auto p-1 text-secondary"
        style={{ fontSize: "0.75rem" }}
        aria-label="Close notification"
      />

      {/* Auto-Dismiss Progress Bar */}
      {duration > 0 && (
        <div
          className="position-absolute bottom-0 start-0 end-0 bg-light"
          style={{ height: "3px" }}
        >
          <div
            className={`h-100 ${style.progressBar} ${styles.progressBar}`}
            style={{
              animationDuration: `${duration}ms`,
              animationPlayState: isPaused ? "paused" : "running",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Toast;
