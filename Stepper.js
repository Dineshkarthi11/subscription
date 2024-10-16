import React, { useState, useEffect, useRef, useMemo } from "react";
import { MdCheck } from "react-icons/md";

export default function Stepper({
  addMore = false,
  data,
  steps,
  currentStepNumber,
  presentage,
  className ="",
}) {
  const [stepperSteps, setStep] = useState([]);
  const [newSteps, setNewSteps] = useState([]);
  const primaryColor = localStorage.getItem("mainColor");
  const stepsStateRef = useRef();
  useEffect(() => {
    // console.log(steps);
    // console.log(addMore);

    // if (addMore === true) {
    //   steps.splice(1, 0, { data });
    // }
    // setNewSteps(steps);
  }, [steps]);

  useEffect(() => {
    // console.log(presentage);
    // console.log(steps);

    const stepsState = steps.map((step, index) => ({
      description: step.title,
      completed: false,
      highlighted: index === 0 ? true : false,
      selected: index === 0 ? true : false,
    }));
    stepsStateRef.current = stepsState;
    const currentSteps = updateStep(currentStepNumber, stepsState);
    setStep(currentSteps);
  }, [steps, currentStepNumber]);

  function updateStep(stepNumber, steps) {
    const newSteps = [...steps];
    let stepCounter = 0;
    // let stepNumber = nextNumber + 1;
    // console.log(stepCounter, newSteps.length, stepNumber);
    while (stepCounter < newSteps.length) {
      if (stepCounter === stepNumber) {
        // console.log(stepNumber);
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: true,
          selected: true,
          completed: false,
        };
        stepCounter++;
      } else if (stepCounter < stepNumber) {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: false,
          selected: true,
          completed: true,
        };
        stepCounter++;
      } else {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: false,
          selected: false,
          completed: false,
        };
        stepCounter++;
      }
    }
    return newSteps;
  }

  // const progressLine = (
  //   <div
  //     className="absolute left-0 right-0 h-1 bg-[#E4E4E4] z-0 rounded-md"
  //     style={{
  //       // width: `${(currentStepNumber / (steps.length - 1)) * 100}%`,
  //       width: `${(presentage / (steps.length - 1)) * 100}%`,
  //       background: `linear-gradient(270deg, #00B0FF 0.01%, ${primaryColor} 25.61%)`,
  //       transition: "width 0.5s ease",
  //     }}
  //   />
  // );

  // const stepsDisplay =

  return (
    <div className={`relative mx-4 py-1.5 flex justify-between items-center ${className} `}>
      {stepperSteps.map((step, index) => (
        <div
          key={index}
          className={
            index !== stepperSteps.length - 1
              ? "w-full flex items-center"
              : "flex items-center"
          }
        >
          <div className="relative z-50 flex flex-col items-center">
            <div className="w-8 h-8 bg-white rounded-full 2xl:h-11 2xl:w-11">
              <div
                className={`rounded-full 2xl:h-11 2xl:w-11 h-8 w-8 shadow-stepShadowInset vhcenter bg-[${primaryColor}] bg-opacity-30 border-[0.5px] border-[${primaryColor}] ${
                  step.selected && step.completed
                    ? "border-opacity-40"
                    : " border-[#E4E4E4] border-opacity-100"
                }`}
                style={{backgroundColor: `${primaryColor}44`}}
              >
                <div
                  style={{
                    boxShadow: `${
                      step.selected
                        && `0px 3.882px 6.211px 0px ${primaryColor}66, 0px 0.776px 1.553px 0px #ffffff66 inset`
                        // : `none`
                    }`,
                  }}
                  className={`text-xs 2xl:text-base font-medium rounded-full transition duration-500 ease-in-out h-5 w-5 2xl:h-8 2xl:w-8 vhcenter shadow-stepShadow
             ${
               step.selected ? "bg-accent text-white border-accent" : "bg-white"
             }
            `}
                >
                  {step.completed ? (
                    <span className="font-bold text-white">{<MdCheck />}</span>
                  ) : step.selected ? (
                    <span className="text-white">{index + 1}</span>
                  ) : (
                    <span className="text-black opacity-50">{index + 1}</span>
                  )}
                </div>
              </div>
            </div>
            <div
              className={`absolute top-0  text-center mt-11 2xl:mt-14 w-40 text-xs 2xl:text-base font-medium whitespace-nowrap ${
                step.selected ? "text-black dark:text-white" : step.completed ? "opacity-0 sm:opacity-100" : "text-black opacity-0 sm:opacity-50 dark:text-white"
              }`}
            >
              {step.description}
            </div>
          </div>
          <div
            className={`flex-auto transition duration-500 ease-in-out h-1 bg-[#E4E4E4] dark:bg-[#393939]`}
          ></div>
          <div
            className="absolute left-0 right-0 h-1 bg-[#E4E4E4] dark:bg-[#393939] z-0 rounded-full"
            style={{
              // width: `${(currentStepNumber / (steps.length - 1)) * 100}%`,
              width: `${(presentage / (steps.length - 1)) * 100}%`,
              background: `linear-gradient(270deg, #00B0FF 0.01%, ${primaryColor} 25.61%)`,
              transition: "width 0.5s ease",
            }}
          />
        </div>
      ))}
    </div>
  );
}
