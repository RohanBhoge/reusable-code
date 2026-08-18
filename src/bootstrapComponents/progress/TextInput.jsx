"use client";

import React from "react";
import styles from "./ProgressBar.module.css";

const TextInput = ({ label, value, onChange, placeholder }) => {
  return (
    <div className="d-flex flex-column gap-1 w-100">
      <label className="text-sm font-medium text-dark mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`form-control ${styles.customInput}`}
      />
    </div>
  );
};

export default TextInput;
