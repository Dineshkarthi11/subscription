import React, { useState } from "react";
import SearchBox from "./SearchBox";
import { FilterBtn } from "./FilterButton";
import ButtonClick from "./Button";
 
import AddBankAccount from "../Organisation/Payroll/SettingsPayroll/BankAccount/AddBankAccount";
import AddExchangeHouse from "../Organisation/Payroll/SettingsPayroll/BankAccount/AddExchangeHouse";
 
import CreateEarnings from "../Organisation/Payroll/SettingsPayroll/SalaryComponent/CreateEarnings";
import CreateVariablePays from "../Organisation/Payroll/SettingsPayroll/SalaryComponent/CreateVariablePays";
import CreateAdditions from "../Organisation/Payroll/SettingsPayroll/SalaryComponent/CreateAdditions";
import CreateDeductions from "../Organisation/Payroll/SettingsPayroll/SalaryComponent/CreateDeductions";
 
import CreateFinalSettlements from "../Organisation/Payroll/SettingsPayroll/FinalSettlements/CreateFinalSettlements";
import CreateGrativityChanges from "../Organisation/Payroll/SettingsPayroll/FinalSettlements/CreateGrativityChanges";
 
import CreateLoanSettings from "../Organisation/Payroll/SettingsPayroll/LoanSettings/CreateLoanSettings";
import CreateSalaryTemplate from "../Organisation/Payroll/SettingsPayroll/SalaryTemplateBuilder/CreateSalaryTemplate";
import Addnewsalary from "../Organisation/Payroll/SettingsPayroll/SalaryComponent/AddNewsalary";
 
export default function PayrollsettingsHeader({
  heading,
  buttonName,
  BtnType,
  path,
  refresh = () => {},
  data = {},
  actionID
}) {
  // console.log(data, "data in header component");
 
  const [show, setShow] = useState(false);
  const [openPop, setOpenPop] = useState("");
 
  return (
    <div className="flex items-center">
      <div className="dark:text-white">
        <p className="text-lg font-semibold dark:text-white">{heading}</p>
      </div>
      {/* <div className="ml-3">
        <SearchBox data={data} placeholder="Search here...."  />
      </div> */}
 
      <div className="ltr:ml-auto rtl:mr-auto">
        <div className="flex items-center gap-2">
          {/* <div>
            <FilterBtn />
          </div> */}
          <div className="ml-4  ">
            {buttonName && (
              <ButtonClick
                buttonName={buttonName}
                BtnType={BtnType}
                handleSubmit={() => {
                  // console.log("show", path);
                  setOpenPop(path);
                  setShow(true);
                }}
              />
            )}
          </div>
        </div>
      </div>
 
      {path === "bankSettings" && show && (
        <AddBankAccount
          open={show}
          close={(e) => {
            setShow(e);
          }}
          refresh={refresh}
          actionID={actionID}
        />
      )}
      {openPop === "exchangeHouse" && show && (
        <AddExchangeHouse
          open={show}
          close={(e) => {
            setShow(e);
          }}
          refresh={refresh}
          actionID={actionID}
        />
      )}
      {openPop === "earnings" && show && (
        <CreateEarnings
          open={show}
          close={(e) => {
            setShow(e);
          }}
          refresh={refresh}
          actionID={actionID}
        />
      )}
      {path === "earningsind" && show && (
        <Addnewsalary
          open={show}
          close={(e) => {
            setShow(e);
          }}
          refresh={refresh}
          actionID={actionID}
        />
      )}
      {openPop === "variablePays" && show && (
        <CreateVariablePays
          open={show}
          close={(e) => {
            setShow(e);
          }}
          refresh={refresh}
          actionID={actionID}
        />
      )}
      {openPop === "additions" && show && (
        <CreateAdditions
          open={show}
          close={(e) => {
            setShow(e);
          }}
          refresh={refresh}
          actionID={actionID}
        />
      )}
      {openPop === "deductions" && show && (
        <CreateDeductions
          open={show}
          close={(e) => {
            setShow(e);
          }}
          refresh={refresh}
          actionID={actionID}
        />
      )}
      {openPop === "finalSettlements" && show && (
        <CreateFinalSettlements
          open={show}
          close={(e) => {
            setShow(e);
          }}
          refresh={refresh}
          actionID={actionID}
        />
      )}
      {openPop === "gratuitySettings" && show && (
        <CreateGrativityChanges
          open={show}
          close={(e) => {
            setShow(e);
          }}
          refresh={refresh}
          actionID={actionID}
        />
      )}
      {openPop === "EmployeeLoanSettings" && show && (
        <CreateLoanSettings
          open={show}
          close={(e) => {
            setShow(e);
          }}
          refresh={refresh}
          actionID={actionID}
        />
      )}
 
      {openPop === "salaryTemplateBuilder" && show && (
        <CreateSalaryTemplate
          open={show}
          close={(e) => {
            setShow(e);
          }}
          refresh={refresh}
          actionID={actionID}
        />
      )}
    </div>
  );
}
 