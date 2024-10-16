import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Input,
  Dropdown,
  Space,
  Menu,
  Checkbox,
  Radio,
  Switch,
  Popconfirm,
  Flex,
  Popover,
  Tooltip,
  notification,
  Modal,
  
} from "antd";
import { RxDotFilled } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { LuListFilter } from "react-icons/lu";
import { BsListUl, BsThreeDotsVertical } from "react-icons/bs";
import { BsGrid } from "react-icons/bs";
import { FiSave, FiSettings } from "react-icons/fi";
import Logo1 from "../../assets/images/logos/logo1.png";
import axios from "axios";
import API, { action } from "../Api";
import SearchBox from "./SearchBox";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";
import { FaPencil } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { TbDotsVertical } from "react-icons/tb";
import ButtonClick from "./Button";
import FormInput from "./FormInput";
import DropDWN from "./Dropdown";
import TabsNew from "./TabsNew";

import ModalPop from "./ModalPop";
import ModalImg from "../../assets/images/save.svg";

import NoImagePlaceholder from "../../assets/images/NoImagePlaceholder.png";
import ModalPayroll from "./ModalPayroll";
import PayrollTableDetails from "./PayrollTableDetails";
import { Payrollaction } from "../PayRollApi";
import ModalAnt from "./ModalAnt";
import PopImg from "../../assets/images/EmpLeaveRequest.svg";
import { HiPlusSm } from "react-icons/hi";
import { useNotification } from "../../Context/Notifications/Notification";

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

