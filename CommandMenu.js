import { Command } from "cmdk";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  decryptFun,
  encrypt,
  getEmployeeList,
} from "./Functions/commonFunction";
import Avatar from "./Avatar";
import { useNavigate } from "react-router-dom";
import { Empty, Progress } from "antd";
import { useSelector } from "react-redux";
import { lightenColor } from "./lightenColor";
import { PiArrowLeft, PiArrowRight, PiMagnifyingGlass } from "react-icons/pi";
import { RiCommandFill, RiVoiceprintFill } from "react-icons/ri";
import API, { action } from "../Api";

const CommandMenu = () => {
  const themeMode = useSelector((state) => state.layout.mode);
  const primaryColor = localStorage.getItem("mainColor");
  const lighterColor = lightenColor(primaryColor, 0.91);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [popUp, setPopUp] = useState(false);
  const navigate = useNavigate();
  const [recentSearches, setRecentSearches] = useState([]);

  const [localStorageData, setLocalStorageData] = useState(null);
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));

  useEffect(() => {
    // console.log(decryptFun().userData?.employeeId, "decryptFun");

    setLocalStorageData(decryptFun(localStorage.getItem("encryptedData")));

    const down = (e) => {
      if (e.key === "/" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setPopUp((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const commandListRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        commandListRef.current &&
        !commandListRef.current.contains(event.target)
      ) {
        setPopUp(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [commandListRef]);
  useEffect(() => {
    async function getItems() {
      setLoading(true);
      try {
        // const result = await getEmployeeList();
        if (localStorageData?.userData?.employeeId) {
          const result = await action(API.GET_EMPLOYEE, {
            companyId: companyId,
            employeeId: localStorageData?.userData?.employeeId,
            // isActive: 1
          });
          // console.log(result, "result");
          if (result.status === 200) {
            setItems(result.result);
          } else {
            setItems([]); // Ensure items is always an array
          }
          setRecentSearches(loadRecentSearches());
        }
      } catch (error) {
        console.error("Failed to fetch items:", error);
        setItems([]); // Ensure items is always an array in case of an error
      } finally {
        setLoading(false);
      }
    }

    getItems();
  }, [localStorageData?.userData?.employeeId]);

  const addToRecentSearches = (employee) => {
    setRecentSearches((prevSearches) => {
      const updatedSearches = [
        employee,
        ...prevSearches.filter(
          (item) => item.employeeId !== employee.employeeId
        ),
      ];
      const newSearches = updatedSearches.slice(0, 3); // Change 5 to 4
      saveRecentSearches(newSearches);
      return newSearches;
    });
  };
  const saveRecentSearches = (searches) => {
    localStorage.setItem(
      "recentSearches",
      JSON.stringify(searches.slice(0, 3))
    );
  };

  const loadRecentSearches = () => {
    const savedSearches = localStorage.getItem("recentSearches");
    return savedSearches ? JSON.parse(savedSearches).slice(0, 3) : [];
  };
  return (
    <Command className="">
      <div className="relative items-center justify-start flex-grow-0 flex-shrink w-full h-8 gap-3 px-4 rounded-full sm:flex max-w-96 2xl:h-10 bg-secondaryWhite dark:bg-dark2">
        {/* <RiVoiceprintFill className=" dark:text-white text-md 2xl:text-lg" /> */}
        <Command.Input
          placeholder="Search Employee..."
          value={searchTerm}
          onChangeCapture={(e) => {
            // console.log(e);
            if (e) {
              setSearchTerm(e.target.value);
              setPopUp(true);
            } else {
              setPopUp(false);
              setSearchTerm("");
            }
          }}
          className="w-full h-full text-xs bg-transparent border-none outline-none 2xl:text-sm dark:text-white"
          onClick={() => setPopUp(true)}
        />
        <div className="absolute flex items-center gap-1 right-4">
          <div className="bg-[#E0E0E0] dark:bg-white rounded p-[2px] w-[18px] flex items-center justify-center text-black text-opacity-50 h-[18px]">
            <RiCommandFill className="text-base 2xl:text-md" />
          </div>
          <div className="bg-[#E0E0E0] dark:bg-white rounded p-[2px] w-[18px] flex items-center justify-center text-black text-opacity-50 h-[18px]">
            <span className="text-xs 2xl:text-sm">/</span>
          </div>
        </div>
      </div>
      {/* {popUp && ( */}
      <div
        className={`max-w-96 w-full borderb rounded-[16px] absolute bg-white  dark:bg-dark2 dark:text-white dark:border-none mt-1 overflow-hidden transition-opacity ease-in-out duration-300 ${
          popUp ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          boxShadow: "0px 25.6px 40.229px 0px rgba(102, 112, 133, 0.25)",
        }}
      >
        {/* <div className="w-full px-4 py-2 border-b border-black/10 dark:border-white/20 text-xs !font-normal flex items-center text-[#A2A2A2] relative">
          <div className="flex items-center w-full gap-2">
            <PiMagnifyingGlass size={24} />
            <Command.Input
              value={searchTerm}
              onChangeCapture={(e) => {
                // console.log(e);
                if (e) {
                  setSearchTerm(e.target.value);
                  setPopUp(true);
                } else {
                  setPopUp(false);
                  setSearchTerm("");
                }
              }}
              placeholder="Search Employee..."
              className="w-full bg-transparent "
            />
          </div>
          <div className="absolute flex items-center gap-1 right-4">
            <div className="bg-[#E0E0E0] dark:bg-[#747474] rounded p-[2px] w-[18px] flex items-center justify-center text-black dark:text-white text-opacity-50 h-[18px]">
              <RiCommandFill className="text-base 2xl:text-md" />
            </div>
            <div className="bg-[#E0E0E0] dark:bg-[#747474] rounded p-[2px] w-[18px] flex items-center justify-center text-black dark:text-white text-opacity-50 h-[18px]">
              <span className="text-xs 2xl:text-sm">/</span>
            </div>
          </div>
        </div> */}
        <Command.List
          className="p-2 h-auto max-h-[378px] 2xl:max-h-[446px] overflow-auto"
          onMouseLeave={() => setPopUp(false)}
          // onM={() => setPopUp(false)}
          title="Employees"
        >
          {loading && (
            <Command.Loading className="px-2 py-1 text-[8px]">
              Fetching Employees…
            </Command.Loading>
          )}
          <Command.Empty>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No Employee Found"
            />
          </Command.Empty>
          {recentSearches.length > 0 && (
            <>
              <Command.Group heading="Recent">
                {recentSearches.map((item) => (
                  <Command.Item
                    onSelect={(value, e) => {
                      addToRecentSearches(item);
                      navigate(`/employeeProfile/${encrypt(item.employeeId)}`);
                    }}
                    key={`recent-${item.employeeId}`}
                    value={item.firstName + item.lastName}
                    className="hover:bg-[#F6F6F6] dark:hover:bg-[#515151] flex justify-between items-center gap-2 p-2 rounded-[10px] cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar
                        image={item.profilePicture}
                        name={item.firstName + " " + item.lastName}
                        className="size-7 2xl:size-[30px]"
                        randomColor={true}
                        textClassName={"text-[10px] 2xl:text-xs"}
                      />
                      <p className="flex gap-2">
                        <span className="text-xs 2xl:text-[15px] font-semibold">
                          {item.firstName?.charAt(0).toUpperCase() +
                            item?.firstName?.slice(1) +
                            " " +
                            item?.lastName}
                        </span>
                        <span className="text-[10px] 2xl:text-xs text-grey">
                          Emp code: #{item.code}
                        </span>
                      </p>
                    </div>
                    <PiArrowRight
                      size={20}
                      className="hidden group-hover:block text-[#888888]"
                    />
                  </Command.Item>
                ))}
              </Command.Group>
              <Command.Separator className="bg-black/10 dark:bg-white/20" />
            </>
          )}
          <Command.Group heading="All Users">
            {items?.map((item) => (
              <Command.Item
                onSelect={(value, e) => {
                  addToRecentSearches(item);
                  navigate(`/employeeProfile/${encrypt(item.employeeId)}`);
                  // window.location.reload();
                }}
                key={`word-${item}`}
                value={item.firstName + item.lastName}
                className="hover:bg-[#F6F6F6] dark:hover:bg-[#515151]   flex justify-between items-center gap-2 p-2 rounded-lg cursor-pointer group"
              >
                <div className="flex items-center gap-2 ">
                  <Avatar
                    image={item.profilePicture}
                    name={item.firstName + " " + item.lastName}
                    className="size-7 2xl:size-[30px]"
                    randomColor={true}
                    textClassName={"text-[10px] 2xl:text-xs"}
                  />
                  <p className="flex gap-2">
                    <span className=" text-xs 2xl:text-[15px] font-semibold">
                      {item.firstName?.charAt(0).toUpperCase() +
                        item?.firstName?.slice(1) +
                        " " +
                        item?.lastName}
                    </span>
                    <span className="text-[10px] 2xl:text-xs text-grey">
                      Emp code: #{item.code}
                    </span>
                  </p>
                </div>
                <PiArrowRight
                  size={20}
                  className="hidden group-hover:block text-[#888888]"
                />
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </div>
      {/* )} */}
    </Command>
  );
};

export default CommandMenu;
