import React from "react";
import Userslogo from "../../../../assets/images/Userslogo.png";

function UserCountInput() {
  return (
    <div className="flex z-0 flex-col mt-4 max-w-full w-[405px]">
      <div className="flex flex-col w-full">
        <label htmlFor="userCount" className="text-xs font-medium leading-loose text-black">
          User Count
        </label>
        <div className="flex overflow-hidden gap-2 items-center px-3.5 py-2.5 mt-1.5 w-full text-sm leading-none text-gray-500 bg-white rounded-lg border border-gray-300 border-solid">
          <img loading="lazy" src={Userslogo} alt="" />
          <input
            type="text"
            id="userCount"
            className="flex-1 shrink gap-2 self-stretch my-auto min-w-[240px] bg-transparent border-none outline-none"
            placeholder="Enter count here.."
          />
        </div>
      </div>
    </div>
  );
}

export default UserCountInput;