import React, { useState } from "react";
import Uparrow from "../assets/arrow-up.svg"; // Replace with your actual import paths
import Downarrow from "../assets/arrow-down.svg";
import Invoice from "../assets/invoice.svg";
import detailbg from "../assets/detailbg.svg"; // Background image for expanded details

function BillingHistoryItem({ date, orderId, isLatest }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`flex flex-col p-3.5 mt-6 w-full rounded-xl border border-solid border-gray-500 border-opacity-10 max-md:p-2.5 max-lg:mt-4 cursor-pointer`}
      onClick={toggleExpand}
    >
      <div className="flex flex-wrap gap-5 justify-between w-full max-md:gap-3 max-lg:gap-4">
        {/* Date and Order ID */}
        <div className="flex gap-4 items-center">
          <div className="font-bold text-black text-sm">{date}</div>
          {isLatest && <div className="text-gray-500 text-xs">Latest Payment</div>}
        </div>

        {/* Order ID, Invoice button, and Toggle button */}
        <div className="flex gap-4 font-medium">
          <div className="grow my-auto text-sm text-black">Order ID: {orderId}</div>
          <div className="flex items-center gap-4">
            {/* Download Invoice button */}
            <button className="flex gap-2 justify-center items-center px-5 py-3.5 text-base bg-white rounded-lg border border-solid shadow-sm border-black border-opacity-10 text-stone-950 max-md:px-3 max-md:py-2">
              <img loading="lazy" src={Invoice} alt="Download Invoice" className="w-6 aspect-square" />
              Download Invoice
            </button>

            {/* Expand/Collapse button */}
            <button onClick={(e) => { e.stopPropagation(); toggleExpand(); }}>
              <img src={isExpanded ? Uparrow : Downarrow} alt="Toggle" className="w-8 max-md:w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded section */}
      {isExpanded && (
        <div className="relative w-full rounded-lg overflow-hidden mt-4">
          <img
            src={detailbg}
            alt="Details Background"
            className="absolute inset-0 w-full h-full object-contain"
            style={{ minHeight: "110%", height: "auto" }}
          />
          <div className="relative z-10 p-3 bg-opacity-80 max-md:p-2">
            <div className="text-xs text-gray-500 mt-4 max-md:mt-2">Company Information</div>
            {/* Add more expanded details content here */}
            <p className="text-sm text-black">Additional details about the order and company...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BillingHistoryItem;
