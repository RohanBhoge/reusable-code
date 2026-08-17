"use client";

import React, { useState, useEffect } from 'react';
import { validateFieldValue } from './useFormValidation';

const TextInput = ({
  name,
  label,
  labelRight,
  placeholder = "",
  value = "",
  onChange,
  onBlur,
  type = "text",
  required = false,
  min,
  max,
  minLength,
  maxLength,
  error: externalError = "",
  helperText = "",
  disabled = false,
  className = "",
  rightIcon,
  onRightIconClick,
  autoCapitalizeFirstLetter = true,
  allowDecimal = true,
  customValidation,
  ...rest
}) => {
  const [touched, setTouched] = useState(false);
  const [internalError, setInternalError] = useState("");

  const labelText = label || name || "This field";

  // Re-run validation whenever value changes if field has been touched or has an error
  const runValidation = (valToValidate) => {
    const err = validateFieldValue(valToValidate, {
      required,
      type,
      min,
      max,
      minLength,
      maxLength,
      allowDecimal,
      label: labelText,
      customValidation,
    });
    setInternalError(err);
    return err;
  };

  useEffect(() => {
    if (touched || internalError) {
      runValidation(value);
    }
  }, [value, required, type, min, max, minLength, maxLength, allowDecimal]);

  const activeError = externalError || (touched ? internalError : "");

  const handleBlur = (e) => {
    setTouched(true);
    runValidation(value);
    if (onBlur) onBlur(e);
  };

  const handleChange = (e) => {
    let val = e.target.value;

    // 1. Auto-capitalize first letter for text inputs
    if (type === "text" && autoCapitalizeFirstLetter && val.length > 0) {
      val = val.charAt(0).toUpperCase() + val.slice(1);
    }

    // Clear internal error immediately if input becomes valid
    if (touched || internalError) {
      runValidation(val);
    }

    if (onChange) {
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          name: name || e.target.name,
          value: val,
        },
      };
      onChange(syntheticEvent);
    }
  };

  // 2. Keyboard event blocker for number and phone type inputs
  const handleKeyDown = (e) => {
    const allowedNavigationKeys = [
      "Backspace", "Delete", "Tab", "Escape", "Enter",
      "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"
    ];

    if (allowedNavigationKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
      return;
    }

    if (type === "number") {
      // Allow digits 0-9
      if (/^[0-9]$/.test(e.key)) {
        return;
      }

      // Allow minus sign at position 0 if min allows negative numbers
      if (e.key === "-" && (!min || Number(min) < 0) && !String(value).includes("-")) {
        return;
      }

      // Allow decimal point if allowDecimal is true and doesn't already contain '.'
      if (e.key === "." && allowDecimal && !String(value).includes(".")) {
        return;
      }

      // Block letters and special characters (like 'e', 'E', '+')
      e.preventDefault();
    } else if (type === "tel" || type === "phone") {
      // Allowed keys for phone: digits 0-9, '+', '-', '(', ')', space ' '
      if (!/^[0-9+\-()\s]$/.test(e.key)) {
        e.preventDefault();
      }
    }
  };

  // 3. Disable mouse wheel scroll for number input to prevent accidental value changes
  const handleWheel = (e) => {
    if (type === "number") {
      e.target.blur();
    }
  };

  return (
    <div className={`flex flex-col gap-1.5 w-full mb-5 ${className}`}>
      {/* Label Header Row */}
      {(label || labelRight) && (
        <div className="flex items-center justify-between">
          {label && (
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          )}
          {labelRight && <div>{labelRight}</div>}
        </div>
      )}

      {/* Input Field Container */}
      <div className="relative flex items-center w-full">
        <input
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onWheel={handleWheel}
          placeholder={placeholder}
          disabled={disabled}
          min={type === "number" ? min : undefined}
          max={type === "number" ? max : undefined}
          minLength={minLength}
          maxLength={maxLength}
          className={`
            w-full rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm text-slate-900
            placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none
            transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
            ${rightIcon ? 'pr-11' : ''}
            ${activeError ? 'border-red-500 ring-2 ring-red-500/20 bg-red-50/30' : ''}
          `.trim().replace(/\s+/g, ' ')}
          {...rest}
        />

        {/* Right Icon / Action Slot */}
        {rightIcon && (
          <div
            onClick={onRightIconClick}
            className={`absolute right-3.5 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors ${
              onRightIconClick ? 'cursor-pointer' : ''
            }`}
          >
            {rightIcon}
          </div>
        )}
      </div>

      {/* Validation Error Message */}
      {activeError ? (
        <span className="text-xs font-medium text-red-500 mt-0.5 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {activeError}
        </span>
      ) : helperText ? (
        <span className="text-xs text-slate-400 mt-0.5">{helperText}</span>
      ) : null}
    </div>
  );
};

export default TextInput;