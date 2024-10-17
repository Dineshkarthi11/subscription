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

// New imports for second section components
import UserCountInputOne from "../RequestAdditionalUserMore/UserCountInputOne";
import DiscountCode from "../RequestAdditionalUserMore/DiscountCode";
import TotalAmount from "../RequestAdditionalUserMore/TotalAmount";

function LoyaltriWebApp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showActiveInactiveUsers, setShowActiveInactiveUsers] = useState(false);
  const [isSecondPage, setIsSecondPage] = useState(false); // Track if we are showing the second page

  const handleUserInfoClick = () => {
    setShowActiveInactiveUsers(true); // Open the popup
  };

  const closeActiveInactiveUsers = () => {
    setShowActiveInactiveUsers(false); // Close the popup
  };

  const handleApplyCoupon = () => {
    // Switch to the second page when "Apply" is clicked
    setIsSecondPage(true);
  };

  const handleBackToFirstPage = () => {
    // Go back to the first page
    setIsSecondPage(false);
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
          showOkButton={!isSecondPage} // Show OK button only on the first page
          cancelText={isSecondPage ? "Back" : "Request"} // Show "Back" button on second page
          okText={isSecondPage ? "" : "Apply Coupon"} // Hide "Apply" button on second page
          okButtonClass="mx-[15px] w-[190px]"
          cancelButtonClass="w-[190px]"
          showCancelButton={true}
          showTitle={false}
          centered={true}
          padding="8px"
          customButton={false}
          onCancel={isSecondPage ? handleBackToFirstPage : null} // If on second page, "Back" goes to first page
        >
          <section className="flex overflow-hidden relative flex-col items-center py-5 w-[437px] h-[320px] rounded-2xl max-w-[437px]">
            {/* If not on the second page, show the first page content */}
            {!isSecondPage ? (
              <>
                <HeaderSecond />
                <UserCountInput />
                <CouponCodeInput 
                  closeRequestAdditionalUserModal={() => setIsModalOpen(false)} 
                  onApplyCoupon={handleApplyCoupon} // Switch to second page on apply
                />
              </>
            ) : (
              // If on the second page, show second page content
              <>
                <UserCountInputOne />
                <DiscountCode />
                <TotalAmount />
              </>
            )}
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
