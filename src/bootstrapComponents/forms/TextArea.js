"use client";

import React, { useState, useEffect } from 'react';
import { validateFieldValue } from './useFormValidation';
import styles from './FormComponents.module.css';

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

    if (autoCapitalizeFirstLetter && val.length > 0) {
      val = val.charAt(0).toUpperCase() + val.slice(1);
    }

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
    <div className={`mb-3 w-100 ${className}`}>
      <div className="d-flex align-items-center justify-content-between mb-1">
        {label && (
          <label className="form-label text-sm font-semibold text-dark mb-0">
            {label} {required && <span className="text-danger">*</span>}
          </label>
        )}
        {maxLength && (
          <span className="text-xs text-muted">
            {String(value || "").length} / {maxLength}
          </span>
        )}
      </div>

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
        className={`form-control ${styles.customTextarea} ${activeError ? 'is-invalid' : ''}`}
        {...rest}
      />

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

export default TextArea;