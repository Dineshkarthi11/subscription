import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import { FiAlertCircle } from "react-icons/fi";
import { FaAsterisk } from "react-icons/fa";
import dayjs from "dayjs";
import { useMediaQuery } from "react-responsive";
import moment from "moment";

const { RangePicker } = DatePicker;

export default function RangeDatePicker({
  change = () => {},
  className,
  picker = "date",
  dateFormat = "YYYY/MM/DD",
  value,
  title = "",
  description = "",
  error = "",
  required = false,
  onlyViewsomeDays = false,
  disabledDates = [],
  noDisableDays = false,
  maxdate = false,
  minDate,
  maxDate,
}) {
  const [dates, setDates] = useState(null);
  const [year, setYear] = useState(null);
  const [values, setValues] = useState(null);

  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") >= 61;
    const tooEarly = dates[1] && dates[1].diff(current, "days") >= 61;
    return !!tooEarly || !!tooLate;
  };

  const disabled7DaysDate = (current, { from }) => {
    if (from) {
      return Math.abs(current.diff(from, "days")) >= 7;
    }
    return false;
  };

  const onOpenChange = (open) => {
    // console.log(open);
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  const onOpenChangeYear = (open) => {
    // console.log(open);
    if (open) {
      setYear([null, null]);
    } else {
      setYear(null);
    }
  };

  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });

  useEffect(() => {
    // console.log(value);
  }, [value]);

  useEffect(() => {
    // console.log(disabledDates, "lllll");
  }, [disabledDates]);

  const start = moment("2024-06", "YYYY-MM");
  const end = moment("2024-12", "YYYY-MM");

  const disabled = (current) => {
    if (!current) return false; // To handle null cases

    // Check if current date is outside the allowed date range
    const isOutsideRange =
      current.isBefore(start, "day") || current.isAfter(end, "day");

    // Check if current date is one of the specific disabled dates
    if (disabledDates?.length > 0) {
      const isSpecificDisabled = disabledDates?.some(
        (date) => current && current.isSame(moment(date), "day")
      );
      return isSpecificDisabled;
    }
    return isOutsideRange;
  };

  const disabledDateWithMaxDate = (current) => {
    if (maxdate) {
      return current && current > dayjs().endOf("day");
    }
    return disabled(current);
  };

  console.log(value, "jhkhkhk");

  return (
    <div className={`${className} flex flex-col ${title && "gap-2"} relative`}>
      <div className="flex items-center dark:text-white gap-0.5">
        {title && (
          <label
            htmlFor=""
            className="text-xs font-medium 2xl:text-sm dark:text-white"
          >
            {title}
          </label>
        )}
        {required && <FaAsterisk className="text-[6px] text-rose-600" />}
      </div>

      <RangePicker
        minDate={minDate}
        maxDate={maxDate}
        picker={picker}
        placeholder={["Start Date", "End Date"]}
        value={
          !values && value?.length > 0
            ? [dayjs(value[0], dateFormat), dayjs(value[1], dateFormat)]
            : values || dates
        }
        disabledDate={
          onlyViewsomeDays
            ? disabled7DaysDate
            : maxdate
            ? disabledDateWithMaxDate
            : null
        }
        onCalendarChange={(val, date) => {
          if (onlyViewsomeDays) {
            setDates(val);
            change(date);
          }
        }}
        onChange={(val, date) => {
          setValues(date[0] === "" ? [] : val);
          change(date[0] === "" ? [] : date);
        }}
        changeOnBlur
        size={isSmallScreen ? "default" : "large"}
        status={error ? "error" : ""}
        className={`${error ? "border-rose-400" : ""}`}
        style={
          error
            ? {
                boxShadow:
                  "0px 0px 0px 4px #FEE4E2, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
              }
            : {}
        }
      />

      {description && (
        <p className="text-sm font-normal opacity-70">{description}</p>
      )}

      {error && (
        <p className="flex justify-start items-center my-1 mb-0 text-[10px] text-red-500">
          <span className="text-[10px] pl-1">{error}</span>
        </p>
      )}
    </div>
  );
}
