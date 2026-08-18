"use client";

import React, { useState, useEffect } from 'react';
import { validateFieldValue } from './useFormValidation';
import styles from './FormComponents.module.css';

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
    <div className={`mb-3 w-100 ${className}`}>
      {label && (
        <label className="form-label text-sm font-semibold text-dark mb-1">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      <select
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        className={`form-select ${styles.customSelect} ${activeError ? 'is-invalid' : ''}`}
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

      {activeError ? (
        <div className={styles.errorText}>
          <svg className={styles.errorIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {activeError}
        </div>
      ) : helperText ? (
        <div className="form-text text-muted text-xs mt-1">{helperText}</div>
      ) : null}
    </div>
  );
};

export default Dropdown;