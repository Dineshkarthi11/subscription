import React from "react";
import { Select } from "antd";
import { useMediaQuery } from "react-responsive";


export const SelectBox = ({
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
  logo,
}) => {

const isSmallScreen = useMediaQuery({ maxWidth: 1439 });

  return (
    <div>
      <Select
        showSearch
        style={{
          width: 200,
        }}
        placeholder={placeholder}
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={options}
        size={isSmallScreen ? "default" : "large"}
      />
    </div>
  );
};


// Sample Array 
// const options = [
//   {
//     value: "1",
//     label: "Not Identified",
//   },
//   {
//     value: "2",
//     label: "Closed",
//   },
//   {
//     value: "3",
//     label: "Communicated",
//   },
//   {
//     value: "4",
//     label: "Identified",
//   },
//   {
//     value: "5",
//     label: "Resolved",
//   },
//   {
//     value: "6",
//     label: "Cancelled",
//   },
// ];
