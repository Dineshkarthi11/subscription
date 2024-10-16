import React from "react";
import close from "../../../../assets/images/close.png";

function HeaderLimit() {
  return (
    <header className="flex overflow-hidden absolute z-0 justify-center items-center self-start px-2 w-8 h-8 bg-white rounded-2xl border border-solid border-black border-opacity-10 right-[17px] top-[19px]">
      <img
        loading="lazy"
        src={close}
        className="object-contain self-stretch my-auto aspect-square w-[18px]"
        alt=""
      />
    </header>
  );
}

export default HeaderLimit;