import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { LuSearch } from "react-icons/lu";
import SearchBox from "./SearchBox";
import CheckBoxInput from "./CheckBoxInput";
import API, { action } from "../Api";
import { getEmployeeList } from "./Functions/commonFunction";
import Heading2 from "./Heading2";
import FormInput from "./FormInput";
import Dropdown from "./Dropdown";
import DateSelect from "./DateSelect";
import { NoData } from "./SVGFiles";

export default React.memo(function EmployeeCheck({
  title,
  description,
  employee = [],
  department = [],
  location = [],
  payrollsscemployee = [],
  navigateBtn,
  assignData = () => {},
  countryId = null,
  customData = false,
  datas = [],
  customField = [],
  selectedCount = [],
  error = {},
  validationChange = () => {},
  assignBtnEPF = false,
}) {
  const [activeTab, setActiveTab] = useState(navigateBtn[0].id);
  const [allSelect, setAllSelect] = useState(false);
  const [assignBtnName, setAssignBtnName] = useState("Employees");
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));

  const [initialPassData, setInitialPassData] = useState({
    employee: false,
    deparment: false,
    location: false,
  });

  const [searchValue, setSarchValue] = useState();
  const [searchValueSelected, setSarchValueSelected] = useState();
  const [searchData, setSearchData] = useState([]);

  const [employeeSearchData, setEmployeeSearchData] = useState([]);
  const [departmentSearchData, setDepartmentSearchData] = useState([]);
  const [locationSearchData, setLocationSearchData] = useState([]);

  const [unassignedItemsSearch, setUnassignedItemsSearch] = useState([]);
  const [assignedItemsSearch, setAssignedItemsSearch] = useState([]);

  const [unassignedItems, setUnassignedItems] = useState([]);
  const [assignedItems, setAssignedItems] = useState([]);

  const [employeeList, setEmployeeList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [locationList, setLocationList] = useState([]);

  const [employeeCheckList, setEmployeeCheckList] = useState(employee);
  const [departmentCheckList, setDepartmentCheckList] = useState(department);
  const [locationCheckList, setLocationCheckList] = useState(location);

  const [employeeListForPayrollSSC, setEmployeeListForPayrollSSC] = useState(
    []
  );
  const [
    employeeListForPayrollSalaryTemplate,
    setEmployeeListForPayrollSalaryTemplate,
  ] = useState([]);

  const [isSelectAll, setIsSelectAll] = useState(false);
  const [isUnSelectAll, setIsUnSelectAll] = useState(false);
  const [dataRender, setDataRender] = useState(false);

  useEffect(() => {
    if (!customData) {
      getEmployee();
      getDepartment();
      getLocation();
    }
  }, []);

  useEffect(() => {
    setCompanyId(localStorage.getItem("companyId"));
  }, []);

  useMemo(() => {
    if (customData) {
      // getEmployeeForPayrollSSC();
      if (datas.length > 0)
        setEmployeeList(
          datas?.map((each) => ({
            id: parseInt(each.employeeId),
            label: each.employeeName,
            profile: each.profilePicture,
            assign:
              employee.length > 0 &&
              employee?.some(
                (item) => parseInt(item) === parseInt(each.employeeId)
              ),
            // value: each.value,
            // assign:each.assign
          }))
        );
      assignData(
        datas?.map((each) => ({
          id: parseInt(each.employeeId),
          label: each.employeeName,
          profile: each.profilePicture,
          assign:
            employee.length > 0 &&
            employee?.some(
              (item) => parseInt(item) === parseInt(each.employeeId)
            ),
          // value: each.value,
          // assign:each.assign
        })),
        departmentList,
        locationList
      );
    }
  }, [datas]);

  useMemo(() => {
    setEmployeeList((prevData) =>
      prevData?.map((each) => ({
        ...each,
        assign:
          employee?.length > 0 &&
          employee?.some(
            (item) => parseInt(item) === parseInt(each.employeeId)
          ),
      }))
    );
  }, [employeeCheckList]);

  useMemo(() => {
    setDepartmentList((prevData) =>
      prevData?.map((each) => ({
        ...each,
        assign:
          employee?.length > 0 &&
          employee?.some(
            (item) => parseInt(item) === parseInt(each.employeeId)
          ),
      }))
    );
  }, [departmentCheckList]);

  useMemo(() => {
    setLocationList((prevData) =>
      prevData?.map((each) => ({
        ...each,
        assign:
          employee?.length > 0 &&
          employee?.some(
            (item) => parseInt(item) === parseInt(each.employeeId)
          ),
      }))
    );
  }, [locationCheckList]);

  useEffect(() => {}, [employee, department, location, payrollsscemployee]);

  const getEmployee = async () => {
    try {
      const result = await getEmployeeList(companyId);
      setEmployeeList(
        result.map((each) => {
          if (customField.length > 0) {
            const fields = customField
              .map((fieldItem) => {
                const isEmployeePresent = employee.some(
                  (empItem) => parseInt(empItem) === parseInt(each.employeeId)
                );
                if (isEmployeePresent) {
                  const leaveCountObj = selectedCount.find(
                    (count) =>
                      parseInt(count.employeeId) === parseInt(each.employeeId)
                  );
                  if (
                    leaveCountObj &&
                    leaveCountObj[fieldItem.inputField] !== undefined
                  ) {
                    return {
                      [`${fieldItem.inputField + each.employeeId}`]:
                        leaveCountObj[fieldItem.inputField],
                    };
                  } else {
                    return {
                      [`${fieldItem.inputField + each.employeeId}`]:
                        fieldItem.value,
                    };
                  }
                }
                return null;
              })
              .filter((field) => field !== null); // Remove null values
            return {
              id: parseInt(each.employeeId),

              label: each.firstName + " " + each.lastName,
              value: each.dateOfBirth,
              profile: each.profilePicture,
              assign:
                employee?.length > 0 &&
                employee?.some(
                  (item) => parseInt(item) === parseInt(each.employeeId)
                ),
              ...fields.reduce((acc, curr) => ({ ...acc, ...curr }), {}),
            };
          }
          return {
            id: parseInt(each.employeeId),

            label: each.firstName + " " + each.lastName,
            value: each.dateOfBirth,
            profile: each.profilePicture,
            assign:
              employee.length > 0 &&
              employee?.some(
                (item) => parseInt(item) === parseInt(each.employeeId)
              ),
          };
        })
      );
      // console.log(
      //   result.map((each) => {
      //     if (customField.length > 0) {
      //       const fields = customField
      //         .map((fieldItem) => {
      //           const isEmployeePresent = employee.some(
      //             (empItem) => parseInt(empItem) === parseInt(each.employeeId)
      //           );
      //           if (isEmployeePresent) {
      //             const leaveCountObj = selectedCount.find(
      //               (count) =>
      //                 parseInt(count.employeeId) === parseInt(each.employeeId)
      //             );
      //             if (
      //               leaveCountObj &&
      //               leaveCountObj[fieldItem.inputField] !== undefined
      //             ) {
      //               return {
      //                 [`${fieldItem.inputField + each.employeeId}`]:
      //                   leaveCountObj[fieldItem.inputField],
      //               };
      //             }
      //           }
      //           return null;
      //         })
      //         .filter((field) => field !== null); // Remove null values
      //       return {
      //         id: parseInt(each.employeeId),

      //         label: each.firstName + " " + each.lastName,
      //         value: each.dateOfBirth,
      //         profile: each.profilePicture,
      //         assign:
      //           employee?.length > 0 &&
      //           employee?.some(
      //             (item) => parseInt(item) === parseInt(each.employeeId)
      //           ),
      //         ...fields.reduce((acc, curr) => ({ ...acc, ...curr }), {}),
      //       };
      //     }
      //     return {
      //       ...each,
      //       label: each.firstName + " " + each.lastName,
      //       assign:
      //         employee.length > 0 &&
      //         employee?.some(
      //           (item) => parseInt(item) === parseInt(each.employeeId)
      //         ),
      //     };
      //   }),
      //   "employeeLog"
      // );
      setEmployeeSearchData(
        result?.map((each) => ({
          ...each,
          label: each.firstName + " " + each.lastName,
          assign:
            employee.length > 0 &&
            employee?.some(
              (item) => parseInt(item) === parseInt(each.employeeId)
            ),
        }))
      );
      setInitialPassData({
        ...initialPassData,
        employee: true,
      });
      // assignData(
      //   result.map((each) => {
      //     if (customField.length > 0) {
      //       const fields = customField
      //         .map((fieldItem) => {
      //           const isEmployeePresent = employee.some(
      //             (empItem) => parseInt(empItem) === parseInt(each.employeeId)
      //           );
      //           if (isEmployeePresent) {
      //             const leaveCountObj = selectedCount.find(
      //               (count) =>
      //                 parseInt(count.employeeId) === parseInt(each.employeeId)
      //             );
      //             if (
      //               leaveCountObj &&
      //               leaveCountObj[fieldItem.inputField] !== undefined
      //             ) {
      //               return {
      //                 [`${fieldItem.inputField + each.employeeId}`]:
      //                   leaveCountObj[fieldItem.inputField],
      //               };
      //             } else {
      //               return {
      //                 [`${fieldItem.inputField + each.employeeId}`]:
      //                   fieldItem.value,
      //               };
      //             }
      //           }
      //           return null;
      //         })
      //         .filter((field) => field !== null); // Remove null values
      //       return {
      //         id: parseInt(each.employeeId),

      //         label: each.firstName + " " + each.lastName,
      //         value: each.dateOfBirth,
      //         profile: each.profilePicture,
      //         assign:
      //           employee?.length > 0 &&
      //           employee?.some(
      //             (item) => parseInt(item) === parseInt(each.employeeId)
      //           ),
      //         ...fields.reduce((acc, curr) => ({ ...acc, ...curr }), {}),
      //       };
      //     }
      //     return {
      //       id: parseInt(each.employeeId),

      //       label: each.firstName + " " + each.lastName,
      //       value: each.dateOfBirth,
      //       profile: each.profilePicture,
      //       assign:
      //         employee.length > 0 &&
      //         employee?.some(
      //           (item) => parseInt(item) === parseInt(each.employeeId)
      //         ),
      //     };
      //   }),
      //   departmentList,
      //   locationList
      // )
    } catch (error) {}
  };

  const getDepartment = async () => {
    try {
      const result = await action(API.GET_DEPARTMENT, {
        companyId: companyId,
        isActive: 1,
      });
      if (result.status === 200) {
        setDepartmentList(
          result.result?.map((each) => ({
            id: each.departmentId,
            label: each.department,
            value: each.description,
            assign:
              department.length > 0 &&
              department?.some(
                (item) => parseInt(item) === parseInt(each.departmentId)
              ),
          }))
        );
        setDepartmentSearchData(
          result.result?.map((each) => ({
            ...each,
            assign:
              department.length > 0 &&
              department?.some(
                (item) => parseInt(item) === parseInt(each.departmentId)
              ),
          }))
        );
        // assignData(
        //   employeeList,
        //   result.result?.map(each => ({
        //     ...each,
        //     assign:
        //       employee?.length > 0 &&
        //       employee?.some(
        //         item => parseInt(item) === parseInt(each.employeeId)
        //       )
        //   })),
        //   locationList
        // )
        setInitialPassData({
          ...initialPassData,
          deparment: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getLocation = async () => {
    try {
      const result = await action(API.GET_LOCATION, {
        companyId: companyId,
        isActive: 1,
      });

      if (result.status === 200) {
        setLocationList(
          result.result?.map((each) => ({
            id: each.locationId,
            label: each.location,
            value: each.description,
            assign:
              location.length > 0 &&
              location?.some(
                (item) => parseInt(item) === parseInt(each.locationId)
              ),
          }))
        );
        setLocationSearchData(
          result.result?.map((each) => ({
            ...each,
            assign:
              location.length > 0 &&
              location?.some(
                (item) => parseInt(item) === parseInt(each.locationId)
              ),
          }))
        );

        // assignData(
        //   employeeList,
        //   departmentList,
        //   result.result?.map(each => ({
        //     ...each,
        //     assign:
        //       employee?.length > 0 &&
        //       employee?.some(
        //         item => parseInt(item) === parseInt(each.employeeId)
        //       )
        //   }))
        // )
        setInitialPassData({
          ...initialPassData,
          location: true,
        });
      }
    } catch (error) {}
  };
  useEffect(() => {
    // setTimeout(() => {
    // if (initialPassData.employee && initialPassData.deparment && initialPassData.location) {
    assignData(employeeList, departmentList, locationList);
    // }
    // }, 1000);
  }, [
    initialPassData.employee,
    initialPassData.deparment,
    initialPassData.location,
  ]);

  const handleToggleList = (id, checked) => {
    if (id === 0) {
      switch (assignBtnName) {
        default:
          break;
        case "Employees":
          setEmployeeList((prevSwitches) =>
            prevSwitches?.map((sw) =>
              customField?.length > 0
                ? {
                    ...sw,
                    assign: checked,
                    ...customField
                      .map((item) => ({
                        [`${item.inputField + sw.id}`]: item.value,
                      }))
                      ?.reduce((data) => data),
                  }
                : { ...sw, assign: checked }
            )
          );
          setEmployeeSearchData((prevSwitches) =>
            prevSwitches?.map((sw) =>
              customField?.length > 0
                ? {
                    ...sw,
                    assign: checked,
                    ...customField
                      .map((item) => ({
                        [`${item.inputField + sw.id}`]: item.value,
                      }))
                      ?.reduce((data) => data),
                  }
                : { ...sw, assign: checked }
            )
          );
          assignData(
            employeeList?.map((sw) =>
              customField?.length > 0
                ? {
                    ...sw,
                    assign: checked,
                    ...customField
                      .map((item) => ({
                        [`${item.inputField + sw.id}`]: item.value,
                      }))
                      ?.reduce((data) => data),
                  }
                : { ...sw, assign: checked }
            ),
            departmentList,
            locationList
          );

          break;
        case "Departments":
          setDepartmentList((prevSwitches) =>
            prevSwitches?.map((sw) => ({ ...sw, assign: checked }))
          );
          setDepartmentSearchData((prevSwitches) =>
            prevSwitches?.map((sw) => ({ ...sw, assign: checked }))
          );
          assignData(
            employeeList,
            departmentList?.map((sw) =>
              sw?.id === id ? { ...sw, assign: checked } : sw
            ),
            locationList
          );
          break;
        case "Locations":
          setLocationList((prevSwitches) =>
            prevSwitches?.map((sw) => ({ ...sw, assign: checked }))
          );
          setLocationSearchData((prevSwitches) =>
            prevSwitches?.map((sw) => ({ ...sw, assign: checked }))
          );
          assignData(
            employeeList,
            departmentList,
            locationList?.map((sw) =>
              sw?.id === id ? { ...sw, assign: checked } : sw
            )
          );
          break;
        case "PayrollEmployeesList":
          setEmployeeList((prevSwitches) =>
            prevSwitches?.map((sw) => ({ ...sw, assign: checked }))
          );
          setEmployeeSearchData((prevSwitches) =>
            prevSwitches?.map((sw) => ({ ...sw, assign: checked }))
          );
          assignData(
            employeeList
              ?.map((sw) => (sw?.id === id ? id : null))
              .map((data) => data),
            departmentList,
            locationList
          );
          break;
      }
      setDataRender(!dataRender);
    } else {
      setIsUnSelectAll(false);
      setIsSelectAll(false);
      switch (assignBtnName) {
        default:
          break;
        case "Employees":
          setEmployeeList((prevSwitches) =>
            prevSwitches?.map((sw) =>
              parseInt(sw?.id) === id
                ? customField?.length > 0
                  ? {
                      ...sw,
                      assign: checked,
                      ...customField
                        .map((item) => ({
                          [`${item.inputField + sw.id}`]: item.value,
                        }))
                        ?.reduce((data) => data),
                    }
                  : { ...sw, assign: checked }
                : sw
            )
          );
          setEmployeeSearchData((prevSwitches) =>
            prevSwitches?.map((sw) =>
              parseInt(sw?.id) === id
                ? customField?.length > 0
                  ? {
                      ...sw,
                      assign: checked,
                      ...customField
                        .map((item) => ({
                          [`${item.inputField + sw.id}`]: item.value,
                        }))
                        ?.reduce((data) => data),
                    }
                  : { ...sw, assign: checked }
                : sw
            )
          );
          assignData(
            employeeList?.map((sw) =>
              parseInt(sw?.id) === parseInt(id)
                ? customField?.length > 0
                  ? {
                      ...sw,
                      assign: checked,
                      ...customField
                        .map((item) => ({
                          [`${item.inputField + sw.id}`]: item.value,
                        }))
                        ?.reduce((data) => data),
                    }
                  : { ...sw, assign: checked }
                : sw
            ),
            departmentList,
            locationList
          );

          break;
        case "Departments":
          setDepartmentList((prevSwitches) =>
            prevSwitches?.map((sw) =>
              sw?.id === id ? { ...sw, assign: checked } : sw
            )
          );
          setDepartmentSearchData((prevSwitches) =>
            prevSwitches?.map((sw) =>
              parseInt(sw?.departmentId) === id
                ? { ...sw, assign: checked }
                : sw
            )
          );
          assignData(
            employeeList,
            departmentList?.map((sw) =>
              sw?.id === id ? { ...sw, assign: checked } : sw
            ),
            locationList
          );
          break;
        case "Locations":
          setLocationList((prevSwitches) =>
            prevSwitches?.map((sw) =>
              sw?.id === id ? { ...sw, assign: checked } : sw
            )
          );
          setLocationSearchData((prevSwitches) =>
            prevSwitches?.map((sw) =>
              parseInt(sw?.locationId) === id ? { ...sw, assign: checked } : sw
            )
          );
          assignData(
            employeeList,
            departmentList,
            locationList?.map((sw) =>
              sw?.id === id ? { ...sw, assign: checked } : sw
            )
          );
          break;
        case "PayrollEmployeesList":
          setEmployeeList((prevSwitches) =>
            prevSwitches?.map((sw) =>
              sw?.id === id ? { ...sw, assign: checked } : sw
            )
          );
          setEmployeeSearchData((prevSwitches) =>
            prevSwitches?.map((sw) =>
              parseInt(sw?.employeeId) === id ? { ...sw, assign: checked } : sw
            )
          );
          assignData(
            employeeList?.map((sw) =>
              parseInt(sw?.employeeId) === id ? { ...sw, assign: checked } : sw
            ),
            departmentList,
            locationList
          );
          break;
      }
    }
  };

  const data =
    assignBtnName === "Employees"
      ? employeeList
      : assignBtnName === "Departments"
      ? departmentList
      : assignBtnName === "Locations"
      ? locationList
      : assignBtnName === "PayrollEmployeesList" && employeeListForPayrollSSC;

  // let unassignedItems = data.filter(item => !item.assign)
  // let assignedItems = data.filter(item => item.assign)
  useMemo(() => {
    setUnassignedItemsSearch(data.filter((item) => !item.assign));
    setAssignedItemsSearch(data.filter((item) => item.assign));
    setUnassignedItems(data.filter((item) => !item.assign));
    setAssignedItems(data.filter((item) => item.assign));

    const assignSelect = data.filter((item) => item.assign);
    const unAssignSelect = data.filter((item) => !item.assign);
    // if (data?.length === assignSelect?.length) {
    //   setIsSelectAll(true)
    // } else if (data?.length === unAssignSelect?.length) {
    //   setIsUnSelectAll(true)
    // }
  }, [data]);

  useEffect(() => {
    // setAssignedItems(searchData)
    // switch (assignBtnName) {
    //   default:
    //     setEmployeeList(
    //       searchData.map(each => ({
    //         id: parseInt(each.employeeId),
    //         label: each.firstName + ' ' + each.lastName,
    //         value: each.dateOfBirth,
    //         profile: each.profilePicture,
    //         assign: each.assign
    //       }))
    //     )
    //     break
    //   case 'Departments':
    //     setDepartmentList(
    //       searchData.map(each => ({
    //         id: each.departmentId,
    //         label: each.department,
    //         value: each.description,
    //         assign: each.assign
    //       }))
    //     )
    //     break
    //   case 'Locations':
    //     setLocationList(
    //       searchData.map(each => ({
    //         id: each.locationId,
    //         label: each.location,
    //         value: each.description,
    //         assign: each.assign
    //       }))
    //     )
    //     break
    //   case 'Employees  ':
    //     setEmployeeList(
    //       searchData.map(each => ({
    //         id: parseInt(each.employeeId),
    //         label: each.firstName + ' ' + each.lastName,
    //         value: each.dateOfBirth,
    //         assign: each.assign
    //       }))
    //     )
    //     break
    //   case 'PayrollEmployeesList':
    //     setEmployeeList(
    //       searchData.map(each => ({
    //         id: parseInt(each.employeeId),
    //         label: each.firstName + ' ' + each.lastName,
    //         value: each.dateOfBirth,
    //         assign: each.assign
    //       }))
    //     )
    //     break
    // }
  }, [searchData]);

  const SelectAll = (checked) => {
    // setAssignedItemsSearch(data.filter((item) => item.assign));
    // setAssignedItems(data.filter((item) => ({ ...item, assign: false })));
    handleToggleList(0, true);
    setIsUnSelectAll(false);
    setIsSelectAll(true);
  };

  const UnselectAll = (checked) => {
    // setUnassignedItemsSearch(data.filter((item) => !item.assign));
    // setUnassignedItems(data.filter((item) =>
    //   ({ ...item, assign: false })));
    handleToggleList(0, false);
    setIsUnSelectAll(true);
    setIsSelectAll(false);
  };

  // useMemo(() => {
  //   assignData(
  //     employeeList,
  //     departmentList,
  //     locationList,
  //     employeeListForPayrollSSC
  //   );
  // }, [assignedItems, unassignedItems]);

  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const SelectValue = async (id, keyValue, value) => {
    switch (assignBtnName) {
      default:
        break;
      case "Departments":
        assignData(
          employeeList,
          departmentList?.map((sw) =>
            sw?.id === id ? { ...sw, [`${keyValue}`]: value } : sw
          ),
          locationList
        );
        setDepartmentList((prevSwitches) =>
          prevSwitches?.map((sw) =>
            sw?.id === id ? { ...sw, [`${keyValue}`]: value } : sw
          )
        );
        setDepartmentSearchData((prevSwitches) =>
          prevSwitches?.map((sw) =>
            parseInt(sw?.departmentId) === id
              ? { ...sw, [`${keyValue}`]: value }
              : sw
          )
        );
        break;
      case "Locations":
        assignData(
          employeeList,
          departmentList,
          locationList?.map((sw) =>
            sw?.id === id ? { ...sw, [`${keyValue}`]: value } : sw
          )
        );
        setLocationList((prevSwitches) =>
          prevSwitches?.map((sw) =>
            sw?.id === id ? { ...sw, [`${keyValue}`]: value } : sw
          )
        );
        setLocationSearchData((prevSwitches) =>
          prevSwitches?.map((sw) =>
            parseInt(sw?.locationId) === id
              ? { ...sw, [`${keyValue}`]: value }
              : sw
          )
        );
        break;
      case "PayrollEmployeesList":
        assignData(
          employeeList
            ?.map((sw) => (sw?.id === id ? id : null))
            .map((data) => data),
          departmentList,
          locationList
        );
        setEmployeeList((prevSwitches) =>
          prevSwitches?.map((sw) =>
            sw?.id === id ? { ...sw, [`${keyValue}`]: value } : sw
          )
        );
        setEmployeeSearchData((prevSwitches) =>
          prevSwitches?.map((sw) =>
            parseInt(sw?.employeeId) === id
              ? { ...sw, [`${keyValue}`]: value }
              : sw
          )
        );
        break;
      case "Employees":
        assignData(
          employeeList?.map((sw) =>
            sw?.id === id ? { ...sw, [`${keyValue}`]: value } : sw
          ),
          departmentList,
          locationList
        );
        setEmployeeList((prevSwitches) =>
          prevSwitches?.map((sw) =>
            sw?.id === id ? { ...sw, [`${keyValue}`]: value } : sw
          )
        );
        setEmployeeSearchData((prevSwitches) =>
          prevSwitches?.map((sw) =>
            parseInt(sw?.employeeId) === id
              ? { ...sw, [`${keyValue}`]: value }
              : sw
          )
        );

        break;
    }
  };

  return (
    <div
      ref={contentRef}
      className="borderb rounded-[10px] w-full p-4 bg-white dark:bg-dark"
    >
      <div className="flex flex-col gap-6">
        <Heading2 title={title} description={description} />
        <div className="flex flex-col items-center gap-2 md:gap-0 md:flex-row md:justify-between">
          <div>
            {navigateBtn && (
              <div className="flex gap-2 p-[6px] bg-[#FAFAFA] dark:bg-secondaryDark border border-black border-opacity-10 rounded-xl flex-wrap">
                {navigateBtn?.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      //   setAllSelect(false);
                      //  tabClick(tab.value);
                      setAssignBtnName(tab.value);
                      setActiveTab(tab.id);
                      //  setTabName(tab.value);
                      setIsUnSelectAll(false);
                      setIsSelectAll(false);
                    }}
                    className={`${
                      activeTab === tab.id ? "" : ""
                    } text-sm font-medium whitespace-nowrap py-3 px-[18px] relative rounded-lg group`}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="bubble"
                        className="absolute inset-0 z-10 rounded-lg bg-accent"
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
            )}
          </div>
          {/* <FilterBtn /> */}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 w-full md:justify-between gap-4">
          {/* col 1 */}
          <div className="flex flex-col gap-6 py-6">
            <SearchBox
              placeholder={`Search ${assignBtnName}`}
              value={searchValue}
              change={(e) => {
                setSarchValue(e);
              }}
              icon={<LuSearch className="text-sm opacity-45" />}
              data={
                unassignedItemsSearch
                // assignBtnName === 'Employees'
                //   ? employeeSearchData
                //   : assignBtnName === 'Departments'
                //   ? departmentSearchData
                //   : assignBtnName === 'Locations'
                //   ? locationSearchData
                //   : employeeSearchData
              }
              onSearch={(value) => {
                setUnassignedItems(value);
              }}
            />
            <div className="flex items-center gap-3 PX-1">
              <p className="flex items-center gap-2">
                <CheckBoxInput
                  titleRight="Select All"
                  value={isSelectAll}
                  change={SelectAll}
                />
              </p>
              <p className="text-primary text-xs 2xl:text-sm">
                {"Unselected " +
                  assignBtnName +
                  " (" +
                  unassignedItems?.length +
                  ")"}
              </p>
            </div>
            <div className="flex flex-col gap-6 max-h-[360px] overflow-y-auto">
              {unassignedItems?.length > 0 ? (
                unassignedItems?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-md transform duration-300"
                  >
                    <CheckBoxInput
                      value={isSelectAll}
                      change={(e) =>
                        handleToggleList(
                          item.id,
                          parseInt(e) === 1 ? true : false
                        )
                      }
                    />
                    <div className="overflow-hidden border border-white rounded-full size-8 2xl:size-10 shrink-0">
                      {item.profile ? (
                        <img
                          src={item.profile}
                          alt="ProfileImage"
                          className="object-cover object-center w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-primary bg-primaryLight">
                          {item.label?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-sm 2xl:text-base">
                        {item.label?.charAt(0).toUpperCase() +
                          item.label?.slice(1)}
                      </p>
                      <p className="font-medium text-xs 2xl:text-sm text-slate-600 dark:text-slate-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <NoData />
              )}
            </div>
          </div>
          {/* col 2 */}

          <div className="flex flex-col gap-6 border rounded-[14px] px-[14px] py-[24px] border-primaryalpha/10 bg-primaryalpha/[0.08] dark:bg-primaryalpha/20">
            <SearchBox
              placeholder={`Search ${assignBtnName}`}
              value={searchValueSelected}
              change={(e) => {
                setSarchValueSelected(e);
              }}
              icon={<LuSearch className="text-sm opacity-45" />}
              data={
                assignedItemsSearch
                // assignBtnName === 'Employees'
                //   ? employeeSearchData
                //   : assignBtnName === 'Departments'
                //   ? departmentSearchData
                //   : assignBtnName === 'Locations'
                //   ? locationSearchData
                //   : employeeSearchData
              }
              onSearch={(value) => {
                setAssignedItems(value);
              }}
            />
            <div className="flex items-center justify-between gap-3">
              <p className="text-primary text-xs 2xl:text-sm">
                Selected {assignBtnName + " (" + assignedItems?.length + ")"}
              </p>
              <p>
                <CheckBoxInput
                  titleRight="Unselect All"
                  value={isUnSelectAll}
                  change={UnselectAll}
                />
              </p>
            </div>
            <div
              className={`flex flex-col gap-6 max-h-[360px] overflow-y-auto `}
            >
              <div className="flex flex-col gap-2">
                <div
                  className={`grid ${
                    customField?.length > 1 ? "grid-cols-4" : "grid-cols-3"
                  } justify-between items-center gap-2 rounded-md transform duration-300`}
                >
                  <div className="col-span-2"></div>
                  <div
                    className={`grid ${
                      customField?.length > 1
                        ? "grid-cols-2 col-span-2"
                        : "grid-cols-1"
                    } gap-2 items-center w-full`}
                  >
                    {customField?.map(
                      (each) =>
                        assignBtnName === "Employees" && (
                          <p className=" font-semibold">{each.title}</p>
                        )
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  {assignedItems?.length > 0 ? (
                    assignedItems?.map((item, index) => (
                      <div
                        key={index}
                        // className={`grid ${
                        //   customField?.length > 1
                        //     ? "grid-cols-3"
                        //     : "grid-cols-3"
                        // } justify-between items-center gap-2 rounded-md transform duration-300`}
                        className={`grid ${
                          assignBtnEPF
                            ? `${
                                customField?.length > 1
                                  ? "grid-cols-3"
                                  : "grid-cols-3"
                              } justify-between items-start gap-2 rounded-md transform duration-300`
                            : `${
                                customField?.length > 1
                                  ? "grid-cols-4"
                                  : "grid-cols-3"
                              } justify-between items-center gap-2 rounded-md transform duration-300`
                        }`}
                      >
                        <div
                          className={`flex gap-1 items-center ${
                            assignBtnEPF ? "" : "col-span-2"
                          }`}
                        >
                          <CheckBoxInput
                            value={!isUnSelectAll}
                            change={(e) =>
                              handleToggleList(
                                item.id,
                                parseInt(e) === 1 ? true : false
                              )
                            }
                          />
                          <div className="overflow-hidden border border-white rounded-full  size-8 2xl:size-10 shrink-0">
                            {item.profile ? (
                              <img
                                src={item.profile}
                                alt="profileImage"
                                className="object-cover object-center w-full h-full"
                              />
                            ) : (
                              <div className="flex items-center justify-center w-full h-full text-primary bg-primaryLight">
                                {item.label?.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="font-semibold text-sm 2xl:text-base">
                              {item.label?.charAt(0).toUpperCase() +
                                item.label?.slice(1)}
                            </p>
                            <p className="font-medium text-xs 2xl:text-sm text-slate-600 dark:text-slate-300">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        {assignBtnName === "Employees" && (
                          <div
                            className={`grid ${
                              customField?.length > 1
                                ? "grid-cols-2 col-span-2"
                                : "grid-cols-1"
                            } gap-2  w-full`}
                          >
                            {customField?.map((each) =>
                              each.type === "dropdown" ? (
                                <Dropdown
                                  // title={each.title}
                                  value={item[`${each.inputField + item.id}`]}
                                  change={(e) => {
                                    setUnassignedItems((prevData) =>
                                      prevData.map((sw) =>
                                        sw.id === item.id
                                          ? {
                                              ...sw,
                                              [`${each.inputField + item.id}`]:
                                                e,
                                            }
                                          : {
                                              ...sw,
                                              [`${each.inputField + item.id}`]:
                                                null,
                                            }
                                      )
                                    );
                                    SelectValue(
                                      item.id,
                                      [`${each.inputField + item.id}`],
                                      e
                                    );
                                  }}
                                  options={each.options}
                                />
                              ) : each.type === "text" ? (
                                <div>
                                  <FormInput
                                    // title={each.title}
                                    value={item[`${each.inputField + item.id}`]}
                                    placeholder={each.title}
                                    change={(e) => {
                                      validationChange();
                                      setUnassignedItems((prevData) =>
                                        prevData.map((sw) =>
                                          sw.id === item.id
                                            ? {
                                                ...sw,
                                                [`${
                                                  each.inputField + item.id
                                                }`]: e,
                                              }
                                            : {
                                                ...sw,
                                                [`${
                                                  each.inputField + item.id
                                                }`]: null,
                                              }
                                        )
                                      );
                                      SelectValue(
                                        item.id,
                                        [`${each.inputField + item.id}`],
                                        e
                                      );
                                    }}
                                    maxLength={each.maxLength}
                                    error={
                                      error[item.id]?.[each.inputField] && (
                                        <span className="text-red-500 text-xs">
                                          {error[item.id][each.inputField]}
                                        </span>
                                      )
                                    }
                                  />
                                </div>
                              ) : (
                                each.type === "date" && (
                                  <DateSelect
                                    // title={each.title}
                                    value={item[`${each.inputField + item.id}`]}
                                    placeholder={each.title}
                                    change={(e) => {
                                      setUnassignedItems((prevData) =>
                                        prevData.map((sw) =>
                                          sw.id === item.id
                                            ? {
                                                ...sw,
                                                [`${
                                                  each.inputField + item.id
                                                }`]: e,
                                              }
                                            : {
                                                ...sw,
                                                [`${
                                                  each.inputField + item.id
                                                }`]: null,
                                              }
                                        )
                                      );
                                      SelectValue(
                                        item.id,
                                        [`${each.inputField + item.id}`],
                                        e
                                      );
                                    }}
                                  />
                                )
                              )
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <NoData />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
