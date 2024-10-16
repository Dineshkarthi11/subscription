import { useEffect } from "react";
import { Switch } from "antd";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function ToggleBtn({
  title = "",
  change = () => {},
  value = false,
  width = "",
  text = false,
  flexText = false,
  className,
  titleRight,
  titleRightClassName,
  disable = false,
}) {
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });

  const [isChecked, setIsChecked] = useState(value);
  const [ontext, setOntext] = useState();

  useEffect(() => {
    setIsChecked(value);
  }, [value]);

  return (
    <div className={`flex flex-col gap-2 ${className}`} width={width}>
      {title && (
        <label className="text-xs 2xl:text-sm dark:text-white">{title}</label>
      )}
      <div className={`${titleRight ? " flex items-center gap-2" : null}`}>
        <Switch
          checked={isChecked}
          onChange={(checked, e) => {
            setIsChecked(checked);
            change(checked === true ? 1 : 0);
          }}
          // className={`w-fit`}
          // // className={`bg-[#F2F4F7] w-fit`}
          size={isSmallScreen ? "small" : "default"}
          disabled={disable}
        />
        {titleRight && (
          <p
            className={`${
              titleRightClassName ? titleRightClassName : " text-xs font-normal"
            }`}
          >
            {titleRight}
          </p>
        )}
        {text && <span className="flex items-center px-2 text-sm">{text}</span>}
      </div>
    </div>
  );
}
