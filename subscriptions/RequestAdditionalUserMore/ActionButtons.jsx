import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalAnt from "../../../common/ModalAnt"; // Import ModalAnt
import HeaderThird from "../RequestAdditionalUserMore/HeaderThird";
import UserCountInput from "./UserCountInput";
import DiscountCode from "../RequestAdditionalUserMore/DiscountCode";
import TotalAmount from "../RequestAdditionalUserMore/TotalAmount";

function ActionButtons() {
  const navigate = useNavigate(); // Initialize navigate hook
  const [isModalthreeOpen, setIsModalthreeOpen] = useState(false);

  const handleApplyClick = () => {
    // Open modal (same as CouponCodeInput)
    setIsModaltwoOpen(true);
  };

  return (
    <div className="flex gap-3 items-center mt-4 w-[410px]">
      {/* Request button */}
      <button
        onClick={() => setIsModaltwoOpen(true)}
        className="flex items-start self-stretch font-semibold whitespace-nowrap rounded-lg text-zinc-800 overflow-hidden gap-2 px-3.5 py-2 bg-white border border-solid shadow-sm border-black border-opacity-10 w-[190px]"
      >
        Request
      </button>

      {/* Make Payment button */}
      <button
        onClick={handleApplyClick}
        className="flex items-start self-stretch font-semibold whitespace-nowrap rounded-lg text-white overflow-hidden gap-2 px-3.5 py-2 bg-violet-600 border border-solid border-violet-600 shadow-sm w-[190px]"
      >
        Make Payment
      </button>

      {/* Modal logic */}
      <ModalAnt
        isVisible={isModalthreeOpen}
        onClose={() => setIsModalthreeOpen(false)}
        showOkButton={true}
        cancelText="Request"
        okText="Make Payment"
        okButtonClass="mx-[15px] w-[190px]"
        cancelButtonClass="w-[190px]"
        showCancelButton={true}
        showTitle={false}
        centered={true}
        padding="8px"
        customButton={false}
      >
        <section className="flex overflow-hidden relative flex-col items-center py-5 w-[437px] h-[320px] rounded-2xl max-w-[437px]">
          <HeaderThird />
          <div
            className="flex absolute bottom-0 z-0 self-start w-0 border-solid border-[5px] border-zinc-300 border-opacity-60 h-[361px] min-h-[286px] right-[-113px]"
            aria-hidden="true"
          ></div>
          <form className="flex z-0 flex-col mt-4 max-w-full w-[405px]">
            <UserCountInput />
            <DiscountCode />
            <TotalAmount />
          </form>
        </section>
      </ModalAnt>
    </div>
  );
}

export default ActionButtons;
