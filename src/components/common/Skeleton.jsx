"use client";

import React from "react";

/**
 * Tailwind rounded class mapping dictionary
 */
const ROUNDED_MAP = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

/**
 * Utility to format numerical dimensions into pixel strings
 */
const formatDimension = (value) => {
  if (value === undefined || value === null) return undefined;
  return typeof value === "number" ? `${value}px` : value;
};

/**
 * Base `<Skeleton />` component (White Theme)
 */
export const Skeleton = ({
  width = 1000,
  height = 100,
  rounded = "md",
  className = "",
  animate = true,
  style = {},
  ...rest
}) => {
  const roundedClass =
    ROUNDED_MAP[rounded] || (rounded ? `rounded-${rounded}` : "rounded-md");

  const customStyle = {
    ...(width !== undefined ? { width: formatDimension(width) } : {}),
    ...(height !== undefined ? { height: formatDimension(height) } : {}),
    ...style,
  };

  return (
    <div
      aria-hidden="true"
      role="status"
      className={`
        bg-slate-200/80
        ${animate ? "animate-pulse" : ""}
        ${roundedClass}
        ${className}
      `
        .trim()
        .replace(/\s+/g, " ")}
      style={customStyle}
      {...rest}
    />
  );
};

/**
 * `<SkeletonText />` component
 */
export const SkeletonText = ({
  lines = 1,
  height = 16,
  width,
  rounded = "md",
  className = "",
  animate = true,
  gapClass = "space-y-2.5",
  ...rest
}) => {
  if (lines <= 1) {
    return (
      <Skeleton
        width={width || "100%"}
        height={height}
        rounded={rounded}
        className={className}
        animate={animate}
        {...rest}
      />
    );
  }

  const defaultLineWidths = ["100%", "92%", "85%", "78%", "60%"];

  return (
    <div className={`${gapClass} ${className}`}>
      {Array.from({ length: lines }).map((_, index) => {
        const lineW =
          width || defaultLineWidths[index % defaultLineWidths.length];
        return (
          <Skeleton
            key={index}
            width={lineW}
            height={height}
            rounded={rounded}
            animate={animate}
            {...rest}
          />
        );
      })}
    </div>
  );
};

/**
 * `<SkeletonAvatar />` component
 */
export const SkeletonAvatar = ({
  size = "md",
  width,
  height,
  rounded = "full",
  className = "",
  animate = true,
  ...rest
}) => {
  const SIZE_MAP = {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
  };

  const computedSize = typeof size === "number" ? size : SIZE_MAP[size] || 40;
  const finalWidth = width ?? computedSize;
  const finalHeight = height ?? computedSize;

  return (
    <Skeleton
      width={finalWidth}
      height={finalHeight}
      rounded={rounded}
      className={`shrink-0 ${className}`}
      animate={animate}
      {...rest}
    />
  );
};

/**
 * `<SkeletonButton />` component
 */
export const SkeletonButton = ({
  width = 100,
  height = 38,
  rounded = "lg",
  className = "",
  animate = true,
  ...rest
}) => {
  return (
    <Skeleton
      width={width}
      height={height}
      rounded={rounded}
      className={`shrink-0 ${className}`}
      animate={animate}
      {...rest}
    />
  );
};

/**
 * `<SkeletonCard />` component (White Theme)
 */
export const SkeletonCard = ({
  hasImage = false,
  hasAvatar = false,
  lines = 3,
  className = "",
  animate = true,
  ...rest
}) => {
  return (
    <div
      className={`
        p-5 rounded-2xl border border-slate-200/80 bg-white shadow-sm space-y-4
        ${className}
      `
        .trim()
        .replace(/\s+/g, " ")}
      {...rest}
    >
      {/* Image Block */}
      {hasImage && (
        <Skeleton
          height={160}
          width="100%"
          rounded="xl"
          animate={animate}
          className="mb-4"
        />
      )}

      {/* Header section */}
      {hasAvatar ? (
        <div className="flex items-center gap-3">
          <SkeletonAvatar size="md" animate={animate} />
          <div className="flex-1 space-y-2">
            <Skeleton width="50%" height={16} rounded="md" animate={animate} />
            <Skeleton width="30%" height={12} rounded="md" animate={animate} />
          </div>
        </div>
      ) : (
        <Skeleton width="60%" height={20} rounded="md" animate={animate} />
      )}

      {/* Text Body */}
      {lines > 0 && (
        <SkeletonText
          lines={lines}
          height={14}
          rounded="md"
          animate={animate}
          gapClass="space-y-2 pt-1"
        />
      )}
    </div>
  );
};

/**
 * `<SkeletonTable />` component (White Theme)
 */
export const SkeletonTable = ({
  columns = 5,
  rows = 5,
  hasCheckbox = false,
  className = "",
  animate = true,
  ...rest
}) => {
  const colWidths = ["75%", "60%", "85%", "45%", "90%", "55%", "70%"];

  return (
    <div
      className={`
        w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm
        ${className}
      `
        .trim()
        .replace(/\s+/g, " ")}
      {...rest}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              {hasCheckbox && (
                <th className="py-3.5 px-4 w-12">
                  <Skeleton
                    width={18}
                    height={18}
                    rounded="sm"
                    animate={animate}
                  />
                </th>
              )}
              {Array.from({ length: columns }).map((_, colIdx) => (
                <th key={colIdx} className="py-3.5 px-4">
                  <Skeleton
                    width={colWidths[colIdx % colWidths.length]}
                    height={14}
                    rounded="md"
                    animate={animate}
                  />
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body Rows */}
          <tbody className="divide-y divide-slate-100">
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <tr key={rowIdx}>
                {hasCheckbox && (
                  <td className="py-4 px-4 w-12">
                    <Skeleton
                      width={18}
                      height={18}
                      rounded="sm"
                      animate={animate}
                    />
                  </td>
                )}
                {Array.from({ length: columns }).map((_, colIdx) => {
                  const cellWidth =
                    colIdx === 0 && !hasCheckbox
                      ? "80%"
                      : colWidths[(colIdx + rowIdx) % colWidths.length];

                  return (
                    <td key={colIdx} className="py-4 px-4">
                      <Skeleton
                        width={cellWidth}
                        height={14}
                        rounded="md"
                        animate={animate}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Skeleton;
