"use client";

import React, { useState } from "react";
import StepProgressBar from "./StepProgressBar";
import TextInput from "./TextInput";

const Stepbar = () => {
  const steps = [
    "Basic Details",
    "Academic Details",
    "Course Selection",
    "Document Upload",
    "Review & Submit",
  ];

  const [stepValues, setStepValues] = useState({
    step1: "",
    step2: "",
    step3: "",
    step4: "",
  });

  const handleInputChange = (e, stepKey) => {
    const { value } = e.target;
    setStepValues((prev) => ({
      ...prev,
      [stepKey]: value,
    }));
  };

  // Logic to calculate active step based on non-empty inputs
  let currentStep = 0;
  if (stepValues.step1.length > 0) currentStep = 1;
  if (stepValues.step2.length > 0) currentStep = 2;
  if (stepValues.step3.length > 0) currentStep = 3;
  if (stepValues.step4.length > 0) currentStep = 4;

  return (
    <div className="w-100 max-w-5xl mx-auto py-4">
      {/* Stepper Progress Bar */}
      <StepProgressBar steps={steps} currentStep={currentStep} />

      {/* Form Fields Card */}
      <div className="mt-4 border border-secondary-subtle rounded-3 p-4 bg-white">
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <TextInput
              label="Step 1: Basic Details"
              placeholder="Enter basic details..."
              value={stepValues.step1}
              onChange={(e) => handleInputChange(e, "step1")}
            />
          </div>
          <div className="col-12 col-md-6">
            <TextInput
              label="Step 2: Academic Details"
              placeholder="Enter academic details..."
              value={stepValues.step2}
              onChange={(e) => handleInputChange(e, "step2")}
            />
          </div>
          <div className="col-12 col-md-6">
            <TextInput
              label="Step 3: Course Selection"
              placeholder="Select a course..."
              value={stepValues.step3}
              onChange={(e) => handleInputChange(e, "step3")}
            />
          </div>
          <div className="col-12 col-md-6">
            <TextInput
              label="Step 4: Document Upload"
              placeholder="Upload document link..."
              value={stepValues.step4}
              onChange={(e) => handleInputChange(e, "step4")}
            />
          </div>
        </div>
      </div>

      {/* Status Footer */}
      <div className="mt-3 text-center text-sm text-secondary">
        Current Active Step:{" "}
        <span className="font-semibold text-dark fw-bold">
          {steps[currentStep]}
        </span>
      </div>
    </div>
  );
};

export default Stepbar;
