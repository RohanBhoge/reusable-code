"use client";

import React from "react";

/**
 * Size presets mapping
 */
const SIZE_MAP = {
  sm: { width: "1rem", height: "1rem" },
  md: { width: "1.5rem", height: "1.5rem" },
  lg: { width: "2.25rem", height: "2.25rem" },
  xl: { width: "3rem", height: "3rem" },
};

/**
 * Text size presets mapping
 */
const TEXT_SIZE_MAP = {
  sm: "small",
  md: "small",
  lg: "fs-6",
  xl: "fs-5",
};

/**
 * Color presets mapping
 */
const COLOR_MAP = {
  primary: "text-primary",
  secondary: "text-secondary",
  white: "text-white",
  current: "text-current",
};

/**
 * Universal animated Loader component
 */
export const Loader = ({
  size = "md",
  color = "primary",
  variant = "spinner",
  text,
  center = false,
  fullScreen = false,
  className = "",
  ...rest
}) => {
  const sizeStyle =
    typeof size === "string"
      ? SIZE_MAP[size] || SIZE_MAP.md
      : { width: `${size}px`, height: `${size}px` };
  const textSizeClass =
    typeof size === "string"
      ? TEXT_SIZE_MAP[size] || TEXT_SIZE_MAP.md
      : "small";
  const colorClass =
    COLOR_MAP[color] || (color.startsWith("text-") ? color : COLOR_MAP.primary);

  // Spinner Render
  const renderSpinner = () => (
    <div
      className={`spinner-border flex-shrink-0 ${colorClass}`}
      style={sizeStyle}
      role="status"
      aria-label={text || "Loading"}
      {...rest}
    >
      <span className="visually-hidden">{text || "Loading..."}</span>
    </div>
  );

  // Dots Variant Render
  const renderDots = () => (
    <div className={`d-flex align-items-center gap-1 ${colorClass}`}>
      <span className="spinner-grow spinner-grow-sm" role="status" />
      <span className="spinner-grow spinner-grow-sm" role="status" />
      <span className="spinner-grow spinner-grow-sm" role="status" />
    </div>
  );

  const loaderContent = (
    <div
      className={`
        d-flex align-items-center gap-2
        ${center ? "justify-content-center w-100 my-auto py-3" : ""}
        ${className}
      `
        .trim()
        .replace(/\s+/g, " ")}
    >
      {variant === "dots" ? renderDots() : renderSpinner()}
      {text && (
        <span className={`fw-medium ${textSizeClass} text-secondary`}>
          {text}
        </span>
      )}
    </div>
  );

  // Full Screen Overlay Mode
  if (fullScreen) {
    return (
      <div
        className="position-fixed top-0 start-0 w-100 h-100 z-3 d-flex flex-column align-items-center justify-content-center bg-white bg-opacity-75 backdrop-blur"
        style={{ zIndex: 9999 }}
      >
        <div className="d-flex flex-column align-items-center gap-3 p-4 rounded-4 bg-white shadow border">
          {renderSpinner()}
          {text && (
            <p className={`fw-semibold mb-0 ${textSizeClass} text-dark`}>
              {text}
            </p>
          )}
        </div>
      </div>
    );
  }

  return loaderContent;
};

export default Loader;
