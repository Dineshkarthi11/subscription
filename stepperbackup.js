import React, { useState, useEffect } from "react";
import { Tooltip } from "antd";

const StepperBackup = ({
  steps,
  currentStep,
  errorSteps = [],
  activeColor = "bg-green-500",
  inactiveColor = "bg-gray-300",
  errorColor = "bg-red-500",
  textActiveColor = "text-white",
  textInactiveColor = "text-gray-700",
  textErrorColor = "text-white",
  track, 
}) => {
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

  const addFinalStepIfNeeded = (steps) => {
    if (steps.length === 2) {
      return [...steps, { Final: [] }];
    }
    return steps;
  };

const getDotsBetweenSteps = (index) => {
  const currentStepData = track[0][`step${index + 1}`] || [];

  // Helper function to determine the dot color based on status
  const getDotColor = (status) => {
    switch (status) {
      case "Approved":
        return { bg: "bg-green-500", ping: "bg-green-400" };
      case "Pending":
        return { bg: "bg-yellow-500", ping: "bg-yellow-400" };
      case "Rejected":
        return { bg: "bg-red-500", ping: "bg-red-400" };
      default:
        return { bg: "bg-gray-500", ping: "bg-gray-400" }; // Default color
    }
  };

  return (
    <div className="relative flex flex-col items-center space-y-7 h-full justify-between">
      {currentStepData.map((employee, empIndex) => {
        const { bg, ping } = getDotColor(employee.status);
        return (
          <div key={empIndex} className="flex items-center space-x-2">
            <Tooltip
              title={`${employee.name} - ${employee.employeeStatus}: ${employee.remarks}`}
              placement="right"
            >
              <span
                className={`relative inline-block w-2 h-2 rounded-full ${bg}`}
              >
                <span
                  className={`absolute inline-flex h-full w-full rounded-full ${ping} opacity-75 animate-ping`}
                ></span>
              </span>
            </Tooltip>
            <span className="text-sm">{employee.name}</span>
          </div>
        );
      })}
    </div>
  );
};

  const adjustedSteps = addFinalStepIfNeeded(steps);

  return (
    <div className="w-full mx-auto">
      <div className="relative flex flex-col ">
        {/* Render Steps */}
        <div className="flex flex-col ">
          {adjustedSteps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center mb-4 relative"
            >
              <Tooltip
                title={getTooltipTitle(Object.keys(step)[0], index)}
                placement="right"
              >
                <div
                  className={`size-5 rounded-full flex items-center justify-center font-bold text-[8px] 
                    ${getStepStyle(index)} z-10 cursor-pointer`}
                >
                  {index + 1}
                </div>
              </Tooltip>
              {index < adjustedSteps.length - 1 && (
                <div className="relative flex flex-col items-center">
                  <div
                    className={`w-px h-12 ${getProgressSegmentColor(
                      index
                    )} transition-all duration-500 ease-in-out`}
                  ></div>
                  {getDotsBetweenSteps(index)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepperBackup;
