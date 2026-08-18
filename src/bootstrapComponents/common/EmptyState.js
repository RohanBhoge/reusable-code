"use client";

import React from "react";

/**
 * Default empty state icon SVG component
 */
const DefaultEmptyIcon = ({ className = "w-100 h-100" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
    />
  </svg>
);

/**
 * Sizing presets for responsive and scalable layout
 */
const SIZE_MAP = {
  sm: {
    container: "py-4 px-3",
    image: "mh-100 mw-100",
    imageStyle: { maxHeight: "96px", maxWidth: "120px" },
    iconWrapper: "p-2",
    iconSize: { width: "1.25rem", height: "1.25rem" },
    title: "fs-6 fw-semibold text-dark",
    description: "small text-secondary mx-auto",
    descStyle: { maxWidth: "320px" },
    action: "mt-3",
  },
  md: {
    container: "py-5 px-4",
    image: "mh-100 mw-100",
    imageStyle: { maxHeight: "144px", maxWidth: "180px" },
    iconWrapper: "p-3",
    iconSize: { width: "1.75rem", height: "1.75rem" },
    title: "fs-5 fw-semibold text-dark",
    description: "small text-secondary mx-auto",
    descStyle: { maxWidth: "380px" },
    action: "mt-3",
  },
  lg: {
    container: "py-5 px-4 py-md-5 px-md-5",
    image: "mh-100 mw-100",
    imageStyle: { maxHeight: "192px", maxWidth: "240px" },
    iconWrapper: "p-3",
    iconSize: { width: "2rem", height: "2rem" },
    title: "fs-4 fw-semibold text-dark",
    description: "text-secondary mx-auto",
    descStyle: { maxWidth: "440px" },
    action: "mt-4",
  },
};

/**
 * Reusable Empty State component
 */
export const EmptyState = ({
  icon,
  title,
  description,
  action,
  image,
  size = "md",
  className = "",
  children,
  ...rest
}) => {
  const config = SIZE_MAP[size] || SIZE_MAP.md;

  return (
    <div
      className={`
        d-flex flex-column align-items-center justify-center text-center w-100 mx-auto
        rounded-4 border border-dashed border-secondary-subtle bg-light-subtle
        ${config.container}
        ${className}
      `.trim().replace(/\s+/g, " ")}
      {...rest}
    >
      {children ? (
        children
      ) : (
        <>
          {/* Image or Icon */}
          {image ? (
            <img
              src={image}
              alt={title || "Empty state illustration"}
              className={`object-fit-contain mb-3 ${config.image}`}
              style={config.imageStyle}
            />
          ) : (
            <div
              className={`
                d-flex align-items-center justify-content-center rounded-4 mb-3
                bg-light text-secondary border shadow-sm flex-shrink-0
                ${config.iconWrapper}
              `.trim().replace(/\s+/g, " ")}
              style={config.iconSize}
            >
              {icon ? (
                React.isValidElement(icon) ? (
                  icon
                ) : (
                  <span className="d-block w-100 h-100">{icon}</span>
                )
              ) : (
                <DefaultEmptyIcon />
              )}
            </div>
          )}

          {/* Heading Title */}
          {title && <h3 className={`mb-0 ${config.title}`}>{title}</h3>}

          {/* Supporting Description */}
          {description && (
            <p className={`mt-2 mb-0 ${config.description}`} style={config.descStyle}>
              {description}
            </p>
          )}

          {/* Action Element / Button */}
          {action && <div className={config.action}>{action}</div>}
        </>
      )}
    </div>
  );
};

export default EmptyState;