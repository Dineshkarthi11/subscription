import React from "react";

function HeaderActive({ handleClose }) {
  return (
    <header className="flex flex-wrap gap-2 items-center w-full">
      <div className="flex items-center p-2 my-auto rounded-3xl bg-zinc-100 h-[43px] w-[43px] cursor-pointer" onClick={handleClose}> {/* Close action */}
        <img
          loading="lazy"
          src=""
          alt="Close"
          className="object-contain w-[30px]"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <h1 className="text-xl font-semibold text-black">
          Active and Inactive Users
        </h1>
        <p className="mt-1 text-base text-gray-500">
          View and manage the status of all active and inactive users
        </p>
      </div>
    </header>
  );
}

export default HeaderActive;
