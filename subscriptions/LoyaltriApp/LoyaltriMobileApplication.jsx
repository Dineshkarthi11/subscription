import React, { useState } from "react";
import ExpiryNotification from "./ExpiryNotification";
import UserCount from "./UserCount";
import RequestMoreUsers from "./RequestMoreUsers";
import ModalAnt from "../../../common/ModalAnt";
import UserCountInput from "../RequestAdditionalUser/UserCountInput";
import CouponCodeInput from "../RequestAdditionalUser/CouponCodeInput";
import ActionButtons from "../RequestAdditionalUser/ActionButtons";
import HeaderSecond from "../RequestAdditionalUser/HeaderSecond";
import ActiveInactiveUsers from "../ActiveInactiveUsers/ActiveInactiveUsers";
import HeaderActive from "../ActiveInactiveUsers/HeaderActive";
import Secondcard from "../../../../assets/images/Secondcard.png";

function LoyaltriMobileApplication() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showActiveInactiveUsers, setShowActiveInactiveUsers] = useState(false); // State to show ActiveInactiveUsers

  const closeActiveInactiveUsers = () => {
    setShowActiveInactiveUsers(false);
  };

  return (
    <article className="relative flex flex-col w-[380px] h-[250px] min-w-[320px] min-h-[250px] bg-white rounded-2xl border-violet-600 border-opacity-20 overflow-hidden">
      <div className="relative flex flex-col h-full w-full p-5">
        {/* Background Image */}
        <img
          loading="lazy"
          src={Secondcard}
          alt=""
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Top-left: Title and Validity */}
        <div className="absolute top-4 left-5 z-10">
          <h1 className="text-xl w-[150px] font-semibold text-violet-600">
            Loyaltri Web Application
          </h1>
          <p className="mt-1 text-gray-500">Valid till 06 Jan, 2025</p>
        </div>

        {/* Top-right: Expiry Notification */}
        <div className="absolute top-4 right-3 z-10">
          <ExpiryNotification />
        </div>

        {/* Bottom-left: User Count */}
        <div className="absolute bottom-4 left-5 z-10">
          <UserCount onsubmit={() => setShowActiveInactiveUsers(true)} /> {/* Trigger popup */}
        </div>

        {/* Bottom-right: Request More Users */}
        <div className="absolute bottom-4 right-5 z-10">
          <RequestMoreUsers
            onsubmit={() => {
              setIsModalOpen(true);
            }}
          />
        </div>
      </div>

      <ModalAnt
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
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
          <HeaderSecond />
          <UserCountInput />
          <CouponCodeInput />
        </section>
      </ModalAnt>

      {/* Conditionally render ActiveInactiveUsers */}
      {showActiveInactiveUsers && (
        <ActiveInactiveUsers closePopup={closeActiveInactiveUsers} /> // Pass close function
      )}
    </article>
  );
}

export default LoyaltriMobileApplication;
