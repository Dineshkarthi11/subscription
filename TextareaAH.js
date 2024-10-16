import React, { useState } from "react";
import { FiAlertCircle } from "react-icons/fi";

const TextareaAH = ({
  value,
  onChange,
  placeholder = "",
  className = "",
  error = "",
  maxLength,
}) => {
  const [textareaValue, setTextareaValue] = useState(value || "");
  const [letterCount, setLetterCount] = useState(value ? value.length : 0);

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
    adjustTextareaHeight();
    if (onChange) {
      onChange(e.target.value);
    }
    let inputValue = e.target.value;
    const inputLetterCount = inputValue.length;

    // If the pasted text exceeds 250 characters, truncate it
    if (inputLetterCount > 1500) {
      inputValue = inputValue.substring(0, 1500);
    }

    // Update letter count and invoke the change callback
    setLetterCount(inputValue.length);
    onChange(inputValue);
  };

  // const handleChange = (e) => {
  //   let inputValue = e.target.value;
  //   const inputLetterCount = inputValue.length;

  //   // If the pasted text exceeds 250 characters, truncate it
  //   if (inputLetterCount > 250) {
  //     inputValue = inputValue.substring(0, 250);
  //   }

  //   // Update letter count and invoke the change callback
  //   setLetterCount(inputValue.length);
  //   change(inputValue);
  // };

  const adjustTextareaHeight = () => {
    const textarea = document.getElementById("autoHeightTextarea");
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <div className="relative w-full">
      <textarea
        id="autoHeightTextarea"
        className={`w-full mt-0 para !font-normal border-none outline-none overflow-y-hidden h-auto resize-none bg-transparent autoHeightTextarea ${className} ${
          error ? "border-rose-400" : ""
        }`}
        value={textareaValue}
        onChange={handleTextareaChange}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      {error && (
        <FiAlertCircle
          className={`absolute top-2.5 right-2 mr-3 transform -translate-y-1/5 text-red-400 ${className}`}
        />
      )}
      {error && (
        <p className="flex justify-start items-center mt-2 my-1 mb-0 text-[10px] text-red-600">
          <span className="text-[10px] pl-1">{error}</span>
        </p>
      )}
      {/* <p className="para !font-normal text-xs text-gray-500 mt-2">{maxLength-letterCount} characters</p> */}
    </div>
  );
};

export default TextareaAH;
