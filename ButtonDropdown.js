import React from "react";
import { Button, Dropdown, Menu, Space } from "antd";
import { useMediaQuery } from "react-responsive";
import { PiPlus } from "react-icons/pi";

export default function ButtonDropdown({
  items,
  placement = "",
  buttonName,
  className,
  BtnType = "", // Updated prop name to avoid conflict with BtnType
  icon,
  onSelect = () => {},
  onClick,
}) {
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
  const getButtonType = () => {
    switch (BtnType.toLowerCase()) {
      case "add":
        return "primary";
      case "text":
        return "text";
      case "link":
        return "link";
      case "primary":
        return "primary";
      default:
        return "default"; // Default to "primary" type if the type is not recognized
    }
  };

  const handleMenuClick = ({ key, item }) => {
    if (onClick) {
      onClick(key, item.props.value); // Pass key and value to onClick function
    }
    onSelect(key, item.props.value); // Also call onSelect function if provided
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {items.map((item) => (
        <Menu.Item key={item.key} value={item.value}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown
      // menu={menu}
      overlay={menu}
      placement={placement}
      trigger={["click"]}
    >
      <Button
        icon={BtnType.toLowerCase() === "add" ? <PiPlus /> : icon}
        type={getButtonType()}
        size={isSmallScreen ? "default" : "large"}
        className={` ${
          (BtnType.toLowerCase() === "add" || getButtonType() === "primary") &&
          "bg-accent"
        } text-xs 2xl:text-sm font-medium w-fit flex items-center justify-center leading-6 z-50 ${className}`}
      >
        {buttonName}
      </Button>
    </Dropdown>
  );
}

// SAMPLE ARRAY
// const items = [
//     {
//       key: "1",
//       label: (
//         <a target="_blank" rel="noopener noreferrer" href="">
//           New Addition
//         </a>
//       ),
//     },
//     {
//       key: "2",
//       label: "New Deduction",
//     },
//     {
//       key: "3",
//       label: "Work Expense",
//     },
//   ];
