import React, { useState } from "react";
import { Dropdown, Checkbox, Menu, Space } from "antd";

const MultiSelectDropDown = ({
  options,
  onChange,
  className = "",
  children,
  value,
  menuclass,
  rightIcon=false,
}) => {
  const [selectedValues, setSelectedValues] = useState(value || []);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCheckboxChange = (event, value) => {
    const newSelectedValues = event.target.checked
      ? [...selectedValues, value]
      : selectedValues.filter((item) => item !== value);

    setSelectedValues(newSelectedValues);

    if (onChange) {
      onChange(newSelectedValues);
    }
  };

  
  const menu = (
    <Menu className={`${menuclass}`}>
      {rightIcon ? (
        options.map((option) => (
          <Menu.Item key={option.value}>
            <Space className="justify-between w-full">
              <div className="flex items-center">
                {option.image && (
                  <img src={option.image} alt="" width="16" height="16" />
                )}
                {option.icon && <span>{option.icon}</span>}
                {option.label}
              </div>
              <Checkbox
                className=""
                checked={selectedValues.includes(option.value)}
                onChange={(e) => handleCheckboxChange(e, option.value)}
              />
            </Space>
          </Menu.Item>
        ))
      ):(
         options.map((option) => (
        <Menu.Item key={option.value}>
          <Space>
           
            
            <Checkbox
              className=""
              checked={selectedValues.includes(option.value)}
              onChange={(e) => handleCheckboxChange(e, option.value)}
            >
              {option.image && (
                <img src={option.image} alt="" width="16" height="16" />
              )}
              {option.icon && <span>{option.icon}</span>}
              {option.label}
            </Checkbox>
          
           
          </Space>
        </Menu.Item>
      ))
      )}
     
    </Menu>
  );

  const handleDropdownVisibleChange = (flag) => {
    setDropdownOpen(flag);
  };

  return (
    <Dropdown
      placement="bottomRight"
      overlay={menu}
      className={className}
      onVisibleChange={handleDropdownVisibleChange}
      visible={dropdownOpen}
    >
      <div onClick={() => setDropdownOpen(!dropdownOpen)}>{children}</div>
    </Dropdown>
  );
};

export default MultiSelectDropDown;

// Usage example

// import React, { useState } from 'react';
// import MultiSelectDropDown from './MultiSelectDropDown';
// import { Button } from 'antd';
// import { UserOutlined, CalendarOutlined, FileOutlined } from '@ant-design/icons';

// const App = () => {
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const handleDropdownChange = (selectedValues) => {
//     setSelectedOptions(selectedValues);
//   };

//   const options = [
//     { label: 'Work Schedule', value: 'workschedule', icon: <CalendarOutlined /> },
//     { label: 'Leave Balance', value: 'leavebalance', icon: <FileOutlined /> },
//     { label: 'Requests', value: 'requests', icon: <UserOutlined /> },
//     { label: 'Meetings', value: 'meetings', icon: <CalendarOutlined /> },
//     { label: 'Team Member', value: 'teammember', icon: <UserOutlined /> },
//     { label: 'Turn Over Rates', value: 'turnover', icon: <FileOutlined /> },
//     { label: 'Document', value: 'document', icon: <FileOutlined /> },
//     { label: 'Holiday', value: 'holiday', icon: <CalendarOutlined /> },
//     { label: 'My Feeds', value: 'myfeeds', icon: <UserOutlined /> },
//   ];

//   return (
//     <div>
//       <MultiSelectDropDown options={options} onChange={handleDropdownChange}>
//         Customize Widgets
//       </MultiSelectDropDown>
//       <div>
//         <Button onClick={() => console.log(selectedOptions)}>Show Selected Options</Button>
//       </div>
//     </div>
//   );
// };

// export default App;
