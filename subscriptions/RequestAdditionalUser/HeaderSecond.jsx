import React from "react";
import avatarcoupon from "../../../../assets/images/avatarcoupon.png";

function HeaderSecond() {
  return (

      <div className="flex flex-col items-center text-base font-semibold leading-snug bg-transparent">
        <img
          loading="lazy"
          src={avatarcoupon}
          alt="User avatar"
          className="my-3 object-contain aspect-square rounded-[91px] shadow-[0px_4px_4px_rgba(102,112,133,0.1)] w-[60px] bg-transparent"
        />
        <h1 className="bg-transparent">Request Additional User</h1>
        <p className="text-xs leading-4 text-center text-gray-500 bg-transparent">
        Need more user slots? Easily expand your current plan by requesting
        additional users for your team.
      </p>
      </div>

  );
}

export default HeaderSecond;
