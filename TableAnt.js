/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Table,
  Input,
  Dropdown,
  Menu,
  Checkbox,
  Switch,
  Popconfirm,
  Popover,
  Tooltip,
  notification,
  Progress,
  Steps,
  Skeleton,
} from "antd";
import { RxDotFilled } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { BsListUl, BsThreeDotsVertical } from "react-icons/bs";
import { BsGrid } from "react-icons/bs";
import { FiSave } from "react-icons/fi";
import SearchBox from "./SearchBox";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";
import { FaPencil } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";
import ButtonClick from "./Button";
import FormInput from "./FormInput";
import DropDWN from "./Dropdown";
import TabsNew from "./TabsNew";

import ModalPop from "./ModalPop";
import ModalImg from "../../assets/images/save.svg";
import PopImg from "../../assets/images/ModalAntImg.svg";
import companyimg from "../../assets/images/clogo.jpeg";

import NoImagePlaceholder from "../../assets/images/NoImagePlaceholder.png";
import ModalPayroll from "./ModalPayroll";
import PayrollTableDetails from "./PayrollTableDetails";
import { HiPlusSm } from "react-icons/hi";
import API, { action } from "../Api";
import ButtonDropdown from "./ButtonDropdown";
import PAYROLLAPI, {
  Payrollaction,
  payrollFileActionForPayrollTableEmployeePaySlip,
} from "../PayRollApi";
import CheckboxGroup from "./CheckBoxGroup";
import ModalAnt from "./ModalAnt";
import Avatar from "./Avatar";
import { LuListFilter } from "react-icons/lu";
import StatusFilter from "./StatusFilter";
import { useSelector } from "react-redux";
import MiniStepper from "./MiniStepper";
import { useNotification } from "../../Context/Notifications/Notification";
import { encrypt } from "./Functions/commonFunction";
// import { classNames } from "react-easy-crop/helpers";

// Filter Dropdown
const { SubMenu } = Menu;
// Table Header And Style
// push the array value in map

// Dropdown Items In each Rows

const gridListoptions = [
  {
    label: <BsListUl />,
    value: 1,
  },
  {
    label: <BsGrid />,
    value: 2,
  },
];
const colorNames = [
  // "#733710",
  // "#305FBB",
  // "#271860",
  "#0095FF",
  "#4437CC",
  "#733710",
  "#FF8A00",
  "#305FBB",
  "#00D3E0",
  "#4BB79D",
  "#DFA510",
  "#E546D5",
  "#00E096",
  "#884DFF",
  "#FF4DB8",
];

