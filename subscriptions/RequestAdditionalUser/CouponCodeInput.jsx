import React, { useState } from "react";
import ModalAnt from "../../../common/ModalAnt";
import UserCountInputOne from "../RequestAdditionalUserMore/UserCountInputOne";
import DiscountCode from "../RequestAdditionalUserMore/DiscountCode";
import TotalAmount from "../RequestAdditionalUserMore/TotalAmount";
import HeaderThird from "../RequestAdditionalUserMore/HeaderThird";
import UserLimitExceeded from "../UserLimitExceeded/UserLimitExceeded"; // Import UserLimitExceeded
import coupon from "../../../../assets/images/coupon.png";

function CouponCodeInput() {
  const [isModaltwoOpen, setIsModaltwoOpen] = useState(false); // Modal for RequestAdditionalUserMore
  const [isUserLimitPopupOpen, setIsUserLimitPopupOpen] = useState(false); // UserLimitExceeded state

  // Function to handle the Apply button click and close the RequestAdditionalUserMore modal
  const handleApplyClick = () => {
    setIsModaltwoOpen(false); // Close the RequestAdditionalUserMore modal
  };

  // Function to handle Make Payment button click
  const handleMakePayment = () => {
    setTimeout(() => setIsUserLimitPopupOpen(true), 300); // Open UserLimitExceeded modal after a short delay
  };

  return (
    <div className="flex flex-col mt-3.5 w-[410px] text-sm leading-none min-h-[53px]">
      <div className="flex overflow-hidden gap-10 justify-between items-center px-2 py-2.5 w-full rounded-lg border border-gray-300 border-dashed bg-zinc-50 min-h-[53px]">
        <div className="flex gap-2 items-center self-stretch my-auto text-gray-500">
          <img
            loading="lazy"
            src={coupon}
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
            alt="Coupon"
          />
          <input
            type="text"
            className="gap-2 self-stretch my-auto bg-transparent border-none outline-none"
            placeholder="Type coupon code here"
          />
        </div>
        <button
          onClick={() => setIsModaltwoOpen(true)} // Open RequestAdditionalUserMore modal
          className="flex items-start self-stretch my-auto font-semibold whitespace-nowrap rounded-lg text-zinc-800 overflow-hidden gap-2 px-3.5 py-2 bg-white border border-solid shadow-sm border-black border-opacity-10"
        >
          Apply
        </button>
      </div>

      {/* RequestAdditionalUserMore modal */}
      <ModalAnt
        isVisible={isModaltwoOpen}
        onClose={() => setIsModaltwoOpen(false)} // Correct close handler
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
        onOk={handleMakePayment} // Corrected onOk to trigger UserLimitExceeded modal
      >
        <section className="flex overflow-hidden relative flex-col items-center py-5 w-[437px] h-[320px] rounded-2xl max-w-[437px]">
          <HeaderThird />
          <form className="flex z-0 flex-col mt-4 max-w-full w-[405px]">
            <UserCountInputOne />
            <DiscountCode />
            <TotalAmount />
          </form>
        </section>
      </ModalAnt>

      {/* Conditionally render the UserLimitExceeded popup */}
      {isUserLimitPopupOpen && (
        <ModalAnt
          isVisible={isUserLimitPopupOpen}
          onClose={() => setIsUserLimitPopupOpen(false)} // Close the UserLimitExceeded popup
          showOkButton={false}
          showCancelButton={false}
          centered={true}
        >
          <UserLimitExceeded />
        </ModalAnt>
      )}
    </div>
  );
}

export default CouponCodeInput;
