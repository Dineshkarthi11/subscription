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
    setIsModaltwoOpen(false); // Close the RequestAdditionalUserMore modal
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
          onClick={handleApplyClick} // Close the first modal on Apply click
          className="flex items-start self-stretch my-auto font-semibold whitespace-nowrap rounded-lg text-zinc-800 overflow-hidden gap-2 px-3.5 py-2 bg-white border border-solid shadow-sm border-black border-opacity-10"
        >
          Apply
        </button>
      </div>

      {/* RequestAdditionalUserMore modal */}
      <ModalAnt
        isVisible={isModaltwoOpen}
        onClose={() => setIsModaltwoOpen(false)}
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
        onOk={handleMakePayment} // Trigger UserLimitExceeded modal on "Make Payment"
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

onOk is not a function
TypeError: onOk is not a function
    at handleSubmit (http://localhost:3000/static/js/bundle.js:183241:7)
    at onClick (http://localhost:3000/static/js/bundle.js:173615:35)
    at handleClick (http://localhost:3000/static/js/bundle.js:273771:55)
    at HTMLUnknownElement.callCallback (http://localhost:3000/static/js/bundle.js:495863:18)
    at Object.invokeGuardedCallbackDev (http://localhost:3000/static/js/bundle.js:495907:20)
    at invokeGuardedCallback (http://localhost:3000/static/js/bundle.js:495964:35)
    at invokeGuardedCallbackAndCatchFirstError (http://localhost:3000/static/js/bundle.js:495978:29)
    at executeDispatch (http://localhost:3000/static/js/bundle.js:500121:7)
    at processDispatchQueueItemsInOrder (http://localhost:3000/static/js/bundle.js:500147:11)
    at processDispatchQueue (http://localhost:3000/static/js/bundle.js:500158:9)
