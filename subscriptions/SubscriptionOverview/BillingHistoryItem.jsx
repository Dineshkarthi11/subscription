import React, { useState } from "react";
import detailbg from "../../../../assets/images/detailbg.png";

function BillingHistoryItem({ date, orderId, isLatest, planDetails }) {
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
      {isLatest && isExpanded && planDetails && (
        <div className="relative w-full rounded-lg overflow-hidden">
          <img
            src={detailbg}
            alt="Plan Details Background"
            className="absolute inset-0 w-full h-full object-contain"
            style={{ minHeight: "100%", height: "auto" }}
          />
          <div className="relative z-10 p-3 bg-opacity-80">
            <div className="ml-6 my-4 text-gray-500 text-xs">Plan details</div>
            <div className="relative my-10 overflow-y-auto">
              {planDetails.map((detail, index) => (
                <div key={index} className="flex my-6 justify-between text-sm mx-6 mt-2">
                  <div className="truncate">{detail.label}</div>
                  <div className="truncate mx-[40%]">{detail.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BillingHistoryItem;
