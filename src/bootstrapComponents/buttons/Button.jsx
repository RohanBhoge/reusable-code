"use client";

import React, { useState, useRef } from "react";
import styles from "./Button.module.css";

const VARIANT_MAP = {
  primary: styles.variantPrimary,
  danger: styles.variantDanger,
  secondary: styles.variantSecondary,
  dark: styles.variantDark,
  success: styles.variantSuccess,
  muted: styles.variantMuted,
  upload: styles.variantUpload,
};

const SIZE_MAP = {
  sm: "px-3 py-1 fs-7 fw-medium gap-1",
  md: "px-4 py-2 fs-6 fw-medium gap-2",
  lg: "px-4 py-2.5 fs-5 fw-semibold gap-2",
};

const ICON_SIZE_STYLE = {
  sm: { width: "14px", height: "14px" },
  md: { width: "16px", height: "16px" },
  lg: { width: "20px", height: "20px" },
};

const DefaultUploadIcon = ({ style }) => (
  <svg
    style={style}
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
  const variantClass = VARIANT_MAP[variant] || VARIANT_MAP.primary;
  const sizeClass = SIZE_MAP[size] || SIZE_MAP.md;
  const iconStyle = ICON_SIZE_STYLE[size] || ICON_SIZE_STYLE.md;

  const isUploadButton =
    variant === "upload" || Boolean(onFileSelect || onFileUpload);

  const defaultUploadIcon =
    variant === "upload" ? <DefaultUploadIcon style={iconStyle} /> : null;
  const effectiveLeftIcon = leftIcon || defaultUploadIcon;
  const displayContent = children || (variant === "upload" ? "Upload" : null);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFiles = multiple ? Array.from(files) : files[0];
      if (onFileSelect) onFileSelect(selectedFiles, e);
      if (onFileUpload) onFileUpload(selectedFiles, e);
    }
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
          d-inline-flex align-items-center justify-content-center rounded-pill btn shadow-none
          ${styles.btnBase}
          ${variantClass}
          ${sizeClass}
          ${fullWidth ? "w-100" : ""}
          ${invalid ? "border border-2 border-danger" : ""}
          ${isShaking ? styles.shake : ""}
          ${className}
        `
          .trim()
          .replace(/\s+/g, " ")}
        {...rest}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <span
            className="spinner-border spinner-border-sm flex-shrink-0"
            role="status"
            aria-hidden="true"
            style={iconStyle}
          />
        )}

        {/* Left Icon */}
        {!isLoading && effectiveLeftIcon && (
          <span
            className="flex-shrink-0 d-inline-flex align-items-center justify-content-center"
            style={iconStyle}
          >
            {effectiveLeftIcon}
          </span>
        )}

        {/* Button Text / Content */}
        <span>{isLoading && loadingText ? loadingText : displayContent}</span>

        {/* Right Icon */}
        {!isLoading && rightIcon && (
          <span
            className="flex-shrink-0 d-inline-flex align-items-center justify-content-center"
            style={iconStyle}
          >
            {rightIcon}
          </span>
        )}
      </button>

      {/* Hidden File Input */}
      {isUploadButton && (
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="d-none"
          aria-hidden="true"
          tabIndex={-1}
        />
      )}
    </>
  );
}
