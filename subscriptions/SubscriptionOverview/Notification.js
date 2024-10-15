import React, { useEffect, useState } from "react";
import { PiBellFill, PiClock } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import DrawerPop from "../common/DrawerPop";
import SegmentedTab from "../common/Segmented";
import FlexCol from "../common/FlexCol";
import Avatar from "../common/Avatar";
import { NoData } from "../common/SVGFiles";
import API, { action } from "../Api";
import localStorageData from "../common/Functions/localStorageKeyValues";

const Notification = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [employeeId, setEmployeeId] = useState(localStorageData.employeeId);
  const [companyId, setCompanyId] = useState(localStorageData.companyId);
  const [requests, setRequests] = useState([]);
  const [requestLength, setRequestLength] = useState(0);
  const [requestTodayLength, setRequestTodayLength] = useState(0);
  const [yesterdayRequests, setYesterdayRequests] = useState([]);
  const [todayRequests, setTodayRequests] = useState([]);
  const [otherRequests, setOtherRequests] = useState([]);

  const [selectedOption, setSelectedOption] = useState("All");
  const handleSegmentChange = (value) => {
    setSelectedOption(value);
  };

  const handleClick = () => {
    setShow(true);
  };

  const formatTimeDifference = (diff) => {
    if (isNaN(diff)) {
      return "-- : --";
    }
    const diffInSeconds = Math.floor(diff / 1000);
    if (diffInSeconds < 60) {
      return "a few seconds ago";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    }
  };

  const getRequestList = async () => {
    try {
      const result = await action(API.DASHBOARD_EMPLOYEE_REQUEST, {
        superiorEmployeeId: employeeId,
        companyId: companyId,
      });
      // console.log(result, "getRequestList");
      const processedRequests =
        result?.result?.map((each) => ({
          name:
            each.employeeName?.charAt(0).toUpperCase() +
            each.employeeName?.slice(1),
          img: each.profilePicture,
          type: each.type?.charAt(0).toUpperCase() + each.type?.slice(1),
          createdOn: each.createdOn,
          date: each.createdDate,
          Status: each.status === "1" ? "Approved" : "Pending",
        })) || [];
      setRequestLength(processedRequests.length);
      setRequests(processedRequests);

      // Get current timestamp
      const timeStamp = new Date();

      // Format today's date as 'yyyy-mm-dd'
      const formattedToday = timeStamp.toISOString().split("T")[0];
      // Filter requests from today
      const todayRequests = processedRequests.filter(
        (request) => request.date === formattedToday
      );
      setTodayRequests(todayRequests);
      setRequestTodayLength(todayRequests.length);

      // Initialize a new Date object for yesterday
      const yesterday = new Date(timeStamp);
      yesterday.setDate(timeStamp.getDate() - 1);
      // Format yesterday's date as 'yyyy-mm-dd'
      const formattedYesterday = yesterday.toISOString().split("T")[0];
      // Filter requests from yesterday
      const yesterdayRequests = processedRequests.filter(
        (request) => request.date === formattedYesterday
      );
      setYesterdayRequests(yesterdayRequests);

      // Filter requests older than yesterday
      const otherRequests = processedRequests.filter(
        (request) => request.date < formattedYesterday
      );
      setOtherRequests(otherRequests);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    getRequestList();
  }, []);

  const optionsWithCount = [
    { label: "All", count: "" },
    { label: "Requests & tasks", count: requestLength },
    { label: "Events", count: 0 },
    { label: "Anouncements", count: "" },
  ];

  return (
    <>
      <div
        className="relative flex items-center justify-center w-8 h-8 rounded-full cursor-pointer 2xl:w-10 2xl:h-10 ltr:mr-4 rtl:ml-4 bg-secondaryWhite dark:bg-dark2"
        title="nofications"
        onClick={handleClick}
      >
        <PiBellFill
          size={16}
          className="text-sm text-black 2xl:text-base opacity-20 dark:text-white dark:opacity-100"
        />
        {requestTodayLength !== 0 && (
          <div className="absolute top-0 right-0 w-3 h-3 text-white rounded-full 2xl:w-4 2xl:h-4 bg-primary vhcenter">
            <p className="text-[8px] 2xl:text-xs font-semibold">
              {requestTodayLength}
            </p>
          </div>
        )}
      </div>
      <DrawerPop
        open={show}
        close={(e) => {
          setShow(e);
        }}
        initialBtn={false}
        footerSubmitButton={false}
        footer={false}
        contentWrapperStyle={{
          width: "565px",
        }}
        bodyPadding={"0"}
        header={[t("Notifications"), t("Notifications")]}
      >
        <FlexCol className="py-3 sm:py-6">
          <div className="px-3 sm:px-6">
            <SegmentedTab
              options={optionsWithCount}
              selectedOption={selectedOption}
              onChange={handleSegmentChange}
              className="w-full"
            />
          </div>
          {selectedOption === "All" && (
            <>
              {todayRequests?.length > 0 ||
              yesterdayRequests?.length > 0 ||
              otherRequests?.length > 0 ? (
                <>
                  {todayRequests?.length > 0 && (
                    <>
                      <div className="flex justify-between">
                        <span className="px-3 text-sm text-grey 2xl:text-base sm:px-6">
                          Today
                        </span>
                      </div>

                      <ul className="flex flex-col gap-3">
                        {todayRequests?.map((data, index) => {
                          const createdOn = data?.createdOn;
                          const createdDate = new Date(createdOn);

                          const currentTime = new Date();
                          const timeDiff = currentTime - createdDate;

                          return (
                            <div
                              key={index}
                              className="duration-300 transform hover:bg-primaryalpha/10 dark:hover:bg-primaryalpha/20"
                            >
                              <li className="py-2 sm:py-3">
                                <div className="flex items-center px-3 sm:px-6">
                                  <Avatar
                                    image={data?.img}
                                    name={data?.name}
                                    className="border-2 border-white shadow-md"
                                  />
                                  <div className="flex-1 min-w-0 ms-4">
                                    <p className="flex justify-end gap-1 text-sm font-medium text-center text-gray-900 truncate dark:text-white">
                                      <span>{data?.name}</span>
                                      <span className="text-gray-500">
                                        has Submitted a
                                      </span>
                                      <span>{data?.type}</span>
                                      <span
                                        className={`ml-auto text-[10px] 2xl:text-xs px-2 py-1 vhcenter rounded-full ${
                                          data?.Status === "Pending"
                                            ? "text-orange-400 bg-orange-100"
                                            : "text-green-400 bg-green-100"
                                        }`}
                                      >
                                        {data?.Status}
                                      </span>
                                    </p>
                                    <p className="flex items-center gap-1 text-xs text-gray-500 truncate dark:text-gray-400">
                                      <span>
                                        <PiClock />
                                      </span>
                                      <span>
                                        {formatTimeDifference(timeDiff)}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </li>
                            </div>
                          );
                        })}
                      </ul>
                    </>
                  )}

                  {yesterdayRequests?.length > 0 && (
                    <>
                      <span className="px-3 text-sm text-grey 2xl:text-base sm:px-6">
                        Yesterday
                      </span>
                      <ul className="flex flex-col gap-3">
                        {yesterdayRequests?.map((data, index) => {
                          const createdOn = data?.createdOn;
                          const createdDate = new Date(createdOn);

                          const currentTime = new Date();
                          const timeDiff = currentTime - createdDate;

                          return (
                            <div
                              key={index}
                              className="duration-300 transform hover:bg-primaryalpha/10 dark:hover:bg-primaryalpha/20"
                            >
                              <li className="py-2 sm:py-3">
                                <div className="flex items-center px-3 sm:px-6">
                                  <Avatar
                                    image={data?.img}
                                    name={data?.name}
                                    className="border-2 border-white shadow-md"
                                  />
                                  <div className="flex-1 min-w-0 ms-4">
                                    <p className="flex justify-end gap-1 text-sm font-medium text-center text-gray-900 truncate dark:text-white">
                                      <span>{data?.name}</span>
                                      <span className="text-gray-500">
                                        has Submitted a
                                      </span>
                                      <span>{data?.type}</span>
                                      <span
                                        className={`ml-auto text-[10px] 2xl:text-xs px-2 py-1 vhcenter rounded-full ${
                                          data?.Status === "Pending"
                                            ? "text-orange-400 bg-orange-100"
                                            : "text-green-400 bg-green-100"
                                        }`}
                                      >
                                        {data?.Status}
                                      </span>
                                    </p>
                                    <p className="flex items-center gap-1 text-xs text-gray-500 truncate dark:text-gray-400">
                                      <span>
                                        <PiClock />
                                      </span>
                                      <span>
                                        {formatTimeDifference(timeDiff)}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </li>
                            </div>
                          );
                        })}
                      </ul>
                    </>
                  )}

                  {otherRequests?.length > 0 && (
                    <>
                      <span className="px-3 text-sm text-grey 2xl:text-base sm:px-6">
                        Older
                      </span>
                      <ul className="flex flex-col gap-3">
                        {otherRequests?.map((data, index) => {
                          const createdOn = data?.createdOn;
                          const createdDate = new Date(createdOn);

                          const currentTime = new Date();
                          const timeDiff = currentTime - createdDate;

                          return (
                            <div
                              key={index}
                              className="duration-300 transform hover:bg-primaryalpha/10 dark:hover:bg-primaryalpha/20"
                            >
                              <li className="py-2 sm:py-3">
                                <div className="flex items-center px-3 sm:px-6">
                                  <Avatar
                                    image={data?.img}
                                    name={data?.name}
                                    className="border-2 border-white shadow-md"
                                  />
                                  <div className="flex-1 min-w-0 ms-4">
                                    <p className="flex justify-end gap-1 text-sm font-medium text-center text-gray-900 truncate dark:text-white">
                                      <span>{data?.name}</span>
                                      <span className="text-gray-500">
                                        has Submitted a
                                      </span>
                                      <span>{data?.type}</span>
                                      <span
                                        className={`ml-auto text-[10px] 2xl:text-xs px-2 py-1 vhcenter rounded-full ${
                                          data?.Status === "Pending"
                                            ? "text-orange-400 bg-orange-100"
                                            : "text-green-400 bg-green-100"
                                        }`}
                                      >
                                        {data?.Status}
                                      </span>
                                    </p>
                                    <p className="flex items-center gap-1 text-xs text-gray-500 truncate dark:text-gray-400">
                                      <span>
                                        <PiClock />
                                      </span>
                                      <span>
                                        {formatTimeDifference(timeDiff)}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </li>
                            </div>
                          );
                        })}
                      </ul>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full mt-5 text-red-300 opacity-100 vhcenter">
                  No notifications found!!
                </div>
              )}
            </>
          )}

          {selectedOption === "Requests & tasks" &&
            (requests?.length > 0 ? (
              <ul className="flex flex-col gap-3">
                {requests?.map((data, index) => {
                  const createdOn = data?.createdOn;
                  const createdDate = new Date(createdOn);

                  const currentTime = new Date();
                  const timeDiff = currentTime - createdDate;

                  return (
                    <div className="duration-300 transform hover:bg-primaryalpha/10 dark:hover:bg-primaryalpha/20">
                      <li className="py-2 sm:py-3">
                        <div className="flex items-center px-3 sm:px-6">
                          <Avatar
                            image={data?.img}
                            name={data?.name}
                            className="border-2 border-white shadow-md"
                          />
                          <div className="flex-1 min-w-0 ms-4">
                            <p className="flex justify-end gap-1 text-sm font-medium text-center text-gray-900 truncate dark:text-white">
                              <span>{data?.name}</span>
                              <span className="text-gray-500">
                                has Submitted a
                              </span>
                              <span>{data?.type}</span>
                              <span
                                className={`ml-auto text-[10px] 2xl:text-xs px-2 py-1 vhcenter rounded-full ${
                                  data?.Status === "Pending"
                                    ? "text-orange-400 bg-orange-100"
                                    : "text-green-400 bg-green-100"
                                }`}
                              >
                                {data?.Status}
                              </span>
                            </p>
                            <p className="flex items-center gap-1 text-xs text-gray-500 truncate dark:text-gray-400">
                              <span>
                                <PiClock />
                              </span>
                              <span>{formatTimeDifference(timeDiff)}</span>
                            </p>
                          </div>
                        </div>
                      </li>
                    </div>
                  );
                })}
              </ul>
            ) : (
              <NoData />
            ))}

          {selectedOption === "Events" && (
            <>
              <NoData />
            </>
          )}

          {selectedOption === "Anouncements" && (
            <>
              <NoData />
            </>
          )}
        </FlexCol>
      </DrawerPop>
    </>
  );
};

export default Notification;
