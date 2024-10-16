import React, { useState, useEffect } from "react";
import { Cascader, Divider, Space } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles
import FlexCol from "./FlexCol";
import { FaAsterisk } from "react-icons/fa6";
import { PiDotsThreeVerticalBold, PiInfo } from "react-icons/pi";

const PayrollCascader = ({
  option,
  onchange,
  required = false,
  title = "",
  descriptionTop = "",
}) => {
  const [selectedValue, setSelectedValue] = useState([]);

  const onChange = (value) => {
    setSelectedValue(value);
  };



  const customDropdownRender = (menus) => {
    const selectedParent = selectedValue[0];
    const selectedOption = option.find(
      (option) => option.value === selectedParent
    );

    return (
      <div className="flex flex-col gap-2">
        {title && (
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center dark:text-white gap-0.5 justify-center">
              <label htmlFor="" className="text-xs font-medium 2xl:text-sm text-grey p-2">
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
        {menus}

        <Divider style={{ margin: 0 }} />

        {/* <Space className="px-2 py-2 text-grey">
          <PiInfo size={18} />
          <p className="text-xs">
            Parent: {selectedOption ? selectedOption.label : "None"}
          </p>
        </Space> */}

        {selectedOption && selectedOption.children && (
          <Space className="px-2 py-2 text-grey">
            <PiInfo size={18} />
            <p className="text-xs">children</p>
          </Space>
        )}
      </div>
    );
  };

  return (
    <Cascader
      options={option}
      // placeholder="Monthly Salary Actions"
      onChange={onchange}
      dropdownRender={customDropdownRender}
      value={selectedValue}

    >
      <div className="flex items-center gap-2 borderb rounded-lg hover:border-primaryalpha/70 hover:text-primaryalpha/70 transform
       duration-300 px-3 py-2 cursor-pointer w-fit">
        <p className="font-semibold text-xs 2xl:text-sm">Monthly Salary Actions</p>
        <PiDotsThreeVerticalBold />
      </div>
    </Cascader>
  );
};

export default PayrollCascader;
