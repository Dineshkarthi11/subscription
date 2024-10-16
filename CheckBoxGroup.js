import React from "react";
import { Checkbox } from "antd";
import { HiMiniStar } from "react-icons/hi2";

export default function CheckboxGroup({
  title = "",
  titleRight,
  titleDescription,
  required = false,
  options,
  defaultValue,
  change,
  disabled,
}) {
  return (
    <div className={`flex flex-col ${title ? "gap-2" : "gap-0 items-center"} `}>
      <div className="flex">
        <p className="text-xs font-medium 2xl:text-sm dark:text-white">
          {title}
        </p>
        {required && <HiMiniStar className="text-[10px] text-rose-600" />}
      </div>
      <div className={`${titleRight ? " flex items-center gap-2" : null}`}>
        {/* <Checkbox
          checked={value}
          onChange={(e) => {
            change(e.target.checked === true ? 1 : 0);
          }}
        /> */}
        <Checkbox.Group
          options={options}
          defaultValue={defaultValue}
          onChange={change}
          disabled={disabled}
        />
        <div className="flex flex-col">
          {titleRight && (
            <p className="text-xs font-medium 2xl:text-sm">{titleRight}</p>
          )}
          {titleDescription && (
            <p className=" text-sx font-normal">{titleDescription}</p>
          )}
        </div>
      </div>
    </div>
  );
}
