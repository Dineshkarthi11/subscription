import React from "react";

function TotalAmount() {
  return (
    <div className="flex z-0 justify-between items-start mt-4 max-w-full text-sm font-medium leading-none w-full">
      <div className="text-red-700 w-[406px]">
        <span className="text-xs italic text-gray-400">Discount:</span>{" "}
        <span className="font-bold text-red-700">-AED 200</span>
      </div>
      <div className="text-gray-400 whitespace-nowrap">
            Total Amount: <span className="mr-1 font-bold text-violet-600"> AED 2000</span>
       </div>

    </div>
  );
}

export default TotalAmount;