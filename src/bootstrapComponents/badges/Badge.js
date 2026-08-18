import React from "react";

const Badge = ({
  children,
  text = "Badge",
  variant = "default",
  className = "",
}) => {
  const baseStyles =
    "d-inline-flex align-items-center justify-content-center rounded-3 mb-4 px-4 py-2 fs-6 fw-medium";

  const variants = {
    default: "bg-body-secondary text-dark",
    success: "bg-success-subtle text-success-emphasis",
    warning: "bg-warning-subtle text-warning-emphasis",
    error: "bg-danger-subtle text-danger-emphasis",
    outline: "bg-transparent border border-secondary-subtle text-secondary",
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant] || variants.default} ${className}`.trim()}
    >
      {children || text}
    </div>
  );
};

export default Badge;