import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Flex } from "antd";
import DrawerPop from "./DrawerPop";
import FlexCol from "./FlexCol";
import PAYROLLAPI, { Payrollaction } from "../PayRollApi";
import AddAdition from "../Payroll/Adjustments/AddAddition";
import AddDeduction from "../Payroll/Adjustments/AddDeduction";
import mnthoverview from "../../assets/images/mnthoverview.png";
import Avatar from "./Avatar";
import { Calender2 } from "./SVGFiles";
import PayrollCasecader from "./PayrollCasecader";
import AllowanceDrawer from "./AllowanceDrawer";
import AddPaymentsDrawer from "./AddPaymentsDrawer";
import CollectpaymentDrawer from "./CollectpaymentDrawer";
import ClearDuesDrawer from "./ClearDuesDrawer";
import DeductionDrawer from "./DeductionDrawer";
import BonusDrawer from "./BonusDrawer";
import { useLocation } from "react-router-dom";
import { fetchCompanyDetails } from "./Functions/commonFunction";

export default function PayrollTableDetails({
  open,
  close = () => {},
  companyDataId,
  refresh = () => {},
  employeeId,
  selectedMonthYear,
  salaryTemplateId,
  employeeName,
  isSalaryHold,
  isSettled,
  salaryCalculation,
}) {
  const { t } = useTranslation();
  const [show, setShow] = useState(true);
  const [showAddition, setShowAddition] = useState();
  const [showDeduction, setShowDeduction] = useState();
  const [allData, setAlldata] = useState([]);
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
  const [
    payrollTableEmployeeAdjustementData,
    setPayrollTableEmployeeAdjustementData,
  ] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [openPop, setOpenPop] = useState(null);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalDeductions, setTotalDeductions] = useState(0);
  const [grossPay, setGrossPay] = useState(0);
  const [earningsData, setEarningsData] = useState([]);
  const [deductionsData, setDeductionsData] = useState([]);
  const [workExpenseData, setWorkExpenseData] = useState([]);
  const [additionsData, setAdditionsData] = useState([]);
  const [deductionsDataForAdjustements, setDeductionsDataForAdjustements] =
    useState([]);
  const [totalWorkExpense, setTotalWorkExpense] = useState(0);
  const [totalAdditions, setTotalAdditions] = useState(0);
  const [totalDeductionsForAdjustements, setTotalDeductionsForAdjustements] =
    useState(0);
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [showAddButtons, setShowAddButtons] = useState(true);
  const [showCheckBoxes, setShowCheckBoxes] = useState(true);
  const [settledEmployeeInfo, setSettledEmployeeInfo] = useState(null);
  const [allowancepop, setAllowance] = useState();
  const [dataValue, setDataValue] = useState("");
  const [bonus, setBonus] = useState();
  const [deduction, setDeduction] = useState();
  const [dues, setDues] = useState();
  const [paymentsdraw, setPaymentsDraw] = useState();
  const [collectpay, setCollectpay] = useState();
  const [netPayable, setNetPayable] = useState(0);
  const [paymentDue, setPaymentDue] = useState(0);
  const [payments, setPayments] = useState(0);
  const [templateDeductions, setTemplateDeductions] = useState([]);
  const [deductions, setDeductions] = useState([]);
  const [companyDetails, setCompanyDetails] = useState("");
  const [monthAbbreviation, year] = selectedMonthYear.split(" ");
  const [arrears, setArrears] = useState(0);
  const [payableDays, setPayableDays] = useState(0);

  useMemo(
    () =>
      setTimeout(() => {
        show === false && close(false);
      }, 800),
    [show]
  );

  const handleClose = () => {
    close(false);
    setShow(false);
    refresh();
    // console.log(refresh, "refresh triggered ");
  };

  // console.log(employeeId, "action id of employee from payroll table");
  // console.log(
  //   selectedMonthYear,
  //   "selectedMonthYear employee from payroll table"
  // );
  // console.log(salaryTemplateId, "salaryTemplateId employee from payroll table");
  // console.log(employeeName, "employeeName employee from payroll table");
  // console.log(isSalaryHold, "isSalaryHold employee from payroll table");
  // console.log(isSettled, "isSettled employee from payroll table");
  console.log(
    salaryCalculation,
    "salaryCalculation employee from payroll table"
  );

  const location = useLocation();
  const isPayrollTablePath = location.pathname === "/payrollTable";

  const getCompanyIdFromLocalStorage = () => {
    return localStorage.getItem("companyId");
  };
  useEffect(() => {
    const companyId = getCompanyIdFromLocalStorage();
    if (companyId) {
      fetchCompanyDetails(companyId).then((details) =>
        setCompanyDetails(details)
      );
    }

    const handleStorageChange = () => {
      const companyId = getCompanyIdFromLocalStorage();
      if (companyId) {
        fetchCompanyDetails(companyId).then((details) =>
          setCompanyDetails(details)
        );
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  // console.log(companyDetails, "ccc");

  useEffect(() => {
    const fetchInitialData = async () => {
      // console.log(isSalaryHold, "isSalaryHold");
      if (parseInt(isSalaryHold) === 1 || parseInt(isSettled) === 1) {
        setShowAddButtons(false);
        setShowCheckBoxes(false);
        await fetchAllEmployeeAdjustementsSettled();
      } else {
        setShowAddButtons(true);
        setShowCheckBoxes(true);
        // await fetchSalaryTemplate();
        await fetchAdjustmentsData();
      }
    };

    fetchInitialData();
  }, [isSalaryHold, isSettled]);
  // console.log(additionsData, "this employee");
  // const fetchSalaryTemplate = async () => {
  //   try {
  //     const response = await Payrollaction(
  //       PAYROLLAPI.GET_Salarytemplate_RECORD_BY_ID,
  //       { id: salaryTemplateId }
  //     );

  //     if (response.status === 200) {
  //       const result = response.result[0];
  //       const { earnings, deductions } = result;

  //       const modifiedEarnings = earnings.map((item) => ({
  //         ...item,
  //         amount: parseFloat(item.amount).toFixed(2),
  //       }));

  //       const modifiedDeductions = deductions.map((item) => ({
  //         ...item,
  //         amount: parseFloat(item.amount).toFixed(2),
  //       }));

  //       setEarningsData(modifiedEarnings);

  //       const totalEarningsValue = modifiedEarnings.reduce(
  //         (acc, curr) => acc + parseFloat(curr.amount),
  //         0
  //       );
  //       setTotalEarnings(totalEarningsValue);

  //       setDeductionsData(modifiedDeductions);
  //       const totalDeductionsValue = modifiedDeductions.reduce(
  //         (acc, curr) => acc + parseFloat(curr.amount),
  //         0
  //       );
  //       setTotalDeductions(totalDeductionsValue);

  //       const grossSalary = (totalEarningsValue - totalDeductionsValue).toFixed(
  //         2
  //       );
  //       setGrossPay(grossSalary);
  //     } else {
  //       console.error("API response status:", response.message);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch data:", error);
  //   }
  // };

  const fetchAdjustmentsData = async () => {
    try {
      const result = await Payrollaction(
        PAYROLLAPI.GET_PAYROLLTABLE_EMPLOYEE_DATA_EMPLOYEE_ADJUSTEMENTS,
        {
          employeeId,
          salaryPayoutMonthYear: selectedMonthYear,
          companyId: companyId,
          salaryCalculation,
        }
      );

      if (result.status === 200) {
        const {
          workExpense,
          additions,
          deductions: fetchedDeductions,
          employeeInfo,
          template_earnings,
          template_deductions: fetchedTemplateDeductions,
          netPayable,
          totalAdditions,
          totalWorkExpense,
          payments,
          paymentDue,
          arrears,
          payableDays,
        } = result.result;

        setEmployeeInfo(employeeInfo);

        const modifiedEarnings = template_earnings.map((item) => ({
          ...item,
          amount: parseFloat(item.amount).toFixed(2),
          actual: parseFloat(item.actual).toFixed(2),
        }));

        const modifiedTemplateDeductions = fetchedTemplateDeductions.map(
          (item) => ({
            ...item,
            amount: parseFloat(item.amount).toFixed(2),
          })
        );

        const modifiedDeductions = fetchedDeductions.map((item) => ({
          ...item,
          amount: parseFloat(item.amount).toFixed(2),
        }));

        setEarningsData(modifiedEarnings);
        setTemplateDeductions(modifiedTemplateDeductions);
        setDeductions(modifiedDeductions);

        const totalEarningsValue = modifiedEarnings.reduce(
          (acc, curr) => acc + parseFloat(curr.actual),
          0
        );

        const transformedWorkExpense = workExpense.map((expense) => ({
          ...expense,
          isChecked: expense.isSelected === 1,
          amount: parseFloat(expense.amount).toFixed(2),
        }));
        setWorkExpenseData(transformedWorkExpense);

        const workExpenseValue = transformedWorkExpense.reduce(
          (acc, curr) => acc + parseFloat(curr.amount),
          0
        );

        const transformedAdditions = additions.map((addition) => ({
          ...addition,
          isChecked: addition.isSelected === 1,
          amount: parseFloat(addition.amount).toFixed(2),
        }));
        setAdditionsData(transformedAdditions);

        const additionsValue = transformedAdditions.reduce(
          (acc, curr) => acc + parseFloat(curr.amount),
          0
        );

        const totalGrossEarnings =
          totalEarningsValue + workExpenseValue + additionsValue;
        setTotalEarnings(totalGrossEarnings);

        const totalTemplateDeductions = modifiedTemplateDeductions.reduce(
          (acc, curr) => acc + parseFloat(curr.amount),
          0
        );
        const totalAdditionalDeductions = modifiedDeductions.reduce(
          (acc, curr) => acc + parseFloat(curr.amount),
          0
        );
        const totalDeductionsValue =
          totalTemplateDeductions + totalAdditionalDeductions;

        setTotalDeductions(totalDeductionsValue);

        const grossSalary = (totalGrossEarnings - totalDeductionsValue).toFixed(
          2
        );
        setGrossPay(grossSalary);

        const cleanAmount = (amount) =>
          parseFloat(amount.toString().replace(/,/g, ""));
        let cleanedAmount = cleanAmount(netPayable);
        setNetPayable(parseFloat(cleanedAmount).toFixed(2));
        setTotalWorkExpense(totalWorkExpense);
        setTotalAdditions(totalAdditions);
        setPayments(payments);
        setPaymentDue(paymentDue);
        setArrears(arrears);
        setPayableDays(payableDays);
      } else {
        console.error("API response status:", result.status);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const fetchAllEmployeeAdjustementsSettled = async () => {
    try {
      const result = await Payrollaction(
        PAYROLLAPI.GET_PAYROLLTABLE_EMPLOYEE_DATA_EMPLOYEE_ADJUSTEMENTS_FOR_SETTLED_OR_ISHOLD_EMPOYESS,
        {
          employeeId,
          salaryPayoutMonthYear: selectedMonthYear,
          isSalaryHold,
          companyId,
        }
      );

      if (result.status === 200) {
        const {
          workExpense,
          additions,
          deductions: fetchedDeductions,
          employeeInfo,
          template_earnings,
          template_deductions: fetchedTemplateDeductions,
          netPayable,
          totalAdditions,
          totalWorkExpense,
          payments,
          paymentDue,
          arrears,
          payableDays,
        } = result.result;

        setEmployeeInfo(employeeInfo);

        const modifiedEarnings = template_earnings.map((item) => ({
          ...item,
          amount: parseFloat(item.amount).toFixed(2),
          actual: parseFloat(item.actual).toFixed(2),
        }));

        const modifiedTemplateDeductions = fetchedTemplateDeductions.map(
          (item) => ({
            ...item,
            amount: parseFloat(item.amount).toFixed(2),
          })
        );

        const modifiedDeductions = fetchedDeductions.map((item) => ({
          ...item,
          amount: parseFloat(item.amount).toFixed(2),
        }));

        setEarningsData(modifiedEarnings);
        setTemplateDeductions(modifiedTemplateDeductions);
        setDeductions(modifiedDeductions);

        const totalEarningsValue = modifiedEarnings.reduce(
          (acc, curr) => acc + parseFloat(curr.actual),
          0
        );

        const transformedWorkExpense = workExpense.map((expense) => ({
          ...expense,
          isChecked: expense.isSelected === 1,
          amount: parseFloat(expense.amount).toFixed(2),
        }));
        setWorkExpenseData(transformedWorkExpense);

        const workExpenseValue = transformedWorkExpense.reduce(
          (acc, curr) => acc + parseFloat(curr.amount),
          0
        );

        const transformedAdditions = additions.map((addition) => ({
          ...addition,
          isChecked: addition.isSelected === 1,
          amount: parseFloat(addition.amount).toFixed(2),
        }));
        setAdditionsData(transformedAdditions);

        const additionsValue = transformedAdditions.reduce(
          (acc, curr) => acc + parseFloat(curr.amount),
          0
        );

        const totalGrossEarnings =
          totalEarningsValue + workExpenseValue + additionsValue;
        setTotalEarnings(totalGrossEarnings);

        const totalTemplateDeductions = modifiedTemplateDeductions.reduce(
          (acc, curr) => acc + parseFloat(curr.amount),
          0
        );
        const totalAdditionalDeductions = modifiedDeductions.reduce(
          (acc, curr) => acc + parseFloat(curr.amount),
          0
        );
        const totalDeductionsValue =
          totalTemplateDeductions + totalAdditionalDeductions;

        setTotalDeductions(totalDeductionsValue);

        const grossSalary = (totalGrossEarnings - totalDeductionsValue).toFixed(
          2
        );
        setGrossPay(grossSalary);
        const cleanAmount = (amount) =>
          parseFloat(amount.toString().replace(/,/g, ""));
        let cleanedAmount = cleanAmount(netPayable);
        setNetPayable(parseFloat(cleanedAmount).toFixed(2));
        setTotalWorkExpense(totalWorkExpense);
        setTotalAdditions(totalAdditions);
        setPayments(payments);
        setPaymentDue(paymentDue);
        setArrears(arrears);
        setPayableDays(payableDays);
      } else {
        console.error("API response status:", result.status);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleAddAdditionClick = () => {
    // Set state variables to open the AddAddition popup
    setOpenPop("newAddition");
    setShowAddition(true);
  };

  const handleAddDeductionClick = () => {
    // Set state variables to open the AddAddition popup
    setOpenPop("newDeduction");
    setShowDeduction(true);
  };

  const handleWorkExpenseCheck = async (index, event) => {
    // Get the checkbox state (checked or unchecked)
    const isChecked = event.target.checked;

    // Get the corresponding work expense data item
    const workExpense = workExpenseData[index];

    // Verify the employeeWorkExpenseId
    // console.log("Employee Work Expense ID:", workExpense);

    // Update the workExpenseData state to reflect the checkbox state change
    setWorkExpenseData((prevData) => {
      const newData = [...prevData];
      newData[index].isChecked = isChecked;
      return newData;
    });

    // Prepare the API request payload
    const payload = {
      id: workExpense.employeeWorkExpenseId,
      salaryPayoutMonthYear: isChecked ? selectedMonthYear : null, // Set to null if unchecked
    };

    // console.log(payload, "requested payload for checkboxes");
    // Trigger the API request
    try {
      const result = await Payrollaction(
        PAYROLLAPI.CHECK_UNCHECK_EMPLOYEE_WORK_EXPENSE,
        payload
      );

      if (result.status !== 200) {
        console.error("API response status:", result.status);
      }
    } catch (error) {
      console.error("Failed to perform API request:", error);
    }
  };

  const handleaAdditionCheck = async (index, event) => {
    // Get the checkbox state (checked or unchecked)
    const isChecked = event.target.checked;

    // Get the corresponding work expense data item
    const addition = additionsData[index];

    // Verify the employeeWorkExpenseId
    // console.log("Employee Work Expense ID:", addition);

    // Update the workExpenseData state to reflect the checkbox state change
    setAdditionsData((prevData) => {
      const newData = [...prevData];
      newData[index].isChecked = isChecked;
      return newData;
    });

    // Prepare the API request payload
    const payload = {
      id: addition.employeeAdditionId,
      salaryPayoutMonthYear: isChecked ? selectedMonthYear : null, // Set to null if unchecked
    };

    // console.log(payload, "requested payload for checkboxes");
    // Trigger the API request
    try {
      const result = await Payrollaction(
        PAYROLLAPI.CHECK_UNCHECK_EMPLOYEE_Addition,
        payload
      );

      if (result.status !== 200) {
        console.error("API response status:", result.status);
      }
    } catch (error) {
      console.error("Failed to perform API request:", error);
    }
  };

  const handleDeductionCheck = async (index, event) => {
    // Get the checkbox state (checked or unchecked)
    const isChecked = event.target.checked;

    // Get the corresponding work expense data item
    const deduction = deductionsDataForAdjustements[index];

    // Verify the employeeWorkExpenseId
    // console.log("Employee Work Expense ID:", deduction);

    // Update the workExpenseData state to reflect the checkbox state change
    setDeductionsDataForAdjustements((prevData) => {
      const newData = [...prevData];
      newData[index].isChecked = isChecked;
      return newData;
    });

    // Prepare the API request payload
    const payload = {
      id: deduction.employeeDeductionId,
      salaryPayoutMonthYear: isChecked ? selectedMonthYear : null, // Set to null if unchecked
    };

    // console.log(payload, "requested payload for checkboxes");
    // Trigger the API request
    try {
      const result = await Payrollaction(
        PAYROLLAPI.CHECK_UNCHECK_EMPLOYEE_Deduction,
        payload
      );

      if (result.status !== 200) {
        console.error("API response status:", result.status);
      }
    } catch (error) {
      console.error("Failed to perform API request:", error);
    }
  };

  // Calculate total amounts
  const totalWorkExpenses = workExpenseData.reduce((total, data) => {
    return data.isChecked ? total + parseFloat(data.amount) : total;
  }, 0);

  const totalDeduction = deductionsDataForAdjustements.reduce((total, data) => {
    return data.isChecked ? total + parseFloat(data.amount) : total;
  }, 0);

  const totalAddition = additionsData.reduce((total, data) => {
    return data.isChecked ? total + parseFloat(data.amount) : total;
  }, 0);

  const totalNetPay = (
    totalEarnings +
    totalAddition -
    totalDeductions -
    totalWorkExpenses -
    totalDeduction
  ).toFixed(2);

  const processedPay =
    isSalaryHold === "0" && isSettled === 0 ? "0.00" : totalNetPay;

  const unpaidPay =
    isSalaryHold === "0" && isSettled === 0 ? totalNetPay : "0.00";

  const options = [
    {
      value: "Earnings",
      label: "Earnings",
      children: [
        // {
        //   value: "allowance",
        //   label: "Allowance",
        // },
        // {
        //   value: "bonus",
        //   label: "Bonus",
        // },
        {
          value: "newAddition",
          label: "Add Addition",
        },
      ],
    },
    {
      value: "Deductions",
      label: "Deductions",
      children: [
        // {
        //   value: "addDeduction",
        //   label: "Add Deduction",
        // },
        {
          value: "newDeduction",
          label: "Add Deduction",
        },
      ],
    },
    // {
    //   value: "Payments",
    //   label: "Payments",
    //   children: [
    //     {
    //       value: "addpayment",
    //       label: "Add Payment",
    //     },
    //     {
    //       value: "boncollect",
    //       label: "Collect Payment",
    //     },
    //     {
    //       value: "cleardues",
    //       label: "Clear Dues",
    //     },
    //   ],
    // },
  ];

  const handleSelection = (value) => {
    // console.log(value, "ygggg");
    // Check the value for debugging
    if (value.includes("allowance")) {
      setAllowance(true);
    }
    if (value.includes("bonus")) {
      setBonus(true);
    }
    if (value.includes("addDeduction")) {
      setDeduction(true);
    }
    if (value.includes("cleardues")) {
      setDues(true);
    }
    if (value.includes("addpayment")) {
      setPayments(true);
    }
    if (value.includes("boncollect")) {
      setCollectpay(true);
    }
    if (value.includes("newAddition")) {
      setShowAddition(true);
    }
    if (value.includes("newDeduction")) {
      setShowDeduction(true);
    }
  };
  // console.log(selectedMonthYear.slice(0, 3), "hiii");
  // console.log(allData, "daaaataaa");

  function getLastDayOfMonthAbbr(monthAbbreviation, year) {
    const date = new Date(`${monthAbbreviation} 1, ${year}`);
    const monthIndex = date.getMonth();
    const lastDay = new Date(year, monthIndex + 1, 0).getDate();
    return `${lastDay} ${monthAbbreviation}`;
  }
  function getSalaryDateRange(monthAbbreviation, year) {
    const lastDayOfMonth = getLastDayOfMonthAbbr(monthAbbreviation, year);
    return `01 ${monthAbbreviation} - ${lastDayOfMonth}`;
  }
  const salaryDateRange = getSalaryDateRange(monthAbbreviation, year);

  // console.log(salaryDateRange, "salaryDateRange");

  return (
    <DrawerPop
      contentWrapperStyle={{
        position: "absolute",
        height: "100%",
        top: 0,
        // left: 0,
        bottom: 0,
        right: 0,
        width: "100%",
        borderRadius: 0,
        borderTopLeftRadius: "0px !important",
        borderBottomLeftRadius: 0,
      }}
      // placement="bottom"
      background="#F8FAFC"
      open={show}
      close={(e) => {
        handleClose();
        refresh();
        // console.log(refresh, "refresh triggered");
      }}
      initialBtn={false}
      footerSubmitButton={false}
      // avatar={<Avatar
      //   image={employeeInfo?.profilePicture}
      //   name={employeeInfo?.name}
      //   className="border-2 border-white shadow-md"
      // />}
      avatar={true}
      src={mnthoverview}
      header={[
        t("Monthly Salary Overview"),
        t(
          "Gain insights into your compensation package with our salary overview"
        ),
      ]}
      footer={false}
      // footerData={[
      //   t("Paid via"),
      //   t("Total Net Pay"),
      //   t("Processed"),
      //   t("Unpaid"),
      // ]}
    >
      {/* <Avatar
        image={employeeInfo?.profilePicture}
        name={employeeInfo?.name}
          className="border-2 border-white shadow-md"
        /> */}

      <FlexCol gap={14} className="max-w-[1076px] m-auto">
        <div className="flex flex-col gap-2 md:gap-0 items-center md:flex-row md:justify-between px-2 py-2 h-fit borderb rounded-xl bg-white dark:bg-dark">
          <div className="flex items-center gap-2">
            <Avatar
              image={employeeInfo?.profilePicture}
              name={employeeInfo?.name}
              className="size-10"
            />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm 2xl:text-base">
                  {employeeInfo?.name.charAt(0).toUpperCase() +
                    employeeInfo?.name.slice(1)}
                </p>
                <div className="px-2 py-0.5 rounded-full bg-primaryalpha/10 text-primary text-xs 2xl:text-sm font-medium">
                  EMP Id: {employeeInfo?.code}
                </div>
              </div>
              <p className="text-[10px] 2xl:text-xs text-grey">
                {employeeInfo?.designation}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-center p-2">
            <MonthlyCard
              month={selectedMonthYear.slice(0, 3)}
              year={selectedMonthYear}
              salary={salaryDateRange}
              isProcessed={true}
              employee={employeeId}
            />
            {!isSettled && !isSalaryHold && (
              <PayrollCasecader
                onchange={handleSelection}
                option={options}
                title="Salary Actions & Types"
              />
            )}
          </div>
        </div>

        <Flex justify="center" align="center">
          <FlexCol
            className={"w-full borderb rounded-xl bg-white p-2 dark:bg-dark"}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlexCol>
                <div className="text-center borderb bg-primary text-white p-2 font-bold rounded-md gap-2">
                  Earnings
                </div>
                <div className="borderb rounded-xl bg-white p-2 dark:bg-gray-700">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#F6F4FF] dark:bg-primaryalpha/50 rounded-md ">
                        <th className="p-2 text-left">Earnings Name</th>
                        <th className="p-2 text-right">Full</th>
                        <th className="p-2 text-right">Actual</th>
                      </tr>
                    </thead>
                    <tbody className="bg-[#FAFAFA] dark:bg-gray-700">
                      {earningsData.map((item) => (
                        <tr key={item.salaryTemplateId}>
                          <td className="p-2">{item.earningsName}</td>
                          <td className="p-2 text-right">
                            {companyDetails?.currency &&
                            companyDetails.currency.length > 1
                              ? `${item.amount
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${
                                  companyDetails.currency
                                }`
                              : `${companyDetails.currency} ${item.amount
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                          </td>
                          <td className="p-2 text-right">
                            {companyDetails?.currency &&
                            companyDetails.currency.length > 1
                              ? `${item.actual
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${
                                  companyDetails.currency
                                }`
                              : `${companyDetails.currency} ${item.actual
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                          </td>
                        </tr>
                      ))}
                      {workExpenseData.length > 0 && (
                        <>
                          <tr>
                            <td className="p-2 font-bold" colSpan="3">
                              WorkExpense
                            </td>
                          </tr>
                          {workExpenseData.map((item) => (
                            <tr key={item.employeeWorkExpenseId}>
                              <td className="p-2">{item.categoryName}</td>
                              <td className="p-2 text-right">
                                {companyDetails?.currency &&
                                companyDetails.currency.length > 1
                                  ? `${item.amount
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${
                                      companyDetails.currency
                                    }`
                                  : `${companyDetails.currency} ${item.amount
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                              </td>
                              <td className="p-2 text-right">
                                {" "}
                                {companyDetails?.currency &&
                                companyDetails.currency.length > 1
                                  ? `${item.amount
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${
                                      companyDetails.currency
                                    }`
                                  : `${companyDetails.currency} ${item.amount
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                              </td>
                            </tr>
                          ))}
                        </>
                      )}
                      {additionsData.length > 0 && (
                        <>
                          <tr>
                            <td className="p-2 font-bold" colSpan="3">
                              Additions
                            </td>
                          </tr>
                          {additionsData.map((item) => (
                            <tr key={item.employeeAdditionId}>
                              <td className="p-2">{item.additionName}</td>
                              <td className="p-2 text-right">
                                {" "}
                                {companyDetails?.currency &&
                                companyDetails.currency.length > 1
                                  ? `${item.amount
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${
                                      companyDetails.currency
                                    }`
                                  : `${companyDetails.currency} ${item.amount
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                              </td>
                              <td className="p-2 text-right">
                                {" "}
                                {companyDetails?.currency &&
                                companyDetails.currency.length > 1
                                  ? `${item.amount
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${
                                      companyDetails.currency
                                    }`
                                  : `${companyDetails.currency} ${item.amount
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                              </td>
                            </tr>
                          ))}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </FlexCol>

              <FlexCol>
                <div className="text-center borderb bg-primary text-white p-2 font-bold rounded-md gap-2">
                  Deductions
                </div>
                <div className="borderb rounded-xl bg-white p-2 dark:bg-gray-700">
                  <table className="w-full border-collapse">
                    <thead className="rounded-xl">
                      <tr className="bg-[#F6F4FF] dark:bg-primaryalpha/50 rounded-xl">
                        <th className="p-2">Deductions Name</th>
                        <th className="p-2 text-right">Actual</th>
                      </tr>
                    </thead>
                    <tbody className="bg-[#FAFAFA] dark:bg-gray-700 rounded-md text-center h-full">
                      {templateDeductions.map((item) => (
                        <tr key={item.salaryTemplateId}>
                          <td className="p-2">{item.deductionName}</td>
                          <td className="p-2 text-right">
                            {" "}
                            {companyDetails?.currency &&
                            companyDetails.currency.length > 1
                              ? `${item.amount
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${
                                  companyDetails.currency
                                }`
                              : `${companyDetails.currency} ${item.amount
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                          </td>
                        </tr>
                      ))}
                      {deductions.length > 0 && (
                        <>
                          <tr>
                            <td className="p-2 font-bold" colSpan="2">
                              Deductions
                            </td>
                          </tr>
                          {deductions.map((item) => (
                            <tr key={item.employeeDeductionId}>
                              <td className="p-2">{item.deductionName}</td>
                              <td className="p-2 text-right">
                                {" "}
                                {companyDetails?.currency &&
                                companyDetails.currency.length > 1
                                  ? `${item.amount
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${
                                      companyDetails.currency
                                    }`
                                  : `${companyDetails.currency} ${item.amount
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                              </td>
                            </tr>
                          ))}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </FlexCol>
            </div>

            <Flex
              gap={14}
              justify="space-between"
              align="center"
              className="w-full p-4 pr-4 borderb rounded-xl bg-white dark:bg-black"
            >
              <div className="flex flex-col sm:flex-row items-center w-full gap-3 mt-auto">
                <div className="flex flex-1 justify-between">
                  <p className="justify-start font-semibold text-xs 2xl:text-sm text-primaryalpha">
                    Gross Earnings
                  </p>
                  <p className="justify-end font-semibold text-xs 2xl:text-sm text-primaryalpha">
                    {companyDetails?.currency &&
                    companyDetails.currency.length > 1
                      ? `${totalEarnings
                          .toFixed(2)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${
                          companyDetails.currency
                        }`
                      : `${companyDetails.currency} ${totalEarnings
                          .toFixed(2)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                  </p>
                </div>
                <p className="text-grey hidden sm:block">{`|`}</p>
                <div className="flex flex-1 justify-between">
                  <p className="justify-start font-semibold text-xs 2xl:text-sm text-red-500">
                    Total Deductions
                  </p>
                  <p className="justify-end font-semibold text-xs 2xl:text-sm text-red-500">
                    {companyDetails?.currency &&
                    companyDetails.currency.length > 1
                      ? `${totalDeductions
                          .toFixed(2)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${
                          companyDetails.currency
                        }`
                      : `${companyDetails.currency} ${totalDeductions
                          .toFixed(2)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                  </p>
                </div>
              </div>
            </Flex>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between bordert pl-4 pt-4 pr-4">
                <p className="text-xs 2xl:text-sm font-medium">
                  Net Payable Amount{" "}
                  <span className="text-xs text-grey">
                    (Gross Earnings & Deductions)
                  </span>
                </p>
                <p className="text-[10px] 2xl:text-xs text-grey font-medium">
                  Total Payable Days : {payableDays}
                </p>
                <p className="text-sm 2xl:text-base font-semibold">
                  {/* {companyDetails.currency} {totalEarnings.toFixed(2) - totalDeductions.toFixed(2)} */}
                  {companyDetails?.currency &&
                  companyDetails.currency.length > 1
                    ? `${(totalEarnings.toFixed(2) - totalDeductions.toFixed(2))
                        .toFixed(2)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${
                        companyDetails.currency
                      }`
                    : `${companyDetails.currency} ${(
                        totalEarnings.toFixed(2) - totalDeductions.toFixed(2)
                      )
                        .toFixed(2)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                </p>
              </div>

              <div className="flex justify-between bordert pl-4 pt-4 pr-4">
                <p className="text-xs 2xl:text-sm font-medium">Adjustments</p>
                <p className="text-sm 2xl:text-base font-semibold">
                  {companyDetails?.currency &&
                  companyDetails.currency.length > 1
                    ? `${totalAdditions
                        .toFixed(2)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${
                        companyDetails.currency
                      }`
                    : `${companyDetails.currency} ${totalAdditions
                        .toFixed(2)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                </p>
              </div>

              <div className="flex justify-between bordert pl-4 pt-4 pr-4">
                <p className="text-xs 2xl:text-sm font-medium">Work Expense</p>
                <p className="text-sm 2xl:text-base font-semibold">
                  {companyDetails?.currency &&
                  companyDetails.currency.length > 1
                    ? `${totalWorkExpense
                        .toFixed(2)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${
                        companyDetails.currency
                      }`
                    : `${companyDetails.currency} ${totalWorkExpense
                        .toFixed(2)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                </p>
              </div>

              <div className="flex justify-between bordert pl-4 pt-4 pr-4">
                <p className="text-xs 2xl:text-sm font-medium">Payments</p>
                <p className="text-sm 2xl:text-base font-semibold">
                  {companyDetails?.currency &&
                  companyDetails.currency.length > 1
                    ? `${payments
                        .toFixed(2)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${
                        companyDetails.currency
                      }`
                    : `${companyDetails.currency} ${payments
                        .toFixed(2)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                </p>
              </div>

              <div className="flex justify-between bordert pl-4 pt-4 pr-4">
                <p className="text-xs 2xl:text-sm font-medium">Arrears</p>
                <p className="text-sm 2xl:text-base font-semibold">
                  {companyDetails?.currency &&
                  companyDetails.currency.length > 1
                    ? `${arrears
                        .toFixed(2)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${
                        companyDetails.currency
                      }`
                    : `${companyDetails.currency} ${arrears
                        .toFixed(2)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                </p>
              </div>

              <div className="flex justify-between bordert pl-4 pt-4 pr-4 mb-3">
                <p className="text-xs 2xl:text-sm font-medium text-red-500">
                  Due Amount
                </p>
                <p className="text-sm 2xl:text-base font-semibold text-red-500">
                  {companyDetails?.currency &&
                  companyDetails.currency.length > 1
                    ? `${paymentDue
                        .toFixed(2)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${
                        companyDetails.currency
                      }`
                    : `${companyDetails.currency} ${paymentDue
                        .toFixed(2)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                </p>
              </div>
            </div>
          </FlexCol>
        </Flex>
      </FlexCol>
      {allowancepop && (
        <AllowanceDrawer
          open={allowancepop}
          close={() => {
            setAllowance(false);
          }}
        />
      )}
      {bonus && (
        <BonusDrawer
          open={bonus}
          close={() => {
            setBonus(false);
          }}
        />
      )}
      {deduction && (
        <DeductionDrawer
          open={deduction}
          close={() => {
            setDeduction(false);
          }}
        />
      )}
      {dues && (
        <ClearDuesDrawer
          open={dues}
          close={() => {
            setDues(false);
          }}
        />
      )}
      {paymentsdraw && (
        <AddPaymentsDrawer
          open={paymentsdraw}
          close={() => {
            setPaymentsDraw(false);
          }}
        />
      )}
      {collectpay && (
        <CollectpaymentDrawer
          open={collectpay}
          close={() => {
            setCollectpay(false);
          }}
        />
      )}
      {showAddition && (
        <AddAdition
          open={showAddition}
          close={(e) => {
            setShowAddition(false);
            setOpenPop(null);
            // fetchSalaryTemplate();
            fetchAdjustmentsData();
          }}
          refresh={() => {
            // fetchSalaryTemplate();
            fetchAdjustmentsData();
          }}
          employeeId={employeeId}
          employeeName={employeeName}
        />
      )}

      {showDeduction && (
        <AddDeduction
          open={showDeduction}
          close={(e) => {
            setShowDeduction(false);
            setOpenPop(null);
            // fetchSalaryTemplate();
            fetchAdjustmentsData();
          }}
          refresh={() => {
            // fetchSalaryTemplate();
            fetchAdjustmentsData();
          }}
          employeeId={employeeId}
          employeeName={employeeName}
        />
      )}
    </DrawerPop>
  );
}
const MonthlyCard = ({ month, year, salary, isProcessed, employee }) => {
  const [isOpen, setIsOpen] = useState(false);

  const monthFullNames = {
    JAN: "January",
    FEB: "February",
    MAR: "March",
    APR: "April",
    MAY: "May",
    JUN: "June",
    JUL: "July",
    AUG: "August",
    SEP: "September",
    OCT: "October",
    NOV: "November",
    DEC: "December",
  };

  const fullMonthName = `${monthFullNames[month]} ${year}`;

  const toggleModal = (target) => {
    setIsOpen(target);
  };

  return (
    <>
      <div
        className={`borderb bg-white dark:bg-dark group justify-between flex items-center rounded-lg p-[6px] 2xl:p-[10px] transition-all duration-300 ${
          isProcessed
            ? "opacity-100 hover:bg-primaryalpha/15 cursor-pointer"
            : "bg-secondaryWhite"
        }`}
        onClick={() => isProcessed && toggleModal(true)}
      >
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-between">
            <Calender2 />
            <div className="rounded borderb h-10 w-full vhcenter absolute left-1/2 -translate-x-[51%] bottom-1/4 translate-y-[34%] blurcal">
              <h3 className="text-[10px] 2xl: lg:text-[10px] 2xl:text-xs font-medium ">
                {month}
              </h3>
            </div>
          </div>
          {isProcessed ? (
            <div className="flex flex-col gap-1.5">
              <p className="text-xs lg:text-[10px] 2xl:text-xs text-grey font-medium">
                <span className="text-black dark:text-white">{year}</span>
              </p>
              <p className="text-[10px] lg:text-[10px] 2xl:text-xs text-grey whitespace-nowrap">
                Duration: {salary}
              </p>
            </div>
          ) : (
            <p className="text-xs lg:text-[10px] 2xl:text-xs font-medium flex flex-col gap-2">
              <span>Not Processed</span>
            </p>
          )}
        </div>
      </div>
    </>
  );
};
