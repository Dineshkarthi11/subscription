import { TimePicker } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { FaAsterisk } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

export default function TimeSelect({
  title = "",
  change = () => { },
  error = "",
  className = "",
  placeholder = "",
  props,
  value = null,
  format = "HH:mm",
  description,
  required = false,
  showErrorMessage = true,
}) {
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
  const [defaultValue, setDefaultValue] = useState(null);

  useEffect(() => {
    // console.log(value);
    // console.log(format);
    setDefaultValue(value);
  }, [value]);

  // Function to allow only numeric input
  const handleKeyPress = (event) => {
    const allowedKeys = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      ":",
      "Backspace",
    ];
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <div className={`w-full ${className} flex flex-col gap-2`}>
      <div className="flex items-center dark:text-white gap-0.5">
        <p className="text-xs font-medium 2xl:text-sm dark:text-white">
          {title}
        </p>
        {required && <FaAsterisk className="text-[6px] text-rose-600" />}
      </div>
      <TimePicker
        placeholder={placeholder}
        onChange={(time, timeString) => {
          // console.log(timeString);
          change(timeString);
        }}
        onKeyDown={handleKeyPress}
        size={isSmallScreen ? "default" : "large"}
        className={`w-full ${error ? "border-rose-400" : ""}`}
        value={
          value !== null && value !== "" && value !== "Invalid Date"
            ? dayjs(value, format)
            : null
        }
        format={format}
        status={error ? "error" : ""}
        style={
          error && {
            boxShadow:
              "0px 0px 0px 4px #FEE4E2, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
          }
        }
      />
      {error && showErrorMessage && (
        <p className="flex justify-start items-center mt-2 mb-0 text-[10px] text-red-600">
          <span className="text-[10px] pl-1">{error}</span>
        </p>
      )}
      {description && (
        <p className="text-xs 2xl:text-sm font-normal opacity-70 dark:text-white">
          {description}
        </p>
      )}
    </div>
  );
}
