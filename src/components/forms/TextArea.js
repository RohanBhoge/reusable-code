"use client";

import React, { useState, useEffect } from 'react';
import { validateFieldValue } from './useFormValidation';

const TextArea = ({
  name,
  label,
  placeholder = "",
  value = "",
  onChange,
  onBlur,
  rows = 4,
  required = false,
  minLength,
  maxLength,
  error: externalError = "",
  helperText = "",
  disabled = false,
  className = "",
  autoCapitalizeFirstLetter = true,
  customValidation,
  ...rest
}) => {
  const [touched, setTouched] = useState(false);
  const [internalError, setInternalError] = useState("");

  const labelText = label || name || "This field";

  const runValidation = (valToValidate) => {
    const err = validateFieldValue(valToValidate, {
      required,
      type: "text",
      minLength,
      maxLength,
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
  }, [value, required, minLength, maxLength]);

  const activeError = externalError || (touched ? internalError : "");

  const handleBlur = (e) => {
    setTouched(true);
    runValidation(value);
    if (onBlur) onBlur(e);
  };

  const handleChange = (e) => {
    let val = e.target.value;

    // Auto-capitalize first letter for text area
    if (autoCapitalizeFirstLetter && val.length > 0) {
      val = val.charAt(0).toUpperCase() + val.slice(1);
    }

    // Immediate validation clearing
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

  return (
    <div className={`flex flex-col gap-1.5 w-full mb-6 ${className}`}>
      {/* Label & Character Counter Header */}
      <div className="flex items-center justify-between">
        {label && (
          <label className="text-sm font-medium text-gray-900">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        {maxLength && (
          <span className="text-xs text-slate-400">
            {String(value || "").length} / {maxLength}
          </span>
        )}
      </div>

      {/* TextArea Field */}
      <textarea
        name={name}
        rows={rows}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        minLength={minLength}
        maxLength={maxLength}
        className={`
          w-full resize-y rounded-lg border border-gray-300 bg-[#F3F3F5] px-3.5 py-2.5 text-sm text-gray-900
          placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all
          disabled:opacity-50 disabled:cursor-not-allowed
          ${activeError ? "border-red-500 ring-2 ring-red-500/20 bg-red-50/30" : ""}
        `.trim().replace(/\s+/g, ' ')}
        {...rest}
      />

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

export default TextArea;
