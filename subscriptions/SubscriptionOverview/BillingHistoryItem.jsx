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
