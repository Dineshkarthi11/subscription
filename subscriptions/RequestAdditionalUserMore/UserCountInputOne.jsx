import React from "react";
import Userslogo from "../../../../assets/images/Userslogo.png";

function UserCountInputOne() {
  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor="userCount"
        className="text-xs font-medium leading-loose text-black"
      >
        User Count
      </label>
      <div className="flex overflow-hidden gap-2 items-center px-3.5 py-2.5 mt-1.5 w-full text-sm font-bold leading-none whitespace-nowrap bg-white rounded-lg border border-gray-300 border-solid text-zinc-800">
        <img
          loading="lazy"
          src={Userslogo}
          alt=""
        />
        <input
          type="number"
          id="userCount"
          className="flex-1 shrink gap-2 self-stretch my-auto min-w-[240px] bg-transparent border-none"
          value="30"
          aria-label="User Count"
        />
      </div>
    </div>
  );
}

export default UserCountInputOne;