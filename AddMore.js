import React from "react";
import { IoMdAdd } from "react-icons/io";

export default function AddMore({
  name = " ",
  className = "",
  change = () => {},
  icon = <IoMdAdd className=" opacity-50" />,
}) {
  return (
    <div
      className={`flex justify-start items-center gap-[9px] cursor-pointer group ${className}`}
      onClick={(e) => {
        change(e);
      }}
    >
      <div className="group-hover:bg-primary  group-hover:text-white  bg-slate-300 rounded-full text-xl p-1 opacity-60  font-medium">
        {icon}
      </div>

      <p className="text-sm  font-semibold text-gray-400 dark:text-grey">
        {name}
      </p>
    </div>
  );
}
