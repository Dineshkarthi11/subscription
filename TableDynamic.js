import React, { useEffect, useMemo, useState } from "react";
import { Menu, Table, Dropdown } from "antd";
import { IoAdd } from "react-icons/io5";
import moment from "moment";
import { PiTrash } from "react-icons/pi";
import { useNotification } from "../../Context/Notifications/Notification";
import API, { action } from "../Api";
import localStorageData from "./Functions/localStorageKeyValues";

const TableDynamic = React.memo(
  ({ data, date = [], change = () => {}, shiftData, shiftSchemeId = null }) => {
    const { showNotification } = useNotification();
    const openNotification = (type, title, description) => {
      showNotification({
        placement: "top",
        message: title,
        description: description,
        type: type,
      });
    };

    const [selectedValues, setSelectedValues] = useState([]); // Keyed by rowKey and columnKey
    const [companyId, setCompanyId] = useState(localStorageData.companyId);

    const [shiftList, setShiftList] = useState(shiftData);
    const [columns, setColumns] = useState([]);
    const [columnsData, setColumnsData] = useState(data);
    const [shifts, setShifts] = useState({
      first: null,
      second: null,
      third: null,
    });

    const format = "HH:mm";
    useMemo(() => {
      setColumnsData(data);
      console.log(data, "data");
    }, [data]);

    useMemo(() => {
      setShiftList(shiftData);
    }, [shiftData]);

    // Utility function to check if a shift is within another
    const isShiftWithin = (
      shiftStart,
      shiftEnd,
      referenceStart,
      referenceEnd
    ) => {
      const start = moment(shiftStart, format);
      const end = moment(shiftEnd, format);
      const refStart = moment(referenceStart, format);
      const refEnd = moment(referenceEnd, format);
      return (
        start.isBetween(refStart, refEnd, null, "[]") ||
        end.isBetween(refStart, refEnd, null, "[]")
      );
    };

    // Check for overlapping shifts for an employee
    const checkShifts = (shift, employeeKey, columnKey) => {
      const employeeShifts = shifts[employeeKey] || {};

      // Check if the shift for this specific day (columnKey) overlaps
      const existingShift = employeeShifts[columnKey];
      // console.log(existingShift, "shift");

      if (existingShift && parseInt(existingShift.shiftId) !== 0) {
        return !isShiftWithin(
          shift.startTime,
          shift.endTime,
          existingShift.startTime,
          existingShift.endTime
        );
      }
      return true;
    };

    const saveShiftScheduler = async (employee, date, shift, referesh) => {
      try {
        const result = await action(
          API.EMPLOYEE_SHIFT_SCHEDULAR,
          {
            companyId: companyId,
            shiftId: shift[`${employee.key}-${date.key}`]?.map((each) =>
              parseInt(each.shiftId)
            ),
            shiftSchemeId: shiftSchemeId,
            employeeId: [employee.name.employeeId],
            date: date.value,
          }
          // "http://192.168.0.34/loyaltri-server/api/main"
        );
        if (result.status === 200) {
          openNotification("success", "Successful", result.message);
          if (referesh === "referesh") {
            change();
          }

          return result.status;
        } else {
          openNotification("error", "Info ", result.message);
          return result.status;
        }
      } catch (error) {
        console.log(error);
        openNotification("error", "Failed ", error.message);
      }
    };

    const handleMenuClick = (rowKey, columnKey, optionLabel) => {
      const employeeKey = rowKey.key;

      if (
        checkShifts(optionLabel, employeeKey, columnKey.key) &&
        (!selectedValues[`${rowKey.key}-${columnKey.key}`] ||
          selectedValues[`${rowKey.key}-${columnKey.key}`]?.length < 3)
      ) {
        setShifts((prevShifts) => ({
          ...prevShifts,
          [employeeKey]: {
            ...prevShifts[employeeKey],
            [columnKey.key]: optionLabel, // Store shift per day
          },
        }));

        setSelectedValues((prevSelectedValues) => {
          const existingShifts =
            prevSelectedValues[`${rowKey.key}-${columnKey.key}`] || []; // Get the existing shifts array or initialize it

          // console.log(
          //   existingShifts?.some((each) => parseInt(each.shiftId) !== 0),
          //   optionLabel?.shiftId,
          //   [...existingShifts, optionLabel]
          // );

          if (
            existingShifts.length === 0 ||
            (existingShifts?.some((each) => parseInt(each.shiftId) !== 0) &&
              parseInt(optionLabel?.shiftId) !== 0)
            // existingShifts?.some((each) => parseInt(each.shiftId) !== 0)
          ) {
            // console.log([...existingShifts, optionLabel], "checkvalue");
            saveShiftScheduler(rowKey, columnKey, {
              ...prevSelectedValues,
              [`${rowKey.key}-${columnKey.key}`]: [
                ...existingShifts,
                optionLabel,
              ],
            });

            return {
              ...prevSelectedValues,
              [`${rowKey.key}-${columnKey.key}`]: [
                ...existingShifts,
                optionLabel,
              ],
            };
          } else {
            openNotification(
              "error",
              "Failed",
              `An off day and a shift cannot be assigned on the same day.`
            );
            return {
              ...prevSelectedValues,
              [`${rowKey.key}-${columnKey.key}`]: [...existingShifts],
            };
          }
        });
      } else {
        openNotification(
          "error",
          "Failed",
          `Shift for ${optionLabel.shift} overlaps with existing shifts`
        );
      }
    };

    useEffect(() => {
      if (!Array.isArray(date) || date.length !== 2) {
        console.error("`date` should be an array with two elements");
        return;
      }

      const start = new Date(date[0]);
      const end = new Date(date[1]);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        console.error("Invalid date format");
        return;
      }

      const getDatesBetween = (start, end) => {
        const dates = [];
        let currentDate = new Date(start);

        while (currentDate <= end) {
          dates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
      };

      const gapDates = getDatesBetween(start, end);

      const isoDateFormat = new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      const dateFormatter = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
      });

      const gapDatesWithDayNames = gapDates.map((date) => ({
        date: isoDateFormat.format(date),
        dayName: dateFormatter.format(date),
        dayOfMonth: date.getDate(),
      }));

      setColumns([
        {
          key: 0,
          title: "Employee",
          dataIndex: "name",
        },
        ...gapDates.map((date, i) => ({
          key: i + 1,
          title: `${dateFormatter.format(date)} ${date.getDate()}`,
          value: `${isoDateFormat.format(date)}`,
          dataIndex: "data",

          selectedValue: "",
        })),
      ]);
    }, [date, data]);
    const menu = (row, column) => (
      <Menu className=" h-40 overflow-scroll">
        {shiftList?.map((option) => (
          <Menu.Item
            key={option.shift}
            onClick={() => {
              handleMenuClick(row, column, option);
            }}
          >
            {option.shift}
          </Menu.Item>
        ))}
      </Menu>
    );

    return (
      <Table
        columns={columns.map((column, i) => {
          return {
            ...column,
            render: (_, record) => {
              const key = `${record.key}-${column.key}`; // Combine row and column key
              const selectedValue = selectedValues[key]; // Get the selected value for this cell
              if (selectedValue) {
                return (
                  <Dropdown overlay={menu(record, column)} trigger={["click"]}>
                    <div className="flex flex-col  gap-1 inset-0 absolute   cursor-pointer overflow-auto scrollbar-none">
                      {selectedValues[`${record.key}-${column.key}`]?.map(
                        (each, index) => (
                          <div className="text-xs font-bold text-primaryalpha dark:text-white bg-primaryalpha/10 border-primaryalpha/20 rounded border-[0.5px]  flex justify-between items-center  w-full px-2">
                            <p className="">{each?.shift}</p>
                            <PiTrash
                              className=" text-xs"
                              onClick={(e) => {
                                // selectedValues[
                                //   `${record.key}-${column.key}`
                                // ].splice(index, 1);
                                e.stopPropagation();

                                const updatedShifts = [
                                  ...selectedValues[
                                    `${record.key}-${column.key}`
                                  ],
                                ];

                                updatedShifts.splice(index, 1);

                                setSelectedValues((prevSelectedValues) => {
                                  saveShiftScheduler(record, column, {
                                    ...prevSelectedValues,
                                    [`${record.key}-${column.key}`]:
                                      updatedShifts,
                                  });

                                  return {
                                    ...prevSelectedValues,
                                    [`${record.key}-${column.key}`]:
                                      updatedShifts,
                                  };
                                });
                              }}
                            />
                          </div>
                        )
                      )}
                    </div>
                  </Dropdown>
                );
              } else if (column.dataIndex === "name") {
                // return record?.name;
                return (
                  <>
                    <div className="flex flex-col items-start w-full overflow-auto scrollbar-none">
                      <div className="flex gap-3 items-center ">
                        {record.name?.employeeProfile ? (
                          <img
                            src={record.name?.employeeProfile}
                            alt=""
                            className=" w-10 h-10 rounded-full shrink-0"
                          />
                        ) : (
                          <p className="flex items-center justify-center size-10 font-semibold bg-primaryLight text-primary rounded-full">
                            {record.name?.employeeName?.charAt(0).toUpperCase()}
                          </p>
                        )}
                        <div className="flex flex-col gap-1 items-start">
                          <h2 className="test-sm font-bold">
                            {record.name?.employeeName}
                          </h2>
                          <p className="text-xs font-semibold opacity-50">
                            Emp Code: {record.name?.designation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              } else {
                return (
                  <>
                    <div>
                      {record.data.filter((item) => column.value === item.date)
                        ?.length > 0 && (
                        <Dropdown
                          overlay={menu(record, column)}
                          trigger={["click"]}
                        >
                          <div className="flex flex-col justify-around gap-0.5 inset-0 z-50 h-full absolute vhcenter  cursor-pointer overflow-auto scrollbar-none">
                            {record.data
                              .filter((item) => column.value === item.date)
                              .map((filteredItem, index) => (
                                <div
                                  key={index}
                                  className="flex justify-between items-center text-xs font-bold text-primaryalpha dark:text-white bg-primaryalpha/10 dark:bg-dark  px-2 rounded border-[0.5px] border-primaryalpha/20 w-full"
                                >
                                  <p className="">{filteredItem?.shift}</p>
                                  <PiTrash
                                    className=" text-xs"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      saveShiftScheduler(
                                        record,
                                        column,
                                        {
                                          [`${record.key}-${column?.key}`]:
                                            record.data
                                              ?.filter(
                                                (item) =>
                                                  column?.value === item?.date
                                              )
                                              ?.filter(
                                                (each) =>
                                                  parseInt(
                                                    filteredItem?.shiftId
                                                  ) !== parseInt(each?.shiftId)
                                              )
                                              .map((data) => data),
                                        },
                                        "referesh"
                                      );
                                    }}
                                  />
                                </div>
                              ))}
                          </div>
                        </Dropdown>
                      )}
                    </div>

                    {record.data.filter((item) => column.value !== item.date)
                      .length > 0 && (
                      <Dropdown
                        overlay={menu(record, column)}
                        trigger={["click"]}
                      >
                        <div className="flex justify-around gap-2 hover:bg-primaryalpha/5 transition-all duration-300 inset-0 h-full absolute vhcenter  cursor-pointer group">
                          <div className="bg-primaryalpha/20 p-1 rounded-full hidden group-hover:block group-active:block">
                            <IoAdd className="text-lg text-primary" />
                          </div>
                        </div>
                      </Dropdown>
                    )}
                  </>
                );
              }
            },
          };
        })}
        dataSource={columnsData}
        bordered
      />
    );
  }
);

export default TableDynamic;
