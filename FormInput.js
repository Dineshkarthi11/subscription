import { Input, Tooltip } from "antd";
import { FiAlertCircle } from "react-icons/fi";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaAsterisk } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

export default function FormInput({
  title = "",
  type = "text",
  placeholder = "",
  value = "",
  icon = "",
  className = "",
  phoneNumber,
  websiteLink,
  change = () => {},
  error = "",
  width = "full",
  description,
  required = false,
  Id = "",
  ref,
  grid = "",
  autoFocus,
  maxLength = 30,
  disabled = false,
  pattern = false,
  inputmode = "",
  variant = "",
  suffixTooltip = "",
  suffixIcon,
  suffixClickable = false,
  showErrorMessage = true,
  onInput,
  Characters = false,
  Alphabet = false,
}) {
  const { t } = useTranslation();
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [inputDisable, setinputDisable] = useState(true);
  const [localError, setLocalError] = useState("");

  const handleChange = (e) => {
    let inputValue = e.target.value;
    let errorMessage = "";

    if (Characters) {
      // inputValue = inputValue.replace(/[^a-zA-Z0-9 ]/g, "");
      if (/[^a-zA-Z0-9 ]/.test(inputValue)) {
        errorMessage = "Invalid Character";
      } else {
        errorMessage = "";
      }
    } else if (Alphabet) {
      // inputValue = inputValue.replace(/[^a-zA-Z ]/g, "");
      if (/[^a-zA-Z ]/.test(inputValue)) {
        errorMessage = "Invalid Character";
      } else {
        errorMessage = "";
      }
    }

    if (inputValue.charAt(0) === " ") {
      inputValue = inputValue.slice(1);
    }

    if (inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }

    setLocalError(errorMessage);
    change(inputValue);
  };

  useEffect(() => {
    // console.log(value, "iiiiiiiiiiiii");
  }, [value]);

  return (
    <div
      className={`flex flex-col ${
        title ? "gap-2" : "gap-0 items-center"
      } ${grid}`}
    >
      <div className="flex items-center dark:text-white gap-0.5">
        {title && (
          <label htmlFor="" className="text-xs font-medium 2xl:text-sm ">
            {title}
          </label>
        )}
        {required && <FaAsterisk className="text-[6px] text-rose-600" />}
      </div>
      <span className={`relative ${className} `}>
        <Input
          onWheel={(e) => {
            e.currentTarget.blur();
          }}
          onInput={onInput}
          id={Id}
          type={type}
          pattern={pattern}
          inputmode={inputmode}
          placeholder={t(`Enter ${placeholder}`)}
          value={value === "NAN" ? "" : value}
          onChange={handleChange}
          className={`w-full ${
            error || localError ? "border-rose-400" : ""
          } !dark:text-white`}
          status={error || localError ? "error" : ""}
          size={isSmallScreen ? "default" : "large"}
          prefix={icon && icon}
          suffix={
            <Tooltip title={suffixTooltip}>
              <div
                onClick={
                  suffixClickable === true &&
                  (() => setinputDisable(!inputDisable))
                }
                className="cursor-pointer z-50"
              >
                {suffixIcon && suffixIcon}
              </div>
            </Tooltip>
          }
          variant={variant ? variant : "outlined"}
          style={
            error || localError
              ? {
                  boxShadow:
                    "0px 0px 0px 4px #FEE4E2, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                }
              : {}
          }
          disabled={suffixClickable ? inputDisable : disabled}
          autoFocus={autoFocus}
        />

        {(error || localError) && (
          <FiAlertCircle
            className={`absolute top-2.5 right-2 mr-3 transform -translate-y-1/5 text-red-400`}
          />
        )}

        {(error || localError) && showErrorMessage && (
          <p className="flex justify-start items-center mt-2 my-1 mb-0 text-[10px] text-red-600">
            <span className="text-[10px] pt-2">{error || localError}</span>
          </p>
        )}
      </span>
      {description && (
        <p className="2xl:text-sm text-xs font-normal opacity-70 dark:text-white">
          {description}
        </p>
      )}
    </div>
  );
}
