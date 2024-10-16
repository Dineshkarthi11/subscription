import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { HiMiniStar } from "react-icons/hi2";
import { useMediaQuery } from "react-responsive";
import { LuSearch } from "react-icons/lu";

export default function SearchBox({
  placeholder = "",
  value = "",
  icon = <LuSearch />,
  error = "",
  className = "",
  change = () => {},
  iconBefore,
  data = [],
  onSearch = () => {},
}) {
  // Search Filter Function
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
  const [filterdata, setFilterdata] = useState([]);
  const [searchValue, setSearchValue] = useState(value);

  const searchFun = (filterValue) => {
    const inputData = filterValue?.toString()?.toLowerCase();
    const searchData = data?.filter((each) => {
      // const keyValue = Object.values(each);
      const filteredValues = Object.values(each).filter((key) =>
        key?.toString()?.toLowerCase().includes(inputData)
      );
      return filteredValues.length;
    });
    onSearch(searchData);
  };

  // useEffect(() => {
  //   searchFun();
  // }, [searchValue]);

  // useEffect(() => {
  //   searchFun(value);

  //   // onSearch(filterdata);
  //   // console.log(filterdata);
  // }, [value]);

  return (
    <div className="relative">
      {/* {iconBefore && (
        <span className="absolute pl-3 opacity-50 top-3 ltr:left-4 rtl:right-4">
          {iconBefore}
        </span>
      )} */}

      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        data={data}
        onChange={(e) => {
          searchFun(e.target.value);
          change(e.target.value);
          // searchFun(e.target.value);
        }}
        className={`w-full border focus:outline-none  ${className}`}
        size={isSmallScreen ? "default" : "large"}
        prefix={icon && icon}
      />
      {/* {icon && (
        <span className=" absolute top-2.5  left-3 opacity-50 text-2xl">
          {icon}
        </span>
      )} */}
      {error && (
        <p className=" flex justify-start items-center my-1 mb-0 text-[10px] text-red-500">
          <HiMiniStar className="text-[10px]" />
          <span className="text-[10px] pl-1">{error}</span>
        </p>
      )}
    </div>
  );
}
