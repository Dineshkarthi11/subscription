import React from "react";
import Userslogo from "../../../../assets/images/Userslogo.png";

function UserSearch() {
  return (
    <div className="flex flex-col w-full">
      {/* Active and Non-Active Users Section */}
      <div className="flex gap-2.5 items-center p-1 w-full rounded-lg border border-solid bg-neutral-100 border-stone-300 border-opacity-10">
        {/* Active Users */}
        <div className="flex flex-1 items-center font-semibold rounded-lg min-w-[240px]">
          <div className="flex items-center gap-2 px-3 py-2 w-full bg-white rounded-lg border border-solid shadow-sm border-black border-opacity-10 min-w-[200px]">
            <div className="text-sm text-neutral-900">Active Users</div>
            <div className="px-2 py-1 text-xs text-white bg-violet-500 rounded">
              50
            </div>
          </div>
        </div>

        {/* Non-Active Users */}
        <div className="flex flex-1 items-center text-sm font-medium text-zinc-500 min-w-[240px]">
          <div className="flex items-center px-3 py-2 w-full rounded-lg min-w-[200px]">
            Non-Active Users
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="flex flex-col mt-4 w-full">
        <div className="flex items-center px-3.5 py-2 w-full bg-white rounded-lg border border-gray-300 shadow-sm">
          <img
            loading="lazy"
            src={Userslogo}
            alt=""
            className="object-contain w-5"
          />
          <label htmlFor="searchEmployees" className="sr-only">
            Search Employees
          </label>
          <input
            id="searchEmployees"
            type="text"
            placeholder="Search Employees"
            className="flex-1 ml-2 bg-transparent border-none focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

export default UserSearch;
