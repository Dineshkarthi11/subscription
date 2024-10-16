import React, { useState } from "react";
import Invoice from "../../../../assets/images/Invoice.png";
import Uparrow from "../../../../assets/images/uparrow.png";
import Downarrow from "../../../../assets/images/downarrow.png";
import detailbg from "../../../../assets/images/detailbg.png";

function BillingHistoryItem({ date, orderId, isLatest, companyInfo, amount, invoiceFile }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`flex flex-col p-3.5 mt-6 w-full rounded-xl border border-solid ${
        isLatest ? "bg-slate-50" : "bg-slate-50"
      } border-gray-500 border-opacity-10 max-md:max-w-full cursor-pointer`}
      onClick={toggleExpand}
    >
      <div className="flex flex-wrap gap-5 justify-between w-full max-md:max-w-full">
        <div className="flex gap-4 items-center">
          <div className="font-bold text-black text-sm">{date}</div>
          {isLatest && <div className="text-gray-500 text-xs">Latest Payment</div>}
        </div>
        <div className="flex items-center gap-4 font-medium max-md:flex-col max-md:items-start">
          <div className="my-auto text-sm text-black">Order ID: {orderId}</div>
          <div className="flex items-center gap-2 max-md:gap-1">
            <button
              className="flex items-center px-4 py-2 text-sm bg-white rounded-lg border border-solid shadow-sm border-black border-opacity-10 text-stone-950 max-md:px-3 max-md:py-2 max-md:text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                loading="lazy"
                src={Invoice}
                alt="Download Invoice"
                className="object-contain w-5 h-5"
              />
              <span className="ml-2">Download Invoice</span>
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
                className="w-6 max-md:w-4"
              />
            </button>
          </div>
        </div>
      </div>
      <div
        className={`transition-all duration-700 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-[500px]" : "max-h-0"
        }`} // Adjust max height based on content
      >
        {isExpanded && companyInfo && (
          <div className="relative w-full rounded-lg overflow-hidden">
            <img
              src={detailbg}
              alt="Details Background"
              className="absolute inset-0 w-full h-full object-fill"
              style={{ minHeight: "110%", height: "auto" }}
            />
            <div className="relative z-10 p-3 bg-opacity-80">
              <div className="ml-6 my-4 text-gray-500 text-xs">Company Information</div>
              <div className="relative mx-6 lg:mr-[60%] my-10 mr-0 overflow-y-auto space-y-2 text-sm max-md:text-xs">
                <div className="flex">
                  <span className="whitespace-nowrap w-28">Company:</span>
                  <span className="flex-grow text-right">{companyInfo.company}</span>
                </div>
                <div className="flex">
                  <span className="whitespace-nowrap w-28">Email:</span>
                  <span className="flex-grow text-right">{companyInfo.email}</span>
                </div>
                <div className="flex">
                  <span className="whitespace-nowrap w-28">Phone:</span>
                  <span className="flex-grow text-right">{companyInfo.phone}</span>
                </div>
                <div className="flex">
                  <span className="whitespace-nowrap w-28">Invoice Amount:</span>
                  <span className="flex-grow text-right">{amount} AED</span>
                </div>
                <div className="flex">
                  <span className="whitespace-nowrap w-28">Invoice File:</span>
                  <a href={invoiceFile} target="_blank" rel="noopener noreferrer" className="flex-grow text-right">
                    View Invoice
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BillingHistoryItem;
