import React, { useState } from "react";
import Invoice from "../../../../assets/images/Invoice.png";
import Uparrow from "../../../../assets/images/uparrow.png"
import Downarrow from "../../../../assets/images/downarrow.png"
import detailbg from "../../../../assets/images/detailbg.png";

function BillingHistoryItem({ date, orderId, isLatest, planDetails, companyInfo, amount, invoiceFile }) {
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
          {isLatest && <div className="text-gray-500 text-xs">Latest Payment</div>}
        </div>
        <div className="flex gap-4 font-medium">
          <div className="grow my-auto text-sm text-black">Order ID: {orderId}</div>
          <div className="flex items-center gap-4">
            <button
              className="flex overflow-hidden gap-2 justify-center items-center px-5 py-3.5 text-base bg-white rounded-lg border border-solid shadow-sm border-black border-opacity-10 text-stone-950"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                loading="lazy"
                src={Invoice}
                alt="Download Invoice"
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
              />
              Download Invoice
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevents the entire card's toggle
                toggleExpand();
              }}
            >
              <img
               src={isExpanded ? Uparrow : Downarrow}
               alt="Toggle"
               className="w-8"
            />

            </button>
          </div>
        </div>
      </div>
      {isExpanded && companyInfo && (
        <div className="relative w-full rounded-lg overflow-hidden">
          <img
            src={detailbg}
            alt="Details Background"
            className="absolute inset-0 w-full h-full object-contain"
            style={{ minHeight: "110%", height: "auto" }}
          />
          <div className="relative z-10 p-3 bg-opacity-80">
            <div className="ml-6 my-4 text-gray-500 text-xs">Company Information</div>
            <div className="relative mr-[60%] my-10 overflow-y-auto">
              <div className="flex justify-between mx-6 mt-2 text-sm">
                <div>Company:</div>
                <div>{companyInfo.company}</div>
              </div>
              <div className="flex justify-between mx-6 mt-2 text-sm">
                <div>Email:</div>
                <div >{companyInfo.email}</div>
              </div>
              <div className="flex justify-between mx-6 mt-2 text-sm">
                <div>Phone:</div>
                <div>{companyInfo.phone}</div>
              </div>
              <div className="flex justify-between mx-6 mt-2 text-sm">
                <div>Invoice Amount:</div>
                <div>{amount} AED</div>
              </div>
              <div className="flex justify-between mx-6 mt-2 text-sm">
                <div>Invoice File:</div>
                <a href={invoiceFile} target="_blank" rel="noopener noreferrer">
                  View Invoice
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BillingHistoryItem;
