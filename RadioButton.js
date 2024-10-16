import { Radio } from "antd";
import React, { useEffect } from "react";
import { FaAsterisk } from "react-icons/fa6";
import { useMediaQuery } from "react-responsive";
import { twMerge } from "tailwind-merge";

export default function RadioButton({
  change = () => { },
  className,
  value = "",
  title = "",
  error = "",
  options = [],
  required = false,
  children,
  onSelect = () => { },
  marginTop = 0,
  image = false,
  radioGroupClassName = "",
  textclass = ""
}) {
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });

  const containerStyle = {
    marginTop: `${marginTop}px`,
  };

  useEffect(() => {
    // console.log(value, "radiovalue");
  }, [value]);

  return (
    <div className={`${className} flex flex-col gap-2 relative`} style={containerStyle}>
      <div className="flex items-center dark:text-white gap-0.5">
        {title && (
          <label htmlFor="" className={textclass ? textclass : "text-xs font-medium 2xl:text-sm"}>
            {title}
          </label>
        )}
        {required && <FaAsterisk className="text-[6px] text-rose-600" />}
      </div>
      <Radio.Group
        name="radiogroup"
        value={value}
        size={isSmallScreen ? "default" : "large"}
        onChange={(e) => {
          change(e.target.value);
        }}
        className={twMerge("flex sm:items-center flex-col sm:flex-row", radioGroupClassName)}
      >
        {options?.map((radio) => (
          <Radio
            key={radio.value}
            value={radio.value}
            className="flex items-center"
            disabled={radio.disabled}
            checked={radio.checked}
            onClick={(e) => {
              onSelect(e.target.value);
            }}
          >
            <div className="flex items-center gap-2">
              {image && (
                <img src={radio.image} alt="Userimage" className="w-4 h-4" />
              )}
              <span className="text-xs 2xl:text-sm dark:text-white">
                {radio.label}
              </span>
            </div>
          </Radio>
        ))}
      </Radio.Group>
      {error && (
        <p className=" flex justify-start items-center my-1 mb-0 text-[10px] text-red-600">
          <span className="text-[10px] pl-1">{error}</span>
        </p>
      )}
    </div>
  );
}
