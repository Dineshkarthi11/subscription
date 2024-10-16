import { Popover, Select } from "antd";
import React from "react";
import { FlagIcon } from "react-flag-kit";
import { FiAlertCircle } from "react-icons/fi";
import { IoAlertCircleOutline } from "react-icons/io5";
import logo from "../../assets/images/Avatar.png";
import { useMediaQuery } from "react-responsive";
import { FaAsterisk } from "react-icons/fa";

export default function Dropdown({
  title = "",
  value = null,
  change = () => {},
  options = [],
  error = "",
  placeholder = "",
  className = "",
  onSearch = () => {},
  styles,
  description,
  required = false,
  descriptionTop = "",
  rightIcon = false,
  PopoverContent = {},
  icondropDown = false,
  icon = false,
  image = false,
  disabled = false,
  disableFilterSort = false,
  SelectName = "Select",
  showErrorMessage = true,
  disableCondition = () => false,
}) {
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
  // const filterOption = (input, option) =>
  //   (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const { Option } = Select;

  const filterSortFunction = disableFilterSort
    ? undefined // If disableFilterSort is true, set filterSortFunction to undefined
    : (optionA, optionB) =>
        (optionA?.label ?? "")
          ?.toLowerCase()
          .localeCompare((optionB?.label ?? "")?.toLowerCase());
  const filterOption = (input, option) => {
    const childrenText =
      typeof option.children === "string" ? option.children : "";
    return childrenText.toLowerCase().includes(input?.toLowerCase());
  };

  return (
    <div className={`${className} flex flex-col gap-2`}>
      {title && (
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center dark:text-white gap-0.5">
            <label htmlFor="" className="text-xs font-medium 2xl:text-sm ">
              {title}
            </label>

            {required && <FaAsterisk className="text-[6px] text-rose-600" />}
          </div>
          {descriptionTop && (
            <p className="text-xs font-medium opacity-50 dark:text-white">
              {descriptionTop}
            </p>
          )}
        </div>
      )}
      <div className="relative flex items-center ">
        {icondropDown || image ? (
          <Select
            showSearch
            placeholder={placeholder}
            optionFilterProp="children"
            onChange={change}
            onSearch={onSearch}
            filterOption={filterOption}
            filterSort={filterSortFunction}
            // options={options}
            className={`w-full rounded-lg capitalize `} //${title && "mt-[6px]"}
            style={{
              ...styles,
              borderRadius: "8px",
              boxShadow: error
                ? "0px 0px 0px 4px #FEE4E2, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                : "", // Add box shadow for error
            }}
            menuItemSelectedIcon={<FaAsterisk className="text-[8px]" />}
            value={value}
            status={`${error && "error"}`}
            size={isSmallScreen ? "default" : "large"}
            optionLabelProp="label"
          >
            {options?.map((each, i) => (
              <Option key={i} value={each.value}>
                <div className="flex items-center gap-3">
                  {image && (
                    <div className="overflow-hidden rounded-full size-6">
                      <img
                        src={each.image}
                        alt={each.label}
                        className="object-cover object-center w-full h-full"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-1 country-option">
                    {/* <div>
                    {icon ? (
                      each.icon
                    ) : (
                      <img src={logo} alt="" className="w-5 h-5 rounded-full" />
                    )}
                    <FlagIcon code={91} className="w-5 h-5 rounded-full" /> */}
                    {/* <span>mkck</span>
                  </div> */}

                    <span>{each.label}</span>
                    <p class="text-gray-500 text-xs font-medium font-['Inter'] leading-none">
                      {each.description}
                    </p>
                  </div>
                </div>
              </Option>
            ))}
          </Select>
        ) : (
          <Select
            showSearch
            placeholder={placeholder}
            value={value}
            onChange={change}
            onSearch={onSearch}
            filterOption={filterOption}
            // filterSort={filterSortFunction}
            // filterOption={(input, option) =>
            //   (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            // }
            // options={options}
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                ?.toLowerCase()
                ?.localeCompare((optionB?.label ?? "")?.toLowerCase())
            }
            className={`w-full rounded-lg capitalize dark:bg-dark3`}
            style={{
              ...styles,
              borderRadius: "8px",
              boxShadow: error
                ? "0px 0px 0px 4px #FEE4E2, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                : "", // Add box shadow for error
            }}
            menuItemSelectedIcon={<FaAsterisk className="text-[8px]" />}
            status={`${error && "error"}`}
            size={isSmallScreen ? "default" : "large"}
            disabled={disabled}
          >
            <Option>{SelectName}</Option>
            {options?.map((each, i) => (
              <Option
                key={i}
                value={each.value}
                disabled={disableCondition(each)}
                other={each.other}
                className="dark:bg-dark3"
              >
                {each.label}
              </Option>
            ))}
          </Select>
        )}
        {error && (
          <FiAlertCircle className="absolute top-2.7 right-8 -mr-1 transform -translate-y-2/5 text-red-400" />
        )}
        {rightIcon && (
          <Popover
            content={PopoverContent}
            style={{
              borderRadius: "13.45px",
            }}
          >
            <IoAlertCircleOutline className="pl-1 text-xl opacity-50" />
          </Popover>
        )}
      </div>
      {description && (
        <p className="text-xs font-normal 2xl:text-sm opacity-70 dark:text-white">
          {description}
        </p>
      )}
      {error && showErrorMessage && (
        <p className="flex justify-start items-center my-1 mb-0 text-[10px] text-red-500">
          <span className="text-[10px] pl-1">{error}</span>
        </p>
      )}
    </div>
  );
}
