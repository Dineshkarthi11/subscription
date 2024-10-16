import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TableAnt from "./TableAnt";
import InProgress from "./InProgres";

const Tabs = ({
  tabs = [],
  data = [],
  deleteApi = "",
  updateApi = "",
  header = [],
  navigateBtn = [],
  navigate = true,
  actionID = "",
  buttonClick = () => {},
  clickDrawer = () => {},
  path = "",
  companyList = true,
  navigationClick = () => {},
  tablechange = false,
  children,
  activeOrNot = () => {},
  actionToggle = false,
  // ListApi=""
  addButtonName = "",
  exportButton = false,
  title = "",
  arabic = true,
  checkBox = true,
  tabClick = () => {},
  tabChange = () => {},
  referesh = () => {},
  inputType,
  count = false,
  statuses,
  activeStatus,
  FilterDataChange = () => {},
  filterTools = false,
  viewClick = () => {},
  viewOutside,
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [changeData, setChangedata] = useState(false);
  const [tabeName, setTabName] = useState("company");
  const [tabeData, setTabData] = useState();

  // useEffect(() => {
  //   console.log(activeTab);
  //   console.log(changeData);
  //   console.log(tabs[0]);

  //   //   console.log(data, "data1");
  //   //   console.log(tabs, "tabs");
  //   //   // if (data) {
  //   //   //   setChangedata(true);
  //   //   // }
  //   //   // setTabData([...tabs]);
  // }, [tabs]);
  useMemo(() => {
    setChangedata(true);
  }, [activeTab]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 p-[6px] bg-[#FAFAFA] dark:bg-dark border border-black border-opacity-10 rounded-xl flex-wrap">
        {tabs?.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              tabClick(tab.value);
              tabChange(tab.navValue);
              setActiveTab(tab.id);
              setTabName(tab.value);
            }}
            className={`${
              activeTab === tab.id ? "" : ""
            } text-xs 2xl:text-sm font-medium whitespace-nowrap text-black px-3 h-8 2xl:h-10 relative group`}
          >
            {activeTab === tab.id && (
              <div
                layoutId="bubble"
                className="absolute inset-0 z-10 rounded-md bg-accent"
                // transition={{ type: "spring", duration: 0.6 }}
              ></div>
            )}
            <p
              className={`flex items-center gap-2 ${
                activeTab === tab.id
                  ? "relative z-20 text-white"
                  : " text-black dark:text-white group-hover:text-primary"
              }`}
            >
              {tab.title}
              {count && (
                <p
                  className={`${
                    activeTab === tab.id && "bg-white/20 text-white"
                  } text-[11px] rounded-md bg-primaryalpha/5 vhcenter size-5 font-semibold`}
                >
                  {tab?.count || 0}
                </p>
              )}
            </p>
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs?.map((tab) => (
          <AnimatePresence key={tab.id}>
            <div
              key={tab.id}
              className={`tab-panel ${activeTab === tab.id ? "active" : ""}`}
            >
              {
                activeTab === tab.id &&
                  changeData &&
                  (data ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1.5 }}
                      exit={{ opacity: 0 }}
                      className={`tab-panel flex flex-col gap-4 2xl:gap-6 ${
                        activeTab === tab.id ? "active" : ""
                      }`}
                    >
                      <TableAnt
                        data={data}
                        header={header}
                        tabValue={tab.value}
                        deleteApi={deleteApi}
                        updateApi={updateApi}
                        actionID={actionID}
                        buttonClick={buttonClick}
                        clickDrawer={clickDrawer}
                        path={path}
                        // companyList = true,
                        // navigationClick = () => {},
                        // tablechange = false,
                        // children,
                        activeOrNot={activeOrNot}
                        actionToggle={false}
                        // ListApi=""
                        addButtonName={addButtonName}
                        exportButton={false}
                        title={title}
                        inputType={inputType}
                        // arabic = true,
                        // checkBox = true
                        referesh={() => {
                          referesh();
                        }}
                        viewClick={viewClick}
                        statuses={statuses}
                        activeStatus={activeStatus}
                        filterTools={filterTools}
                        FilterDataChange={FilterDataChange}
                        viewOutside={viewOutside}
                      />
                    </motion.div>
                  ) : (
                    <div className="flex items-center justify-center text-xl font-semibold ">
                      <InProgress />
                    </div>
                  ))
                // <div>
                //   {/* Render the specific content for each tab here */}
                //   {tab.value} Content
                // </div>
              }
            </div>
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
