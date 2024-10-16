import React, { useEffect, useState } from "react";
import PayrollsettingsHeader from "./PayrollsettingsHeader";
import PayrollTableAnt from "./PayrollTableAnt";
import PAYROLLAPI, { action } from "../PayRollApi";

export default function PayrollSettingsTable({
  heading,
  buttonName,
  BtnType,
  header,
  payrollSettings,
  path,
  data,
  deleteApi,
  actionID,
  updateApi,
  downloadApi,
  cursorPointer,
  clickDrawer = () => {},
  refresh = () => {},
}) {
  const [tableData, setTableData] = useState([]);
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
  useEffect(() => {
    // console.log(data, "data");
  }, [data]);

  return (
    <>
      <div>
        <PayrollsettingsHeader
          heading={heading}
          buttonName={buttonName}
          BtnType={BtnType}
          path={path}
          refresh={() => {
            refresh();
          }}
          data={data}
          actionID={actionID}
        />
      </div>

      <div className="mt-1">
        <PayrollTableAnt
          header={header}
          payrollSettings={payrollSettings}
          path={path}
          data={data}
          deleteApi={deleteApi}
          downloadApi={downloadApi}
          actionID={actionID}
          updateApi={updateApi}
          clickDrawer={clickDrawer}
          refresh={() => {
            refresh();
          }}
          cursorPointer={cursorPointer}
        />
      </div>
    </>
  );
}