const PayrollMainTableAnt = ({
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
  refresh = () => {},
  pathUrl = false,
  showDetails = true,
  Movetocase = () => {},
  inputType,
  tab,
  handleTabChange = () => {},
  headerTools = false,
  viewOutside = false,
  viewClick = () => {},
  selectedRow = () => {},
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
  // const [searchFilter, setSearchFilter] = useState([...data]);
  const [searchFilter, setSearchFilter] = useState(
    data.map((each) => ({
      key: each[actionID],
      ...each,
    }))
  );

  const [visibleColumns, setVisibleColumns] = useState();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [gridList, setGridList] = useState(1);
  const primaryColor = localStorage.getItem("mainColor");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalshow, setIsModalshow] = useState(true);
  const [headerData, setHeaderData] = useState(header[0]?.[tabValue || path]);
  const [tabClick, setTabClick] = useState(path);

  const [modalData, setModalData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const handleDownloadClick = () => {
    setModalVisible(true);
  };
  const [isLoading, setIsLoading] = useState(true);
  const handleModalClose = () => {
    setModalVisible(false);
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
    // console.log(
    //   header,
    //   "-----",
    //   tabValue,
    //   "____",
    //   path,
    //   "header,tabValue , path"
    // );
  }, [tabValue, path]);
  useEffect(() => {
    // if (data) {

    // console.log(
    //   data.map((each) => ({
    //     key: each[actionID],
    //     ...each,
    //   }))
    // );
    setListData(
      data.map((each) => ({
        key: each[actionID],
        ...each,
      }))
    );
    // setListData([...data]);
    // }
  }, [data[0]]);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    if (tableData) console.log(tableData, "tableData");
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
  const handleToggleList = (id, checked) => {
    // console.log(checked);
    // console.log(switches);
    setListData(
      (prevSwitches) =>
        prevSwitches?.map((sw, i) =>
          // console.log(sw.companyId , id )
          sw?.[actionID] === id
            ? { ...sw, isActive: checked === true ? 1 : 0 }
            : sw
        )

      // prevSwitches.map((sw) => (sw.id === i ? { ...sw, value: checked } : sw))
    );
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
      setIsModalOpen(true);
    }
    // if (isModalshow === true) {
    //   setIsModalOpen(true);
    // }
    // else {
    //   setIsModalshow(true);
    // }
  };

  // const handleToggle = (id, checked) => {
  //   // console.log(checked);
  //   // console.log(switches);
  //   setSwitches(
  //     (prevSwitches) =>
  //       prevSwitches?.map((sw) =>
  //         // console.log(sw.companyId , id )
  //         sw?.companyId === id
  //           ? { ...sw, isActive: checked === true ? 1 : 0 }
  //           : sw
  //       )

  //     // prevSwitches.map((sw) => (sw.id === i ? { ...sw, value: checked } : sw))
  //   );
  // };

  // update Api integration
  const updateCompany = async (id, checked) => {
    try {
      // console.log(
      //   updateApi,
      //   {
      //     [actionID]: id, //Id
      //     isActive: checked === true ? 1 : 0,
      //   },
      //   "updateApi"
      // );
      // const result = await action(updateApi, {
      //   [actionID]: id, //Id
      //   isActive: checked === true ? 1 : 0,
      // });
      const result = await Payrollaction(updateApi, {
        id: id, //Id
        isActive: checked === true ? 1 : 0,
      });
      // console.log(result);

      if (result.status === 200) {
        // handleClose();
        // setFunctionRender(!functionRender);
        // getRecords()
        // window.location.reload();
        openNotification("success", "Success", result?.message);
      } else {
        openNotification("error", "Failed", "Unable to update status.");
      }
    } catch (error) {
      openNotification("error", "Failed", error.code);
    }
  };

  // Delete Api Integration

  const deleteRecord = async (e) => {
    // console.log(e);
    const result = await Payrollaction(deleteApi, { id: e });
    // console.log(result);
    if (result.status === 200) {
      // window.location.reload();
      openNotification("success", "Success", result?.message);
      refresh(true);
    }
  };
  const handleOpenChange = (newOpen) => {
    setPopoverOpen(newOpen);
  };

  //  useEffect(() => {
  //    setIsLoading(true); // Start loading when data is being fetched
  //    if (data && data.length > 0) {
  //      setListData([...data]);
  //      setIsLoading(false); // Stop loading when data is fetched
  //    }
  //  }, [data]);

  //  useEffect(() => {
  //    // Mock fetch delay for demonstration
  //    const fetchTimeout = setTimeout(() => {
  //      setIsLoading(false);
  //    }, 2000); // Simulating data fetch delay

  //    return () => clearTimeout(fetchTimeout);
  //  }, []);


  useEffect(() => {
    // console.log(header, "header");
    setTableData(
      header[0]?.[tabValue || path]?.map((each, i) => ({
        // headerData?.map((each, i) => ({ //tabClick ||
        title: (
          <span
            key={i}
            className="text-[10px] 2xl:text-xs text-[#667085] dark:text-white font-medium capitalize"
          >
            {each.title}
          </span>
        ),
        dataIndex: each.value,
        // dataIndex: "firstName",
        render: (record, text) => (
          <>
            <div
              className={`${each.width} ${"cursor-pointer "}`}
              onClick={() => {
                if (pathUrl && !each?.dotsVertical && !each.actionToggle) {
                  navigate(`/${pathUrl}/${text[actionID]}`);
                } else if (
                  viewOutside &&
                  !each?.dotsVertical &&
                  !each.actionToggle &&
                  !each.action
                ) {
                  viewClick(text[actionID], text);
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
                      ? " bg-emerald-100 text-emerald-600"
                      : " bg-rose-100 text-rose-600"
                  } rounded-full pr-2 py-[2px] w-fit font-medium text-[10px] 2xl:text-sm vhcenter flex-nowrap`}
                  onClick={() => {
                    !viewOutside &&
                      handleRowClick(text, header[0]?.[tabValue || path]);
                  }}
                >
                  <RxDotFilled
                    className={`${
                      parseInt(record) === 1
                        ? "text-emerald-600"
                        : "text-rose-600"
                    } text-base 2xl:text-lg`}
                  />
                  {parseInt(record) === 1 ? "Active" : "Inactive"}
                </div>
              ) : each.flexColumn === true ? (
                <div
                  className="flex items-center gap-4"
                  onClick={() => {
                    !viewOutside &&
                      handleRowClick(text, header[0]?.[tabValue || path]);
                  }}
                >
                  {each?.logo && (
                    <div
                      className={`w-8 h-8 overflow-hidden rounded-full 2xl:w-10 2xl:h-10 shrink-0 ${each?.logoClass}`}
                    >
                      <img
                        // src={record.logo}
                        src={text?.logo ? text?.logo : NoImagePlaceholder}
                        className="object-cover object-center w-full h-full"
                        alt=""
                      />
                    </div>
                  )}
                  <div className="flex flex-col">
                    {/* items-center gap-2 */}
                    <p
                      className={` ${
                        each?.classNames
                          ? each?.classNames[0]
                          : "text-xs font-semibold text-black capitalize 2xl:text-sm dark:text-white"
                      } `}
                    >
                      {text.company || text[each.value[0]] || text.title}
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
                        {text.url || text.subtitle || text[each.value[1]]}
                      </p>
                    )}
                  </div>
                </div>
              ) : each.flex === true ? (
                <div className="flex gap-2 items-center">
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
              ) : each.isActive ? ( //=== "isActive"
                <div className="pl-4">
                  <div
                    className={`${
                      parseInt(text.isActive) === 1
                        ? " bg-emerald-100 text-emerald-600"
                        : " bg-rose-100 text-rose-600"
                    } rounded-full pr-2 py-[2px] w-fit font-medium text-[10px] 2xl:text-sm vhcenter flex-nowrap`}
                  >
                    <RxDotFilled
                      className={`${
                        parseInt(text.isActive) === 1
                          ? "text-emerald-600"
                          : "text-rose-600"
                      } text-base 2xl:text-lg`}
                    />
                    {parseInt(text.isActive) === 1 ? "Active" : "Inactive"}
                  </div>
                </div>
              ) : each.value === "status" || each.status === true ? (
                <div
                  className={`${each.colorChangeValue?.map((item) =>
                    text[each.value] === item.value ? item.className : null
                  )} ${
                    each.className
                  } flex gap-1 text-gray-600 items-center bg-gray-100 rounded-full p-[2px] px-1 w-fit font-medium text-[10px] 2xl:text-sm  flex-nowrap `}
                >
                  {text[each.value] && <GoDotFill className=" text-gray-300" />}
                  {text[each.value]}
                </div>
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
                <Tooltip
                  title={parseInt(text.isActive) ? "Active" : "Inactive"}
                >
                  <Switch
                    checked={parseInt(text.isActive)}
                    onChange={(checked) => {
                      setIsModalshow(false);

                      handleToggleList(text?.[actionID], checked);

                      // buttonClick(each.companyId);
                      // activeOrNot(checked);
                      // console.log(checked);
                      // console.log(text?.[actionID]);
                      updateCompany(text?.[actionID], checked);
                    }}
                    className=" bg-[#c2c0c0aa]"
                    size={isSmallScreen ? "small" : "default"}
                  />
                </Tooltip>
              ) : each.action ? (
                <div className="relative flex items-center justify-start gap-4 ">
                  {each.hideIcon !== "edit" &&
                    parseInt(text.isDelete) === 0 && (
                      <Tooltip title="Edit" color={primaryColor}>
                        <button
                          className={`w-8 h-8 2xl:w-10 2xl:h-10 rounded-full vhcenter hover:bg-primaryalpha/20 dark:hover:bg-primaryalpha/30 text-accent transition-all duration-300`}
                          onClick={() => {
                            buttonClick(text[actionID], "edit"); //"8"
                            clickDrawer(true);

                            // console.log(actionID);
                            // console.log(text[actionID], "ddddddddsfsd");
                          }}
                        >
                          <FaPencil className="text-xs 2xl:text-sm" />
                        </button>
                      </Tooltip>
                    )}
                  {each.hideIcon !== "delete" &&
                    parseInt(text.isDelete) === 0 && (
                      <Popconfirm
                        placement="top"
                        title={"Confirm To Delete"}
                        description={"Are you sure to delete this row?"}
                        okText="Confirm"
                        cancelText="No"
                        onConfirm={() => {
                          console.log("hh");
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
              ) : each.Regularize && parseInt(text[each.value]) === 1 ? (
                <ButtonClick
                  buttonName={each.title}
                  handleSubmit={() => {
                    clickDrawer(true, text[actionID]);
                  }}
                />
              ) : each?.dotsVertical ? (
                <Popover
                  // trigger="click"
                  // className="z-10"
                  // open={popoverOpen}
                  // onOpenChange={handleOpenChange}
                  content={
                    <div>
                      {text["status"] === "Approved" ? (
                        <p
                          onClick={() => {
                            // selectedRow(true, text[actionID], text);
                            buttonClick(text[actionID], "edit"); //"8"
                            clickDrawer(true, "view", text[actionID], text);

                            // console.log(text, "view", record, "ffffff");
                            setPopoverOpen(false);
                          }}
                          className="p-2 font-semibold cursor-pointer text-md"
                        >
                          View
                        </p>
                      ) : (
                        each?.dotsVerticalContent?.map((item) =>
                          !item.confirm ? (
                            <p
                              onClick={() => {
                                // selectedRow(true, text[actionID], text);
                                buttonClick(text[actionID], "edit"); //"8"
                                clickDrawer(
                                  true,
                                  item.value,
                                  text[actionID],
                                  text
                                );

                                // console.log(text, item, record, "ffffff");
                                setPopoverOpen(false);
                              }}
                              className="p-2 font-semibold cursor-pointer text-md"
                            >
                              {item.title}
                            </p>
                          ) : (
                            <Popconfirm
                              placement="top"
                              title={"Confirm To Delete"}
                              description={"Are you sure to delete this row?"}
                              // okText="Confirm"
                              // cancelText="No"
                              onConfirm={() => {
                                // console.log("locky");
                                deleteRecord(text[actionID]);
                                // console.log("id", text[actionID]);
                                setPopoverOpen(false);
                              }}
                              // className="activeBtn"
                              style={{}}
                            >
                              <p className="p-2 font-semibold cursor-pointer text-md">
                                {item.title}
                              </p>
                            </Popconfirm>
                          )
                        )
                      )}
                    </div>
                  }
                  // title="Start Action"
                >
                  <BsThreeDotsVertical className="relative opacity-50 cursor-pointer " />
                  {/* <Button>
                      h
                    </Button> */}
                </Popover>
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
                <div className="relative flex items-center gap-2">
                  <p className="para">
                    {t("Companies_under_this_Organization")}
                  </p>

                  <div className="relative flex items-center h-10 w-28 componiesImg ">
                    {each.images.map((img) => (
                      <img
                        src={img.image}
                        className="absolute w-8 h-8 border-2 rounded-full 2xl:w-10 2xl:h-10 border-slate-100"
                        alt=""
                      />
                    ))}
                  </div>
                </div>
              ) : each.imageOnly ? (
                <div className="-space-x-2">
                  {text.approvers.map((item, index) => (
                    <Tooltip
                      title={each.imageTooltip && item.name}
                      color={primaryColor}
                      placement="bottom"
                      key={index}
                    >
                      <img
                        className="relative z-30 inline object-cover border-2 border-white rounded-full size-6 2xl:size-8"
                        src={item.imgurl}
                        alt="Profileimage"
                      />
                    </Tooltip>
                  ))}
                </div>
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
        fixed: each.fixed,
        width: each.width,
        // responsive: ["sm"],
      }))
    );
  }, [path]);
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

  const rowSelection = {
    selectedRowKeys,
    onChange: (e, i) => {
      // console.log(i, "eeddd");
      selectedRow(!e == [] ? true : false, e, i);
      setSelectedRowKeys(e, i);
    },
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
  const columnMenuItems = [
    {
      key: "selectAll",
      label: (
        <Checkbox
          checked={visibleColumns?.length === tableData?.length}
          onChange={() => {
            setVisibleColumns(
              visibleColumns?.length === tableData?.length
                ? []
                : tableData.map((col) => col.dataIndex)
            );
          }}
        >
          Select All
        </Checkbox>
      ),
    },
    {
      key: "search",
      label: (
        <Input
          placeholder="Search columns"
          onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
          onChange={(e) => handleColumnSearch(e.target.value)}
        />
      ),
    },
    ...(tableData?.map((column, i) => ({
      key: i,
      label: (
        <Checkbox
          value={column.title}
          checked={visibleColumns?.includes(column.dataIndex)}
          onChange={handleColumnVisibilityChange(column.dataIndex)}
        >
          {column.title}
        </Checkbox>
      ),
    })) || []),
  ];

  // const columnMenu = <Menu mode="vertical" items={columnMenuItems} />;

  const onChangeGridlist = ({ target: { value } }) => {
    // console.log("radio1 checked", value);
    setGridList(value);
  };
  const splitTitle = tabTitle.split("_");
  const jsonResult = splitTitle
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  // console.log(modalData,"modalData")
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col justify-between gap-3 xl:items-center xl:flex-row">
        {!tab ? (
          <div className="flex items-center justify-start gap-3">
            <p className="text-lg font-semibold dark:text-white ">
              {t(
                `${
                  tabTitle
                    ? tabTitle?.charAt(0).toUpperCase() +
                      tabTitle.slice(1).split("_").join(" ")
                    : path?.charAt(0).toUpperCase() +
                      path.slice(1).split("_").join(" ")
                }`
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
                className={` bg-primaryalpha/10 dark:bg-primaryalpha/30 text-primary text-[10px] 2xl:text-xs rounded-full px-3 py-1 vhcenter `}
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
        ) : (
          <TabsNew
            tabs={tab}
            tabClick={(e) => {
              // console.log(e, "e");
              setTabClick(e);
              handleTabChange(e);
            }}
            gap={false}
          />
        )}
        <div className="flex justify-between items-center gap-3">
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
              // console.log(value);
              setSearchFilter(value);
            }}
          />
          <div className="flex justify-end">
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
          </div>
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
        { (
          <Table
            // rowSelection={headerTools && { type: "gridList", rowSelection }}
            rowSelection={headerTools && rowSelection}
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
            locale={{ emptyText: "No data" }}
            // onRow={(record) => ({
            //   onClick: () => {
            //     if (pathUrl) {
            //       navigate(`/${pathUrl}/${record[actionID]}`);
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
          />
        )}
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
              <img
                src={PopImg}
                alt="Img"
                className="rounded-full w-5 2xl:w-[24px]"
              />
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
            <p className="text-center text-xs 2xl:text-sm text-gray-500">
              Details of selected{" "}
              {tabTitle ? tabTitle.split("_").join(" ") : "row"}
            </p>
          </div>
          <div className="max-h-[320px] overflow-auto mt-2">
            <div className="borderb rounded-lg p-3 bg-[#F9F9F9] dark:bg-dark">
              <div className="grid grid-cols-3 justify-evenly gap-4">
                {modalData?.title?.map((data, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <p className="text-xs 2xl:text-sm text-grey">
                      {data.title !== "Action" ? data.title : ""}
                    </p>

                    <>
                      {data.value === "multiImage" ? (
                        <>
                          {modalData?.text?.name.length > 0 ? (
                            <div className="flex -space-x-3 rtl:space-x-reverse">
                              {modalData?.text?.multiImage?.map((logo, index) =>
                                index < 3 ? (
                                  logo ? (
                                    <div
                                      key={index}
                                      className="size-8 rounded-full overflow-hidden border-2 border-white bg-white"
                                    >
                                      <img
                                        className="object-cover object-center w-full h-full"
                                        src={logo}
                                        alt=""
                                      />
                                    </div>
                                  ) : (
                                    <p className="flex items-center border-2 border-white  justify-center size-8 font-semibold bg-primaryLight text-primary rounded-full">
                                      {
                                        modalData?.text?.name?.map((each) =>
                                          each?.charAt(0).toUpperCase()
                                        )[index]
                                      }
                                    </p>
                                  )
                                ) : (
                                  index === 3 && (
                                    <div className="size-8 rounded-full overflow-hidden border-2 border-white text-center flex items-center justify-center p-1 bg-red-100 ">
                                      <HiPlusSm className="  text-sm text-red-600" />
                                      <p className=" text-[10px] font-semibold text-red-600">
                                        {modalData?.text?.name?.length - 3}
                                      </p>
                                    </div>
                                  )
                                )
                              )}
                            </div>
                          ) : (
                            <p>---</p>
                          )}
                        </>
                      ) : data.value === "isActive" ? (
                        <p
                          className={`rounded-2xl px-2 py-0.5 w-fit text-xs 2xl:text-sm ${
                            modalData?.text[data.value] === 1
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {modalData?.text[data.value] === 1
                            ? "Active"
                            : "In Active"}
                        </p>
                      ) : (
                        <p className="text-xs 2xl:text-sm font-semibold">
                          {modalData?.text[data.value]
                            ? modalData.text[data.value]
                                .charAt(0)
                                .toUpperCase() +
                              modalData.text[data.value].slice(1)
                            : data.value === "" || data.value === "action"
                            ? ""
                            : "--"}
                        </p>
                      )}
                    </>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ModalAnt>
    </div>
  );
};

export default PayrollMainTableAnt;
