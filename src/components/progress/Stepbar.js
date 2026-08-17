"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

// --- 1. YOUR REUSABLE PROGRESS BAR COMPONENT ---
const ProgressBar = ({ steps = [], currentStep = 0 }) => {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white border rounded-xl shadow-sm">
      <div className="flex items-center justify-between w-full relative">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isFuture = index > currentStep;

          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center z-10 relative">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                    isCompleted
                      ? "bg-[#22C55E]"
                      : isActive
                        ? "bg-[#2563EB]"
                        : "bg-[#E5E7EB]"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-white stroke-[3]" />
                  ) : (
                    <span
                      className={`text-sm font-semibold ${
                        isActive ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {index + 1}
                    </span>
                  )}
                </div>
                <span className="mt-3 text-sm font-medium text-gray-800 whitespace-nowrap">
                  {step}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div className="flex-1 px-2">
                  <div
                    className={`h-1 w-full rounded-full transition-all duration-300 ${
                      isCompleted ? "bg-[#22C55E]" : "bg-[#E5E7EB]"
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

// --- 2. REUSABLE TEXT INPUT (For the test fields) ---
const TextInput = ({ label, value, onChange, placeholder }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-gray-900">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg bg-[#F3F3F5] px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none border border-gray-300"
      />
    </div>
  );
};

// --- 3. THE MAIN STEPBAR COMPONENT ---
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
    setStepValues((prev) => ({
      ...prev,
      [stepKey]: e.target.value,
    }));
  };

  // Logic to calculate current step based on input values
  let currentStep = 0;
  if (stepValues.step1.length > 0) currentStep = 1;
  if (stepValues.step2.length > 0) currentStep = 2;
  if (stepValues.step3.length > 0) currentStep = 3;
  if (stepValues.step4.length > 0) currentStep = 4;

  return (
    <div className="max-w-5xl mx-auto">
      <ProgressBar steps={steps} currentStep={currentStep} />

      <div className="mt-10 grid grid-cols-1 border border-gray-300 rounded-xl p-6 md:grid-cols-2 gap-6">
        <TextInput
          label="Step 1: Basic Details"
          placeholder="Enter basic details..."
          value={stepValues.step1}
          onChange={(e) => handleInputChange(e, "step1")}
        />
        <TextInput
          label="Step 2: Academic Details"
          placeholder="Enter academic details..."
          value={stepValues.step2}
          onChange={(e) => handleInputChange(e, "step2")}
        />
        <TextInput
          label="Step 3: Course Selection"
          placeholder="Select a course..."
          value={stepValues.step3}
          onChange={(e) => handleInputChange(e, "step3")}
        />
        <TextInput
          label="Step 4: Document Upload"
          placeholder="Upload document link..."
          value={stepValues.step4}
          onChange={(e) => handleInputChange(e, "step4")}
        />
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        Current Active Step:{" "}
        <span className="font-semibold text-gray-900">
          {steps[currentStep]}
        </span>
      </div>
    </div>
  );
};

export default Stepbar;
