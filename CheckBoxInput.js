import { Checkbox } from "antd";
import React from "react";
import { HiMiniStar } from "react-icons/hi2";

export default function CheckBoxInput({
  change = () => {},
  value = "",
  title = "",
  titleRight = "",
  titleDescription = "",
  required = false,
  style,
  classname = "",
  titleLeft = "",
  titleClassName = "",
  indeterminate,
  disabled = false,
  className,
}) {
  return (
    <div
      className={`flex flex-col ${title ? "gap-2" : `gap-0  ${className} `} `}
    >
      <div className="flex">
        <p
          className={`text-xs font-medium 2xl:text-sm dark:text-white ${titleClassName}`}
        >
          {title}
        </p>
        {required && <HiMiniStar className="text-[10px] text-rose-600" />}
      </div>
      <div
        className={`${
          titleRight ? " flex items-center gap-2 dark:text-white" : null
        }`}
      >
        {titleLeft && (
          <p className="text-xs font-medium 2xl:text-sm">{titleLeft}</p>
        )}
        <Checkbox
          checked={value}
          indeterminate={indeterminate}
          onChange={(e) => {
            change(e.target.checked === true ? 1 : 0);
          }}
          disabled={disabled}
        >
          <div className="flex flex-col">
            {titleRight && (
              <p
                className={` text-xs ${
                  titleDescription ? " font-semibold" : "font-medium"
                } 2xl:text-sm ${titleClassName}`}
              >
                {titleRight}
              </p>
            )}
            {titleDescription && (
              <p className=" text-xs font-normal">{titleDescription}</p>
            )}
          </div>
        </Checkbox>
      </div>
    </div>
  );
}
