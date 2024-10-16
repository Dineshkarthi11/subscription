import { DatePicker } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect } from "react";
import { FaAsterisk } from "react-icons/fa6";
import { useMediaQuery } from "react-responsive";

export default function DateSelect({
  change = () => {},
  className,
  pickerType = "date",
  dateFormat = "YYYY-MM-DD",
  value = null,
  title = "",
  description = "",
  error = "",
  required = false,
  placeholder = "",
  placement = "",
  joiningDate,
  defaultPickerValue = null,
  dateofBirth = false,
  hideYear = false,
  fromDate,
  maxdate = false,
  disableBeforeDate, // New prop to control hiding the year
}) {
  const customFormat = (value) => `custom format: ${value.format(dateFormat)}`;
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });

  useEffect(() => {}, [value]);

  // const disabledDate = (current) => {
  //   if (maxdate) {
  //     return current && current > dayjs().endOf("day");
  //   }
  //   if (joiningDate) {
  //     return current && current < dayjs(joiningDate, dateFormat).endOf("day");
  //   }
  //    else if (dateofBirth) {
  //     const eighteenYearsAgo = dayjs().subtract(18, "year").endOf("day");
  //     return current && current > eighteenYearsAgo;
  //   } else if (fromDate) {
  //     return (
  //       current &&
  //       current < dayjs(fromDate, dateFormat).subtract(1, "day").endOf("day")
  //     );
  //   }
  //   if (disableBeforeDate) {
  //     return current && current < dayjs(disableBeforeDate, dateFormat).startOf("day");
  //   }
  //   return false;
  // };
  const disabledDate = (current) => {
    if (maxdate && joiningDate) {
      return (
        (current && current > dayjs().endOf("day")) ||
        (current && current < dayjs(joiningDate, dateFormat).endOf("day"))
      );
    } else if (maxdate) {
      return current && current > dayjs().endOf("day");
    } else if (joiningDate) {
      return current && current < dayjs(joiningDate, dateFormat).endOf("day");
    } else if (dateofBirth) {
      const eighteenYearsAgo = dayjs().subtract(18, "year").endOf("day");
      return current && current > eighteenYearsAgo;
    } else if (fromDate) {
      return (
        current &&
        current < dayjs(fromDate, dateFormat).subtract(1, "day").endOf("day")
      );
    } else if (disableBeforeDate) {
      return (
        current && current < dayjs(disableBeforeDate, dateFormat).startOf("day")
      );
    }
    return false;
  };

  const defaultPickerValueToUse = defaultPickerValue
    ? dayjs(defaultPickerValue, dateFormat)
    : dayjs();

  const customMonthPicker = () => (
    <DatePicker
      value={value ? dayjs(value, "MM") : null}
      picker="month"
      format="MM"
      onChange={(date, dateString) => {
        change(date.format("MM"));
      }}
      status={error ? "error" : ""}
      placement={placement}
      size={isSmallScreen ? "default" : "large"}
      className={`w-full ${error ? "border-rose-400" : ""} ${
        hideYear ? "hide-year-picker" : ""
      }`}
      style={
        error
          ? {
              boxShadow:
                "0px 0px 0px 4px #FEE4E2, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            }
          : {}
      }
      disabledDate={disabledDate}
      placeholder={placeholder}
      defaultPickerValue={defaultPickerValueToUse}
      dropdownClassName="hide-year-picker"
    />
  );

  const defaultDatePicker = () => (
    <DatePicker
      value={value ? dayjs(value, dateFormat) : null}
      picker={pickerType}
      format={dateFormat}
      onChange={(date, dateString) => {
        change(dateString);
      }}
      status={error ? "error" : ""}
      // placement={placement}  // if give placement the dropdown date are displaying in the other side of the window.
      size={isSmallScreen ? "default" : "large"}
      className={`${
        className === "half"
          ? "xs:w-[100%] sm:w-[100%] md:w-[48%] xl:w-[48%]"
          : "w-full"
      }  ${error ? "border-rose-400" : ""}`}
      style={
        error
          ? {
              boxShadow:
                "0px 0px 0px 4px #FEE4E2, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            }
          : {}
      }
      disabledDate={disabledDate}
      placeholder={placeholder}
      defaultPickerValue={defaultPickerValueToUse}
    />
  );

  return (
    <div
      className={`flex flex-col ${
        title ? "gap-2" : "gap-0 items-center"
      } ${className}`}
    >
      <div className="flex items-center dark:text-white gap-0.5">
        {title && (
          <label htmlFor="" className="text-xs font-medium 2xl:text-sm ">
            {title}
          </label>
        )}
        {required && <FaAsterisk className="text-[6px] text-rose-600" />}
      </div>
      <span>{hideYear ? customMonthPicker() : defaultDatePicker()}</span>
      {error && (
        <p className="flex justify-start items-center mt-2 my-1 mb-0 text-[10px] text-red-600">
          <span className="text-[10px] pl-1">{error}</span>
        </p>
      )}
      {description && (
        <p className="2xl:text-sm text-xs font-normal opacity-70 dark:text-white">
          {description}
        </p>
      )}
    </div>
  );
}
