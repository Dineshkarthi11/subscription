import React from "react";

function SendRequestButton() {
  return (
    <div className="flex z-0 gap-3 items-start mt-5 max-w-full text-sm font-semibold leading-6 text-white w-[406px]">
      <button className="flex flex-1 shrink items-start w-full rounded-lg basis-0 min-w-[240px]">
        <span className="overflow-hidden flex-1 shrink gap-2 self-stretch px-5 py-2.5 w-full bg-violet-600 rounded-lg border border-violet-600 border-solid shadow-sm min-w-[240px]">
          Send Request
        </span>
      </button>
    </div>
  );
}

export default SendRequestButton;