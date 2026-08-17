"use client";

import React from 'react';

/**
 * Default empty state icon SVG component
 */
const DefaultEmptyIcon = ({ className = 'w-7 h-7' }) => (
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
 * Sizing presets for responsive and scalable layout (White Theme)
 */
const SIZE_MAP = {
  sm: {
    container: 'py-6 px-4',
    image: 'max-h-24 max-w-[120px]',
    iconWrapper: 'w-10 h-10 p-2.5',
    iconSize: 'w-5 h-5',
    title: 'text-sm font-semibold text-slate-800',
    description: 'text-xs text-slate-500 max-w-xs',
    action: 'mt-3',
  },
  md: {
    container: 'py-10 px-6',
    image: 'max-h-36 max-w-[180px]',
    iconWrapper: 'w-14 h-14 p-3.5',
    iconSize: 'w-7 h-7',
    title: 'text-base font-semibold text-slate-900',
    description: 'text-sm text-slate-500 max-w-sm',
    action: 'mt-4',
  },
  lg: {
    container: 'py-16 px-8',
    image: 'max-h-48 max-w-[240px]',
    iconWrapper: 'w-16 h-16 p-4',
    iconSize: 'w-8 h-8',
    title: 'text-lg font-semibold text-slate-900',
    description: 'text-base text-slate-500 max-w-md',
    action: 'mt-5',
  },
};

/**
 * Reusable Empty State component for tables, cards, lists, search results, and full pages.
 */
export const EmptyState = ({
  icon,
  title,
  description,
  action,
  image,
  size = 'md',
  className = '',
  children,
  ...rest
}) => {
  const config = SIZE_MAP[size] || SIZE_MAP.md;

  return (
    <div
      className={`
        flex flex-col items-center justify-center text-center w-full mx-auto
        rounded-2xl border border-dashed border-slate-200 bg-slate-50/50
        ${config.container}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
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
              alt={title || 'Empty state illustration'}
              className={`object-contain mb-3.5 ${config.image}`}
            />
          ) : (
            <div
              className={`
                flex items-center justify-center rounded-2xl mb-3.5
                bg-slate-100 text-slate-400 shadow-xs shrink-0
                ${config.iconWrapper}
              `.trim().replace(/\s+/g, ' ')}
            >
              {icon ? (
                React.isValidElement(icon) ? (
                  icon
                ) : (
                  <span className={config.iconSize}>{icon}</span>
                )
              ) : (
                <DefaultEmptyIcon className={config.iconSize} />
              )}
            </div>
          )}

          {/* Heading Title */}
          {title && <h3 className={config.title}>{title}</h3>}

          {/* Supporting Description */}
          {description && (
            <p className={`mt-1.5 leading-relaxed ${config.description}`}>
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