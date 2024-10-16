import React from "react";
import { lightenColor } from "./lightenColor";
import { twMerge } from "tailwind-merge";

export const BoxWrapper = ({
  children,
  className,
  header = true,
  title = "",
  description = "",
  contentClassName = "",
}) => {
  const primaryColor = localStorage.getItem("mainColor");
  const mode = localStorage.getItem("theme");
  const lighterColor = lightenColor(primaryColor, 0.925);
  const lighterColor2 = lightenColor(primaryColor, 0.91);
  return (
    <div
      className={twMerge(
        "relative borderb rounded-[10px] p-[5px] flex flex-col",
        className
      )}
    >
      {header && (
        <div className="rounded-md overflow-hidden p-1.5"
          style={{
            background:
              mode == "dark"
                ? `linear-gradient(90deg, rgb(44 44 44) 0.03%, rgb(50 50 50) 100.92%)`
                : `linear-gradient(90deg, ${lighterColor} 0.03%, ${lighterColor2} 100.92%)`,
          }}
        >
          <div className="text-left rtl:text-right px-3">
            <h1 className="acco-h1">{title}</h1>
            <p className="para !font-normal">{description}</p>
          </div>
        </div>
      )}
      <div className={twMerge("content p-4", contentClassName)}>{children}</div>
    </div>
  );
};
