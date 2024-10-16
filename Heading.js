import { Flex } from "antd";
import React from "react";
import { HiMiniStar } from "react-icons/hi2";

export default function Heading({
  className,
  title = "",
  description = "",
  required = false,
  font = "20px",
}) {
  return (
    <div
      className={`flex flex-col  justify-center gap-0.5 dark:text-white ${className}`}
    >
      <div className="flex">
        {/* previous code */}
        <h1 className={`h1`}>{title}</h1>
        {/* <h1
          className={`text-sm font-semibold text-black 2xl:text-base dark:text-white flex items-center gap-2`}
        >
          {title}
        </h1> */}
        {required && <HiMiniStar className="text-[10px] text-rose-600" />}
      </div>
      <p className="para !font-medium overflow-hidden text-ellipsis">{description}</p>
    </div>
  );
}
