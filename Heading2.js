import { Flex } from "antd";
import React from "react";
import { HiMiniStar } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

export default function Heading2({
  className,
  title = "",
  description = "",
  required = false,
  font = "20px",
  count = 0,
  countClassname="",
  titleClassname=""
}) {
  // console.log(count,"length")
  return (
    <div
      className={`flex flex-col  justify-center gap-0.5 dark:text-white ${className}`}
    >
      <div className="flex">
        <h1 className={twMerge("h2 flex items-center gap-2", titleClassname)}>{title}
        {count !== 0 && <span className={` ${countClassname}`}>{String(count).padStart(2, '0')}</span>}
        </h1>
        {required && <HiMiniStar className="text-[10px] text-rose-600" />}

      </div>
      {description && <p className="para !font-medium">{description}</p>}
    </div>
  );
}
