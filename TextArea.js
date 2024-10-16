import { Input } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaAsterisk } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { HiMiniStar } from "react-icons/hi2";
import { useMediaQuery } from "react-responsive";

export default function TextArea({
  className = "",
  title = "",
  error = "",
  placeholder = "",
  change = () => {},
  value = "",
  required = false,
  rows = 4,
  style = {},
  customField,
  disabled,
  Characters = false,
}) {
  const { t } = useTranslation();
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
  const { TextArea } = Input;
  const [letterCount, setLetterCount] = useState(value?.length); // Initial letter count

  useEffect(() => {
    setLetterCount(value?.length || 0); // Set initial letter count based on the value
  }, [value]);
  const handleChange = (e) => {
    let inputValue = e.target.value;
    const inputLetterCount = inputValue.length;
      if (Characters) {
       
        inputValue = inputValue.replace(/[^a-zA-Z0-9 ]/g, "");

        
        if (inputValue.charAt(0) === " ") {
          inputValue = inputValue.slice(1);
        }
      }
   
    if (inputLetterCount > 250) {
      inputValue = inputValue.substring(0, 250);
    }

    
    setLetterCount(inputValue.length);
    change(inputValue);
  };
 
  return (
    <div className={` ${className}  relative flex flex-col gap-1`}>
      <div className="flex justify-between">
        <div className="flex items-center dark:text-white gap-0.5">
          {title && (
            <label htmlFor="" className="text-xs font-medium 2xl:text-sm ">
              {title}
            </label>
          )}
          {required && <FaAsterisk className="text-[6px] text-rose-600" />}
        </div>
        {customField}
      </div>
      <div style={{ position: "relative" }}>
        <TextArea
          rows={rows}
          name=""
          id=""
          placeholder={t(`Enter ${placeholder}`)}
          value={value}
          onChange={handleChange} // Changed to use custom handler
          size={isSmallScreen ? "default" : "large"}
          className={`w-full  border rounded-lg mt-[6px] ${style}`}
          style={{
            ...(error && {
              boxShadow:
                "0px 0px 0px 4px #FEE4E2, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            }),
          }}
          status={error ? "error" : ""}
          disabled={disabled}
        />

        {error && (
          <FiAlertCircle className="absolute text-red-400 transform top-5 right-5 -translate-y-1/5" />
        )}
      </div>
      {error && (
        <p className="flex justify-start items-center my-1 mb-0 text-[10px] text-red-600">
          <span className="text-[10px] pl-1 pt-1.5">{error}</span>
        </p>
      )}
      <p className="text-xs text-gray-500">{letterCount}/250 letters</p>
    </div>
  );
}
