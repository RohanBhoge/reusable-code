"use client";

import React, { useState, useRef } from "react";

/**
 * Reusable & Flexible Button Component
 *
 * Supported Variants:
 * - primary   : #155DFC (Blue)
 * - danger    : #D4183D (Red)
 * - secondary : #FFFFFF (White with light gray border)
 * - dark      : #030213 (Almost Black)
 * - success   : #00A63E (Green)
 * - muted     : #D1D5DC (Light Gray)
 * - upload    : #FFFFFF (White with outline border & default photo/document upload functionality)
 *
 * Supported Sizes:
 * - sm : Small (px-3.5 py-1.5 text-xs)
 * - md : Medium (px-5 py-2.5 text-sm)
 * - lg : Large (px-6 py-3 text-base)
 */
const VARIANT_MAP = {
  primary:
    "bg-[#155DFC] hover:bg-[#114ed6] active:bg-[#0e42b8] text-white shadow-xs",
  danger:
    "bg-[#D4183D] hover:bg-[#b51232] active:bg-[#960d28] text-white shadow-xs",
  secondary:
    "bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 border border-gray-200 shadow-2xs",
  dark: "bg-[#030213] hover:bg-[#1a192b] active:bg-black text-white shadow-xs",
  success:
    "bg-[#00A63E] hover:bg-[#008f35] active:bg-[#00782c] text-white shadow-xs",
  muted: "bg-[#D1D5DC] hover:bg-[#c3c8cf] active:bg-[#b5bac2] text-slate-700",
  upload:
    "bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 border-2 border-slate-200 hover:border-slate-300 shadow-2xs font-semibold",
};

const SIZE_MAP = {
  sm: "px-3.5 py-1.5 text-xs font-medium gap-1.5",
  md: "px-5 py-2.5 text-sm font-medium gap-2",
  lg: "px-6 py-3 text-base font-semibold gap-2.5",
};

const ICON_SIZE_MAP = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

const DefaultUploadIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1" />
    <polyline points="16 8 12 4 8 8" />
    <line x1="12" y1="4" x2="12" y2="16" />
  </svg>
);

export default function Button({
  variant = "primary",
  size = "md",
  children = "Button",
  leftIcon,
  rightIcon,
  isLoading = false,
  loadingText,
  disabled = false,
  invalid = false,
  shakeOnError = true,
  className = "",
  type = "button",
  onClick,
  fullWidth = false,
  accept = "image/*,.pdf,.doc,.docx",
  multiple = false,
  onFileSelect,
  onFileUpload,
  ...rest
}) {
  const [isShaking, setIsShaking] = useState(false);
  const fileInputRef = useRef(null);

  const isButtonDisabled = disabled || isLoading;
  const variantStyles = VARIANT_MAP[variant] || VARIANT_MAP.primary;
  const sizeStyles = SIZE_MAP[size] || SIZE_MAP.md;
  const iconSizeClass = ICON_SIZE_MAP[size] || ICON_SIZE_MAP.md;

  const isUploadButton =
    variant === "upload" || Boolean(onFileSelect || onFileUpload);

  const defaultUploadIcon =
    variant === "upload" ? (
      <DefaultUploadIcon className={iconSizeClass} />
    ) : null;
  const effectiveLeftIcon = leftIcon || defaultUploadIcon;
  const displayContent = children || (variant === "upload" ? "Upload" : null);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFiles = multiple ? Array.from(files) : files[0];
      if (onFileSelect) onFileSelect(selectedFiles, e);
      if (onFileUpload) onFileUpload(selectedFiles, e);
    }
    // Reset input so re-selecting the exact same file fires change event
    e.target.value = "";
  };

  const handleClick = (e) => {
    if (invalid || disabled) {
      if (shakeOnError) {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 450);
      }
      if (disabled) {
        e.preventDefault();
        return;
      }
    }

    if (onClick) {
      onClick(e);
    }

    if (isUploadButton && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <button
        type={type}
        onClick={handleClick}
        disabled={isButtonDisabled}
        aria-disabled={invalid || isButtonDisabled}
        className={`
          inline-flex items-center justify-center rounded-full transition-all duration-200 select-none cursor-pointer
          outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:scale-[0.98]
          disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed
          ${variantStyles}
          ${sizeStyles}
          ${fullWidth ? "w-full" : ""}
          ${invalid ? "border-2 border-red-500" : ""}
          ${isShaking ? "animate-shake" : ""}
          ${className}
        `
          .trim()
          .replace(/\s+/g, " ")}
        {...rest}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <svg
            className={`animate-spin ${iconSizeClass} shrink-0 text-current`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {/* Left Icon */}
        {!isLoading && effectiveLeftIcon && (
          <span
            className={`shrink-0 inline-flex items-center justify-center ${iconSizeClass}`}
          >
            {effectiveLeftIcon}
          </span>
        )}

        {/* Button Text / Content */}
        <span>{isLoading && loadingText ? loadingText : displayContent}</span>

        {/* Right Icon */}
        {!isLoading && rightIcon && (
          <span
            className={`shrink-0 inline-flex items-center justify-center ${iconSizeClass}`}
          >
            {rightIcon}
          </span>
        )}
      </button>

      {/* Hidden File Input for Upload Variant */}
      {isUploadButton && (
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
        />
      )}
    </>
  );
}
