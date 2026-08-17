import React from "react";
import Image from "../../../public/Images/logoalphera.png";

/**
 * Reusable & Flexible Card Component for Eduvanta University ERP
 *
 * Supported Variants:
 * - default  : White background with clean subtle border & light shadow
 * - elevated : Elevated card with rich shadow
 * - bordered : Stronger border with clean flat background
 * - ghost    : Soft transparent slate background without heavy borders
 * - flat     : Solid flat light background without shadow
 *
 * Supported Sizes:
 * - sm : Compact padding (p-3.5 sm:p-4)
 * - md : Standard padding (p-5 sm:p-6)
 * - lg : Generous padding (p-6 sm:p-8)
 */
const VARIANT_MAP = {
  default: "bg-white border border-gray-200 shadow-xs text-slate-800",
  elevated: "bg-white border border-gray-100 shadow-md text-slate-800",
  bordered: "bg-white border border-slate-300 shadow-none text-slate-800",
  ghost: "bg-slate-50/70 border border-slate-200/60 shadow-none text-slate-800",
  flat: "bg-slate-100/80 border-none shadow-none text-slate-800",
};

const SIZE_MAP = {
  sm: {
    padding: "p-3.5 sm:p-4",
    title: "text-base font-semibold",
    description: "text-xs text-slate-500",
    icon: "w-8 h-8 p-1.5 text-blue-600 bg-blue-50 rounded-lg",
  },
  md: {
    padding: "p-5 sm:p-6",
    title: "text-lg font-bold",
    description: "text-sm text-slate-500",
    icon: "w-10 h-10 p-2 text-blue-600 bg-blue-50 rounded-xl",
  },
  lg: {
    padding: "p-6 sm:p-8",
    title: "text-xl sm:text-2xl font-bold",
    description: "text-base text-slate-500",
    icon: "w-12 h-12 p-2.5 text-blue-600 bg-blue-50 rounded-2xl",
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

  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-2xl transition-all duration-200 overflow-hidden flex flex-col
        ${variantStyles}
        ${hoverable ? "hover:-translate-y-1 hover:shadow-md" : ""}
        ${
          isInteractive
            ? "cursor-pointer hover:border-blue-300 hover:shadow-md active:scale-[0.99] select-none"
            : ""
        }
        ${className}
      `
        .trim()
        .replace(/\s+/g, " ")}
      {...rest}
    >
      {/* Card Header Image */}
      {image && (
        <div className="relative w-full h-44 sm:h-52 overflow-hidden bg-slate-100 shrink-0">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      {/* Main Content Body */}
      <div
        className={`flex-1 flex flex-col ${sizeStyles.padding} ${contentClassName}`.trim()}
      >
        {/* Card Header Section (Title, Subtitle, Icons, Badge) */}
        {(title || description || icon || leftIcon || rightIcon || badge) && (
          <div
            className={`flex items-start justify-between gap-3 ${headerClassName}`.trim()}
          >
            <div className="flex items-start gap-3 flex-1 min-w-0">
              {/* Main Icon or Left Icon */}
              {(icon || leftIcon) && (
                <div
                  className={`shrink-0 inline-flex items-center justify-center ${sizeStyles.icon}`}
                >
                  {icon || leftIcon}
                </div>
              )}

              {/* Title & Description Container */}
              <div className="flex-1 min-w-0">
                {title && (
                  <h3
                    className={`${sizeStyles.title} tracking-tight leading-snug truncate`}
                  >
                    {title}
                  </h3>
                )}
                {description && (
                  <p
                    className={`${sizeStyles.description} mt-1 leading-relaxed`}
                  >
                    {description}
                  </p>
                )}
              </div>
            </div>

            {/* Right Side: Right Icon / Badge */}
            <div className="flex items-center gap-2 shrink-0">
              {badge &&
                (typeof badge === "string" ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                    {badge}
                  </span>
                ) : (
                  badge
                ))}

              {rightIcon && (
                <div className="text-slate-400 hover:text-slate-600 transition-colors">
                  {rightIcon}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Custom Body Children */}
        {children && (
          <div
            className={`flex-1 ${title || description || icon ? "mt-4" : ""}`}
          >
            {children}
          </div>
        )}

        {/* Card Footer */}
        {footer && (
          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
