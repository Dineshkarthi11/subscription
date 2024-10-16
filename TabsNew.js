import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
// ... (imports and component definition)

const TabsNew = ({
  tabs,
  onTabChange,
  tabChange = () => {},
  initialTab,
  tabClick = () => {},
  gap = true,
  count = false,
  classNames = "",
  buttonClassname = "",
  tabContent = true,
}) => {
  // console.log(initialTab, "request");
  const [activeTab, setActiveTab] = useState(initialTab || tabs[0].id);
  const [changeData, setChangedata] = useState(false);
  const [tabeName, setTabName] = useState("company");
  const [tabeData, setTabData] = useState();

  useMemo(() => {
    setChangedata(true);
  }, [activeTab]);

  useMemo(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);
  return (
    <div className={`flex flex-col ${gap ? "gap-6" : ""} `}>
      <div
        className={twMerge(
          "flex gap-2 p-[6px] bg-[#FAFAFA] dark:bg-dark border border-black border-opacity-10 rounded-xl flex-wrap",
          classNames
        )}
      >
        {tabs?.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              tabClick(tab.value);
              setActiveTab(tab.id);
              setTabName(tab.value);
              tabChange(tab.navValue);
              // console.log(activeTab, tab.id);

              // onTabChange && onTabChange(tab.id); // Notify parent about tab change
            }}
            className={twMerge(
              `${
                activeTab === tab.id ? "" : ""
              } text-xs 2xl:text-sm font-medium whitespace-nowrap px-2.5 h-8 2xl:h-10 relative group`,
              buttonClassname
            )}
          >
            {/* {activeTab === tab.id && (
              <motion.div
                layoutId="bubble"
                className="absolute inset-0 z-10 rounded-md bg-accent"
                transition={{ type: "spring", duration: 0.6 }}
              ></motion.div>
            )}
            <span
              className={`${activeTab === tab.id
                ? "relative z-20 text-white"
                : " text-black dark:text-white group-hover:text-primary"
                }`}
            >
              {tab.title}
            </span> */}

            {activeTab === tab.id && (
              <div
                layoutId="bubble"
                className="absolute inset-0 z-10 rounded-md bg-accent"
                // transition={{ type: "spring", duration: 0.6 }}
              >
                {/* {console.log("request", activeTab)} */}
              </div>
            )}
            <span
              className={` flex gap-2 justify-center items-center ${
                activeTab === tab.id
                  ? "relative inset-0  z-20 text-white"
                  : " text-black dark:text-white group-hover:text-primary"
              }`}
            >
              {tab.icon && tab.icon}
              {tab.title}
              {count && (
                <p
                  className={`${
                    activeTab === tab.id && "bg-white/20 text-white"
                  } text-[11px] rounded-md bg-primaryalpha/5 vhcenter size-5 font-semibold`}
                >
                  {tab.count}
                </p>
              )}
            </span>
          </button>
        ))}
      </div>
      {tabContent === true && (
        <div className="tab-content">
          {tabs?.map((tab) => (
            <div key={tab.id}>
              {activeTab === tab.id && (
                <div
                  // initial={{ opacity: 0 }}
                  // animate={{ opacity: 1 }}
                  // exit={{ opacity: 0 }}
                  className={`tab-panel flex flex-col gap-4 2xl:gap-6 ${
                    activeTab === tab.id ? "active" : ""
                  }`}
                >
                  {tab.content}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TabsNew;
