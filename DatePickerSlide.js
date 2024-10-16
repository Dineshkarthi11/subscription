import React, { useState, useRef } from "react";
import { PiCalendar, PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { DatePicker } from "antd";
import gsap from "gsap";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import ButtonClick from "./Button";

const DateSliderPicker = ({
  selectedDate,
  onDateChange,
  mode,
  datepicker = true,
  width = '',
  dateFontSizeClass = "",
  arrowFontSizeClass = "",
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const dateRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handlePrevDate = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      const newDate = new Date(selectedDate);
      if (mode === "day") {
        newDate.setDate(selectedDate.getDate() - 1);
      } else if (mode === "month") {
        newDate.setMonth(selectedDate.getMonth() - 1);
      } else if (mode === "year") {
        newDate.setFullYear(selectedDate.getFullYear() - 1);
      }
      animateDateChange(newDate, "left");
    }
  };

  const handleNextDate = () => {
    if (!isAnimating) {
      const newDate = new Date(selectedDate);
      const today = new Date();
      const isToday =
        selectedDate.getDate() === today.getDate() &&
        selectedDate.getMonth() === today.getMonth() &&
        selectedDate.getFullYear() === today.getFullYear();
      if (mode === "day") {
        newDate.setDate(selectedDate.getDate() + 1);
      } else if (mode === "month") {
        newDate.setMonth(selectedDate.getMonth() + 1);
      } else if (mode === "year") {
        newDate.setFullYear(selectedDate.getFullYear() + 1);
      }
      if (!isToday) {
        onDateChange(newDate);
        setIsAnimating(true);
        animateDateChange(newDate, "right");
      }
    }
  };

  const animateDateChange = (newDate, direction) => {
    gsap.to(dateRef.current, {
      opacity: 0,
      x: direction === "right" ? -50 : 50,
      duration: 0.3,
      onComplete: () => {
        onDateChange(newDate);
        gsap.fromTo(
          dateRef.current,
          { x: direction === "right" ? 50 : -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            onComplete: () => setIsAnimating(false),
          }
        );
      },
    });
  };

  const formatDate = (date, mode) => {
    if (mode === "day") {
      const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return new Intl.DateTimeFormat("en-US", options).format(date);
    } else if (mode === "month") {
      const options = {
        month: "long",
        year: "numeric",
      };
      return new Intl.DateTimeFormat("en-US", options).format(date);
    } else if (mode === "year") {
      return date.getFullYear();
    }
  };

  return (
    <div className="relative inline-block">
      <div className="flex items-center">
        <ButtonClick
          handleSubmit={handlePrevDate}
          buttonName={
            <PiCaretLeftBold
              className={twMerge(
                `text-base 2xl:text-lg dark:text-white`,
                arrowFontSizeClass
              )}
            />
          }
          className="p-1.5 h-fit borderb rounded-md"
        ></ButtonClick>
        <div className={twMerge(`w-44 vhcenter overflow-hidden`, width)}>
          <p
            ref={dateRef}
            className={twMerge(
              `whitespace-nowrap text-sm 2xl:text-base font-semibold dark:text-white`,
              dateFontSizeClass
            )}
          >
            {formatDate(selectedDate, mode)}
          </p>
        </div>
        <ButtonClick
          handleSubmit={handleNextDate}
          buttonName={
            <PiCaretRightBold
              className={twMerge(
                `text-base 2xl:text-lg dark:text-white ${
                  isNextDisabled(mode, selectedDate)
                    ? "opacity-50 cursor-default"
                    : ""
                }`,
                arrowFontSizeClass
              )}
            />
          }
          className="p-1.5 h-fit borderb rounded-md"
        ></ButtonClick>
        {datepicker && (
          <div className="relative flex items-center ml-4">
            <ButtonClick
              handleSubmit={() => setOpen(!open)}
              buttonName={
                <PiCalendar className="text-base 2xl:text-lg dark:text-white" />
              }
              className="p-1.5 h-fit borderb rounded-md"
            ></ButtonClick>
            <DatePicker
              open={open}
              style={{ visibility: "hidden", width: 0 }}
              onOpenChange={(open) => setOpen(open)}
              onChange={(e, i) => {
                onDateChange(i, "datePicker");
              }}
              className="absolute top-0 left-0"
              maxDate={dayjs(new Date())}
              picker={mode}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const isNextDisabled = (mode, selectedDate) => {
  if (mode === "day") {
    const today = new Date();
    return (
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    );
  } else if (mode === "month") {
    const nextMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      1
    );
    const today = new Date();
    return nextMonth.getTime() > today.getTime();
  } else if (mode === "year") {
    const nextYear = new Date(selectedDate.getFullYear() + 1, 0, 1);
    const today = new Date();
    return nextYear.getTime() > today.getTime();
  }
};

export default DateSliderPicker;
