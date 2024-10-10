import React from "react";

function TotalAmount() {
  return (
    <div className="flex z-0 justify-between items-start mt-4 max-w-full text-sm font-medium leading-none w-[405px]">
      <div className="text-red-700 w-[406px]">
        <span className="text-xs italic">Discount:</span>{" "}
        <span className="font-bold text-red-700">-AED 200</span>
      </div>
      <div className="text-violet-600">
        Total Amount:{" "}
        <span className="font-bold text-violet-600"> AED 2000</span>
      </div>
    </div>
  );
}

export default TotalAmount;