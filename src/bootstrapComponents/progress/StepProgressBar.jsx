"use client";

import React from "react";
import { Check } from "lucide-react";
import styles from "./ProgressBar.module.css";

const StepProgressBar = ({ steps = [], currentStep = 0 }) => {
  return (
    <div className={styles.stepperContainer}>
      <div className="d-flex align-items-center justify-content-between w-100 position-relative">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <React.Fragment key={index}>
              {/* Step Circle & Label */}
              <div className="d-flex flex-column align-items-center position-relative z-1">
                <div
                  className={`${styles.stepCircle} ${
                    isCompleted
                      ? styles.stepCompleted
                      : isActive
                        ? styles.stepActive
                        : styles.stepFuture
                  }`}
                >
                  {isCompleted ? (
                    <Check size={20} strokeWidth={3} className="text-white" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span className="mt-2 text-sm font-medium text-dark text-nowrap">
                  {step}
                </span>
              </div>

              {/* Step Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-grow-1 px-2">
                  <div
                    className={`${styles.stepConnector} ${
                      isCompleted
                        ? styles.stepConnectorCompleted
                        : styles.stepConnectorPending
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgressBar;
