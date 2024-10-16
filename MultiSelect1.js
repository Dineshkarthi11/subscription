import { Select, Space, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { FaAsterisk } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";

// const options = [
//   {
//     value: "goldw",
//   },
//   {
//     value: "limex",
//   },
//   {
//     value: "green",
//   },
//   {
//     value: "cyan",
//   },
// ];
// const tagRender = (props) => {
//   const { label, value, closable, onClose } = props;
//   const onPreventMouseDown = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//   };
//   return (
//     <Tag
//       color={value}
//       onMouseDown={onPreventMouseDown}
//       closable={closable}
//       onClose={onClose}
//       style={{
//         marginRight: 3,
//       }}
//       bordered={false}
//     >
//       {label}
//     </Tag>
//   );
// };
export default function MultiSelect({
  title = "",
  descriptionTop = "",
  value = [],
  options = [],
  placeholder = "",
  change = () => {},
  onSearch = () => {},
  error = "",
  required = false,
  className,
}) {
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
  let textColor = "black"; // Default text color

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const getOptionStyle = (optionValue) => {
    if (optionValue === "break") {
      textColor = "#fff";
    } else if (optionValue === "c12") {
      textColor = "blue";
    } else if (optionValue === "h17") {
      textColor = "green";
    } else if (optionValue === "j19") {
      textColor = "purple";
    } else if (optionValue === "k20") {
      textColor = "orange";
    }

    return {
      textColor,
    };
  };

  const selectProps = {
    mode: "multiple",
    style: {
      color: textColor,
      width: "100%",
      boxShadow: error
        ? "0px 0px 0px 4px #FEE4E2, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
        : value && "",
      borderRadius: error ? "8px" : "none",
      border: error ? "1px solid rgb(251, 113, 133)" : "none",
    },
    value: value,
    options: options,
    onChange: (newValue) => {
      change(newValue);
    },
    filterOption: filterOption,
    placeholder: placeholder,
    // maxTagCount: "responsive",
  };
  const tagRender = (props) => {
    const { label, value, closable, onClose, color } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <div
        className="flex items-center gap-1 px-2 py-0.5 bg-primaryalpha/10 dark:bg-primaryalpha/20 rounded-xl mr-px mt-px mb-px"
        onMouseDown={onPreventMouseDown}
      >
        <p className="text-xs font-medium text-primary 2xl:text-sm">{label}</p>
        {closable && (
          <IoClose
            className=" cursor-pointer font-bold text-[10px] text-primaryalpha"
            onClick={(e) => onClose(e)}
          />
        )}
      </div>
      // <Tag
      //   color={color}
      //   onMouseDown={onPreventMouseDown}
      //   closable={closable}
      //   onClose={onClose}
      //   style={{
      //     marginRight: 3,
      //   }}
      //   className={`text-[${"primary"}]`}
      //   optionSelectedColor="primary  "
      // >
      //   {label}
      // </Tag>
    );
  };
  return (
    <div className={`relative block dark:text-white ${className}`}>
      {/* <div className="flex items-center dark:text-white gap-0.5">
        {title && (
          <label htmlFor="" className="text-xs font-medium 2xl:text-sm ">
            {title}
          </label>
        )}
        {required && <FaAsterisk className="text-[6px] text-rose-600" />}
      </div> */}

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

      <Space
        direction="vertical"
        style={{ width: "100%" }}
        className="mt-[6px]"
        status={`  ${error && "error"}`}
      >
        <Select
          tagRender={tagRender}
          allowClear
          showSearch
          onSearch={onSearch}
          size={isSmallScreen ? "default" : "large"}
          style={{
            option: (base, state) => ({
              ...base,
              ...getOptionStyle(state.isSelected),
              ":active": {
                ...getOptionStyle(state.isSelected),
                backgroundColor: state.isSelected ? "blue" : "green",
              },
              optionSelectedColor: "black",
            }),
          }}
          {...selectProps}
        />
        {/* <Select
          mode="multiple"
          allowClear
          style={{
            width: "100%",
          }}
          placeholder="Please select"
          // defaultValue={["a10", "c12"]}
          onChange={(newValue) => {
            change(newValue);
          }}
          onSearch={(e) => {
            console.log(e);
          }}
          options={options}
          maxCount={MAX_COUNT}
        /> */}

        {error && (
          <FiAlertCircle className="absolute top-3.5 right-4 mr-5 mt-5 transform -translate-y-3/5 text-red-400" />
        )}
      </Space>

      {error && (
        <p className=" flex justify-start items-center mb-0 text-[10px] text-red-600 ">
          <span className="text-[10px] pl-1">{error}</span>
        </p>
      )}
    </div>
  );
}
