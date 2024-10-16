import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import ToggleBtn from "./ToggleBtn";
import { IoCalendarClearOutline } from "react-icons/io5";
import { LuClock3 } from "react-icons/lu";


export default function DashboardAccordion({
    children,
    padding = true,
    toggleBtn = false,
    title,
    date,
    time,
    className,
    color,
    initialExpanded = false,
    style,
}) {
    const [expanded, setExpanded] = useState(initialExpanded);


    useEffect(() => {
    }, [expanded]);

    return (
        <div
            className={`border border-secondaryDark dark:border-secondaryWhite border-opacity-10 dark:border-opacity-10 ${className}`}
            style={style}
        >
            <h2>
                <button
                    type="button"
                    className={`flex items-center justify-between w-full px-6 py-4 font-semibold text-left dark:bg-transparent dark:text-white ${className}`}
                    onClick={() => setExpanded(!expanded)}
                    aria-expanded={expanded}
                    aria-controls={`acco-text-item`}
                >
                    <div className="text-left rtl:text-right 2xl:text-xs text-[9px]" style={{ color: color }}>
                        <h1>{title}</h1>
                        <div className="flex items-center gap-3 mt-1">
                                <span className="flex items-center gap-1"><IoCalendarClearOutline />{date} </span>
                                <span className="flex items-center gap-1"><LuClock3 /> {time}</span>
                        </div>
                    </div>
                    <div
                        className={`rounded-[4px] ${!toggleBtn && "bg-secondaryWhite dark:bg-secondaryDark"
                            }  p-[5px]`}
                    >
                        {toggleBtn ? (
                            <ToggleBtn value={expanded ? 1 : 0} />
                        ) : (
                            <IoIosArrowForward
                                size={18}
                                className={`transition duration-300 ease-out origin-center transform text-black text-opacity-20 dark:text-white dark:text-opacity-20 ${expanded ? "!rotate-90" : ""
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
                className={`grid overflow-hidden text-sm transition-all duration-300 ease-in-out ${expanded
                    ? `grid-rows-[1fr] opacity-100 ${padding ? "p-6" : ""
                    }`
                    : "grid-rows-[0fr] opacity-0 "
                    }`}
            >
                <div className="flex flex-col gap-8 overflow-hidden">{children}</div>
                {/* Content */}
            </div>
        </div>
    );
}
