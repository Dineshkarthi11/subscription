import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import ToggleBtn from "./ToggleBtn";
import Button from "../common/Button";
import { lightenColor } from "./lightenColor";
import { GoDotFill } from "react-icons/go";

export default function Accordion({
  children,
  data = [],
  padding = true,
  toggleBtn = false,
  title,
  description,
  status,
  click = () => {},
  className,
  initialExpanded = false,
  buttonName,
  childrenGap = "gap-8",
  primarybg = true,
  change,
}) {
  const [expanded, setExpanded] = useState(initialExpanded);
  const primaryColor = localStorage.getItem("mainColor");
  const mode = localStorage.getItem("theme");

  // const toggleAccordion = (id) => {
  //   setExpanded((prevExpanded) => ({
  //     ...prevExpanded,
  //     [id]: !prevExpanded[id],
  //   }));
  // };

  useEffect(() => {}, [expanded]);

  const lighterColor = lightenColor(primaryColor, 0.925);
  const lighterColor2 = lightenColor(primaryColor, 0.91);
  return (
    <div
      className={`relative flex flex-col rounded-[10px] gap-6 ${className}`}
      onClick={() => click()}
    >
      {/*  Accordian item 1 */}
      {/* {data.map((item) => ( */}
      <div
        // key={item.id}
        className="borderb rounded-[10px] dark:bg-dark"
      >
        <h2 className="p-2">
          <button
            type="button"
            className="flex items-center justify-between w-full px-5 py-4 font-semibold text-left rounded dark:bg-gray-800 dark:text-white"
            style={
              primarybg
                ? {
                    background:
                      mode === "dark"
                        ? `linear-gradient(90deg, rgb(44 44 44) 0.03%, rgb(50 50 50) 100.92%)`
                        : `linear-gradient(90deg, ${lighterColor} 0.03%, ${lighterColor2} 100.92%)`,
                  }
                : {}
            }
            onClick={() => setExpanded(!expanded)}
            // aria-expanded={expanded}
            aria-controls={`acco-text-item`}
          >
            {status ? (
              <div className="text-left rtl:text-right">
                <p className="flex items-center gap-2">
                  <span>{title}</span>
                  <div
                    className={`flex gap-1 items-center rounded-full px-2 py-0.5 w-fit font-medium text-[10px] 2xl:text-sm flex-nowrap ${
                      status === "Open"
                        ? "text-green-600 bg-green-100"
                        : "text-orange-600 bg-orange-100"
                    }`}
                  >
                    <GoDotFill />
                    {status}
                  </div>
                </p>
                <p className="para">{description}</p>
              </div>
            ) : (
              <div className="text-left rtl:text-right">
                <h1 className="acco-h1">{title}</h1>
                <p className="para">{description}</p>
              </div>
            )}

            <div
              className={`rounded-[4px] ${
                !toggleBtn && "bg-secondaryWhite dark:bg-secondaryDark"
              }  p-[5px]`}
            >
              {toggleBtn ? (
                <ToggleBtn value={expanded ? 1 : 0} change={change} />
              ) : (
                <IoIosArrowForward
                  size={18}
                  className={`transition duration-300 ease-out origin-center transform text-black text-opacity-20 dark:text-white dark:text-opacity-20 ${
                    expanded ? "!rotate-90" : ""
                  }`}
                />
              )}
            </div>
          </button>
        </h2>
        <div
          id={`acco-text-item`}
          role="region"
          aria-labelledby={`acco-title-item`}
          className={`grid text-sm transition-all duration-300 ease-in-out ${
            expanded
              ? `grid-rows-[1fr] opacity-100 ${
                  padding ? "p-6" : ""
                } border-t border-secondaryDark dark:border-secondaryWhite border-opacity-10 dark:border-opacity-10`
              : "grid-rows-[0fr] opacity-0 "
          }`}
        >
          <div className={`flex flex-col ${childrenGap} overflow-hidden`}>
            {children}
          </div>
          {/* Content */}
        </div>
      </div>
      {/* ))} */}
    </div>
  );
}
