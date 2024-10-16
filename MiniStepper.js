import React, { useState, useEffect } from "react";
import { Tooltip } from "antd";

const MiniStepper = ({
  steps,
  currentStep,
  errorSteps = [],
  activeColor = "bg-green-500",
  inactiveColor = "bg-gray-300",
  errorColor = "bg-red-500",
  textActiveColor = "text-white",
  textInactiveColor = "text-gray-700",
  textErrorColor = "text-white",
}) => {
  console.log(currentStep, "currentStep");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentStep > 1) {
      const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;
      setProgress(progressPercentage);
    } else {
      setProgress(0);
    }
  }, [currentStep, steps.length]);

  const getStepStyle = (index) => {
    if (errorSteps.includes(index + 1)) {
      return `${errorColor} ${textErrorColor}`;
    }
    if (index < currentStep) {
      return `${activeColor} ${textActiveColor}`;
    }
    return `${inactiveColor} ${textInactiveColor}`;
  };

  const getProgressSegmentColor = (index) => {
    if (errorSteps.includes(index + 2)) {
      return errorColor;
    }
    if (index < currentStep - 1) {
      return activeColor;
    }
    return inactiveColor;
  };

const getTooltipTitle = (step, index) => {
  if (errorSteps.includes(index + 1)) {
    return `${step} (Rejected)`;
  }
  if (index < currentStep - 1) {
    return `${step} (Approved)`;
  }
  if (index === currentStep - 1) {
    return `${step} (Approved)`;
  }
  return `${step} (Pending)`;
};

  return (
    <div className="w-full mx-auto">
      <div className="relative">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <Tooltip
              key={index}
              title={getTooltipTitle(step, index)}
              placement="top"
            >
              <div
                className={`size-5 rounded-full flex items-center justify-center font-bold text-[8px] 
                  ${getStepStyle(index)} z-10 cursor-pointer`}
              >
                {index + 1}
              </div>
            </Tooltip>
          ))}
        </div>
        <div className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 flex">
          {steps.slice(0, -1).map((_, index) => (
            <div
              key={index}
              className={`h-full flex-1 transition-all duration-500 ease-in-out ${getProgressSegmentColor(
                index
              )}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiniStepper;
