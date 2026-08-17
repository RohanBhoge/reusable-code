"use client";

import React, { useEffect, useState } from "react";

/**
 * Toast type icons
 */
const TYPE_ICONS = {
  success: (className = "w-5 h-5") => (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  error: (className = "w-5 h-5") => (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  warning: (className = "w-5 h-5") => (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  info: (className = "w-5 h-5") => (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
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
 * Toast type styles mapping (Clean White Theme)
 */
const TYPE_STYLES = {
  success: {
    border: "border-emerald-200",
    bg: "bg-white",
    iconBg: "bg-emerald-50 text-emerald-600",
    progressBar: "bg-emerald-500",
    title: "text-slate-900",
  },
  error: {
    border: "border-rose-200",
    bg: "bg-white",
    iconBg: "bg-rose-50 text-rose-600",
    progressBar: "bg-rose-500",
    title: "text-slate-900",
  },
  warning: {
    border: "border-amber-200",
    bg: "bg-white",
    iconBg: "bg-amber-50 text-amber-600",
    progressBar: "bg-amber-500",
    title: "text-slate-900",
  },
  info: {
    border: "border-blue-200",
    bg: "bg-white",
    iconBg: "bg-blue-50 text-blue-600",
    progressBar: "bg-blue-500",
    title: "text-slate-900",
  },
};

/**
 * Single Toast Component
 */
export const Toast = ({
  id,
  type = "info",
  title = "Toast",
  message = "Toas information",
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
        pointer-events-auto relative overflow-hidden flex items-start gap-3 p-4 rounded-xl border
        shadow-lg shadow-slate-900/5 transition-all duration-300 ease-out
        ${style.bg} ${style.border}
        ${
          isLeaving
            ? "translate-x-full opacity-0 scale-95"
            : "translate-x-0 opacity-100 scale-100"
        }
      `
        .trim()
        .replace(/\s+/g, " ")}
    >
      {/* Type Icon */}
      <div className={`p-2 rounded-lg shrink-0 ${style.iconBg}`}>
        {renderIcon("w-5 h-5")}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pt-0.5">
        {title && (
          <h4 className={`text-sm font-semibold leading-tight ${style.title}`}>
            {title}
          </h4>
        )}
        {message && (
          <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
            {message}
          </p>
        )}
      </div>

      {/* Close Button */}
      <button
        onClick={handleDismiss}
        className="shrink-0 p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        aria-label="Close notification"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Auto-Dismiss Progress Bar */}
      {duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100 overflow-hidden">
          <div
            className={`h-full ${style.progressBar} transition-all duration-linear`}
            style={{
              animation: `toast-progress ${duration}ms linear forwards`,
              animationPlayState: isPaused ? "paused" : "running",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Toast;
