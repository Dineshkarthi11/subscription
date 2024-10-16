import React from "react";
import SegmentedTab from "../common/Segmented";
import { PiDotsSixVertical } from "react-icons/pi";
import { twMerge } from "tailwind-merge";

const DragCard = ({
  icon,
  header,
  count,
  children,
  segment = false,
  segmentOptions,
  segmentSelected,
  segmentOnchange,
  className = "",
  isHeader = true,
}) => (
  <div
    className={twMerge(
      "flex flex-col gap-3 p-2 bg-white shadow-dashboard rounded-xl dark:bg-black",
      className
    )}
  >
    {/* HEADER */}
    {isHeader && (
      <div className="bg-[#F8FAFC] rounded-md h-10 dark:bg-[#171C28] p-2 flex items-center justify-between">
        {segment ? (
          <SegmentedTab
            options={segmentOptions}
            onChange={segmentOnchange}
            selectedOption={segmentSelected}
          />
        ) : (
          header && (
            <div className="flex items-center gap-2.5">
              {icon && <div className="w-5 h-5 dark:text-white">{icon}</div>}
              <h3 className="h3">{header}</h3>
              {count && (
                <p className="text-[11px] text-white rounded bg-primary size-4 vhcenter">
                  {count}
                </p>
              )}
            </div>
          )
        )}
        <PiDotsSixVertical className="text-lg" />
      </div>
    )}
    {/* CONTENT */}
    {children}
  </div>
);

export default DragCard;
