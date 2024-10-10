import React from "react";
import diamond from "../../../../assets/images/diamond.png";

function UserLimitMessage() {
  return (
    <article className="flex z-0 flex-col items-center max-w-full w-[390px]">
      <div className="flex flex-col max-w-full rounded-[36px] w-[231px]">
        <img
          loading="lazy"
          src={diamond}
          className="object-contain w-full bg-blend-multiply aspect-[1.89] rounded-[36px]"
          alt="User limit exceeded illustration"
        />
      </div>
      <div className="flex flex-col items-center mt-3 w-full">
        <h1 className="text-base font-semibold text-black">
          Maximum User Limit Exceeded!
        </h1>
        <p className="mt-1 text-xs leading-4 text-center text-gray-500">
          You've added the maximum number of users for your plan. To add more,
          consider upgrading or requesting additional user slots.
        </p>
      </div>
    </article>
  );
}

export default UserLimitMessage;