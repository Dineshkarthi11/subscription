import React from "react";
import { Dropdown, Space } from "antd";

const CustomDropDown = ({ triggerText = "", customTrigger, items, onClick }) => {
  const menuStyle = {
    // boxShadow: 'none',
  };

  return (
    <Dropdown
      menu={{
        items,
        onClick,
      }}
      dropdownRender={(menu) => (
        <div>
          {React.cloneElement(menu, {
            style: menuStyle,
          })}
        </div>
      )}
    >
      <div>
        {customTrigger && customTrigger}
        {triggerText && <div className="cursor-pointer">{triggerText}</div>}
      </div>
    </Dropdown>
  );
};
export default CustomDropDown;
