import React, { useEffect, useState } from "react";
import { Select, Space } from "antd";
import TabsNew from "./TabsNew";
import Avatar from "./Avatar";
import SearchBox from "./SearchBox";
import { useMediaQuery } from "react-responsive";
import { FiAlertCircle } from "react-icons/fi";
import { FaAsterisk } from "react-icons/fa6";

const SelectWithTab = ({
  dataSources,
  tabs,
  placeholder,
  width = 300,
  customOptionRender,
  customDropdownRender,
  searchable = false,
  onChange = (value, tab) => {},
  value,
  tabisLevel = "1",
  error = "",
}) => {
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
  // console.log(placeholder, "placeholder");
  const [tabValue, setTabValue] = useState(tabs[0].value);
  const [items, setItems] = useState(dataSources[tabValue]);
  const [tabId, setTabId] = useState(tabs[0].id);
  const [filteredItems, setFilteredItems] = useState(items);
  const [searchValue, setSearchValue] = useState("");
  // console.log(tabs, "tabs");
  useEffect(() => {
    const newTabValue = tabisLevel === 0 ? "employees" : "levels";
    const hasLevelsTab = tabs.some((tab) => tab.value === "levels");
    const employeesTab = tabs.find((tab) => tab.value === "employees");
    const levelsTab = tabs.find((tab) => tab.value === "levels");

    const newTabId = hasLevelsTab
      ? tabisLevel === 0
        ? employeesTab?.id
        : levelsTab?.id
      : employeesTab?.id;

    setTabValue(newTabValue);
    setTabId(newTabId);
  }, [tabisLevel, tabs]);

  useEffect(() => {
    setItems(dataSources[tabValue]);
    setFilteredItems(dataSources[tabValue]);
    setSearchValue("");
    console.log(dataSources[tabValue], tabValue, dataSources, "hhhhhhhhhhhh");
  }, [tabValue, dataSources]);

  const handleSearch = (value) => {
    setSearchValue(value);
    if (value) {
      const filtered = items.filter((item) =>
        Object.values(item).some(
          (val) =>
            val != null &&
            val.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items);
    }
  };

  const handleChange = (value) => {
    onChange(value, tabValue);
  };

  const defaultOptionRender = (option) => (
    <Space>
      {/* {console.log(option, "option")} */}
      {option.data.icon ? (
        option.icon
      ) : (
        <Avatar
          image={option.data.img}
          name={option.label}
          randomColor={true}
          className="size-7 2xl:size-8"
        />
      )}
      <div>
        <p className="text-xs font-medium">{option.label}</p>
        <p className="text-[10px]">
          {tabValue === "employees" && "EMP Code: #"}
          {option.data.subLabel}
        </p>
      </div>
    </Space>
  );

  const defaultDropdownRender = (menu) => (
    <div className="flex flex-col gap-2">
      <TabsNew
        tabs={tabs}
        classNames="flex-nowrap"
        buttonClassname="w-full justify-center"
        tabContent={false}
        initialTab={tabId}
        tabClick={(e) => {
          setTabValue(e);
        }}
      />
      {(searchable === true || tabValue === "employees") && (
        <SearchBox
          placeholder={`Search ${tabValue}`}
          value={searchValue}
          change={handleSearch}
          data={items}
        />
      )}
      <p className="text-xs text-grey capitalize">{tabValue}</p>
      {menu}
      {/* {console.log(filteredItems, "filteredItems")} */}
    </div>
  );

  return (
    <span>
      <Select
        style={{
          width,
          ...(error && {
            boxShadow:
              "0px 0px 0px 4px #FEE4E2, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
          }),
        }}
        size={isSmallScreen ? "default" : "large"}
        placeholder={placeholder}
        dropdownRender={customDropdownRender || defaultDropdownRender}
        optionRender={customOptionRender || defaultOptionRender}
        options={filteredItems.map((item) => ({
          icon: item.icon,
          label: item.label,
          value: item.value,
          img: item.img,
          subLabel: item.subLabel,
        }))}
        onChange={handleChange}
        value={value}
        className={`w-full  
          } ${error ? "border-rose-400 rounded-lg" : ""}`}
        status={error ? "error" : ""}
      />
      {error && (
        <FiAlertCircle
          className={` absolute top-2.5 right-2 mr-5 transform -translate-y-1/5 text-red-400 
          `}
        />
      )}

      {/* {error && (
      <p className=" flex justify-start items-center mt-2 my-1 mb-0 text-[10px] text-red-600">
        <span className="text-[10px] p-2">{error}</span>
      </p>
    )} */}
    </span>
  );
};

export default SelectWithTab;

// =================================================================
// TO RE USE THIS IN FUTURE
// const dataSources = {
//     levels: [
//     {
//       value: "1",
//       label: "Level 1",
//       icon: <PiRanking />,
//       subLabel: "lorem ipsum dummy text dolar sit.",
//     },
//     {
//       value: "2",
//       label: "Level 2",
//       icon: <PiRanking />,
//       subLabel: "lorem ipsum dummy text dolar sit.",
//     },
//     {
//       value: "3",
//       label: "Level 3",
//       icon: <PiRanking />,
//       subLabel: "lorem ipsum dummy text dolar sit.",
//     },
//     {
//       value: "4",
//       label: "Level 4",
//       icon: <PiRanking />,
//       subLabel: "lorem ipsum dummy text dolar sit.",
//     },

// ],
// employees: [

//     {
//       value: "1",
//       label: "Jack",
//       img: "https://randomuser.me/api/portraits/men/12.jpg",
//       subLabel: 234642,
//     },
//     {
//       value: "2",
//       label: "Lucy",
//       img: "https://randomuser.me/api/portraits/men/45.jpg",
//       subLabel: 234643,
//     },
//     {
//       value: "3",
//       label: "Tom",
//       img: "",
//       subLabel: 234644,
//     },
//     {
//       value: "4",
//       label: "Jerry",
//       img: "https://randomuser.me/api/portraits/men/70.jpg",
//       subLabel: 234645,
//     },

// ],
//   };

// const tabs = [
//     { id: 1, title: t("Levels"), value: "levels" },
//     { id: 2, title: t("Employees"), value: "employees" },
//   ];

/* <SelectWithTab
dataSources={dataSources}
tabs={tabs}
placeholder="Choose Employee or Level"
searchable={true}
/> */

// =================================================================