const TableAnt = ({
  data = [],
  header = [],
  actionID = "",
  updateApi = "",
  deleteApi = "",
  path = "",
  tabValue = "",
  buttonClick = () => {},
  clickDrawer = () => {},
  // deleteRecord = () => {},
  referesh = () => {},
  pathUrl = false,
  showDetails = true,
  Movetocase = () => {},
  inputType,
  tab,
  buttons,
  handleTabChange = () => {},
  TblBtnView = false,
  TblBtnSubmit = () => {},
  TblBtnName = "",
  headerTools = false,
  viewOutside = false,
  viewClick = () => {},
  selectedRow = () => {},
  scroll = false,
  scrollXY = [],
  selectedMonthYear = "",
  view = true,
  handleSalaryHoldClick,
  handleSalaryReleaseClick,
  showDeleteIcon,
  actionstatusID = "",
  statuses,
  activeStatus,
  FilterDataChange = () => {},
  filterTools = false,
  requestEmployeeId = "",
  cursorPointer = true,
  changePagination = () => {},
  pageLimit = 10,
  paginationCount = 0,
  unChecked = false,
  urlMain,
  dataPerPage,
  isLoadingState,
  moreData,
  disablePagination,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
  const [listData, setListData] = useState([]);
  const [tabTitle, setTabTitle] = useState(
    tabValue?.charAt(0).toUpperCase() + tabValue?.slice(1)
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [employeeId, setEmployeeId] = useState(null);
  const [salaryTemplateId, setSalaryTemplateId] = useState(null);
  // const [searchFilter, setSearchFilter] = useState([...data]);
  const [searchFilter, setSearchFilter] = useState(
    data?.map((each) => ({
      key: each[actionID],
      ...each,
    }))
  );

  const [visibleColumns, setVisibleColumns] = useState();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [gridList, setGridList] = useState(1);
  const primaryColor = localStorage.getItem("mainColor");
  const companylogo = localStorage.getItem("companylogo");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalshow, setIsModalshow] = useState(true);
  const [headerData, setHeaderData] = useState(header[0]?.[tabValue || path]);
  const [tabClick, setTabClick] = useState(path);
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
  const [modalData, setModalData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [payrollSalarySlipModalData, setPayrollSalarySlipModalData] = useState(
    {}
  );

  const [keys, setKeys] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const themeMode = useSelector((state) => state.layout.mode);

  // console.log();
  const handleDownloadClick = (rowData) => {
    setModalVisible(true);
    setPayrollSalarySlipModalData(rowData);
    // console.log();
  };

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };
  const [current, setCurrent] = useState(0);

  const handleStepChange = (newCurrent) => {
    setCurrent(newCurrent);
  };

  const customDot = (dot, { status, index }) => {
    //  const stepsData = "text[each.value] || {};"
    //  const keys = Object.keys(stepsData);
    //  const isApproved = stepsData[keys[index]] === "Approved";
    //  const isPending = stepsData[keys[index]] === "Pending";
    //  if (isApproved) {
    //    return <span className="custom-dot custom-dot-approved">{dot}</span>;
    //  }
    //  if (isPending) {
    //    return <span className="custom-dot custom-dot-pending">{dot}</span>;
    //  }
    //  return dot;
  };

  const { showNotification } = useNotification();

  const openNotification = (type, title, description) => {
    showNotification({
      placement: "top",
      message: title,
      description: description,
      type: type,
    });
  };

  useEffect(() => {
    setHeaderData(header[0]?.[tabValue || path]);
  }, [tabValue, path]);

  useMemo(() => {
    // if (data) {
    setSearchValue("");
    // console.log();
    setListData(
      data.map((each) => ({
        key: each[actionID],
        ...each,
      }))
    );

    // setListData([...data]);
    // }
  }, [data]);

  const [tableData, setTableData] = useState([]);

  // useMemo(() => {
  //   const newColumns = tableData.map((item) => ({
  //     ...item,
  //     hidden: !checkedList.includes(item.key),
  //   }))
  // }, [checkedList])

  useEffect(() => {
    if (tableData) console.log();
  }, [tableData]);

  const sortedListData = sortData(listData, "stateName");

  function sortData(listData, sortBy) {
    return listData.slice().sort((a, b) => {
      if (a[sortBy] && b[sortBy]) {
        return a[sortBy].localeCompare(b[sortBy]);
      }
      return 0;
    });
  }

  //   const sortedListData = sortData(listData, "stateName");
  //   function sortData(listData, sortOrder) {
  //     return listData.slice().sort((a, b) => {
  //         const dateA = new Date(a.createdOn);
  //         const dateB = new Date(b.createdOn);
  //         if (sortOrder === "asc") {
  //             return dateA - dateB;
  //         } else {
  //             return dateB - dateA;
  //         }
  //     });
  // }

  // Action Toggle change
  const handleToggleList = (id, checked, text) => {
    // console.log(checked);
    // console.log(switches);
    // console.log(text, "changed");
    // setListData(
    //   (prevSwitches) =>
    //     prevSwitches?.map((sw, i) =>
    //       // console.log(sw.companyId , id )
    //       sw?.[actionID] === id
    //         ? { ...sw, isActive: checked === true ? 1 : 0 }
    //         : sw
    //     )
    //   // prevSwitches.map((sw) => (sw.id === i ? { ...sw, value: checked } : sw))
    // );
  };
  //   const handleFileDownload = async (fileUrl) => {
  //     console.log(fileUrl, "fileUrl");

  //     if (!fileUrl) {
  //         alert('File URL is not available');
  //         return;
  //     }

  //     try {
  //         const response = await fetch(fileUrl);
  //         console.log(response,"response")
  //         const blob = await response.blob();
  //         console.log(blob,"response")
  //         const url = window.URL.createObjectURL(blob);

  //         const link = document.createElement('a');
  //         link.href = url;
  //         link.setAttribute('download', 'approvedDocument.png'); // Change the file name if necessary
  //         document.body.appendChild(link);
  //         link.click();
  //         document.body.removeChild(link);

  //         // Clean up
  //         window.URL.revokeObjectURL(url);
  //     } catch (error) {
  //         console.error('Error downloading the file:', error);
  //         alert('Failed to download the file');
  //     }
  // };
  const handleFileDownload = (fileUrl) => {
    // console.log(fileUrl, "fileUrl");

    if (!fileUrl) {
      alert("No file to download");
      return;
    }

    try {
      const link = document.createElement("a");
      link.href = fileUrl;

      // Set the download attribute only if the file URL is from the same origin
      const isSameOrigin = new URL(fileUrl).origin === window.location.origin;
      if (isSameOrigin) {
        link.setAttribute("download", "approvedDocument.png"); // Change the file name if necessary
      } else {
        // Open in a new tab if it's a cross-origin request
        link.setAttribute("target", "_blank");
      }

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file:", error);
      alert("Failed to download the file");
    }
  };

  const [show, setShow] = useState(false);
  const [openPop, setOpenPop] = useState("");
  // click on row show details function
  const handleRowClick = (text, title) => {
    if (path === "Payroll_Table") {
      setShow(true);
      setOpenPop(path);
    } else {
      setModalData({ text, title });
      // console.log({ text, title }, "Value");
      setIsModalOpen(true);
    }
    // if (isModalshow === true) {
    //   setIsModalOpen(true);
    // }
    // else {
    //   setIsModalshow(true);
    // }
  };

  // update Api integration
  const getValue = (dataValue, text) => {
    if (Array.isArray(dataValue)) {
      for (let key of dataValue) {
        if (text[key]) {
          return text[key];
        }
      }
      return null;
    } else {
      return text[dataValue] || null;
    }
  };

  const formatValue = (value) => {
    return typeof value === "string"
      ? value?.charAt(0).toUpperCase() + value?.slice(1)
      : null;
  };
  const updateCompany = async (id, checked, text) => {
    try {
      const result = await action(updateApi, {
        id: parseInt(id), //Id
        isActive: checked === true ? 1 : 0,
      });

      if (result.status === 200) {
        setListData(
          (prevSwitches) =>
            prevSwitches?.map((sw, i) =>
              sw?.[actionID] === id
                ? { ...sw, isActive: checked === true ? 1 : 0 }
                : sw
            )

          // prevSwitches.map((sw) => (sw.id === i ? { ...sw, value: checked } : sw))
        );
        openNotification("success", "Success", result?.message);
        referesh(true);
      } else {
        openNotification("error", "Info", result.message);
      }
    } catch (error) {
      openNotification("error", "Failed", error.code);
    }
  };

  // Delete Api Integration

  const deleteRecord = async (e, text) => {
    try {
      let result;
      if (urlMain) {
        result = await action(deleteApi, { id: e }, urlMain);
      } else {
        result = await action(deleteApi, { id: e });
      }

      if (result.status === 200) {
        // window.location.reload();
        openNotification("success", "Successful", result?.message);
        referesh(true, text);
      } else {
        openNotification("error", "Info", result.message);
      }
    } catch (error) {
      openNotification("error", "Failed", error.message);
    }
  };

  const twoColors = {
    // '0%': '#108ee9',
    // '100%': '#87d068',
    "0%": primaryColor,
    "100%": primaryColor,
  };

  useEffect(() => {
    setTableData(
      header[0]?.[tabValue || path]?.map((each, i) => ({
        // headerData?.map((each, i) => ({ //tabClick ||
        title: (
          <span
            key={i}
            className={`text-[10px] 2xl:text-xs text-[#667085] dark:text-white font-medium capitalize`}
          >
            {each.title}
          </span>
        ),
        dataIndex: each.value,
        hidden: false,
        // dataInde      x: "firstName",
        render: each.render
          ? each.render
          : (record, text) => (
              <>
                <div
                  className={` ${each.width} ${
                    cursorPointer && "cursor-pointer"
                  } `}
                  onClick={() => {
                    if (pathUrl && !each?.dotsVertical && !each.actionToggle) {
                      const encryptedActionID = encrypt(text[actionID]);
                      navigate(`/${pathUrl}/${encryptedActionID}`);
                    } else if (
                      viewOutside &&
                      !each?.dotsVertical &&
                      !each.actionToggle &&
                      !each.action &&
                      !each?.ThreeDots &&
                      !each?.Approve &&
                      !each?.showvertical &&
                      !each.customaction &&
                      !each.dotVerticalDropdown &&
                      !each.displayAction &&
                      !each.assetrecovery
                    ) {
                      viewClick(text[actionID], text);
                    } else if (
                      !each?.dotVerticalDropdown &&
                      !each?.dotsVertical &&
                      !each.actionToggle &&
                      !each.action &&
                      !each?.ThreeDots &&
                      !each?.Approve &&
                      !each?.Regularize &&
                      !each?.Download &&
                      !each?.showvertical &&
                      !each.customaction &&
                      !each.displayAction &&
                      !each.assetrecovery
                    ) {
                      handleRowClick(text, header[0]?.[tabValue || path]);
                    }
                    // console.log(each.flexColumn);
                    // if (each.action === false && each.flexColumn === false)
                    //   setIsModalOpen(true);
                  }}
                >
                  {each.alterValue === "isActive" ? (
                    <div
                      key={text}
                      className={`${
                        parseInt(record) === 1
                          ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-600/30"
                          : "bg-rose-100 text-rose-600 dark:bg-rose-600/30"
                      } rounded-full pr-2 py-[2px] w-fit font-medium text-[10px] 2xl:text-sm vhcenter flex-nowrap`}
                      onClick={() => {
                        !viewOutside &&
                          handleRowClick(text, header[0]?.[tabValue || path]);
                      }}
                      style={{
                        backgroundColor:
                          `${text.statusColour}30` ||
                          (parseInt(record) === 1
                            ? "bg-emerald-100"
                            : "bg-rose-100"),
                        color: text.statusColour
                          ? text.statusColour
                          : parseInt(record) === 1
                          ? "text-emerald-600"
                          : "text-rose-600",
                      }}
                    >
                      <RxDotFilled
                        className={`${
                          text.statusColour
                            ? text.statusColour
                            : parseInt(record) === 1
                            ? "text-emerald-600"
                            : "text-rose-600"
                        } text-base 2xl:text-lg`}
                      />
                      {parseInt(record) === 1 ? "Active" : "Inactive"}
                    </div>
                  ) : //  <div
                  //       key={text}
                  //       className={`${
                  //         parseInt(record) === 1
                  //           ? " bg-emerald-100 text-emerald-600"
                  //           : " bg-rose-100 text-rose-600"
                  //       } rounded-full pr-2 py-[2px] w-fit font-medium text-[10px] 2xl:text-sm vhcenter flex-nowrap`}
                  //       onClick={() => {
                  //         !viewOutside &&
                  //           handleRowClick(text, header[0]?.[tabValue || path]);
                  //       }}
                  //     >
                  //       <RxDotFilled
                  //         className={`${
                  //           parseInt(record) === 1
                  //             ? "text-emerald-600"
                  //             : "text-rose-600"
                  //         } text-base 2xl:text-lg`}
                  //       />
                  //       {parseInt(record) === 1 ? "Active" : "Inactive"}
                  //     </div>
                  each.flexColumn === true ? (
                    <div
                      className="flex items-center gap-4"
                      onClick={() => {
                        !viewOutside &&
                          handleRowClick(text, header[0]?.[tabValue || path]);
                      }}
                    >
                      {(each?.logo || each?.profilePicture) && ( //profilePicture
                        // <div
                        //   className={`size-8 overflow-hidden rounded-full 2xl:size-10 shrink-0 bg-primaryalpha/20 dark:bg-primaryalpha/30 vhcenter ${each.logoClass}`}
                        // >
                        //   {text.logo || text.profilePicture ? (
                        //     <img
                        //       src={text.logo || text.profilePicture}
                        //       className="object-cover object-center w-full h-full"
                        //       alt=""
                        //     />
                        //   ) : text.profilePicture ? (
                        //     <img
                        //       src={
                        //         text.profilePicture
                        //           ? text.profilePicture
                        //           : NoImagePlaceholder
                        //       }
                        //       className="object-cover object-center w-full h-full"
                        //       alt=""
                        //     />
                        //   ) : (
                        //     <p className="font-semibold text-primary">
                        //       {text[each.value[0]]?.charAt(0).toUpperCase()}
                        //     </p>
                        //   )}
                        // </div>
                        <Avatar
                          image={text.profilePicture}
                          name={text[each?.value[0]]}
                          randomColor={false}
                          className={each?.logoClass}
                        />
                      )}
                      <div className="flex flex-col overflow-hidden">
                        {/* items-center gap-2 */}
                        <p
                          className={` ${
                            each?.classNames
                              ? each?.classNames[0]
                              : "text-xs font-semibold text-black capitalize 2xl:text-sm dark:text-white"
                          } `}
                        >
                          {text.company || text[each.value[0]] || text.title}{" "}
                        </p>
                        {/* {console.log(text, record)} */}
                        {/* <>{alert(JSON.stringify(text[each.]))}</> */}
                        {text[each.value[1]] && (
                          <p
                            className={`${
                              each.classNames
                                ? each?.classNames[1]
                                : "!font-normal para"
                            }`}
                          >
                            {each.url
                              ? text[each.value[1]]
                              : `Emp Code: ${text[each.value[1]]}`}
                            {/* {} */}
                            {each.value.includes("paymentmethodname") && (
                              <p
                                className={`${
                                  each.classNames
                                    ? each?.classNames[2]
                                    : "!font-normal para"
                                }`}
                              >
                                {/* Payment Method:{" "} */}
                                {text.paymentmethodname || "--"}
                              </p>
                            )}
                          </p>
                        )}
                        {/* {text.subtitle && (
                      <p
                        className={`${
                          each.classNames
                            ? each?.classNames[1]
                            : "text-[10px] text-grey 2xl:text-xs truncate"
                        }`}
                        title={text.subtitle}
                      >
                        {text.subtitle}
                      </p>
                    )} */}
                      </div>
                    </div>
                  ) : each.progressBar === true ? (
                    <>
                      {text.profileCompletion ? (
                        <Progress
                          size={40}
                          strokeColor={twoColors}
                          strokeWidth={12}
                          // strokeLinecap="butt"
                          type={each.progressType}
                          percent={text.profileCompletion}
                        />
                      ) : text.assetCount ? (
                        <div className="flex items-center gap-2">
                          <Progress
                            strokeColor={twoColors}
                            size={40}
                            strokeWidth={12}
                            strokeLinecap="butt"
                            type="circle"
                            percent={(
                              (text.assetRecoveredCount / text.assetCount) *
                              100
                            ).toFixed(0)}
                          />
                          <p className="text-grey text-[10px] 2xl:text-xs">{`${text.assetRecoveredCount} of ${text.assetCount} complete`}</p>
                        </div>
                      ) : (
                        <p className="text-grey text-[10px] 2xl:text-xs">
                          No data
                        </p>
                      )}
                    </>
                  ) : // text.assetCount > 0 ? (
                  //   <div className="flex items-center gap-2">
                  //     <Progress
                  //       size={50}
                  //       strokeWidth={12}
                  //       strokeLinecap="butt"
                  //       type={each.progressType}
                  //       percent={(
                  //         (text.assetRecoveredCount / text.assetCount) *
                  //         100
                  //       ).toFixed(0)}
                  //     />
                  //     <p className="text-grey text-[10px] 2xl:text-xs">{`${text.assetRecoveredCount} of ${text.assetCount} complete`}</p>
                  //   </div>
                  // ) : (
                  //   <p className="text-grey text-[10px] 2xl:text-xs">No assets</p>
                  // )
                  each.flex === true ? (
                    <div className="flex items-center gap-2">
                      <div
                        className={`${
                          each?.classNames[0]
                            ? each?.classNames[0]
                            : " bg-orange-100 text-orange-700"
                        }  rounded-full p-[2px] px-1 w-fit font-normal text-[10px] 2xl:text-sm  flex-nowrap `}
                      >
                        {text[each.value[0]]}
                      </div>
                      <div
                        className={`${
                          each?.classNames[1]
                            ? each?.classNames[1]
                            : "bg-orange-100 text-orange-700"
                        }  rounded-full p-[2px] px-1 w-fit font-normal text-[10px] 2xl:text-sm  flex-nowrap `}
                      >
                        {text[each.value[1]]}
                      </div>
                    </div>
                  ) : each.isActive ? (
                    <div className="pl-4">
                      <div
                        className={`${
                          parseInt(text.isActive) === 1
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-rose-100 text-rose-600"
                        } rounded-full pr-2 py-[2px] w-fit font-medium text-[10px] 2xl:text-sm vhcenter flex-nowrap`}
                        style={{
                          backgroundColor:
                            text.statusColour ||
                            (parseInt(text.isActive) === 1
                              ? "bg-emerald-100"
                              : "bg-rose-100"),
                          color: text.statusColour
                            ? "white"
                            : parseInt(text.isActive) === 1
                            ? "text-emerald-600"
                            : "text-rose-600",
                        }}
                      >
                        <RxDotFilled
                          className={`${
                            text.statusColour
                              ? "text-white"
                              : parseInt(text.isActive) === 1
                              ? "text-emerald-600"
                              : "text-rose-600"
                          } text-base 2xl:text-lg`}
                        />
                        {parseInt(text.isActive) === 1 ? "Active" : "Inactive"}
                      </div>
                    </div>
                  ) : each.customClass === true ? (
                    <div
                      className={`${
                        each.colorChangeValue?.find(
                          (item) =>
                            item.value?.toLowerCase() ===
                            text[each.value]?.toLowerCase()
                        )?.className
                      } ${
                        each.className
                      } flex gap-1      items-center rounded-full px-2 py-0.5 w-fit font-medium text-[10px] 2xl:text-sm  flex-nowrap `}
                    >
                      {text[each.value] && (
                        <GoDotFill
                          className={`${
                            each.colorChangeValue?.find(
                              (item) =>
                                item.value?.toLowerCase() ===
                                text[each.value]?.toLowerCase()
                            )?.className
                          } `}
                        />
                      )}
                      {text[each.value]}
                    </div>
                  ) : each.value === "status" || each.status === true ? (
                    text[each.mainStatus] ? (
                      <div
                        className={`rounded-full pr-2 py-[2px] w-fit font-medium text-[10px] 2xl:text-sm vhcenter flex-nowrap`}
                        onClick={() => {
                          !viewOutside &&
                            handleRowClick(text, header[0]?.[tabValue || path]);
                        }}
                        style={{
                          backgroundColor:
                            text[each.mainStatus] === "Pending"
                              ? `${text[each.colour]}30`
                              : `${text[each.mainStatusColor]}30`,
                          color:
                            text[each.mainStatus] === "Pending"
                              ? text[each.colour]
                              : text[each.mainStatusColor],
                        }}
                      >
                        <RxDotFilled
                          className={`${
                            text[each.mainStatus] === "Pending"
                              ? text[each.colour]
                              : text[each.mainStatusColor]
                          } text-base 2xl:text-lg`}
                        />
                        {text[each.mainStatus] === "Pending"
                          ? text[each.value]
                          : text[each.mainStatus]}
                      </div>
                    ) : (
                      <div
                        className={`rounded-full pr-2 py-[2px] w-fit font-medium text-[10px] 2xl:text-sm vhcenter flex-nowrap`}
                        onClick={() => {
                          !viewOutside &&
                            handleRowClick(text, header[0]?.[tabValue || path]);
                        }}
                        style={{
                          backgroundColor: `${text[each.colour]}30`,
                          color: text[each.colour],
                        }}
                      >
                        {text[each.value] && (
                          <RxDotFilled
                            className={`${
                              text[each.colour]
                            } text-base 2xl:text-lg`}
                          />
                        )}
                        {text[each.value]}
                      </div>
                    )
                  ) : each.block ? (
                    <div
                      onClick={() => {
                        !viewOutside &&
                          handleRowClick(text, header[0]?.[tabValue || path]);
                      }}
                    >
                      <p className="text-xs font-medium text-black 2xl:text-sm dark:text-white">
                        {text[each.value]}
                      </p>
                      <p className="!font-normal para">{text[each.value]}</p>
                    </div>
                  ) : each.actionToggle ? (
                    parseInt(text[each.key]) === parseInt(each.valueData) ? (
                      <Tooltip
                        title={parseInt(text.isActive) ? "Active" : "Inactive"}
                      >
                        <Switch
                          checked={parseInt(text.isActive)}
                          onChange={(checked) => {
                            setIsModalshow(false);
                            if (!actionstatusID) {
                              handleToggleList(text?.[actionID], checked);

                              // buttonClick(each.companyId);
                              // activeOrNot(checked);
                              // console.log(parseInt(text.isActive), "checked");
                              // console.log(text?.[actionID]);
                              updateCompany(text?.[actionID], checked, text);
                            } else {
                              handleToggleList(
                                text?.[actionstatusID],
                                checked,
                                text
                              );
                              updateCompany(
                                text?.[actionstatusID],
                                checked,
                                text
                              );
                            }
                          }}
                          className=" bg-[#c2c0c0aa]"
                          size={isSmallScreen ? "small" : "default"}
                        />
                      </Tooltip>
                    ) : (
                      !each.key && (
                        <Tooltip
                          title={
                            parseInt(text.isActive) ? "Active" : "Inactive"
                          }
                        >
                          <Switch
                            checked={parseInt(text.isActive)}
                            onChange={(checked) => {
                              setIsModalshow(false);
                              if (!actionstatusID) {
                                handleToggleList(text?.[actionID], checked);

                                // buttonClick(each.companyId);
                                // activeOrNot(checked);
                                // console.log(checked);
                                // console.log(text?.[actionID]);
                                updateCompany(text?.[actionID], checked);
                              } else {
                                // handleToggleList(
                                //   text?.[actionstatusID],
                                //   checked
                                // );
                                updateCompany(text?.[actionstatusID], checked);
                              }
                            }}
                            className=" bg-[#c2c0c0aa]"
                            size={isSmallScreen ? "small" : "default"}
                          />
                        </Tooltip>
                      )
                    )
                  ) : each.action ? (
                    <div className="relative flex items-center justify-start gap-4 ">
                      {each.hideIcon !== "edit" && (
                        <Tooltip title="Edit" color={primaryColor}>
                          <button
                            className={`w-8 h-8 2xl:w-10 2xl:h-10 rounded-full vhcenter hover:bg-primaryalpha/20 dark:hover:bg-primaryalpha/30 text-accent transition-all duration-300`}
                            onClick={() => {
                              const actionText = text[actionID];
                              localStorage.setItem(
                                "actionidforupdate",
                                actionText
                              );
                              buttonClick(text[actionID], "edit"); //"8"
                              clickDrawer(true, text);

                              // console.log(actionID);
                              // console.log(text, each, "ddddddddsfsd");
                            }}
                          >
                            <FaPencil className="text-xs 2xl:text-sm" />
                          </button>
                        </Tooltip>
                      )}
                      {each.hideIcon !== "delete" && !text.name?.length > 0 && (
                        <Popconfirm
                          placement="top"
                          title={"Confirm To Delete"}
                          description={"Are you sure to delete this row?"}
                          okText="Confirm"
                          cancelText="No"
                          onConfirm={() => {
                            // console.log(actionID,"hh");
                            deleteRecord(text[actionID]);
                          }}
                          // className="activeBtn"
                          style={{}}
                        >
                          <Tooltip
                            title="Delete"
                            placement="bottom"
                            color={primaryColor}
                          >
                            <button
                              className={`w-8 h-8 2xl:w-10 2xl:h-10 rounded-full vhcenter hover:bg-primaryalpha/20 dark:hover:bg-primaryalpha/30 text-accent transition-all duration-300`}
                              // onClick={() => {
                              //   // deleteRecord(text[actionID]);
                              //   // clickDrawer(true);
                              //   // console.log(text[actionID]);
                              // }}
                            >
                              <RiDeleteBin5Line className="text-xs 2xl:text-sm" />
                            </button>
                          </Tooltip>
                        </Popconfirm>
                      )}
                    </div>
                  ) : each.customaction ? (
                    <div className="relative flex items-center justify-start gap-4 ">
                      {each.hideIcon !== "edit" && (
                        <Tooltip title="Edit" color={primaryColor}>
                          <button
                            className={`w-8 h-8 2xl:w-10 2xl:h-10 rounded-full vhcenter hover:bg-primaryalpha/20 dark:hover:bg-primaryalpha/30 text-accent transition-all duration-300`}
                            onClick={() => {
                              buttonClick(text[actionID], "edit"); //"8"
                              clickDrawer(true, text);

                              // console.log(actionID);
                              // console.log(text, "ddddddddsfsd");
                            }}
                          >
                            <FaPencil className="text-xs 2xl:text-sm" />
                          </button>
                        </Tooltip>
                      )}
                      {each.hideIcon !== "delete" &&
                        showDeleteIcon &&
                        parseInt(text.isDelete) === 1 && (
                          <Popconfirm
                            placement="top"
                            title={"Confirm To Delete"}
                            description={"Are you sure to delete this row?"}
                            okText="Confirm"
                            cancelText="No"
                            onConfirm={() => {
                              // console.log("hh");
                              deleteRecord(text[actionID]);
                            }}
                            // className="activeBtn"
                            style={{}}
                          >
                            <Tooltip
                              title="Delete"
                              placement="bottom"
                              color={primaryColor}
                            >
                              <button
                                className={`w-8 h-8 2xl:w-10 2xl:h-10 rounded-full vhcenter hover:bg-primaryalpha/20 dark:hover:bg-primaryalpha/30 text-accent transition-all duration-300`}
                                // onClick={() => {
                                //   // deleteRecord(text[actionID]);
                                //   // clickDrawer(true);
                                //   // console.log(text[actionID]);
                                // }}
                              >
                                <RiDeleteBin5Line className="text-xs 2xl:text-sm" />
                              </button>
                            </Tooltip>
                          </Popconfirm>
                        )}
                    </div>
                  ) : each.Regularize ? (
                    <div className="flex items-center gap-2">
                      {parseInt(text[each.value]) === 1 || each.value === 1 ? (
                        <ButtonClick
                          buttonName={each.buttonName}
                          handleSubmit={() => {
                            clickDrawer(
                              true,
                              text[actionID],
                              text,
                              each.buttonName
                            );
                          }}
                        />
                      ) : null}
                      {each.multiButton?.length > 0 &&
                        each.multiButton?.map(
                          (btnName) =>
                            text[Object.keys(each.multiButtonValue)[0]] ===
                              Object.values(each.multiButtonValue)[0] && (
                              <ButtonClick
                                buttonName={btnName}
                                handleSubmit={() => {
                                  clickDrawer(
                                    true,
                                    text[actionID],
                                    text,
                                    btnName
                                  );
                                }}
                              />
                            )
                        )}
                    </div>
                  ) : each.Download ? (
                    <div className="flex items-center gap-2">
                      {text[each.file] != null &&
                      text[each.key] != "Pending" ? (
                        <ButtonClick
                          buttonName={each.buttonName}
                          handleSubmit={() => {
                            handleFileDownload(text[each.file]);
                            // console.log(text[each.file], "fileUrl");
                          }}
                        />
                      ) : null}
                    </div>
                  ) : each.assetrecovery ? (
                    // <div className="flex items-center gap-2">

                    //     <ButtonClick
                    //       buttonName={each.buttonName}
                    //       handleSubmit={() => {
                    //         clickDrawer(
                    //           true,
                    //           text[actionID],
                    //           text,
                    //           each.buttonName
                    //         );
                    //       }}
                    //     />

                    //   {/* {each.multiButton?.length > 0 &&
                    //     each.multiButton?.map(
                    //       (btnName) =>
                    //         text[Object.keys(each.multiButtonValue)[0]] ===
                    //           Object.values(each.multiButtonValue)[0] && (
                    //           <ButtonClick
                    //             buttonName={btnName}
                    //             handleSubmit={() => {
                    //               clickDrawer(true, text[actionID], text, btnName);
                    //             }}
                    //           />
                    //         )
                    //     )} */}
                    // </div>
                    <div className="flex items-center gap-2">
                      {parseInt(text[each.value]) !== 0 && (
                        <ButtonClick
                          buttonName={
                            parseInt(text[each.assetRecoveredCount]) > 0
                              ? "Resume Recovery"
                              : "Start Recovery"
                          }
                          handleSubmit={() => {
                            // console.log("Text:", text);
                            // console.log("Text:", text.offboardingId);
                            clickDrawer(
                              true,
                              text[actionID],
                              text,
                              each.buttonName
                            );
                          }}
                        />
                      )}
                    </div>
                  ) : each?.dotsVertical ? (
                    parseInt(text[each.key]) !== parseInt(each.valueData) ? (
                      <div className="flex justify-center">
                        <Dropdown
                          placement="bottomRight"
                          trigger={["hover"]}
                          overlay={
                            <Menu className="sm:w-24 2xl:w-32">
                              {each?.dotsVerticalContent
                                ?.filter((item) => {
                                  if (item.value === "delete" && item.key) {
                                    // Check if noOfEmployees is zero or if employeeName is undefined, null, or empty
                                    {
                                      // console.log(
                                      //   typeof text.noOfEmployees,
                                      //   "text"
                                      // );
                                    }
                                    return (
                                      text?.noOfEmployees === 0 ||
                                      text?.employeeName?.length === 0
                                    );
                                  }
                                  // Handle other conditions for different actions
                                  if (parseInt(text.isActive) === 3) {
                                    return item.value === "update";
                                  }
                                  if (
                                    item.value === "activate" &&
                                    parseInt(text.isActive) === 1
                                  ) {
                                    return false;
                                  }
                                  if (
                                    item.value === "Inactivate" &&
                                    parseInt(text.isActive) === 0
                                  ) {
                                    return false;
                                  }
                                  if (
                                    item.value === "assign" &&
                                    text[item.customField]?.length === 0
                                  ) {
                                    return false;
                                  } else if (
                                    item.value === "updateLeave" &&
                                    text[item.customField]?.length > 0
                                  ) {
                                    return false;
                                  }
                                  return true;
                                })
                                .map((item, index) =>
                                  !item.confirm ? (
                                    <Menu.Item
                                      key={index}
                                      onClick={() => {
                                        if (
                                          item.value === "activate" ||
                                          item.value === "Inactivate"
                                        ) {
                                          const isActive =
                                            item.value === "activate";
                                          updateCompany(
                                            text[actionID],
                                            isActive
                                          );
                                        } else {
                                          buttonClick(text[actionID], "edit");
                                          clickDrawer(
                                            true,
                                            item.value,
                                            text[actionID],
                                            text
                                          );
                                        }
                                        setPopoverOpen(false);
                                      }}
                                    >
                                      {item.title}
                                    </Menu.Item>
                                  ) : (
                                    <Popconfirm
                                      key={item.value}
                                      placement="top"
                                      title={
                                        item?.value === "delete"
                                          ? "Confirm To Delete"
                                          : item?.value !== "Inactivate"
                                          ? "Confirm To Activate"
                                          : "Confirm To Inactivate"
                                      }
                                      onConfirm={() => {
                                        if (item?.value === "delete") {
                                          deleteRecord(text[actionID], text);
                                          setPopoverOpen(false);
                                        } else {
                                          const isActive =
                                            item.value === "activate";
                                          updateCompany(
                                            text[actionID],
                                            isActive
                                          );
                                        }
                                      }}
                                    >
                                      {
                                        // parseInt(text[item.key]) !==
                                        //     parseInt(item.valueData) &&
                                        parseInt(text[item.keyData]) !==
                                          parseInt(item.valueData) && (
                                          <Menu.Item key={index}>
                                            {item.title}
                                          </Menu.Item>
                                        )
                                      }
                                    </Popconfirm>
                                  )
                                )}
                            </Menu>
                          }
                        >
                          <BsThreeDotsVertical className="relative opacity-50 cursor-pointer" />
                        </Dropdown>
                      </div>
                    ) : null
                  ) : each?.showvertical ? (
                    <Dropdown
                      placement="bottomRight"
                      trigger={["hover"]}
                      overlay={
                        <Menu>
                          {each?.dotsVerticalContent.map((item, index) =>
                            !item.confirm ? (
                              <Menu.Item
                                key={index}
                                onClick={() => {
                                  buttonClick(text[actionID], "edit");
                                  clickDrawer(
                                    true,
                                    item.value,
                                    text[actionID],
                                    text
                                  );
                                  setPopoverOpen(false);
                                }}
                              >
                                {item.title}
                              </Menu.Item>
                            ) : (
                              <Popconfirm
                                key={item.value}
                                placement="top"
                                title={"Confirm To Delete"}
                                onConfirm={() => {
                                  deleteRecord(text[actionID]);
                                  setPopoverOpen(false);
                                }}
                              >
                                <Menu.Item key={index}>{item.title}</Menu.Item>
                              </Popconfirm>
                            )
                          )}
                        </Menu>
                      }
                    >
                      <div>
                        {" "}
                        {/* Wrap everything in a single div */}
                        {/* {console.log(text,"adadadada")} */}
                        {(text[each.key] === "Pending" &&
                          text.track?.step1?.every(
                            (item) => item.status === "Pending"
                          )) ||
                        (text.isByAdmin === "0" && text.track.length === 0) ||
                        (text.isByAdmin === 0 && text.track.length === 0) ? (
                          <BsThreeDotsVertical className="relative opacity-50 cursor-pointer" />
                        ) : (
                          <span></span>
                        )}
                      </div>
                    </Dropdown>
                  ) : each?.ThreeDots ? (
                    <Dropdown
                      placement="bottomRight"
                      trigger={["hover"]}
                      overlay={
                        <Menu>
                          {each?.dotsVerticalContent.map((item, index) =>
                            !item.confirm ? (
                              <Menu.Item
                                key={index}
                                onClick={() => {
                                  clickDrawer(
                                    true,
                                    item.value,
                                    text[actionID],
                                    text
                                  );

                                  setPopoverOpen(false);
                                }}
                              >
                                {item.title}
                              </Menu.Item>
                            ) : (
                              <Popconfirm
                                key={item.value}
                                placement="top"
                                title={"Confirm To Delete"}
                                onConfirm={() => {
                                  deleteRecord(record[actionID]);
                                  setPopoverOpen(false);
                                }}
                              >
                                <Menu.Item key={index}>{item.title}</Menu.Item>
                              </Popconfirm>
                            )
                          )}
                        </Menu>
                      }
                    >
                      {text[each.key] === "Pending" &&
                      text[each.status] === "Pending" ? (
                        <BsThreeDotsVertical className="relative opacity-50 cursor-pointer" />
                      ) : (
                        <span />
                      )}
                    </Dropdown>
                  ) : each?.Approve ? (
                    text[each.key] === "Pending" &&
                    text[each.mainStatus] === "Pending" ? (
                      <BsThreeDotsVertical
                        className="relative opacity-50 cursor-pointer"
                        onClick={() => {
                          buttonClick(text[actionID], text, "edit");
                          clickDrawer(true, "view", text[actionID], text);
                          setPopoverOpen(false);
                        }}
                      />
                    ) : null
                  ) : each?.displayAction ? (
                    <Dropdown
                      placement="bottomRight"
                      trigger={["hover"]}
                      overlay={
                        <Menu>
                          {each?.dotsVerticalContent.map((item, index) =>
                            !item.confirm ? (
                              text?.offBoardingStatusId ? (
                                item?.offBoardingStatusId !==
                                  text?.offBoardingStatusId && (
                                  <Menu.Item key={index}>
                                    <p
                                      onClick={() => {
                                        buttonClick(
                                          text[actionID],
                                          "edit",
                                          item.value,
                                          text
                                        );
                                        clickDrawer(
                                          true,
                                          item.value,
                                          text[actionID],
                                          text
                                        );
                                        setPopoverOpen(false);
                                      }}
                                    >
                                      {item.title}
                                    </p>
                                  </Menu.Item>
                                )
                              ) : (
                                ""
                              )
                            ) : (
                              <Popconfirm
                                key={item.value}
                                placement="top"
                                title={"Confirm To Delete"}
                                onConfirm={() => {
                                  deleteRecord(record[actionID]);
                                  setPopoverOpen(false);
                                }}
                              >
                                <Menu.Item key={index}>{item.title}</Menu.Item>
                              </Popconfirm>
                            )
                          )}
                        </Menu>
                      }
                    >
                      <BsThreeDotsVertical className="relative opacity-50 cursor-pointer" />
                    </Dropdown>
                  ) : each?.dotVerticalDropdown ? (
                    parseInt(text[each.key]) !== parseInt(each.valueData) &&
                    text.salaryCalculation !== "live" ? (
                      <Dropdown
                        placement="bottomRight"
                        trigger={["hover"]}
                        overlay={
                          <Menu>
                            <div>
                              {each?.dotVerticalDropdownContent
                                ?.filter((item) => {
                                  if (item.value) {
                                    //   return parseInt(text.isSalaryHold) === 1 ? item.value === "salaryrelease" : parseInt(text.isSalaryHold) === 0 && item.value === "salaryhold" && item.value;
                                    // }
                                    if (
                                      item.value === "salaryrelease" &&
                                      parseInt(text.isSalaryHold) === 0
                                    ) {
                                      return false;
                                    }
                                    if (
                                      item.value === "salaryhold" &&
                                      parseInt(text.isSalaryHold) === 1
                                    ) {
                                      return false;
                                    }
                                    if (
                                      item.value === "downloadpayslip" ||
                                      item.value === "view"
                                    ) {
                                      return true;
                                    }
                                    return true;
                                  }
                                })
                                .map((item, index) => (
                                  <Menu.Item key={index}>
                                    <p
                                      onClick={() => {
                                        clickDrawer(
                                          true,
                                          item.value,
                                          text[actionID],
                                          text
                                        );
                                        // if (item.value === "update") {
                                        //   buttonClick(text[actionID], "edit");
                                        //   clickDrawer(
                                        //     true,
                                        //     item.value,
                                        //     text[actionID],
                                        //     text
                                        //   );
                                        // } else if (
                                        //   item.value === "activate" ||
                                        //   item.value === "Inactivate"
                                        // ) {
                                        //   const isActive =
                                        //     item.value === "activate";
                                        //   updateCompany(
                                        //     text[actionID],
                                        //     isActive
                                        //   );
                                        // }
                                        // setPopoverOpen(false);
                                      }}
                                    >
                                      {item.label}
                                    </p>
                                  </Menu.Item>
                                ))}
                            </div>
                          </Menu>
                        }
                      >
                        <BsThreeDotsVertical className="relative opacity-50 cursor-pointer" />
                      </Dropdown>
                    ) : // <Popover
                    //   content={
                    //     <div>
                    //       {each?.dotVerticalDropdownContent?.map((item) => (
                    //         <p
                    //           key={item.key}
                    //           onClick={() => {
                    //             if (item.value === "view") {
                    //               clickDrawer(text[actionID], text, true);
                    //               console.log(
                    //                 text[actionID],
                    //                 text,
                    //                 "view action"
                    //               );
                    //             } else if (item.value === "downloadpayslip") {
                    //               // Handle download payslip action
                    //               handleDownloadClick(text);
                    //               console.log(text, "download action");
                    //             } else if (item.value === "salaryhold") {
                    //               // Handle salary hold action
                    //               handleSalaryHoldClick(text);
                    //               console.log(
                    //                 item.value,
                    //                 "selected options  salaryhold"
                    //               );
                    //             } else if (item.value === "salaryrelease") {
                    //               // Handle salary hold action
                    //               handleSalaryReleaseClick(text);
                    //               console.log(
                    //                 item.value,
                    //                 "selected options  salaryrelease"
                    //               );
                    //             }
                    //             console.log(item.value, "selected options");
                    //             setPopoverOpen(false);
                    //           }}
                    //           className="p-0.5 cursor-pointer text-sm 2xl:text-md hover:bg-slate-100 dark:hover:bg-black rounded-md"
                    //         >
                    //           {item.value === "salaryhold"
                    //             ? text.actionLabel
                    //             : item.title || item.label}
                    //         </p>
                    //       ))}
                    //     </div>
                    //   }
                    // >
                    //   <BsThreeDotsVertical className="relative opacity-50 cursor-pointer" />
                    // </Popover>
                    null
                  ) : each.actionButton ? (
                    <div className="flex items-center gap-4">
                      <Button className="px-3 py-1 text-xs">
                        {each.buttonName}
                      </Button>
                      <Dropdown
                        placement="bottomRight"
                        overlay={
                          <Menu>
                            {each.dotsVerticalContent.map((item, index) => (
                              <Menu.Item key={index}>
                                <div className="flex items-center gap-2">
                                  <span
                                    className={
                                      item.value === "reject"
                                        ? "bg-red-700 text-white rounded-lg"
                                        : item.value === "delete"
                                        ? "text-red-700"
                                        : ""
                                    }
                                  >
                                    {item.icon}
                                  </span>
                                  <span className="hover:text-primary">
                                    {item.title}
                                  </span>
                                </div>
                              </Menu.Item>
                            ))}
                          </Menu>
                        }
                      >
                        <BsThreeDotsVertical className="relative opacity-50 cursor-pointer" />
                      </Dropdown>
                    </div>
                  ) : each.downloadIcon ? (
                    <div className="text-primary" onClick={handleDownloadClick}>
                      {each.icon}
                    </div>
                  ) : each.multiImage ? (
                    <Dropdown
                      className=""
                      overlay={
                        <Menu className="overflow-auto max-h-56">
                          {text.name?.map((data, i) => (
                            <Menu.Item key={i}>
                              {data && (
                                <div
                                  // to={
                                  //   each.view &&
                                  //   `/employeeProfile/${text.employeeId[i]}`
                                  // }
                                  className="flex items-center justify-start gap-2"
                                >
                                  <div>
                                    {text[each.value][i] ? (
                                      <div className="overflow-hidden bg-white border-2 border-white rounded-full size-8">
                                        <img
                                          key={i}
                                          className="object-cover object-center w-full h-full"
                                          src={text[each.value][i]}
                                          alt=""
                                        />
                                      </div>
                                    ) : (
                                      <p className="flex items-center justify-center font-semibold border-2 border-white rounded-full size-8 bg-primaryLight text-primary">
                                        {data?.charAt(0).toUpperCase()}
                                      </p>
                                    )}
                                  </div>
                                  <p className="font-semibold text-md text-grey">
                                    {data?.charAt(0).toUpperCase() +
                                      data?.slice(1)}
                                  </p>
                                  {/* Status Icon */}
                                  {/* {console.log("text", text)} */}
                                  {text.statusdot && (
                                    <div className="ml-2">
                                      {text.statusdot[i] === "Approved" && (
                                        <span className="relative inline-block w-2 h-2 bg-green-500 rounded-full">
                                          <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"></span>
                                        </span>
                                      )}
                                      {text.statusdot[i] === "Rejected" && (
                                        <span className="relative inline-block w-2 h-2 bg-red-500 rounded-full">
                                          <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"></span>
                                        </span>
                                      )}
                                      {text.statusdot[i] === "Pending" && (
                                        <span className="relative inline-block w-2 h-2 bg-yellow-500 rounded-full">
                                          <span className="absolute inline-flex w-full h-full bg-yellow-400 rounded-full opacity-75 animate-ping"></span>
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              )}
                            </Menu.Item>
                          ))}
                          <div className="flex items-center gap-1 pl-4">
                            {text.adminData && (
                              <>
                                {text.adminData.profilePicture ? (
                                  <div className="overflow-hidden bg-white border-2 border-white rounded-full size-8">
                                    <img
                                      key={i}
                                      className="object-cover object-center w-full h-full"
                                      src={text.adminData.profilePicture}
                                      alt=""
                                    />
                                  </div>
                                ) : (
                                  <p className="flex items-center justify-center font-semibold border-2 border-white rounded-full size-8 bg-primaryLight text-primary">
                                    {text.adminData.fullName
                                      .charAt(0)
                                      .toUpperCase()}
                                  </p>
                                )}

                                <p className="font-semibold text-md text-grey">
                                  {text.adminData.fullName}
                                </p>
                                <div className="ml-2">
                                  {text.mainStatus === "Approved" && (
                                    <span className="relative inline-block w-2 h-2 bg-green-500 rounded-full">
                                      <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"></span>
                                    </span>
                                  )}
                                  {text.mainStatus === "Rejected" && (
                                    <span className="relative inline-block w-2 h-2 bg-red-500 rounded-full">
                                      <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"></span>
                                    </span>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        </Menu>
                      }
                      // placement={"top"}
                      trigger={["hover"]}
                    >
                      <div
                        className="flex -space-x-3 rtl:space-x-reverse"
                        onClick={() => {
                          // console.log(text[each.value], text.employeeName);
                        }}
                      >
                        {text[each.value]?.map((data, index) =>
                          text.name[index] && index < 3 ? (
                            data ? (
                              <div className="overflow-hidden bg-white border-2 border-white rounded-full size-8">
                                <img
                                  key={index}
                                  className="object-cover object-center w-full h-full"
                                  src={data}
                                  alt=""
                                />
                              </div>
                            ) : (
                              <div className="">
                                <p className="flex items-center justify-center font-semibold border-2 border-white rounded-full size-8 bg-primaryLight text-primary">
                                  {
                                    text.name?.map((each) =>
                                      each?.charAt(0).toUpperCase()
                                    )[index]
                                  }
                                </p>
                              </div>
                            )
                          ) : (
                            index === 3 && (
                              <div className="flex items-center justify-center p-1 overflow-hidden text-center bg-red-100 border-2 border-white rounded-full size-8 ">
                                <HiPlusSm className="text-sm text-red-600 " />
                                <p className=" text-[10px] font-semibold text-red-600">
                                  {text[each?.value]?.length - 3}
                                  {/* {console.log(text[each?.value])} */}
                                </p>
                              </div>
                            )
                          )
                        )}
                      </div>
                    </Dropdown>
                  ) : each.imageOnly ? (
                    <div className="flex items-center -space-x-2">
                      {text?.approvers?.slice(0, 4).map((item, index) => (
                        <Tooltip
                          title={each.imageTooltip && item.name}
                          color={primaryColor}
                          placement="top"
                          key={index}
                        >
                          {item?.imgurl ? (
                            <div className="relative z-30 overflow-hidden border-2 border-white rounded-full size-6 2xl:size-8">
                              <img
                                className="object-cover object-center w-full h-full"
                                src={item?.imgurl}
                                alt="Profileimage"
                              />
                            </div>
                          ) : (
                            <div className="relative z-30 items-center justify-center inline overflow-hidden bg-white border-2 border-white rounded-full size-6 2xl:size-8">
                              <div className="object-cover object-center w-full h-full bg-primaryalpha/20 text-primary vhcenter">
                                {item?.name?.charAt(0).toUpperCase()}
                              </div>
                            </div>
                          )}
                        </Tooltip>
                      ))}
                      {text?.approvers?.length > 4 && (
                        <div className="relative z-30 inline-flex items-center justify-center size-6 2xl:size-8 text-red-600 bg-red-100 border-2 border-white rounded-full text-[10px] 2xl:text-[12px]">
                          +{text?.approvers?.length - 4}
                        </div>
                      )}
                    </div>
                  ) : each.flexRow ? (
                    <div className="flex items-center gap-2">
                      {text[each.value]?.map((item, i) => (
                        <p
                          key={i}
                          className={`text-[#667085] px-2 py-0.5 text-[10px] 2xl:text-xs rounded-xl w-fit dark:text-white font-medium`}
                          style={{
                            backgroundColor: item[each.flexValue]
                              ? `${colorNames[i]}15`
                              : "#fff",
                            color: colorNames[i],
                          }}
                        >
                          {item[each.flexValue]}
                        </p>
                      ))}
                    </div>
                  ) : each.lowerCase ? (
                    <div
                      className={` ${
                        each.bold === true
                          ? "font-semibold text-black"
                          : "text-[#667085]"
                      } text-xs 2xl:text-sm dark:text-white font-medium`}
                      onClick={() => {
                        !viewOutside &&
                          handleRowClick(text, header[0]?.[tabValue || path]);
                      }}
                      style={{ width: each.width }}
                    >
                      {record.toLowerCase()}
                    </div>
                  ) : //   : each.verticalstepper ? (
                  //     <div className="h-24 overflow-x-auto">
                  //       {console.log(text[each.value], "verticalstepper")}
                  //       {(() => {
                  //         const stepsData = text[each.value] || {};
                  //         const steps = Object.keys(stepsData).map(
                  //           (key, index) => ({
                  //             title: `Step ${index + 1}`,
                  //             description: stepsData[key],
                  //           })

                  //         );

                  //       return (
                  //         <Steps
                  //           className=""
                  //           style={{ marginTop: 8 }}
                  //           current={current}
                  //           onChange={handleStepChange}
                  //           progressDot={(dot, { status }) => (
                  //             <span>
                  //               {status === "Approved" ? <RxDotFilled /> : dot}
                  //             </span>
                  //           )}
                  //           type="inline"
                  //           items={steps}
                  //         />
                  //       );
                  //     })()}
                  //   </div>
                  // )
                  each.miniStepper ? (
                    <MiniStepper
                      steps={Object.keys(text[each.value]).map((key) =>
                        key.replace(/step(\d+)/, "Step $1")
                      )}
                      currentStep={
                        Object.keys(text[each.value])
                          .map((key, index) =>
                            text[each.value][key] === "Approved"
                              ? index + 1
                              : null
                          )
                          .filter((index) => index !== null)
                          .pop() || 0
                      }
                      errorSteps={Object.keys(text[each.value])
                        .map((key, index) =>
                          text[each.value][key] === "Rejected"
                            ? index + 1
                            : null
                        )
                        .filter((index) => index !== null)}
                      // width="w-32"
                      activeColor="bg-primaryalpha"
                      inactiveColor="bg-gray-200"
                      errorColor="bg-red-500"
                      textActiveColor="text-white"
                      textInactiveColor="text-gray-600"
                      textErrorColor="text-white"
                    />
                  ) : (
                    // </Popover>
                    <div
                      className={` ${
                        each.bold === true
                          ? "font-semibold text-black"
                          : "text-[#667085]"
                      } text-xs 2xl:text-sm dark:text-white font-medium`}
                      onClick={() => {
                        !viewOutside &&
                          handleRowClick(text, header[0]?.[tabValue || path]);
                      }}
                      style={{ width: each.width }}
                    >
                      <p>
                        {typeof record === "string"
                          ? record.charAt(0).toUpperCase() +
                              record.slice(1).split("_").join(" ") || "--"
                          : Array.isArray(record)
                          ? record.map((approver, index) => {
                              // Construct the display name for each approver
                              const displayName =
                                `${approver.firstName} ${approver.lastName}`.trim();
                              return (
                                <span key={index}>
                                  {displayName}
                                  {index < record.length - 1 ? ", " : ""}
                                </span>
                              );
                            })
                          : !record
                          ? "--"
                          : record}
                      </p>
                    </div>
                  )}
                </div>

                {}
              </>
            ),
        // responsive: ["sm"],
        fixed: each.fixed,
        width: each.width,
      }))
    );
  }, [path || keys]);

  useEffect(() => {
    // setListData([...searchFilter]);
    setListData(
      searchFilter.map((each) => ({
        key: each.status !== "Approved" && each[actionID],
        ...each,
      }))
    );
    // console.log(searchFilter);
    // setListData(listData?.filter((each)=>{
    // }))
    // console.log(Object.values(Object.keys({ ...listData })));
    // setListData(
    // listData?.filter((each) => {
    //   if (Object.values(Object.values(each)).includes(searchFilter)) {
    //     return each;
    //   }
    //   Object.values(Object.values(each)).filter((filterdata) => {
    //     if (filterdata !== null && filterdata !== " ") return filterdata;
    //     // console.log(filterdata.includes("d"));
    //   });
    // });
    // );
  }, [searchFilter]);

  useEffect(() => {
    setVisibleColumns(tableData?.map((col) => col.dataIndex));
  }, [tableData]);

  // const start = () => {
  //   setLoading(true);
  //   // ajax request after empty completing
  //   setTimeout(() => {
  //     setSelectedRowKeys([]);
  //     setLoading(false);
  //   }, 1000);
  // };

  const handleColumnVisibilityChange = (column) => (e) => {
    e.stopPropagation();
    setVisibleColumns((prevColumns) =>
      prevColumns.includes(column.dataIndex)
        ? prevColumns.filter((col) => col !== column.dataIndex)
        : [...prevColumns, column.dataIndex]
    );
    // console.log(column, "column");
    setTableData((prevData) =>
      prevData?.map((each) => ({
        ...each,
        hidden:
          each.dataIndex === column.dataIndex ? !each.hidden : each.hidden,
      }))
    );
  };

  const shouldDisableCheckbox = (record) => {
    let value;
    if (record.mainStatus) {
      if (record.mainStatus === "Pending") {
        value = record.requestStatusName !== "Pending";
      } else {
        value = record.mainStatus !== "Pending";
      }
    } else {
      value =
        record.isSettled === 1 ||
        record.isSalaryHold === 1 ||
        record.isPaymentMethod === 0;
    }
    return value;
  };

  const getTooltipMessage = (record) => {
    if (record.isPaymentMethod === 0) {
      return "Employee Payment Method is not assigned. Please assign a Payment Method to process the transaction.";
    } else if (record.isSettled === 1) {
      return "The employee transaction has already been settled.";
    } else if (record.isSalaryHold === 1) {
      return "The employee salary is on hold. Please release it to submit the transaction.";
    }
    return "";
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (e, i) => {
      // console.log(i, 'eeddd')
      selectedRow(e.length > 0 ? true : false, e, i);
      setSelectedRowKeys(e, i);
    },

    getCheckboxProps: (record) => ({
      disabled: shouldDisableCheckbox(record),
    }),
  };
  useEffect(() => {
    if (unChecked) {
      setSelectedRowKeys([]);
      referesh(false);
    }
  }, [unChecked]);

  const isRowDisabled = (record) => {
    // Check if either condition is true
    // console.log("Row is disabled", record);

    return record.isSettled === 1 || record.isSalaryHold === 1;
  };
  // useEffect(() => {
  //   console.log(rowSelection, "e");
  // }, [rowSelection]);

  const [checkStrictly, setCheckStrictly] = useState(false);

  // rowSelection objects indicates the need for row selection
  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     console.log(
  //       `selectedRowKeys: ${selectedRowKeys}`,
  //       "selectedRows: ",
  //       selectedRows
  //     );
  //   },
  //   // onSelect: (record, selected, selectedRows) => {
  //   //   // console.log(record, selected, selectedRows);
  //   // },
  //   // onSelectAll: (selected, selectedRows, changeRows) => {
  //   //   // console.log(selected, selectedRows, changeRows);
  //   // },
  // };

  // FILTER DROPDOWN SEARCH
  const handleColumnSearch = (searchValue) => {
    // Convert searchValue to lowercase for case-insensitive search
    const lowerSearchValue = searchValue.toLowerCase();

    // Filter columns based on whether their titles contain the searchValue
    const filteredColumns = tableData.filter((column) => {
      // console.log(column, "column");
      const titleText =
        typeof column.title === "string"
          ? column.title
          : column.title.props.children;

      return titleText.toLowerCase().includes(lowerSearchValue);
    });

    // Set the visible columns to the filtered columns
    setVisibleColumns(filteredColumns.map((col) => col.dataIndex));
  };

  const hasSelected = selectedRowKeys.length > 0;
  // console.log(modalData, "modalData");
  // Filter Dropdown Menus and Search Input
  // const columnMenu = (
  //   <Menu mode="vertical">
  //     <Menu.Item key="selectAll">
  //       <Checkbox
  //         checked={visibleColumns?.length === tableData?.length}
  //         onChange={() =>
  //           setVisibleColumns(
  //             visibleColumns?.length === tableData?.length
  //               ? []
  //               : tableData.map((col) => col.dataIndex)
  //           )
  //         }
  //       >
  //         Select All
  //       </Checkbox>
  //     </Menu.Item>
  //     {/* <Menu.Divider />
  //     <Menu.Item key="search">
  //       <Input
  //         placeholder="Search columns"
  //         onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
  //         onChange={(e) => handleColumnSearch(e.target.value)}
  //       />
  //     </Menu.Item>
  //     <Menu.Divider />
  //     {tableData?.map((column) => (
  //       <Menu.Item key={column.dataIndex}>
  //         <Checkbox
  //           value={column.title}
  //           checked={visibleColumns?.includes(column.dataIndex)}
  //           onChange={handleColumnVisibilityChange(column.dataIndex)}
  //         >
  //           {column.title}
  //         </Checkbox>
  //       </Menu.Item>
  //     ))} */}
  //   </Menu>
  // );
  const update = [
    { key: "edit", label: "Edit" },
    { key: "delete", label: "Delete" },
  ];
  const items = [
    // {
    //   key: 'selectAll',
    //   label: (
    //     <Checkbox
    //       checked={visibleColumns?.length === tableData?.length}
    //       onChange={() => {
    //         setVisibleColumns(
    //           visibleColumns?.length === tableData?.length
    //             ? []
    //             : tableData.map(col => col.dataIndex)
    //         )
    //       }}
    //     >
    //       Select All
    //     </Checkbox>
    //   )
    // },
    // {
    //   key: 'search',
    //   label: (
    //     <Input
    //       placeholder='Search columns'
    //       onClick={e => e.stopPropagation()} // Prevent dropdown from closing
    //       onChange={e => handleColumnSearch(e.target.value)}
    //     />
    //   )
    // },
    ...(tableData?.map(
      (column, i) =>
        column?.title?.props?.children && {
          key: i,
          label: (
            <Checkbox
              value={column.title}
              checked={column.hidden ? false : true}
              onChange={handleColumnVisibilityChange(column)}
            >
              {column?.title?.props?.children}
              {/* {console.log(column, "column")} */}
            </Checkbox>
          ),
        }
    ) || []),
  ];
  // const columnMenuItems = [
  //   {
  //     key: 'selectAll',
  //     label: (
  //       <Checkbox
  //         checked={visibleColumns?.length === tableData?.length}
  //         onChange={() => {
  //           setVisibleColumns(
  //             visibleColumns?.length === tableData?.length
  //               ? []
  //               : tableData.map(col => col.dataIndex)
  //           )
  //         }}
  //       >
  //         Select All
  //       </Checkbox>
  //     )
  //   },
  //   {
  //     key: 'search',
  //     label: (
  //       <Input
  //         placeholder='Search columns'
  //         onClick={e => e.stopPropagation()} // Prevent dropdown from closing
  //         onChange={e => handleColumnSearch(e.target.value)}
  //       />
  //     )
  //   },text-green-600
  //         onChange={handleColumnVisibilityChange(column.dataIndex)}
  //       >
  //         {column.title}
  //       </Checkbox>
  //     )
  //   })) || [])
  // ]

  // const columnMenu = <Menu mode="vertical" items={columnMenuItems} />;

  const onChangeGridlist = ({ target: { value } }) => {
    // console.log("radio1 checked", value);
    setGridList(value);
  };
  const splitTitle = tabTitle.split("_");
  const jsonResult = splitTitle
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const observerRef = useRef(null);

  const targetRef = useRef(null);

  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     if (entries[0]?.isIntersecting) {
  //       changePagination();
  //     }
  //   });

  //   observerRef.current = observer;
  //   observer?.observe(targetRef?.current);

  //   return () => observer.disconnect();
  // }, [dataPerPage]);

  useEffect(() => {
    changePagination();
  }, [dataPerPage]);

  // <div>Number of active elements: {{(product | filter:{active:true}).length}} </div> //number of all elements

  const activeEmp = data.filter((value) => value.employeeStatus !== "InActive");

  const inActiveEmp = data.filter(
    (value) => value.employeeStatus === "InActive"
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col justify-between gap-3 md:items-center md:flex-row">
        {!tab && !buttons ? (
          <div className="flex items-center justify-start gap-3">
            <p className="text-sm font-semibold 2xl:text-lg dark:text-white ">
              {t(
                `${(() => {
                  const text = tabTitle || path;
                  if (!text) return "";

                  // Capitalize the first letter of the entire text
                  const capitalizedText =
                    text.charAt(0).toUpperCase() + text.slice(1);

                  // Split text into words
                  const words = capitalizedText.split("_").join(" ").split(" ");

                  // Capitalize the first letter of the second word if it exists
                  if (words.length > 1) {
                    words[1] =
                      words[1].charAt(0).toUpperCase() + words[1].slice(1);
                  }

                  // Join words back into a single string
                  return words.join(" ");
                })()}`
              )}
              {moreData === false && disablePagination && data.length !== 0 && (
                <>
                  <span className="text-[12px] font-bold">
                    &nbsp; ({data?.length})
                  </span>
                  <span className="text-[12px] font-bold text-emerald-600">
                    &nbsp; ({activeEmp?.length})
                  </span>
                  {inActiveEmp?.length !== 0 && (
                    <span className="text-[12px] font-bold text-rose-600">
                      &nbsp; ({inActiveEmp?.length})
                    </span>
                  )}
                </>
              )}
            </p>
            {/* <p className="text-lg font-semibold dark:text-white">
              {jsonResult ||  path?.charAt(0).toUpperCase() + path.slice(1).split("_")}
            </p> */}
            {inputType ? (
              <div className="">
                <div className="flex items-center justify-start gap-2 ">
                  {inputType?.map((each) => each.type)}
                </div>
              </div>
            ) : (
              <div
                style={{ marginLeft: 8 }}
                className={` bg-primaryalpha/10 dark:bg-primaryalpha/30 text-primary text-[10px] 2xl:text-xs rounded-full px-3 py-1 vhcenter`}
              >
                {hasSelected
                  ? `${selectedRowKeys?.length} ${
                      (jsonResult ? jsonResult : path.split("_").join(" "))
                        .charAt(0)
                        .toUpperCase() +
                      (jsonResult
                        ? jsonResult
                        : path.split("_").join(" ")
                      ).slice(1)
                    } Selected`
                  : `All ${
                      (jsonResult ? jsonResult : path.split("_").join(" "))
                        .charAt(0)
                        .toUpperCase() +
                      (jsonResult
                        ? jsonResult
                        : path.split("_").join(" ")
                      ).slice(1)
                    }`}
                {/* {console.log(jsonResult)} */}
              </div>
            )}
          </div>
        ) : tab ? (
          <TabsNew
            tabs={tab}
            tabClick={(e) => {
              // console.log(e, "e");
              setTabClick(e);
              handleTabChange(e);
            }}
            gap={false}
          />
        ) : (
          buttons && (
            <div className="flex gap-2">
              {buttons?.map((button) => (
                <ButtonClick
                  icon={button.icon}
                  // className={`border-primary ${
                  //   button.active ? "bg-primary text-white" : "text-primary"
                  // } font-semibold `}
                  handleSubmit={() => {
                    handleTabChange(button.value);
                  }}
                  buttonName={button.title}
                  className={button.active && "border-primary text-primary"}
                />
              ))}
            </div>
          )
        )}
        <div className="flex items-center gap-3">
          {/* {console.log(data, "App")} */}
          {filterTools && (
            <StatusFilter
              statuses={statuses}
              activeStatus={activeStatus}
              onStatusChange={(e) => {
                FilterDataChange(e);
                setKeys(e);
                // console.log(e, "ffff");
              }}
            />
          )}

          <SearchBox
            // title="Search"
            data={data}
            placeholder={t("Search_placeholder")}
            value={searchValue}
            icon={<CiSearch className=" dark:text-white" />}
            className="mt-0 w-ful md:w-auto"
            error=""
            change={(value) => {
              setSearchValue(value);
            }}
            onSearch={(value) => {
              setSearchFilter(
                value?.map((each) => ({
                  key: each[actionID],
                  ...each,
                }))
              );
            }}
          />
          <Dropdown
            // menu={columnMenuItems.map((item, index) => ({
            //   ...item,
            //   key: index,
            // }))}
            menu={{ items }}
            placement="bottomRight"
            trigger={["click"]}
            // open={dropdownVisible}
            // onOpenChange={(visible) => {
            //   console.log(visible);
            //   setDropdownVisible(visible);
            // }}
          >
            <Button
              className="flex items-center justify-center h-full font-medium bg-white dark:bg-black dark:text-white flex-nowrap"
              onClick={(e) => {
                // console.log(e);
                // e.stopPropagation(); // Prevent dropdown from closing
                // setDropdownVisible(!dropdownVisible);
              }}
              size={isSmallScreen ? "default" : "large"}
            >
              <span className="mr-2">{t("Filters")}</span>
              <span className="ml-auto">
                <LuListFilter className="text-base 2xl:text-lg" />
              </span>
            </Button>
          </Dropdown>
          {TblBtnView && (
            <ButtonClick
              handleSubmit={TblBtnSubmit}
              buttonName={TblBtnName} // Set the button name
              className="your-custom-styles" // Add any additional class names for styling
              BtnType="Add" // Specify the button type (Add or Update)
            />
          )}
          {/* {headerTools && (
            <>
              <div>
               
                <Dropdown
                  // menu={columnMenuItems.map((item, index) => ({
                  //   ...item,
                  //   key: index,
                  // }))}
                  menu={{ items }}
                  placement="bottomRight"
                  // trigger={["click"]}
                  // open={dropdownVisible}
                  // onOpenChange={(visible) => {
                  //   console.log(visible);
                  //   setDropdownVisible(visible);
                  // }}
                >
                  <Button
                    className="flex items-center justify-center h-full font-medium bg-white dark:bg-black dark:text-white flex-nowrap"
                    onClick={(e) => {
                      // console.log(e);
                      // e.stopPropagation(); // Prevent dropdown from closing
                      // setDropdownVisible(!dropdownVisible);
                    }}
                    size={isSmallScreen ? "default" : "large"}
                  >
                    <span className="mr-2">{t("Filters")}</span>
                    <span className="ml-auto">
                      <LuListFilter className="text-base 2xl:text-lg" />
                    </span>
                  </Button>
                </Dropdown>
              </div>

              <Radio.Group
                options={gridListoptions}
                onChange={onChangeGridlist}
                value={gridList}
                optionType="button"
                className="flex items-center h-full"
                size={isSmallScreen ? "" : "large"}
              />
              <Button
                className="flex items-center justify-center h-full py-1.5 font-medium bg-white dark:bg-black dark:text-white flex-nowrap"
                size={isSmallScreen ? "default" : "large"}
              >
                <FiSettings className="text-base 2xl:text-lg" />
              </Button>
            </>
          )} */}
        </div>
      </div>
      <div className="border rounded-lg border-[#E7E7E7] dark:border-secondary relative overflow-auto">
        {sortedListData?.length !== 0 && !isLoading ? (
          <Table
            // rowSelection={headerTools && { type: "gridList", rowSelection }}
            rowSelection={
              headerTools && {
                ...rowSelection,
                renderCell: (checked, record, index, originNode) => {
                  const isDisabled = shouldDisableCheckbox(record);
                  const tooltipMessage = isDisabled
                    ? getTooltipMessage(record)
                    : "";

                  return <Tooltip title={tooltipMessage}>{originNode}</Tooltip>;
                },
              }
            }
            columns={tableData}
            // dataSource={data.filter(navValue
            //       .includes(searchValue.toLowerCase()) ||
            //     item.description.arab
            //       .toLowerCase()
            //       .includes(searchValue.toLowerCase()) ||
            //     item.status
            //       .toString()
            //       .toLowerCase()
            //       .includes(searchValue.toLowerCase())
            // )}

            // dataSource={listData}
            dataSource={sortedListData}
            size={isSmallScreen ? "small" : ""}
            // onRow={(record) => ({
            //   onClick: () => {
            //     if (pathUrl) {
            //       navigate(/${pathUrl}/${record[actionID]});
            //     } else {
            //       // header[0]?.[tabValue || path]?.map((each, i) => {
            //       //   console.log(each);
            //       //   // showDetails &&
            //       //   if (
            //       //     each.actionToggle === false ||
            //       //     each.action === false ||
            //       //     each.Regularize === false ||
            //       //     each?.dotsVertical === false
            //       //   ) {
            //       handleRowClick(record);
            //       //   }
            //       // });
            //     }
            //   },
            // })}
            scroll={
              scroll && {
                x: scrollXY[0],
                y: scrollXY[1],
              }
            }
            // rowClassName={(record) =>
            //   isRowDisabled(record) ? "disabled-row" : ""
            // }
            onRow={(record) => ({
              onClick: shouldDisableCheckbox(record)
                ? (e) => e.stopPropagation()
                : undefined,
            })}
            pagination={
              disablePagination
                ? false
                : {
                    // current: 2,
                    // pageSize: pageLimit,
                    total: paginationCount, // Total number of items for pagination
                    // showSizeChanger: true, // Allows the user to change page size
                    // pageSizeOptions: 10, // Options for the user to choose page size
                  }
            }
            onChange={(e) => {
              changePagination(e);
              // console.log(e);
            }}
          />
        ) : (
          //  : isLoading ? (
          //   <Skeleton />
          // )

          <Table
            columns={tableData}
            // dataSource={sortedListData}
            size={isSmallScreen ? "small" : ""}
            scroll={
              scroll && {
                x: scrollXY[0],
                y: scrollXY[1],
              }
            }
            loading={isLoading}
          />
        )}
        {/* {disablePagination && isLoadingState && (
          <div ref={targetRef} className="mb-3 text-center">
            {isLoadingState && <p>Loading...</p>}
            {moreData === false && data.length > 10 && (
            <p>No more data to load...</p>
          )}
          </div>
        )} */}
      </div>

      {/* code for modal to show the details*/}
      <ModalAnt
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // width="435px"
        showOkButton={false}
        showCancelButton={false}
        showTitle={false}
        centered={true}
        padding="8px"
      >
        <div className="flex flex-col gap-2.5 md:w-[445px] 2xl:w-[553px] p-2">
          <div className="flex flex-col gap-2.5 items-center m-auto">
            <div className="border-2 border-[#FFFFFF] size-12 2xl:size-[60px] rounded-full flex items-center justify-center bg-primaryalpha/10">
              {path === "location" ||
              path === "department" ||
              path === "category" ||
              path === "subcategory" ? (
                <img
                  src={companylogo === "null" ? companyimg : companylogo}
                  className="object-cover object-center w-full h-full rounded-full "
                />
              ) : (
                <img
                  src={PopImg}
                  alt="Img"
                  className="w-6 rounded-full 2xl:w-7"
                />
              )}
            </div>
            <p className="font-semibold text-[17px] 2xl:text-[19px]">
              {tabTitle
                ? tabTitle?.charAt(0).toUpperCase() +
                  tabTitle.slice(1).split("_").join(" ")
                : path?.charAt(0).toUpperCase() +
                  path.slice(1).split("_").join(" ")}
            </p>
          </div>
          <div className="m-auto">
            <p className="text-xs text-center text-gray-500 2xl:text-sm">
              Details of Selected{" "}
              {tabTitle
                ? tabTitle?.charAt(0).toUpperCase() +
                  tabTitle.slice(1).split("_").join(" ")
                : path
                ? path.charAt(0).toUpperCase() +
                  path.slice(1).split("_").join(" ")
                : "row"}
              {/* {tabTitle ? tabTitle.split("_").join(" ") : "row"} */}
            </p>
          </div>
          <div className="max-h-[320px] overflow-auto mt-2">
            <div className="borderb rounded-lg p-3 bg-[#F9F9F9] dark:bg-dark">
              <div className="grid grid-cols-3 gap-4 justify-evenly">
                {modalData?.title
                  ?.filter((data) => data.value !== "receipt") // Filter out "receipt"
                  .map((data, index) => (
                    <div key={index} className="flex flex-col gap-1">
                      {console.log(data, "gdgdgdg")}
                      <p className="text-xs 2xl:text-sm text-grey">
                        {/* {(data.title !== "Action" && data.title !== "Receipt") ? data.title : ""} */}
                        {data.title !== "Action" ? formatValue(data.title) : ""}
                      </p>
                      <>
                        {data.flexRow ? (
                          <div className="flex flex-col gap-2 ">
                            {modalData?.text[data.value]?.map((text, index) => (
                              <p
                                style={{
                                  backgroundColor: text[data.flexValue]
                                    ? `${colorNames[index]}15`
                                    : "#fff",
                                  color: colorNames[index],
                                }}
                                className="px-2 text-xs rounded-full w-fit "
                              >
                                {text[data.flexValue]}
                              </p>
                            ))}
                          </div>
                        ) : data.value === "multiImage" ? (
                          <>
                            {modalData?.text?.name?.length > 0 && (
                              <div className="flex -space-x-3 rtl:space-x-reverse">
                                {modalData?.text?.multiImage?.map(
                                  (logo, index) => {
                                    if (index < 3) {
                                      return logo ? (
                                        <div
                                          key={index}
                                          className="overflow-hidden bg-white border-2 border-white rounded-full size-8"
                                        >
                                          <img
                                            className="object-cover object-center w-full h-full"
                                            src={logo}
                                            alt=""
                                          />
                                        </div>
                                      ) : (
                                        <p
                                          key={index}
                                          className="flex items-center justify-center font-semibold border-2 border-white rounded-full size-8 bg-primaryLight text-primary"
                                        >
                                          {modalData?.text?.name[index]
                                            ?.charAt(0)
                                            .toUpperCase()}
                                        </p>
                                      );
                                    } else if (index === 3) {
                                      return (
                                        <div
                                          key={index}
                                          className="flex items-center justify-center p-1 overflow-hidden text-center bg-red-100 border-2 border-white rounded-full size-8"
                                        >
                                          <HiPlusSm className="text-sm text-red-600" />
                                          <p className="text-[10px] font-semibold text-red-600">
                                            {modalData?.text?.name?.length - 3}
                                          </p>
                                        </div>
                                      );
                                    }
                                    return null;
                                  }
                                )}
                              </div>
                            )}
                          </>
                        ) : data.value === "isActive" ? (
                          <p
                            className={`rounded-2xl px-2 py-0.5 w-fit text-xs 2xl:text-sm ${
                              parseInt(modalData?.text[data.value]) === 1
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {parseInt(modalData?.text[data.value]) === 1
                              ? "Active"
                              : "In Active"}
                          </p>
                        ) : data.value === "requestStatusName" ? (
                          <>
                            {modalData?.text.mainStatus ? (
                              <>
                                {modalData?.text?.isByAdmin >= 1 &&
                                // modalData?.text?.requestStatusName === "Pending" &&
                                modalData?.text?.approvalData ? (
                                  <p
                                    className="text-xs 2xl:text-sm font-semibold rounded-2xl px-2 py-0.5 w-fit"
                                    style={{
                                      color:
                                        modalData.text.mainStatusColor ||
                                        undefined,
                                      backgroundColor: modalData.text
                                        .mainStatusColor
                                        ? `${modalData.text.mainStatusColor}20`
                                        : undefined, // Adding some transparency to the background color
                                    }}
                                  >
                                    {formatValue(
                                      getValue(data.mainStatus, modalData.text)
                                    )}
                                  </p>
                                ) : modalData?.text?.mainStatus !== "Pending" &&
                                  (modalData?.text?.isByAdmin === "0" ||
                                    modalData?.text?.isByAdmin === 0 ||
                                    modalData?.text?.isByAdmin === null ||
                                    modalData?.text?.isByAdmin === "") ? (
                                  <p
                                    className="text-xs 2xl:text-sm font-semibold rounded-2xl px-2 py-0.5 w-fit"
                                    style={{
                                      color:
                                        modalData.text.mainStatusColor ||
                                        undefined,
                                      backgroundColor: modalData.text
                                        .mainStatusColor
                                        ? `${modalData.text.mainStatusColor}20`
                                        : undefined, // Adding some transparency to the background color
                                    }}
                                  >
                                    {/* {console.log(data, "gass")} */}
                                    {formatValue(
                                      getValue(data.mainStatus, modalData.text)
                                    )}
                                  </p>
                                ) : (
                                  <p
                                    className="text-xs 2xl:text-sm font-semibold rounded-2xl px-2 py-0.5 w-fit"
                                    style={{
                                      color:
                                        modalData.text.requestStatusColour ||
                                        undefined,
                                      backgroundColor: modalData.text
                                        .requestStatusColour
                                        ? `${modalData.text.requestStatusColour}20`
                                        : undefined, // Adding some transparency to the background color
                                    }}
                                  >
                                    {formatValue(
                                      getValue(data.value, modalData.text)
                                    )}
                                  </p>
                                )}
                              </>
                            ) : (
                              <p
                                className="text-xs 2xl:text-sm font-semibold rounded-2xl px-2 py-0.5 w-fit"
                                style={{
                                  color:
                                    modalData.text.requestStatusColour ||
                                    undefined,
                                  backgroundColor: modalData.text
                                    .requestStatusColour
                                    ? `${modalData.text.requestStatusColour}20`
                                    : undefined, // Adding some transparency to the background color
                                }}
                              >
                                {formatValue(
                                  getValue(data.value, modalData.text)
                                )}
                              </p>
                            )}
                          </>
                        ) : data.value === `track` ? (
                          <MiniStepper
                            steps={Object.keys(modalData?.text[data.value]).map(
                              (key) => key.replace(/step(\d+)/, "Step $1")
                            )}
                            currentStep={
                              Object.keys(modalData?.text[data.value])
                                .map((key, index) =>
                                  modalData?.text[data.value][key] ===
                                  "Approved"
                                    ? index + 1
                                    : null
                                )
                                .filter((index) => index !== null)
                                .pop() || 0
                            }
                            errorSteps={Object.keys(modalData?.text[data.value])
                              .map((key, index) =>
                                modalData?.text[data.value][key] === "Rejected"
                                  ? index + 1
                                  : null
                              )
                              .filter((index) => index !== null)}
                            // width="w-32"
                            activeColor="bg-primaryalpha"
                            inactiveColor="bg-gray-200"
                            errorColor="bg-red-500"
                            textActiveColor="text-white"
                            textInactiveColor="text-gray-600"
                            textErrorColor="text-white"
                          />
                        ) : (
                          <p className="text-xs font-semibold truncate 2xl:text-sm">
                            {formatValue(getValue(data.value, modalData.text))}
                          </p>
                        )}
                      </>
                    </div>
                  ))}
              </div>
              {modalData?.title?.map((data, index) => (
                <div key={index} className="mt-1 vhcenter">
                  {data?.Download &&
                  modalData?.text.approvedDocument &&
                  modalData?.text?.requestStatusName === "Approved" ? (
                    <ButtonClick
                      buttonName={data.buttonName}
                      handleSubmit={() => {
                        handleFileDownload(modalData.text[data.file]);
                      }}
                    />
                  ) : data?.file ? (
                    <ButtonClick
                      buttonName={data.buttonName}
                      handleSubmit={() => {
                        handleFileDownload(modalData.text[data.file]);
                      }}
                    />
                  ) : null}
                </div>
              ))}
              <div className="modal-content">
                {modalData?.text?.track && (
                  <div>
                    {Object.keys(modalData?.text?.track).map((stepKey) => {
                      const employees = modalData?.text?.track[stepKey];
                      const stepName =
                        stepKey.charAt(0).toUpperCase() + stepKey.slice(1);

                      return (
                        <div
                          key={stepKey}
                          className="flex flex-col gap-4 step-section"
                        >
                          <h3 className="text-lg font-medium">{stepName}</h3>
                          <div className="flex flex-col gap-2 pt-2">
                            {employees.map((employee) => (
                              <div
                                key={employee.id}
                                className="flex items-center justify-between p-2 border-b employee-item"
                              >
                                <div className="flex items-center gap-2">
                                  <Avatar
                                    image={employee?.image || ""} // Placeholder for avatar image
                                    name={employee?.name || ""}
                                    className="border-2 border-white shadow-md"
                                  />
                                  <div className="flex flex-col">
                                    <p className="text-sm font-medium">
                                      {employee?.name}
                                    </p>
                                    <p className="text-xs text-grey">
                                      {employee?.designation}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end">
                                  {employee?.status === "Pending" &&
                                  modalData?.text?.isByAdmin >= 1 ? (
                                    <p>No Action Required</p>
                                  ) : employee?.status === "Pending" &&
                                    modalData?.text?.requestStatusName !==
                                      "Pending" &&
                                    (modalData?.text?.isByAdmin === "0" ||
                                      modalData?.text?.isByAdmin === 0 ||
                                      modalData?.text?.isByAdmin === null ||
                                      modalData?.text?.isByAdmin === "") ? (
                                    <p>No Action Required</p>
                                  ) : (
                                    <p
                                      className={`flex items-center justify-end gap-1 w-[90px] h-[20px] 2xl:w-[98px] 2xl:h-[24px] rounded-full ${
                                        employee?.status === "Pending"
                                          ? "text-orange-600"
                                          : employee?.status === "Rejected"
                                          ? "text-red-600"
                                          : "text-green-600"
                                      }`}
                                    >
                                      {employee?.status}
                                    </p>
                                  )}

                                  <p className="flex justify-end text-xs text-grey">
                                    {employee?.modifiedOn}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {modalData?.text?.adminData && modalData?.text?.track && (
                  <div className="flex flex-col gap-2 pt-2">
                    <h3 className="text-lg font-medium">
                      Action Taken By Admin
                    </h3>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <Avatar
                          image={modalData?.text?.adminData?.profilePicture}
                          name={modalData?.text?.adminData?.fullName}
                          className="border-2 border-white shadow-md"
                        />
                        <div className="flex flex-col gap-0.5">
                          <p className="text-xs font-medium 2xl:text-sm">
                            {modalData?.text?.adminData?.fullName}
                          </p>
                          <p className="text-grey text-[10px] 2xl:text-xs">
                            {modalData?.text?.adminData?.designation}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <p
                          className={`flex items-center justify-end gap-1 w-[90px] h-[20px] 2xl:w-[98px] 2xl:h-[24px] rounded-full ${
                            modalData?.text?.requestStatusName === "Pending"
                              ? "text-orange-600"
                              : modalData?.text?.requestStatusName ===
                                "Rejected"
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {modalData?.text?.mainStatus ||
                            modalData?.text?.requestStatusName}
                        </p>
                        <p className="flex text-grey text-[10px] 2xl:text-xs justify-end">
                          {modalData?.text?.adminData?.modifiedOn}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                {modalData?.text?.approvalData && (
                  <div className="flex flex-col gap-2">
                    <div className="text-xs font-medium 2xl:text-sm text-grey">
                      Approval Flow Employee Status
                    </div>
                    {modalData?.text?.approvalData.map((item) => (
                      <div
                        key={item.employeeId}
                        className="flex items-center justify-between mb-2"
                      >
                        <div className="flex items-center gap-2">
                          <Avatar
                            image={item.profilePicture || ""}
                            name={item.firstName || ""}
                            className="border-2 border-white shadow-md"
                          />
                          <div className="flex flex-col gap-0.5">
                            <p className="text-xs font-medium 2xl:text-sm">
                              {item.firstName}
                            </p>
                            <p className="text-grey text-[10px] 2xl:text-xs">
                              {item.designation}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          {modalData?.text?.isByAdmin >= 1 &&
                          item.status === "Pending" ? (
                            <p className="flex items-center justify-center">
                              No Action Required
                            </p>
                          ) : (modalData?.text?.isByAdmin === "0" ||
                              modalData?.text?.isByAdmin === 0 ||
                              modalData?.text?.isByAdmin === null ||
                              modalData?.text?.isByAdmin === "") &&
                            item.status === "Pending" &&
                            modalData?.text?.mainStatus !== "Pending" ? (
                            <p className="flex items-center justify-center">
                              No Action Required
                            </p>
                          ) : (
                            <p
                              className={`flex items-center justify-end gap-1 w-[90px] h-[20px] 2xl:w-[98px] 2xl:h-[24px] rounded-full ${
                                item.status === "Pending"
                                  ? " text-orange-600"
                                  : item.status === "Rejected"
                                  ? " text-red-600"
                                  : "text-green-600"
                              }`}
                            >
                              {item.status}
                            </p>
                          )}
                          <p className="flex text-grey text-[10px] 2xl:text-xs justify-end ">
                            {item.modifiedOn}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {modalData?.text?.adminData && !modalData?.text?.track && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar
                        image={modalData?.text?.adminData?.profilePicture}
                        name={modalData?.text?.adminData?.fullName}
                        className="border-2 border-white shadow-md"
                      />
                      <div className="flex flex-col gap-0.5">
                        <p className="text-xs font-medium 2xl:text-sm">
                          {modalData?.text?.adminData?.fullName}
                        </p>
                        <p className="text-grey text-[10px] 2xl:text-xs">
                          {modalData?.text?.adminData?.designation}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p
                        className={`flex items-center justify-end gap-1 w-[90px] h-[20px] 2xl:w-[98px] 2xl:h-[24px] rounded-full ${
                          modalData?.text?.mainStatus === "Pending"
                            ? " text-orange-600"
                            : modalData?.text?.mainStatus === "Rejected"
                            ? " text-red-600"
                            : " text-green-600"
                        }`}
                      >
                        {modalData?.text?.mainStatus ||
                          modalData?.text?.requestStatus ||
                          modalData?.text?.requestStatusName}
                      </p>
                      <p className="flex text-grey text-[10px] 2xl:text-xs justify-end">
                        {modalData?.text?.adminData?.modifiedOn}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </ModalAnt>
    </div>
  );
};

export default TableAnt;
