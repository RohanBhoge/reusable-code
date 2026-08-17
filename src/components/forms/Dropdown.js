"use client";

import React, { useState, useEffect } from 'react';
import { validateFieldValue } from './useFormValidation';

const Dropdown = ({
  name,
  label,
  options = [],
  value = "",
  onChange,
  onBlur,
  required = false,
  error: externalError = "",
  helperText = "",
  disabled = false,
  placeholder = "Select an option",
  className = "",
  customValidation,
  ...rest
}) => {
  const [touched, setTouched] = useState(false);
  const [internalError, setInternalError] = useState("");

  const labelText = label || name || "This field";

  const runValidation = (valToValidate) => {
    const err = validateFieldValue(valToValidate, {
      required,
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
  }, [value, required]);

  const activeError = externalError || (touched ? internalError : "");

  const handleBlur = (e) => {
    setTouched(true);
    runValidation(value);
    if (onBlur) onBlur(e);
  };

  const handleChange = (e) => {
    const val = e.target.value;

    if (touched || internalError) {
      runValidation(val);
    }

    if (onChange) {
      onChange(e);
    }
  };

  // Normalize options array into [{ label, value }] format
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === 'object' && opt !== null) {
      return {
        label: opt.label !== undefined ? opt.label : opt.value,
        value: opt.value !== undefined ? opt.value : opt.label,
      };
    }
    return { label: String(opt), value: String(opt) };
  });

  return (
    <div className={`flex flex-col gap-1.5 w-full mb-6 ${className}`}>
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-gray-900">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Select Container */}
      <div className="relative w-full">
        <select
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className={`
            w-full appearance-none rounded-xl border border-gray-300 bg-[#F3F3F5] px-3.5 py-2.5 pr-10 text-sm text-gray-900
            focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all cursor-pointer
            disabled:opacity-50 disabled:cursor-not-allowed
            ${activeError ? "border-red-500 ring-2 ring-red-500/20 bg-red-50/30" : ""}
          `.trim().replace(/\s+/g, ' ')}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}

          {normalizedOptions.map((opt, idx) => (
            <option key={idx} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Custom Chevron Icon */}
        <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
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

export default Dropdown;
