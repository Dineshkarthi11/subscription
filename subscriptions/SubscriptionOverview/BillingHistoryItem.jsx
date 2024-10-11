import React, { useState } from "react";
import detailbg from "../../../../assets/images/detailbg.png";

function BillingHistoryItem({ date, orderId, isLatest, companyInfo }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`flex overflow-hidden flex-col p-3.5 mt-6 w-full rounded-xl border border-solid ${
        isLatest ? "bg-slate-50" : "bg-slate-50"
      } border-gray-500 border-opacity-10 max-md:max-w-full cursor-pointer`}
      onClick={toggleExpand}
    >
      <div className="flex flex-wrap gap-5 justify-between ml-2.5 w-full max-md:max-w-full">
        <div className="flex gap-4 items-center">
          <div className="font-bold text-black text-sm">{date}</div>
          {isLatest && (
            <div className="text-gray-500 text-xs">Latest Payment</div>
          )}
        </div>
        <div className="flex gap-4 font-medium">
          <div className="grow my-auto text-sm text-black">
            Order ID: {orderId}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand();
            }}
          >
            <img
              src={
                isExpanded
                  ? "https://github.com/Dineshkarthi11/loyaltri/blob/main/assets/up.png?raw=true"
                  : "https://github.com/Dineshkarthi11/loyaltri/blob/main/assets/down.png?raw=true"
              }
              alt="Toggle"
              className="w-8"
            />
          </button>
        </div>
      </div>
      {isLatest && isExpanded && companyInfo && (
        <div className="relative w-full rounded-lg overflow-hidden">
          <img
            src={detailbg}
            alt="Details Background"
            className="absolute inset-0 w-full h-full object-contain"
            style={{ minHeight: "100%", height: "auto" }}
          />
          <div className="relative z-10 p-3 bg-opacity-80">
            {/* Company Information */}
            <div className="ml-6 my-4 text-gray-500 text-xs">Company Information</div>
            <div className="flex justify-between mx-6 mt-2 text-sm">
              <div>Company:</div>
              <div>{companyInfo.company}</div>
            </div>
            <div className="flex justify-between mx-6 mt-2 text-sm">
              <div>Email:</div>
              <div>{companyInfo.email}</div>
            </div>
            <div className="flex justify-between mx-6 mt-2 text-sm">
              <div>Phone:</div>
              <div>{companyInfo.phone}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BillingHistoryItem;











import React, { useState } from "react";
import Heading from "../../common/Heading";
import ButtonClick from "../../common/Button";
import TableAnt from "../../common/TableAnt";
import InitiateTransfer from "../InitiateTransfer";
import PopImg from "../../../assets/images/EmpLeaveRequest.svg";
import ModalAnt from "../../common/ModalAnt";
import Avatar from "../../common/Avatar";
import { GoDotFill } from "react-icons/go";
import { useTranslation } from "react-i18next";
import Transfer from "../../../assets/images/transfer.png";
import { render } from "@testing-library/react";
import { WidthFull } from "@mui/icons-material";

export default function TransferEmployee() {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  const [modalData, setModalData] = useState();
  const [viewModal, setViewModal] = useState(false);
  const [approvePop, setApprovePop] = useState(false);
  const [transferList, SetTransferList] = useState([
    {
      fullName: "Alexander",
      code: "# 4534",
      profilePicture:
        "https://r2.erweima.ai/imgcompressed/img/compressed_95f6dc695351dbb5cf511ee473897718.webp",
      previousBranch: "New York office",
      newBranch: "Chicago office",
      requestedDate: "2024-09-24",
      transferDate: "2024-09-24",
      days: "30",
      requestStatusName: "Pending",
      requestStatusColour: "#EBA900",
      mainStatus: "Pending",
      mainStatusColor: "#EBA900",
    },
    {
      fullName: "Noel",
      code: "# 4534",
      previousBranch: "London office",
      newBranch: "Bangalore",
      requestedDate: "2024-09-24",
      transferDate: "2024-09-24",
      days: "12",
      requestStatusName: "Rejected",
      requestStatusColour: "#EB1100",
      mainStatus: "Rejected",
      mainStatusColor: "#EB1100",
    },
    {
      fullName: "Khadija",
      code: "# 4534",
      previousBranch: "Singapore",
      newBranch: "Tokiyo",
      requestedDate: "2024-09-24",
      transferDate: "2024-09-24",
      days: "4",
      requestStatusName: "Approved",
      requestStatusColour: "#027A48",
      mainStatus: "Approved",
      mainStatusColor: "#027A48",
    },
  ]);

  const header = [
    {
      Transfer_Employee_List: [
        {
          id: 1,
          title: t("Employee Name"),
          value: ["fullName", "code"],
          flexColumn: true,
          logo: true,
          bold: true,
          fixed: "left",
        },
        {
          id: 2,
          title: t("Previous Branch"),
          value: "previousBranch",
        },
        {
          id: 3,
          title: t("New Branch"),
          value: "newBranch",
        },
        {
          id: 4,
          title: "Requested On",
          value: "requestedDate",
        },
        {
          id: 5,
          title: t("Transfer Date"),
          value: "transferDate",
        },
        // {
        //   id: 5,
        //   title: "Status",
        //   value: "isActive",
        //   alterValue: "isActive",
        // },
        {
          id: 6,
          title: "Status",
          value: "requestStatusName",
          status: true,
          colour: "requestStatusColour",
          mainStatus: "mainStatus",
          mainStatusColor: "mainStatusColor",
          dotsVertical: true,
          // fixed: "right",
        },
        {
          id: 7,
          title: "",
          Width: 80,
          fixed: "right",
          render: (record, text) => {
            const isStatusTrue = record.mainStatus === "Pending";
            return (
              isStatusTrue && (
                <ButtonClick
                  buttonName={"Approve"}
                  handleSubmit={() => setApprovePop(true)}
                />
              )
            );
          },
        },

        // {
        //   id: 7,
        //   title: "",
        //   value: "action",
        //   fixed: "right",
        //   dotsVertical: true,
        //   width: 50,
        //   dotsVerticalContent: [
        //     {
        //       title: "Update",
        //       value: "updateLeave",
        //       customField: "employee",
        //     },
        //     {
        //       title: "Delete",
        //       value: "delete",
        //       confirm: true,
        //     },
        //   ],
        // },
      ],
    },
  ];
  return (
    <div className={w-full flex flex-col gap-6}>
      <div className="flex justify-between p-2">
        <Heading
          title="Branch Transfer"
          description="Manage employee transfers between company branches, including location, role, and department changes."
        />
        <ButtonClick
          handleSubmit={() => {
            setShow(true);
          }}
          BtnType="primary"
          buttonName="Initiate Transfer"
        />
      </div>

      <TableAnt
        data={transferList}
        header={header}
        actionID="leaveTypeId"
        //updateApi={}
        //deleteApi={}
        path="Transfer_Employee_List"
        //referesh={() => {

        //}}
        viewOutside={true}
        viewClick={(e, text) => {
          setModalData(text);
          setViewModal(true);
        }}
        clickDrawer={(e, actionId, text) => {
          setApprovePop(true);
        }}
      />

      {/* {show && ( */}
      <InitiateTransfer
        open={show}
        close={() => {
          setShow(false);
        }}
      />
      {/* )} */}
      <ModalAnt
        isVisible={approvePop}
        onClose={() => {
          setApprovePop(false);
        }}
        // width="435px"
        showCancelButton={true}
        cancelButtonClass="w-full"
        showTitle={false}
        centered={true}
        padding="8px"
        showOkButton={true}
        okText={"Approve Transfer"}
        // okButtonDanger
        okButtonClass="w-full"
        onOk={() => console.log("hi")} // write submit logic
      >
        <div className="flex flex-col gap-2.5 md:w-[445px] 2xl:w-[506px] p-2">
          <div className="flex flex-col gap-2.5 items-center m-auto">
            <div className="border-2 border-[#FFFFFF] size-14 2xl:size-[60px] rounded-full flex items-center justify-center bg-primaryalpha/10">
              <img src={Transfer} alt="" className="rounded-full w-[28px]" />
            </div>
            <p className="font-semibold text-[17px] 2xl:text-[19px]">
              Approve Employee Transfer
            </p>
          </div>
          <div className="m-auto">
            <div className="text-center text-xs 2xl:text-sm text-gray-500">
              Are you sure you want to approve the transfer of{" "}
              <span className="text-primary font-medium">Alexandar Paul</span>{" "}
              from{" "}
              <span className="font-medium text-black">NewYork office</span> to{" "}
              <span className="font-medium text-black">Chicago office</span>?
            </div>
          </div>
        </div>
      </ModalAnt>
      <ModalAnt
        isVisible={viewModal}
        onClose={() => setViewModal(false)}
        // width="435px"
        showOkButton={false}
        showCancelButton={false}
        showTitle={false}
        centered={true}
        padding="8px"
      >
        <div className="flex flex-col gap-2.5 md:w-[445px] 2xl:w-[553px] p-2">
          <div className="flex flex-col gap-2.5 items-center m-auto">
            <div className="border-2 border-[#FFFFFF] size-14 2xl:size-[60px] rounded-full flex items-center justify-center bg-primaryalpha/10">
              <img src={PopImg} alt="Img" className="rounded-full w-[28px]" />
            </div>
            <div className="font-semibold text-[17px] 2xl:text-[19px]">
              Branch Transfer Details
            </div>
          </div>
          <div className="m-auto">
            <div className="text-center text-xs 2xl:text-sm text-gray-500">
              Manage employee transfers between company branches, including
              location, role and department changes.
            </div>
          </div>
          <div className="max-h-[320px] overflow-auto flex flex-col gap-3 pt-2 pr-1.5">
            <div className="flex flex-col gap-4 borderb rounded-lg p-3 bg-[#F9F9F9] dark:bg-dark">
              <div className="flex items-center gap-2">
                <Avatar
                  image={modalData?.profilePicture}
                  name={modalData?.fullName}
                  className="border-2 border-white shadow-md"
                />
                <div className="flex flex-col gap-0.5">
                  <div className="font-medium text-xs 2xl:text-sm">
                    {modalData?.fullName.charAt(0).toUpperCase() +
                      modalData?.fullName.slice(1).toLowerCase()}
                  </div>
                  <div className="text-[10px] 2xl:text-xs text-grey">
                    Emp Id : {modalData?.code}
                  </div>
                </div>
              </div>
              <div className="divider-h"></div>
              <div className="grid grid-cols-3 justify-evenly gap-4">
                <div className="flex flex-col gap-0.5">
                  <div className="text-xs 2xl:text-sm text-grey">
                    Previous Branch
                  </div>
                  <div className="text-xs 2xl:text-sm font-semibold">
                    {modalData?.previousBranch}
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="text-xs 2xl:text-sm text-grey">
                    New Branch
                  </div>
                  <div className="text-xs 2xl:text-sm font-semibold">
                    {modalData?.newBranch}
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="text-xs 2xl:text-sm text-grey">
                    Requested Date
                  </div>
                  <div className="text-xs 2xl:text-sm font-semibold">
                    {modalData?.requestedDate}
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="text-xs 2xl:text-sm text-grey">
                    Transfer Date
                  </div>
                  <div className="text-xs 2xl:text-sm font-semibold">
                    {modalData?.transferDate}
                  </div>
                </div>
                <div className="flex flex-col gap-0.5 col-span-2">
                  <div className="flex items-start gap-1">
                    <div className="text-xs 2xl:text-sm text-grey">
                      Transfer Timeline
                    </div>
                    <div className="text-xs text-grey italic">
                      (estimate hand over time)
                    </div>
                  </div>
                  <div className="text-xs 2xl:text-sm font-semibold">
                    {${modalData?.days} Days}
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="text-xs 2xl:text-sm text-grey">Status</div>
                  <div
                    className={flex items-center justify-center gap-1 w-[90px] h-[20px] 2xl:w-[98px] 2xl:h-[24px] rounded-full ${
                      modalData?.requestStatusName === "Pending"
                        ? "bg-orange-100 text-orange-600"
                        : modalData?.requestStatusName === "Rejected"
                        ? " bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }}
                  >
                    <GoDotFill size={14} />
                    <div className="font-medium text-xs 2xl:text-sm">
                      {modalData?.requestStatusName}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalAnt>
    </div>
  );
}


{
    "action": "getCompaniesByLocation",
    "method": "POST",
    "kwargs": {
        "employeeId": "5535",
        "location": "2"
        // "assetrecovery": 1
    }
}
 
action:saveUpdateTransferDetails This is file handler

jsonParams
 
{ "employeeTransferId": "14",
"employeeId": "5546",
"companyId": "22",
"transferType":2,
"transferReason":1,
"transferLocation":1,
"companyFrom":12,
"companyTo":32,
"transferDate":"2024-08-10",
"feedBack":"SVGFDSBGFDB",
"createdBy":1,
"employeeCompanyDetails":{
"designationId":13,
"departmentId":21,
"reportsTo":5703,
"shiftSchemeId":52,
"timeInOutPolicy":7,
"overtimePolicy":5,
"shortTimePolicy":6,
"missPunchPolicy":3
 
}
}
 

here i sending the apis that  you have to integrate in your code
 
{
    "action": "getAllTransferDetails",
    "method": "POST",
    "kwargs": {
        "companyId": "22"
       
    }
}
 
api url : https://dev-api.loyaltri.com/api/main

ive given all he codes give me the fetch api key and show the details with exact same design

dont modify any designs i want exact same design
