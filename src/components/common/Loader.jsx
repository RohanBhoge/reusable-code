"use client";

import React from 'react';

/**
 * Size presets mapping
 */
const SIZE_MAP = {
  sm: 'w-4 h-4 stroke-[3]',
  md: 'w-6 h-6 stroke-[3]',
  lg: 'w-9 h-9 stroke-[3]',
  xl: 'w-12 h-12 stroke-[3]',
};

/**
 * Text size presets mapping
 */
const TEXT_SIZE_MAP = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg',
};

/**
 * Color presets mapping
 */
const COLOR_MAP = {
  primary: 'text-indigo-600',
  secondary: 'text-slate-500',
  white: 'text-white',
  current: 'text-current',
};

/**
 * Universal animated Loader component (White Theme)
 */
export const Loader = ({
  size = 'md',
  color = 'primary',
  variant = 'spinner',
  text,
  center = false,
  fullScreen = false,
  className = '',
  ...rest
}) => {
  const sizeClass = typeof size === 'string' ? (SIZE_MAP[size] || SIZE_MAP.md) : '';
  const textSizeClass = typeof size === 'string' ? (TEXT_SIZE_MAP[size] || TEXT_SIZE_MAP.md) : 'text-sm';
  const colorClass = COLOR_MAP[color] || (color.startsWith('text-') ? color : COLOR_MAP.primary);

  const customDimensions = typeof size === 'number' ? { width: `${size}px`, height: `${size}px` } : {};

  // Spinner SVG Render
  const renderSpinner = () => (
    <svg
      className={`animate-spin shrink-0 ${sizeClass} ${colorClass}`}
      style={customDimensions}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      role="status"
      aria-label={text || 'Loading'}
      {...rest}
    >
      <circle
        className="opacity-20"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  // Dots Variant Render
  const renderDots = () => (
    <div className={`flex items-center gap-1.5 ${colorClass}`}>
      <span className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" />
      <span className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:-0.15s]" />
      <span className="w-2 h-2 rounded-full bg-current animate-bounce" />
    </div>
  );

  const loaderContent = (
    <div
      className={`
        flex items-center gap-3
        ${center ? 'justify-center w-full my-auto py-4' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {variant === 'dots' ? renderDots() : renderSpinner()}
      {text && (
        <span className={`font-medium ${textSizeClass} text-slate-600`}>
          {text}
        </span>
      )}
    </div>
  );

  // Full Screen Overlay Mode (White Theme Backdrop)
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/85 backdrop-blur-sm transition-all">
        <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white shadow-xl border border-slate-200">
          {renderSpinner()}
          {text && (
            <p className={`font-semibold ${textSizeClass} text-slate-800`}>
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
