"use client";

import React, { useState, useEffect } from 'react';
import { validateFieldValue } from './useFormValidation';
import styles from './FormComponents.module.css';

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

    if (type === "text" && autoCapitalizeFirstLetter && val.length > 0) {
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

  const handleKeyDown = (e) => {
    const allowedNavigationKeys = [
      "Backspace", "Delete", "Tab", "Escape", "Enter",
      "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"
    ];

    if (allowedNavigationKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
      return;
    }

    if (type === "number") {
      if (/^[0-9]$/.test(e.key)) return;
      if (e.key === "-" && (!min || Number(min) < 0) && !String(value).includes("-")) return;
      if (e.key === "." && allowDecimal && !String(value).includes(".")) return;
      e.preventDefault();
    } else if (type === "tel" || type === "phone") {
      if (!/^[0-9+\-()\s]$/.test(e.key)) {
        e.preventDefault();
      }
    }
  };

  const handleWheel = (e) => {
    if (type === "number") {
      e.target.blur();
    }
  };

  return (
    <div className={`mb-3 w-100 ${className}`}>
      {(label || labelRight) && (
        <div className="d-flex align-items-center justify-content-between mb-1">
          {label && (
            <label className={`form-label mb-0 ${styles.uppercaseLabel}`}>
              {label} {required && <span className="text-danger">*</span>}
            </label>
          )}
          {labelRight && <div>{labelRight}</div>}
        </div>
      )}

      <div className={styles.inputIconWrapper}>
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
          className={`form-control ${styles.customInput} ${rightIcon ? styles.hasRightIcon : ''} ${
            activeError ? 'is-invalid' : ''
          }`}
          {...rest}
        />

        {rightIcon && (
          <div
            onClick={onRightIconClick}
            className={`${styles.rightIcon} ${onRightIconClick ? styles.rightIconClickable : ''}`}
          >
            {rightIcon}
          </div>
        )}
      </div>

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

export default TextInput;