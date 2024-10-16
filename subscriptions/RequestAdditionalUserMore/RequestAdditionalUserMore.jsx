import React from "react";
import UserCountInput from "./UserCountInputOne";
import DiscountCode from "./DiscountCode";
import TotalAmount from "./TotalAmount";
import ActionButtons from "./ActionButtons";
import HeaderThird from "./HeaderThird";
import avatarcoupon from "../../../../assets/images/avatarcoupon.png";

function RequestAdditionalUserMore() {
  return (
    <div className="relative h-screen w-full flex items-center justify-center backdrop-blur-md bg-white/30">
      {/* Full-page background with blur */}
      <div className="absolute inset-0 backdrop-blur-md bg-white/30 z-0"></div>

      {/* Card container */}
      <section className="relative z-10 flex flex-col justify-center py-1.5 bg-gradient-to-b from-blue-100 to-white to-[20%] rounded-3xl border border-solid border-zinc-100 max-w-[95%] sm:max-w-[447px] shadow-[0px_31px_60px_rgba(59,55,75,0.1)]">
        <div className="flex overflow-hidden relative flex-col items-center py-5 w-full rounded-2xl max-w-full sm:max-w-[437px] shadow-[0px_10px_15px_rgba(182,181,254,0.19)]">
          <HeaderThird className="flex z-0 flex-col items-center max-w-full w-full sm:w-[357px]">
            <div className="flex flex-col items-center text-base font-semibold leading-snug text-black">
              <img
                loading="lazy"
                src={avatarcoupon}
                className="object-contain aspect-square rounded-[91px] shadow-[0px_4px_4px_rgba(102,112,133,0.1)] w-[60px]"
                alt="User avatar"
              />
              <h1 className="mt-2.5 text-sm sm:text-base">Request Additional User</h1>
            </div>
            <p className="mt-1 text-xs leading-4 text-center text-gray-500 sm:text-sm">
              Need more user slots? Easily expand your current plan by requesting
              additional users for your team.
            </p>
          </HeaderThird>
          <div
            className="flex absolute bottom-0 z-0 self-start w-0 border-solid border-[5px] border-zinc-300 border-opacity-60 h-[361px] min-h-[286px] right-[-113px] sm:right-[-113px]"
            aria-hidden="true"
          ></div>
          <form className="flex z-0 flex-col mt-4 max-w-full w-full sm:w-[405px]">
            <UserCountInput />
            <DiscountCode />
            <TotalAmount />
            <ActionButtons />
          </form>
          <button
            className="flex overflow-hidden absolute z-0 justify-center items-center self-start px-2 w-8 h-8 bg-white rounded-2xl border border-solid border-black border-opacity-10 right-[17px] top-[19px]"
            aria-label="Close"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b828ea14f3e06e30832d2ce6a8360ec188de026c4a0c1761f948c52421a41ab?placeholderIfAbsent=true&apiKey=740fe41628444c68b4015f1a2abbfb39"
              className="object-contain self-stretch my-auto aspect-square w-[18px]"
              alt=""
            />
          </button>
        </div>
      </section>
    </div>
  );
}

export default RequestAdditionalUserMore;
