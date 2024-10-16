import React, { useState } from "react";
import { Cascader, Divider, Space } from "antd";
import FlexCol from "./FlexCol";
import { PiInfo } from "react-icons/pi";
import { useMediaQuery } from "react-responsive";
import { FaAsterisk } from "react-icons/fa6";

const filter = (inputValue, path) =>
  path.some(
    (option) =>
      option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
  );

const customOptionRender = (option) => (
  <FlexCol>
    <div>{option.label}</div>
    {option.description && (
      <div className="text-xs text-gray-500">{option.description}</div>
    )}
  </FlexCol>
);

const dropdownRender = (menus, allowMultipleChildren) => (
  <div>
    {menus}
    {allowMultipleChildren === false && (
      <>
        <Divider style={{ margin: 0 }} />
        <Space className="px-2 py-2 text-grey">
          <PiInfo size={18} />
          <p className="text-xs">
            Only one child should be selected for each parent.
          </p>
        </Space>
      </>
    )}
  </div>
);

export default function CascaderSelect({
  style = { width: "100%" },
  onChange = (value) => console.log(value),
  onSearch = (value) => console.log(value),
  maxTagCount = "responsive",
  multiple = true,
  showSearch = { filter },
  options = [],
  placeholder = "",
  allowMultipleChildren = false,
  className = "",
  title = "",
  required = false,
  descriptionTop = "",
  value,
}) {
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
  const [selectedValues, setSelectedValues] = useState([]);
  const SHOW_CHILD = Cascader;

  const handleChange = (value, selectedOptions) => {
    let newSelectedValues = [];
    if (allowMultipleChildren) {
      newSelectedValues = value;
    } else {
      newSelectedValues = value.map((val) => {
        if (val.length === 1) {
          const existingSelection = selectedValues.find(
            (sv) => sv[0] === val[0]
          );
          return existingSelection || val;
        }
        return val;
      });
    }

    // Check if the selected values have children and if only one child is present
    const finalSelectedValues = newSelectedValues.map((val) => {
      const option = options.find((opt) => opt.value === val[0]);
      if (option && option.children && option.children.length === 1) {
        return [val[0], option.children[0].value];
      }
      return val;
    });

    setSelectedValues(finalSelectedValues);
    onChange(finalSelectedValues, selectedOptions);
  };

  const processOptions = (opts) => {
    return opts.map((option) => {
      if (option.children.length !== 0) {
        if (allowMultipleChildren) {
          return option;
        } else {
          const selectedChild = selectedValues.find(
            (val) => val[0] === option.value && val.length > 1
          );
          return {
            ...option,
            children: option.children.map((child) => ({
              ...child,
              disabled: selectedChild && selectedChild[1] !== child.value,
            })),
          };
        }
      }
      return option;
    });
  };

  const processedOptions = processOptions(options);

  return (
    <div className="flex flex-col gap-2">
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
      <Cascader
        style={style}
        size={isSmallScreen ? "default" : "large"}
        options={processedOptions}
        onChange={handleChange}
        maxTagCount={maxTagCount}
        multiple={multiple}
        showSearch={showSearch}
        onSearch={onSearch}
        dropdownRender={(menus) => dropdownRender(menus, allowMultipleChildren)}
        optionRender={customOptionRender}
        value={value}
        placeholder={placeholder}
        className={className}
        showCheckedStrategy={SHOW_CHILD}
      />
    </div>
  );
}
