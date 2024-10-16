import React, { useState } from "react";
import { Select, Popover } from "antd";
import { useMediaQuery } from "react-responsive";
import { FaAsterisk } from "react-icons/fa";
import { IoAlertCircleOutline } from "react-icons/io5";
import { FiAlertCircle } from "react-icons/fi";

const CustomSelect = ({
  title = "",
  value = null,
  description,
  rightIcon = false,
  error = "",
  required = false,
  descriptionTop = "",
  className,
  showErrorMessage = true,
  PopoverContent = {},
  options = [],
  placeholder = "Select an option",
  style,
  dropdownRender = (menu) => <>{menu}</>,
  optionRender = (option) => <div>{option.label}</div>,
  onChange,
  ...rest
}) => {
  const [items] = useState(options);
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });

  const handleChange = (value) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={`${className} flex flex-col gap-2`}>
      {title && (
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center dark:text-white gap-0.5">
            <label htmlFor="" className="text-xs font-medium 2xl:text-sm ">
              {title}
            </label>
            {required && <FaAsterisk className="text-[6px] text-rose-600" />}
          </div>
          {descriptionTop && (
            <p className="text-xs font-medium opacity-50 dark:text-white">
              {descriptionTop}
            </p>
          )}
        </div>
      )}
      <div className="relative flex items-center ">
        <Select
          style={style}
          placeholder={placeholder}
          dropdownRender={dropdownRender}
          optionRender={optionRender}
          options={options}
          value={value}
          className="w-full"
          onChange={handleChange}
          size={isSmallScreen ? "default" : "large"}
          {...rest}
        />
        {error && (
          <FiAlertCircle className="absolute top-2.7 right-8 -mr-1 transform -translate-y-2/5 text-red-400" />
        )}
        {rightIcon && (
          <Popover
            content={PopoverContent}
            style={{
              borderRadius: "13.45px",
            }}
          >
            <IoAlertCircleOutline className="pl-1 text-xl opacity-50" />
          </Popover>
        )}
      </div>
      {description && (
        <p className="text-xs font-normal 2xl:text-sm opacity-70 dark:text-white">
          {description}
        </p>
      )}
      {error && showErrorMessage && (
        <p className="flex justify-start items-center my-1 mb-0 text-[10px] text-red-500">
          <span className="text-[10px] pl-1">{error}</span>
        </p>
      )}
    </div>
  );
};

export default CustomSelect;
