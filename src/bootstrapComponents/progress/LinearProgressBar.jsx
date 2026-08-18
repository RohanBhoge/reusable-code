"use client";

import React from "react";
import styles from "./ProgressBar.module.css";

const LinearProgressBar = ({
  label = "BCA",
  amount = 56500,
  maxValue = 100000,
  color = "#2563EB",
}) => {
  const numericAmount =
    typeof amount === "number"
      ? amount
      : parseFloat(String(amount).replace(/,/g, "")) || 0;
  const percentage = Math.min(
    Math.max((numericAmount / maxValue) * 100, 0),
    100,
  );

  return (
    <div className="d-flex flex-column gap-2 w-100 mb-4">
      {/* Label & Amount ABOVE the bar */}
      <div className="d-flex justify-content-between align-items-baseline w-100">
        <span className="fs-6 font-medium text-dark">{label}</span>
        <span className="fs-6 font-medium text-secondary">
          ₹{numericAmount.toLocaleString()}
        </span>
      </div>

      {/* Gray Bar Track & Fill */}
      <div className={styles.progressTrack}>
        <div
          className={styles.progressFill}
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
};

export default LinearProgressBar;
