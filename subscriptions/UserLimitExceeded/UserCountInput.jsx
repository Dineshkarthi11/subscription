import React from "react";

function UserCountInput() {
  return (
    <form className="flex z-0 flex-col mt-5 max-w-full text-sm leading-none w-[406px]">
      <div className="flex flex-col w-full">
        <label htmlFor="userCount" className="font-medium text-black">
          How many user you would like add?
        </label>
        <div className="flex overflow-hidden gap-2 items-center px-3.5 py-2.5 mt-2 w-full text-gray-500 bg-white rounded-lg border border-gray-300 border-solid">
          <input
            type="number"
            id="userCount"
            className="flex-1 shrink gap-2 self-stretch my-auto w-full min-w-[240px]"
            placeholder="Enter count here.."
            aria-label="Enter user count"
          />
        </div>
      </div>
    </form>
  );
}

export default UserCountInput;