import React from "react";
import Info from "../../../../assets/images/Info.png";

function SupportMessage() {
  return (
    <div className="flex z-0 gap-1.5 items-start mt-5 max-w-full text-xs text-gray-500 w-[406px]">
      <img
        loading="lazy"
        src={Info}
        className="object-contain shrink-0 w-5 aspect-square"
        alt=""
      />
      <p className="w-[378px]">
        Submitting this request will notify Loyaltri Support, and they'll reach
        out within 24 hours.
      </p>
    </div>
  );
}

export default SupportMessage;