import React from "react";
import Image from "../../../public/Images/logoalphera.png";
import styles from "./Card.module.css";

const VARIANT_MAP = {
  default: `${styles.variantDefault} shadow-sm text-dark`,
  elevated: `${styles.variantElevated} text-dark`,
  bordered: `${styles.variantBordered} text-dark`,
  ghost: `${styles.variantGhost} text-dark`,
  flat: `${styles.variantFlat} text-dark`,
};

const SIZE_MAP = {
  sm: {
    padding: "p-3 p-sm-4",
    title: "fs-6 fw-semibold",
    description: "small text-secondary",
    icon: "p-2 text-primary bg-primary-subtle rounded-3",
    iconSize: { width: "2rem", height: "2rem" },
  },
  md: {
    padding: "p-4",
    title: "fs-5 fw-bold",
    description: "small text-secondary",
    icon: "p-2 text-primary bg-primary-subtle rounded-3",
    iconSize: { width: "2.5rem", height: "2.5rem" },
  },
  lg: {
    padding: "p-4 p-sm-5",
    title: "fs-4 fw-bold",
    description: "fs-6 text-secondary",
    icon: "p-2.5 text-primary bg-primary-subtle rounded-4",
    iconSize: { width: "3rem", height: "3rem" },
  },
};

export default function Card({
  variant = "default",
  size = "md",
  title = "Title",
  description = "Description of the card",
  icon,
  leftIcon,
  rightIcon,
  image = Image,
  imageAlt = "Card image",
  footer,
  badge,
  hoverable = false,
  clickable = false,
  className = "",
  contentClassName = "",
  headerClassName = "",
  children,
  onClick,
  ...rest
}) {
  const variantStyles = VARIANT_MAP[variant] || VARIANT_MAP.default;
  const sizeStyles = SIZE_MAP[size] || SIZE_MAP.md;

  const isInteractive = clickable || Boolean(onClick);
  const imageSrc = typeof image === "object" && image?.src ? image.src : image;

  return (
    <div
      onClick={onClick}
      className={`
        position-relative rounded-4 overflow-hidden d-flex flex-column
        ${styles.cardBase}
        ${variantStyles}
        ${hoverable ? styles.hoverable : ""}
        ${isInteractive ? styles.interactive : ""}
        ${className}
      `
        .trim()
        .replace(/\s+/g, " ")}
      {...rest}
    >
      {/* Card Header Image */}
      {imageSrc && (
        <div
          className={`position-relative w-100 overflow-hidden bg-light flex-shrink-0 ${styles.imageContainer}`}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className={`w-100 h-100 ${styles.cardImage}`}
          />
        </div>
      )}

      {/* Main Content Body */}
      <div
        className={`flex-grow-1 d-flex flex-column ${sizeStyles.padding} ${contentClassName}`.trim()}
      >
        {/* Card Header Section (Title, Subtitle, Icons, Badge) */}
        {(title || description || icon || leftIcon || rightIcon || badge) && (
          <div
            className={`d-flex align-items-start justify-content-between gap-3 ${headerClassName}`.trim()}
          >
            <div className="d-flex align-items-start gap-3 flex-grow-1 min-w-0">
              {/* Main Icon or Left Icon */}
              {(icon || leftIcon) && (
                <div
                  className={`flex-shrink-0 d-inline-flex align-items-center justify-content-center ${sizeStyles.icon}`}
                  style={sizeStyles.iconSize}
                >
                  {icon || leftIcon}
                </div>
              )}

              {/* Title & Description Container */}
              <div className="flex-grow-1 min-w-0">
                {title && (
                  <h3 className={`${sizeStyles.title} text-truncate mb-0`}>
                    {title}
                  </h3>
                )}
                {description && (
                  <p className={`${sizeStyles.description} mt-1 mb-0`}>
                    {description}
                  </p>
                )}
              </div>
            </div>

            {/* Right Side: Right Icon / Badge */}
            <div className="d-flex align-items-center gap-2 flex-shrink-0">
              {badge &&
                (typeof badge === "string" ? (
                  <span className="badge rounded-pill bg-primary-subtle text-primary border border-primary-subtle px-2.5 py-1 fw-semibold small">
                    {badge}
                  </span>
                ) : (
                  badge
                ))}

              {rightIcon && <div className="text-secondary">{rightIcon}</div>}
            </div>
          </div>
        )}

        {/* Custom Body Children */}
        {children && (
          <div
            className={`flex-grow-1 ${title || description || icon ? "mt-3" : ""}`}
          >
            {children}
          </div>
        )}

        {/* Card Footer */}
        {footer && (
          <div className="mt-4 pt-3 border-top border-light-subtle d-flex align-items-center justify-content-between gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
