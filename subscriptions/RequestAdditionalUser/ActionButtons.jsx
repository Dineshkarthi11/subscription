import React from "react"; // Assuming this is the shared button component
import ButtonClick from "../../../common/Button";

function ActionButtons() {
  return (
    <div className="flex z-0 gap-3 items-start mt-4 max-w-full text-sm font-semibold leading-6 w-[405px]">
      {/* Request Button */}
      <ButtonClick
        BtnType="default" // You can adjust this based on the button type you want (default, primary, etc.)
        buttonName="Request"
        className="flex flex-1 shrink items-center whitespace-nowrap rounded-lg basis-0 text-stone-900 overflow-hidden gap-2 self-stretch px-5 py-2.5 w-full bg-white border border-solid shadow-sm border-black border-opacity-10"
        handleSubmit={() => {
          // Handle Request button action here
          console.log("Request button clicked");
        }}
      />

      {/* Make Payment Button */}
      <ButtonClick
        BtnType="primary" // You can adjust this based on the button type you want
        buttonName="Make Payment"
        className="flex flex-1 shrink items-center text-white rounded-lg basis-0 overflow-hidden gap-2 self-stretch px-5 py-2.5 w-full bg-violet-600 border border-violet-600 border-solid shadow-sm"
        handleSubmit={() => {
          // Handle Make Payment button action here
          console.log("Make Payment button clicked");
        }}
      />
    </div>
  );
}

export default ActionButtons;