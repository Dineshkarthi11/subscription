import React, { useState } from "react";
import UserInfo from "./UserInfo";
import DurationBadge from "./DurationBadge";
import RequestMoreUsers from "./RequestMoreUsers";
import ModalAnt from "../../../common/ModalAnt";
import UserCountInput from "../RequestAdditionalUser/UserCountInput";
import CouponCodeInput from "../RequestAdditionalUser/CouponCodeInput";
import HeaderSecond from "../RequestAdditionalUser/HeaderSecond";
import UserInfoDetails from "./UserInfoDetails";
import Firstcard from "../../../../assets/images/Firstcard.png";
import ActiveInactiveUsers from "../ActiveInactiveUsers/ActiveInactiveUsers";

function LoyaltriWebApp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showActiveInactiveUsers, setShowActiveInactiveUsers] = useState(false);

  const handleUserInfoClick = () => {
    setShowActiveInactiveUsers(true); // Open the popup
  };

  const closeActiveInactiveUsers = () => {
    setShowActiveInactiveUsers(false); // Close the popup
  };

  const handleApplyCoupon = () => {
    // Logic for applying coupon code
    // ...
    // After applying coupon, close the modal
    setIsModalOpen(false);
  };

  return (
    <>
      <article className="relative flex flex-col w-[445px] h-[150px] min-w-[320px] min-h-[250px] rounded-2xl overflow-hidden shadow-xl shadow-violet-400">
        {/* Background Image */}
        <img
          loading="lazy"
          src={Firstcard}
          alt="Shape"
          className="absolute inset-0 h-[350px] w-full object-cover rounded-2xl z-0"
        />

        {/* Top-left: User Info */}
        <div className="absolute top-4 left-5 z-10">
          <UserInfoDetails />
        </div>

        {/* Top-right: Duration Badge */}
        <div className="absolute top-4 right-10 z-10">
          <DurationBadge />
        </div>

        {/* Bottom-left: User Count */}
        <div className="absolute bottom-5 left-5 z-10">
          <UserInfo onsubmit={handleUserInfoClick} />
        </div>

        {/* Bottom-right: Request More Users */}
        <div className="absolute bottom-4 right-5 z-10">
          <RequestMoreUsers onsubmit={() => setIsModalOpen(true)} />
        </div>

        <ModalAnt
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close the modal
        showOkButton={true}
        cancelText="Request"
        okText="Apply Coupon"
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
          <CouponCodeInput 
            closeRequestAdditionalUserModal={() => setIsModalOpen(false)} 
            onApplyCoupon={handleApplyCoupon} // Pass the apply coupon handler
          />
        </section>
      </ModalAnt>
      </article>

      {/* ActiveInactiveUsers Popup */}
      {showActiveInactiveUsers && (
        <ActiveInactiveUsers closePopup={closeActiveInactiveUsers} show={showActiveInactiveUsers} />
      )}
    </>
  );
}

export default LoyaltriWebApp;

