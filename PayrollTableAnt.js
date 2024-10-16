import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Input,
  Dropdown,
  Menu,
  Checkbox,
  Radio,
  Switch,
  Popconfirm,
  Popover,
  Tooltip,
  notification,
  
} from "antd";
import { RxDotFilled } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { LuListFilter } from "react-icons/lu";
import { BsListUl, BsThreeDotsVertical } from "react-icons/bs";
import { BsGrid } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import Logo1 from "../../assets/images/logos/logo1.png";
import SearchBox from "./SearchBox";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaDownload, FaPencil } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { useNavigate, Link } from "react-router-dom";

import { Payrollaction } from "../PayRollApi";

import { HiPlusSm } from "react-icons/hi";
import FileSaver from "file-saver";
import { useNotification } from "../../Context/Notifications/Notification";

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
const PayrollTableAnt = ({
  data = [],
  header = [],
  actionID = "",
  updateApi = "",
  deleteApi = "",
  path = "",
  tabValue = "",
  buttonClick = () => { },
  clickDrawer = () => { },
  viewDetails = false,
  Movetocase = () => { },
  payrollSettings = false,
  policysettings = false,
  refresh = () => { },
  downloadApi,
  cursorPointer = true,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery({ maxWidth: 1439 });
  const [listData, setListData] = useState([]);
  const [tabTitle, setTabTitle] = useState(
    tabValue.charAt(0).toUpperCase() + tabValue.slice(1)
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchFilter, setSearchFilter] = useState([...data]);
  const [visibleColumns, setVisibleColumns] = useState();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [gridList, setGridList] = useState(1);
  const primaryColor = localStorage.getItem("mainColor");
  const [employeeList, setEmployeeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));

  // console.log(header, "dataaaaa");
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
    // if (data) {
    setListData([...data]);
    // }
  }, [data[0]]);

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
      } else if (result.status === 204) {
        openNotification("error", "Info", result.message);
      } else if (result.status === 500) {
        openNotification("error", "Info", result.message);
      }
    } catch (error) {
      openNotification("error", "Failed", error.code);
    }
  };

  const [tableData, setTableData] = useState([]);

  // Delete Api Integration
  const deleteRecord = async (e) => {
    // console.log(e);
    const result = await Payrollaction(deleteApi, { id: e });
    // console.log(result);
    if (result.status === 200) {
      // window.location.reload();
      openNotification("success", "Success", result?.message);
      refresh(true);
    } else if (result.status === 204) {
      openNotification("error", "Info", result.message);
    } else if (result.status === 500) {
      openNotification("error", "Info", result.message);
    }
  };

  const handleDownload = async (e) => {
    try {
      const result = await Payrollaction(downloadApi, {
        companyId: companyId,
        salaryTemplateId: e,
      });

      if (result.status === 200) {
        const { filename, filecontent } = result.result;

        // Decode base64 file content
        const byteCharacters = atob(filecontent);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        const mimeType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        const file = new Blob([byteArray], { type: mimeType });

        // Save the file using FileSaver.js
        FileSaver.saveAs(file, filename);

        openNotification("success", "Download Success", result.message);
        refresh(true);
        // console.log(result, "download result");
      } else if (result.status === 404) {
        openNotification("error", "Info", result.message);
      } else if (result.status === 500) {
        openNotification("error", "Something went wrong", result.message);
      }
    } catch (error) {
      openNotification("error", "Download Failed", error.code);
    }
  };

  useEffect(() => {
    setIsLoading(true); // Start loading when data is being fetched
    if (data && data.length > 0) {
      setListData([...data]);
      setIsLoading(false); // Stop loading when data is fetched
    }
  }, [data]);

  useEffect(() => {
    // Mock fetch delay for demonstration
    const fetchTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulating data fetch delay

    return () => clearTimeout(fetchTimeout);
  }, []);

  useEffect(() => {
    // console.log(header, "header");
    setTableData(
      header[0]?.[tabValue || path]?.map((each, i) => ({
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
              className={` ${each.width} ${cursorPointer && "cursor-pointer"} `}
              onClick={() => {
                if (viewDetails) navigate(`/${viewDetails}/${text[actionID]}`);
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
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 overflow-hidden rounded-full 2xl:w-10 2xl:h-10">
                    <img
                      // src={record.logo}
                      src={Logo1}
                      className="object-cover object-center w-full h-full"
                      alt=""
                    />
                  </div>
                  <div className="">
                    <p className="text-xs font-semibold text-black capitalize 2xl:text-sm dark:text-white">
                      {text.company}
                    </p>
                    {/* <>{alert(JSON.stringify(text[each.]))}</> */}
                    <p className="!font-normal para">{text.url}</p>
                  </div>
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
                </div>
              ) : each.bold ? (
                <div className="text-xs font-medium text-black dark:text-white">
                  {text[each.value]}
                </div>
              ) : each.block ? (
                <div>
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
                      if (text.isEditable !== "0") {
                        handleToggleList(text?.[actionID], checked);
                        updateCompany(text?.[actionID], checked);
                      }
                    }}
                    disabled={text.isEditable === "0"}
                    className="bg-[#c2c0c0aa]"
                    size={isSmallScreen ? "small" : "default"}
                  />
                </Tooltip>
              ) : each.action ? (
                <div className="relative flex items-center justify-start gap-4 ">
                  {each.hideIcon !== "edit" && (
                    <Tooltip title="Edit" color={primaryColor}>
                      <button
                        className={`w-8 h-8 2xl:w-10 2xl:h-10 rounded-full vhcenter hover:bg-primaryalpha/20 dark:hover:bg-primaryalpha/30 text-accent transition-all duration-300`}
                        onClick={() => {
                          const actionText = text[actionID];
                          localStorage.setItem("actionidforupdate", actionText);
                          buttonClick(text[actionID], "edit"); //"8"
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
                  {each.hideIcon !== "delete" && text.isEditable !== "0" && (
                    <Popconfirm
                      placement="top"
                      title={"Confirm To Delete"}
                      description={"Are you sure to delete this row?"}
                      okText="Confirm"
                      cancelText="No"
                      onConfirm={() => {
                        console.log("hh", text[actionID]);
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
                  {each.download && text.name?.length > 0 && (
                    <Tooltip title="Download" color={primaryColor}>
                      <button
                        className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-full vhcenter hover:bg-primaryalpha/20 dark:hover:bg-primaryalpha/30 text-accent transition-all duration-300"
                        onClick={() => handleDownload(text[actionID])}
                      >
                        <FaDownload className="text-xs 2xl:text-sm" />
                      </button>
                    </Tooltip>
                  )}
                </div>
              ) : each.multiImage ? (
                <Dropdown
                  className=""
                  overlay={
                    <Menu className="h-56 overflow-auto">
                      {text.name?.map((data, i) => (
                        <Menu.Item key={i}>
                          {data && (
                            <div className="flex justify-start items-center gap-2">
                              <div>
                                {text[each.value][i] ? (
                                  <div className="size-8 rounded-full overflow-hidden border-2 border-white bg-white">
                                    <img
                                      key={i}
                                      className="object-cover object-center w-full h-full"
                                      src={text[each.value][i]}
                                      alt=""
                                    />
                                  </div>
                                ) : (
                                  <p className="flex items-center border-2 border-white justify-center size-8 font-semibold bg-primaryLight text-primary rounded-full">
                                    {data?.charAt(0).toUpperCase()}
                                  </p>
                                )}
                              </div>
                              <p className="font-semibold text-md text-grey">
                                {data?.charAt(0).toUpperCase() + data?.slice(1)}
                              </p>
                              {/* Status Icon */}
                              {text.status && (
                                <div className="ml-2">
                                  {text.status[i] === "Approved" && (
                                    <span className="relative inline-block w-2 h-2 rounded-full bg-green-500">
                                      <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                                    </span>
                                  )}
                                  {text.status[i] === "Rejected" && (
                                    <span className="relative inline-block w-2 h-2 rounded-full bg-red-500">
                                      <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>
                                    </span>
                                  )}
                                  {text.status[i] === "Pending" && (
                                    <span className="relative inline-block w-2 h-2 rounded-full bg-yellow-500">
                                      <span className="absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75 animate-ping"></span>
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </Menu.Item>
                      ))}
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
                          <div className="size-8 rounded-full overflow-hidden border-2 border-white bg-white">
                            <img
                              key={index}
                              className="object-cover object-center w-full h-full"
                              src={data}
                              alt=""
                            />
                          </div>
                        ) : (
                          <div className="">
                            <p className="flex items-center border-2 border-white  justify-center size-8 font-semibold bg-primaryLight text-primary rounded-full">
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
                          <div className="size-8 rounded-full overflow-hidden border-2 border-white text-center flex items-center justify-center p-1 bg-red-100 ">
                            <HiPlusSm className="  text-sm text-red-600" />
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
              ) : (
                // </Popover>
                <div className="text-[#667085] text-xs 2xl:text-sm dark:text-white font-medium ">
                  <p>{record ? record : "--"}</p>
                </div>
              )}
            </div>
            {each.dotsVertical && (
              // <Menu>
              //   {update.map((item) => (
              //     <Menu.Item key={item.key}>{item.label}</Menu.Item>
              //   ))}
              // </Menu>
              <Popover
                content={
                  <div>
                    <p
                      onClick={() => {
                        buttonClick(text[actionID], "edit"); //"8"
                        clickDrawer(true);
                        // console.log(text[actionID]);
                        // console.log(actionID);
                        // console.log(text[actionID], "ddddddddsfsd");
                      }}
                      className="text-md font-semibold p-2 cursor-pointer"
                    >
                      Update
                    </p>
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
                      <p className="text-md font-semibold p-2  cursor-pointer">
                        Delete
                      </p>
                    </Popconfirm>
                  </div>
                }
                // title="Start Action"
              >
                <BsThreeDotsVertical className=" opacity-50 cursor-pointer" />
              </Popover>
            )}
          </>
        ),
        // responsive: ["sm"],
      }))
    );
  }, []);
  useEffect(() => {
    setListData([...searchFilter]);
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
  const onSelectChange = (newSelectedRowKeys) => {
    // console.log(newSelectedRowKeys, "eeddd");
    setSelectedRowKeys(newSelectedRowKeys);
  };
  // const handleColumnVisibilityChange = (column) => (e) => {
  //   e.stopPropagation();
  //   setVisibleColumns((prevColumns) =>
  //     prevColumns.includes(column)
  //       ? prevColumns.filter((col) => col !== column)
  //       : [...prevColumns, column]
  //   );
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
  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // };

  // useEffect(() => {
  //   console.log(rowSelection, "e");
  // }, [rowSelection]);

  const [checkStrictly, setCheckStrictly] = useState(false);

  // rowSelection objects indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
    },
    onSelect: (record, selected, selectedRows) => {
      // console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      // console.log(selected, selectedRows, changeRows);
    },
  };
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
  // const items = [
  //   {
  //     key: "selectAll",
  //     label: (
  //       <Checkbox
  //         checked={visibleColumns?.length === tableData?.length}
  //         onChange={() => {
  //           setVisibleColumns(
  //             visibleColumns?.length === tableData?.length
  //               ? []
  //               : tableData.map((col) => col.dataIndex)
  //           );
  //         }}
  //       >
  //         Select All
  //       </Checkbox>
  //     ),
  //   },
  //   {
  //     key: "search",
  //     label: (
  //       <Input
  //         placeholder="Search columns"
  //         onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
  //         onChange={(e) => handleColumnSearch(e.target.value)}
  //       />
  //     ),
  //   },
  //   ...(tableData?.map((column, i) => ({
  //     key: i,
  //     label: (
  //       <Checkbox
  //         value={column.title}
  //         checked={visibleColumns?.includes(column.dataIndex)}
  //         onChange={handleColumnVisibilityChange(column.dataIndex)}
  //       >
  //         {column.title}
  //       </Checkbox>
  //     ),
  //   })) || []),
  // ];

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
  //     key: "selectAll",
  //     label: (
  //       <Checkbox
  //         checked={visibleColumns?.length === tableData?.length}
  //         onChange={() => {
  //           setVisibleColumns(
  //             visibleColumns?.length === tableData?.length
  //               ? []
  //               : tableData.map((col) => col.dataIndex)
  //           );
  //         }}
  //       >
  //         Select All
  //       </Checkbox>
  //     ),
  //   },
  //   {
  //     key: "search",
  //     label: (
  //       <Input
  //         placeholder="Search columns"
  //         onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
  //         onChange={(e) => handleColumnSearch(e.target.value)}
  //       />
  //     ),
  //   },
  //   ...(tableData?.map((column, i) => ({
  //     key: i,
  //     label: (
  //       <Checkbox
  //         value={column.title}
  //         checked={visibleColumns?.includes(column.dataIndex)}
  //         onChange={handleColumnVisibilityChange(column.dataIndex)}
  //       >
  //         {column.title}
  //       </Checkbox>
  //     ),
  //   })) || []),
  // ];

  // const columnMenu = <Menu mode="vertical" items={columnMenuItems} />;

  const onChangeGridlist = ({ target: { value } }) => {
    // console.log("radio1 checked", value);
    setGridList(value);
  };
  const splitTitle = tabTitle.split("_");
  const jsonResult = splitTitle
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return (
    <div className="flex flex-col justify-between gap-5">

      {" "}
      <div className="flex  items-center space-x-4  ">
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
        <div className="flex  items-center">
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
      </div>


      {!payrollSettings && (
        <div className="flex flex-col justify-between gap-3 xl:items-center xl:flex-row">
          <div className="flex items-center gap-3">
            <p className="text-lg font-semibold dark:text-white">
              {/* {tabTitle?.split("_") || path?.split("_")} */}
              {jsonResult || path}
              {/* (0) */}
            </p>
            <div
              style={{ marginLeft: 8 }}
              className={`bg-[${primaryColor}] bg-opacity-10 text-primary text-[10px] 2xl:text-xs rounded-full px-3 py-1 vhcenter`}
            >
              {/* {console.log(...tabTitle.split("_"))} */}
              {hasSelected
                ? `${selectedRowKeys?.length} ${jsonResult ? jsonResult : path
                } Selected`
                : `All ${jsonResult ? jsonResult : path}`}
              {/* {console.log(jsonResult)} */}
            </div>
          </div>
          {!policysettings && (
            <div className="flex flex-wrap items-center gap-3">
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
              <div>
                {/* <Dropdown
              menu={{
                items,
              }}
              placement="bottomRight"
            >
              <Button>bottomRight</Button>
            </Dropdown> */}
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
                  {/* <Button>Filters</Button> */}
                  <Button
                    className="flex items-center dark:bg-black dark:text-white justify-center h-full font-medium flex-nowrap bg-[#FAFAFA]"
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
                className="flex items-center py-1.5 h-full"
                size={isSmallScreen ? "" : "large"}
              />
              <Button
                className="flex items-center justify-center h-full py-1.5 font-medium bg-white dark:bg-black dark:text-white flex-nowrap"
                size={isSmallScreen ? "default" : "large"}
              >
                <FiSettings className="text-base 2xl:text-lg" />
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="border rounded-lg border-[#E7E7E7] dark:border-secondary relative overflow-auto">
        {data && (
          <Table
            rowSelection={payrollSettings ? null : { ...rowSelection }}
            columns={tableData}
            // dataSource={data.filter(
            //   (item) =>
            //     item.location_name
            //       .toLowerCase()
            //       .includes(searchValue.toLowerCase()) ||
            //     item.description.eng
            //       .toLowerCase()
            //       .includes(searchValue.toLowerCase()) ||
            //     item.description.arab
            //       .toLowerCase()
            //       .includes(searchValue.toLowerCase()) ||
            //     item.status
            //       .toString()
            //       .toLowerCase()
            //       .includes(searchValue.toLowerCase())
            // )}
            // pagination={payrollSettings ? false : true}
            dataSource={listData}
            size={isSmallScreen ? "small" : ""}
          />
        )}
      </div>
    </div>
  );
};

export default PayrollTableAnt;
