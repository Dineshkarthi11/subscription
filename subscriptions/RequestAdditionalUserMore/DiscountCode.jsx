import React from "react";
import coupon from "../../../../assets/images/coupon.png";
import tick from "../../../../assets/images/tick.png";

function DiscountCode() {
  return (
    <div className="flex flex-col mt-3.5 w-full min-h-[53px]">
      <div className="flex overflow-hidden gap-10 justify-between items-center px-3.5 py-4 w-full rounded-lg border border-gray-300 border-dashed bg-zinc-50 min-h-[53px]">
        <div className="flex gap-2 items-center self-stretch my-auto text-sm font-medium leading-none whitespace-nowrap text-neutral-700">
          <img
            loading="lazy"
            src={coupon}
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
            alt=""
          />
          <span className="gap-2 self-stretch my-auto">LT-34352</span>
        </div>
        <div className="flex gap-1 items-center self-stretch my-auto">
          <div className="flex overflow-hidden gap-2.5 items-center self-stretch p-0.5 my-auto w-5">
            <img
              loading="lazy"
              src={tick}
              className="object-contain self-stretch my-auto w-4 aspect-[0.94]"
              alt=""
            />
          </div>
          <span className="self-stretch my-auto text-xs font-medium leading-loose text-violet-600">
            Applied!
          </span>
        </div>
      </div>
    </div>
  );
}

export default DiscountCode;