import { useState, useCallback } from 'react';

/**
 * Validates a single field value based on rules
 */
export const validateFieldValue = (value, rules = {}) => {
  const {
    required = false,
    type = 'text',
    min,
    max,
    minLength,
    maxLength,
    allowDecimal = true,
    label = 'This field',
    customValidation,
  } = rules;

  const strVal = value !== undefined && value !== null ? String(value) : '';
  const trimmedVal = strVal.trim();

  // 1. Required field validation
  if (required && trimmedVal === '') {
    return `${label} is required`;
  }

  // If empty and not required, skip remaining validations
  if (trimmedVal === '') {
    return '';
  }

  // 2. Email validation
  if (type === 'email') {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmedVal)) {
      return 'Please enter a valid email address';
    }
  }

  // 3. Phone number validation
  if (type === 'tel' || type === 'phone') {
    const digitsOnly = strVal.replace(/\D/g, '');

    if (!/^\+?[0-9\s\-()]+$/.test(trimmedVal)) {
      return 'Please enter a valid phone number';
    }

    if (digitsOnly.length < 10) {
      return 'Phone number must contain at least 10 digits';
    }

    if (digitsOnly.length > 15) {
      return 'Phone number cannot exceed 15 digits';
    }
  }

  // 3. Number validation
  if (type === 'number') {
    const numVal = Number(strVal);
    if (isNaN(numVal)) {
      return 'Please enter a valid number';
    }

    if (!allowDecimal && strVal.includes('.')) {
      return 'Decimals are not allowed';
    }

    if (min !== undefined && min !== null && numVal < Number(min)) {
      return `Minimum value is ${min}`;
    }

    if (max !== undefined && max !== null && numVal > Number(max)) {
      return `Maximum value cannot exceed ${max}`;
    }
  }

  // 4. Length validations
  if (minLength !== undefined && minLength !== null && strVal.length < Number(minLength)) {
    return `Must be at least ${minLength} characters`;
  }

  if (maxLength !== undefined && maxLength !== null && strVal.length > Number(maxLength)) {
    return `Cannot exceed ${maxLength} characters`;
  }

  // 5. Custom validation function callback
  if (customValidation && typeof customValidation === 'function') {
    const customErr = customValidation(value);
    if (customErr) return customErr;
  }

  return '';
};

/**
 * Hook to handle field level validation state (touched, blur, immediate clearing)
 */
export const useFieldValidation = (props) => {
  const {
    value,
    required,
    type,
    min,
    max,
    minLength,
    maxLength,
    allowDecimal = true,
    externalError,
    label,
    customValidation,
  } = props;

  const [touched, setTouched] = useState(false);
  const [internalError, setInternalError] = useState('');

  const validate = useCallback(
    (valToValidate) => {
      const err = validateFieldValue(valToValidate, {
        required,
        type,
        min,
        max,
        minLength,
        maxLength,
        allowDecimal,
        label,
        customValidation,
      });
      setInternalError(err);
      return err;
    },
    [required, type, min, max, minLength, maxLength, allowDecimal, label, customValidation]
  );

  const handleBlur = (e, externalOnBlur) => {
    setTouched(true);
    validate(value);
    if (externalOnBlur) externalOnBlur(e);
  };

  const handleValidationOnChange = (val) => {
    if (touched || internalError) {
      validate(val);
    }
  };

  const activeError = externalError || (touched ? internalError : '');

  return {
    error: activeError,
    touched,
    setTouched,
    handleBlur,
    handleValidationOnChange,
    validate: () => validate(value),
  };
};

export default useFieldValidation;
