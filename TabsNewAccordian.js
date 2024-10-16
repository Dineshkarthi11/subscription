import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { setAccordionItem } from "../../Redux/action";
import { NoData } from "./SVGFiles";

// ... (imports and component definition)

const TabsNewAccordian = ({
  tabs,
  onTabChange = () => {},
  initialTab,
  tabClick = () => {},
  accordionData,
  onclick = () => {},
}) => {
  const [activeTab, setActiveTab] = useState(initialTab || tabs[0].id);
  const [changeData, setChangedata] = useState(false);
  const [tabeName, setTabName] = useState([]);
  const [tabeData, setTabData] = useState();
  const { t } = useTranslation();
  const selectedAccordionItem = useSelector(
    (state) => state.accordion.accordionItem
  );
  const dispatchRedux = useDispatch();

  const [expanded, setExpanded] = useState({
    [accordionData[0].id]: true,
    ...Object.fromEntries(
      accordionData.slice(1).map((item) => [item.id, false])
    ),
  });
  console.log("expanded ACCo:", expanded, accordionData);

  const toggleAccordion = (id) => {
    setExpanded((prevExpanded) => {
      const newExpanded = { ...prevExpanded };

      // Close all other items
      Object.keys(newExpanded).forEach((itemId) => {
        if (itemId !== id) {
          newExpanded[itemId] = false;
        }
      });

      // Toggle the selected item
      newExpanded[id] = !prevExpanded[id];

      // If the accordion is expanded, find and dispatch the selected item to Redux
      if (newExpanded[id]) {
        const selectedAccordionData = accordionData.find(
          (section) =>
            Object.keys(section)[0].toLowerCase() ===
            tabs.find((tab) => tab.id === activeTab).title.toLowerCase()
        );

        if (selectedAccordionData) {
          const selectedAccordionItem = selectedAccordionData[
            Object.keys(selectedAccordionData)[0]
          ].find((item) => item.id === id);

          if (selectedAccordionItem) {
            dispatchRedux(setAccordionItem(selectedAccordionItem));
            // console.log("Selected Accordion Item:", selectedAccordionItem);
          } else {
            // console.log("Selected Accordion Item is undefined");
          }
        }
      }

      return newExpanded;
    });
  };

  useMemo(() => {
    setChangedata(true);
  }, [activeTab]);

  useEffect(() => {
    // Reset expanded state when changing tabs
    setExpanded({});
  }, [activeTab]);

  // const accordianselect = (e) => {
  //   const selectedAccordionData = accordionData.find(
  //     (section) =>
  //       Object.keys(section)[0].toLowerCase() ===
  //       tabs.find((tab) => tab.id === activeTab).title.toLowerCase()
  //   );

  //   if (selectedAccordionData) {
  //     const selectedAccordionItem = selectedAccordionData[Object.keys(selectedAccordionData)[0]]
  //     .find(item => item.id === activeTab);

  //     if (selectedAccordionItem) {
  //       dispatchRedux(setAccordionItem(selectedAccordionItem));
  //       console.log('Selected Accordion Item:', selectedAccordionItem);
  //     } else {
  //       console.log('Selected Accordion Item is undefined');
  //     }
  //   }
  // };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 p-[6px] bg-[#FAFAFA] dark:bg-secondaryDark border border-black border-opacity-10 rounded-xl flex-wrap">
        {tabs?.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setTabName(tab.value);
              // console.log("value", tabeName);
              // console.log("tabs", activeTab);
              onTabChange(tab.id); // Notify parent about tab change
            }}
            className={`${
              activeTab === tab.id ? "" : ""
            } text-[9px] 2xl:text-sm font-medium whitespace-nowrap px-2.5 h-8 2xl:h-10 relative group`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="bubble"
                className="absolute inset-0 z-10 rounded-md bg-accent"
                transition={{ type: "spring", duration: 0.6 }}
              ></motion.div>
            )}
            <span
              className={`${
                activeTab === tab.id
                  ? "relative z-20 text-white"
                  : " text-black dark:text-white group-hover:text-primary"
              }`}
            >
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs?.map((tab) => (
          <>
            <AnimatePresence key={tab.id}>
              {activeTab === tab.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`tab-panel flex flex-col gap-4 2xl:gap-6 ${
                    activeTab === tab.id ? "active" : ""
                  }`}
                >
                  <div>
                    {accordionData.map((section, sectionIndex) => {
                      const sectionKey = Object.keys(section)[0];
                      const isCurrentTab =
                        sectionKey.toLowerCase() === t(tab.title).toLowerCase();
                      const items = section[sectionKey];

                      return (
                        isCurrentTab && (
                          <div
                            key={sectionIndex}
                            className="flex flex-col gap-4 2xl:gap-6"
                          >
                            {items.length === 0 ? (
                              <div className="vhcenter">
                                <NoData />
                              </div>
                            ) : (
                              items.map((item) => (
                                <div
                                  key={item.id}
                                  className={`border rounded-lg group ${
                                    expanded[item.id] ||
                                    parseInt(item.id) ===
                                      parseInt(selectedAccordionItem.id)
                                      ? "border-primary selected-leave"
                                      : "border-secondaryWhite dark:border-secondaryDark"
                                  }`}
                                >
                                  <h2>
                                    <button
                                      type="button"
                                      className="flex items-center justify-between w-full p-2 font-semibold text-left 2xl:p-4"
                                      onClick={() => toggleAccordion(item.id)}
                                      aria-expanded={expanded[item.id]}
                                      aria-controls={`acco-text-${item.id}`}
                                    >
                                      <div className="flex items-center gap-4">
                                        <div className="rounded-md w-9 h-9 2xl:w-12 2xl:h-12 bg-secondaryWhite dark:bg-secondaryDark vhcenter">
                                          <div className="size-4 2xl:size-6">
                                            {item.img}
                                          </div>
                                        </div>
                                        <div className="text-left rtl:text-right">
                                          <h1
                                            className={`acco-h1 !text-xs 2xl:!text-sm group-hover:text-primary ${
                                              expanded[item.id]
                                                ? "text-primary"
                                                : ""
                                            }`}
                                          >
                                            {item.title}
                                          </h1>
                                          <p className="para 2xl:!text-xs">
                                            {item.subtitle}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="rounded-[4px] bg-secondaryWhite dark:bg-secondaryDark p-[5px]">
                                        <IoIosArrowForward
                                          className={`transition duration-300 ease-out origin-center text-base 2xl:text-lg transform text-black text-opacity-20 dark:text-white dark:text-opacity-20 ${
                                            expanded[item.id]
                                              ? "!rotate-90"
                                              : ""
                                          }`}
                                        />
                                      </div>
                                    </button>
                                  </h2>
                                  <div
                                    id={`acco-text-${item.id}`}
                                    role="region"
                                    aria-labelledby={`acco-title-${item.id}`}
                                    className={`grid overflow-hidden text-sm transition-all duration-300 ease-in-out ${
                                      expanded[item.id]
                                        ? "grid-rows-[1fr] opacity-100 p-2 2xl:p-4 border-t border-secondaryDark dark:border-secondaryWhite border-opacity-10 dark:border-opacity-10"
                                        : "grid-rows-[0fr] opacity-0"
                                    }`}
                                  >
                                    <div
                                      className={`flex flex-col gap-2 2xl:gap-4 overflow-hidden bg-[#FAFAFA] dark:bg-secondaryDark dark:text-white text-xs ${
                                        expanded[item.id] && "p-2 2xl:p-4"
                                      } rounded-md`}
                                    >
                                      <div className="flex flex-col 2xl:gap-2">
                                        <p className="text-[10px] font-medium 2xl:text-xs">
                                          {t("Description")}
                                        </p>
                                        <p className="text-[8px] 2xl:text-[10px]">
                                          {item.description}
                                        </p>
                                      </div>
                                      <div className="v-divider"></div>
                                      <div className="flex flex-col 2xl:gap-2">
                                        <p className="text-[10px] font-medium 2xl:text-xs">
                                          {t("AllowancePay")}
                                        </p>
                                        <p className="text-[8px] 2xl:text-[10px]">
                                          <span>{t("LeaveDays")} : </span>{" "}
                                          <span>
                                            {item.allowancePay &&
                                              item.allowancePay.leavedays}
                                          </span>
                                        </p>
                                        <p className="text-[8px] 2xl:text-[10px]">
                                          <span>{t("LeavePayRate")} : </span>{" "}
                                          <span>
                                            {item.allowancePay &&
                                              item.allowancePay.Leavepayrate}
                                          </span>
                                        </p>
                                        <p className=" text-[8px] 2xl:text-[10px]">
                                          <span>{t("Leave Count")} : </span>{" "}
                                          <span>{item.leaveCount}</span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        )
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ))}
      </div>
    </div>
  );
};

export default TabsNewAccordian;
