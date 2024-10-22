import React, { useState } from "react";
import ExpiryNotification from "./ExpiryNotification";
import UserCount from "./UserCount";
import RequestMoreUsers from "./RequestMoreUsers";
import ModalAnt from "../../../common/ModalAnt";
import UserCountInput from "../RequestAdditionalUser/UserCountInput";
import CouponCodeInput from "../RequestAdditionalUser/CouponCodeInput";
import HeaderSecond from "../RequestAdditionalUser/HeaderSecond";
import ActiveInactiveUsers from "../ActiveInactiveUsers/ActiveInactiveUsers";
import Secondcard from "../../../../assets/images/Secondcard.png";
import UserLimitExceeded from "../UserLimitExceeded/UserLimitExceeded"; 
import UserCountInputOne from "../RequestAdditionalUserMore/UserCountInputOne";
import DiscountCode from "../RequestAdditionalUserMore/DiscountCode";
import TotalAmount from "../RequestAdditionalUserMore/TotalAmount";

function LoyaltriMobileApplication() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showActiveInactiveUsers, setShowActiveInactiveUsers] = useState(false);
  const [isSecondPage, setIsSecondPage] = useState(false);
  const [showUserLimitExceeded, setShowUserLimitExceeded] = useState(false);

  const closeActiveInactiveUsers = () => {
    setShowActiveInactiveUsers(false);
  };

  const handleMakePayment = () => {
    setShowUserLimitExceeded(true);
    setIsModalOpen(false);
  };

  const handleBackToFirstPage = () => {
    setIsSecondPage(false);
  };

  const handleApplyCoupon = (couponCode) => {
    console.log("Coupon applied:", couponCode);
    setIsSecondPage(couponCode ? true : false);
  };

  const closeUserLimitExceeded = () => {
    setShowUserLimitExceeded(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSecondPage(false);
  };

  return (
    <article className="relative flex flex-col w-[320px] h-[180px] bg-white rounded-2xl border-violet-600 border-opacity-20 overflow-hidden">

      {/* Background Image */}
      <img
        loading="lazy"
        src={Secondcard}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Top-left: Title and Validity */}
      <div className="text-xs absolute top-6 left-7 z-10">
        <h1 className="text-sm w-[150px] font-semibold text-primaryalpha">
          Loyaltri Mobile Application
        </h1>
        <p className="mt-4 text-gray-500">Valid till 06 Jan, 2025</p>
      </div>

      {/* Top-right: Expiry Notification */}
      <div className="absolute top-2 right-2 z-10">
        <ExpiryNotification />
      </div>

      {/* Bottom-left: User Count */}
      <div className="absolute bottom-4 left-5 z-10">
        <UserCount onsubmit={() => setShowActiveInactiveUsers(true)} />
      </div>

      {/* Bottom-right: Request More Users */}
      <div className="absolute bottom-4 right-3 z-10">
        <RequestMoreUsers onsubmit={() => setIsModalOpen(true)} />
      </div>

      {/* Single Modal for Coupon Code and User Request */}
      <ModalAnt
        isVisible={isModalOpen}
        onClose={closeModal}
        showOkButton={true}
        cancelText={isSecondPage ? "Back" : "Request"}
        okText="Make Payment"
        okButtonClass="mx-[15px] w-[190px]"
        cancelButtonClass="w-[190px]"
        showCancelButton={true}
        showTitle={false}
        centered={true}
        padding="8px"
        customButton={false}
        onOk={handleMakePayment}
        onCancel={isSecondPage ? handleBackToFirstPage : closeModal}
      >
        <section className="flex flex-col items-center py-5 w-full max-w-[437px] h-auto rounded-2xl">
          <HeaderSecond />
          {!isSecondPage ? (
            <>
              <UserCountInput className="w-full max-w-[300px]" />
              <CouponCodeInput
                closeRequestAdditionalUserModal={closeModal}
                onApplyCoupon={handleApplyCoupon}
              />
            </>
          ) : (
            <>
              <UserCountInputOne className="w-full max-w-[300px]" />
              <DiscountCode />
              <TotalAmount />
            </>
          )}
        </section>
      </ModalAnt>

      {/* Conditionally render ActiveInactiveUsers */}
      {showActiveInactiveUsers && (
        <ActiveInactiveUsers closePopup={closeActiveInactiveUsers} />
      )}

      {showUserLimitExceeded && (
        <ModalAnt
          isVisible={showUserLimitExceeded}
          onClose={closeUserLimitExceeded}
          showOkButton={false}
          showCancelButton={false}
          showTitle={false}
          centered={true}
          padding="8px"
        >
          <UserLimitExceeded />
        </ModalAnt>
      )}
    </article>
  );
}

export default LoyaltriMobileApplication;

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
import HeaderThird from "../RequestAdditionalUserMore/HeaderThird";
import UserLimitExceeded from "../UserLimitExceeded/UserLimitExceeded"; // Import UserLimitExceeded
import UserCountInputOne from "../RequestAdditionalUserMore/UserCountInputOne";
import DiscountCode from "../RequestAdditionalUserMore/DiscountCode";
import TotalAmount from "../RequestAdditionalUserMore/TotalAmount";

function LoyaltriWebApp() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for the modal
  const [showActiveInactiveUsers, setShowActiveInactiveUsers] = useState(false); // State for ActiveInactiveUsers popup
  const [isSecondPage, setIsSecondPage] = useState(false); // State to track if we are on the second page
  const [showUserLimitExceeded, setShowUserLimitExceeded] = useState(false); // State to track coupon application

  const handleUserInfoClick = () => {
    setShowActiveInactiveUsers(true);
  };

  const closeActiveInactiveUsers = () => {
    setShowActiveInactiveUsers(false);
  };

  const handleApplyCoupon = (couponCode) => {
    // Logic for applying coupon code
    console.log("Coupon applied:", couponCode);

    if (couponCode) {
      // If the coupon is successfully applied, move to the second page
      setIsSecondPage(true);
    } else {
      // Stay on the first page if the coupon is invalid
      setIsSecondPage(false);
    }
  };

  const handleMakePayment = () => {
    // Show the UserLimitExceeded modal instead of logging to console
    setShowUserLimitExceeded(true);
    setIsModalOpen(false); // Close the initial modal
  };

  const handleBackToFirstPage = () => {
    // Go back to the first page
    setIsSecondPage(false); // Set to false to show RequestAdditionalUser page
  };

  const closeUserLimitExceeded = () => {
    setShowUserLimitExceeded(false); // Close the UserLimitExceeded modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSecondPage(false); // Reset to the first page when closing the modal
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsSecondPage(false); // Reset to the first page when opening the modal
  };

  return (
    <article className="relative flex flex-col w-[445px] h-[120px] min-w-[320px] min-h-[250px] rounded-2xl overflow-hidden">
      <img
        loading="lazy"
        src={Firstcard}
        alt="Shape"
        className="absolute inset-0 h-[250px] w-[320px] object-cover rounded-2xl"
      />

      <div className="absolute top-4 left-5 z-10">
        <UserInfoDetails />
      </div>

      <div className="absolute top-2 right-[130px] z-10">
        <DurationBadge />
      </div>

      <div className="absolute bottom-[80px] left-7 z-10">
        <UserInfo onsubmit={handleUserInfoClick} />
      </div>

      <div className="absolute bottom-[80px] right-[140px] z-10">
        <RequestMoreUsers onsubmit={openModal} /> {/* Use openModal function here */}
      </div>

      <ModalAnt
        isVisible={isModalOpen}
        onClose={closeModal} // Use the new closeModal function
        showOkButton={true} // Show OK button
        cancelText={isSecondPage ? "Back" : "Request"} // Show "Back" on the second page
        okText="Make Payment" // Always display "Make Payment"
        okButtonClass="mx-[15px] w-[190px] sm:w-[150px] lg:w-[190px]"
        cancelButtonClass="w-[190px] sm:w-[150px] lg:w-[190px]"
        showCancelButton={true}
        showTitle={false}
        centered={true}
        padding="8px"
        customButton={false}
        onOk={handleMakePayment} // Call handleMakePayment directly
        onCancel={isSecondPage ? handleBackToFirstPage : closeModal} // Use closeModal to reset state when cancelled
      >
        <section className="flex overflow-hidden relative flex-col items-center py-5 w-full max-w-[437px] h-auto sm:h-[300px] lg:h-[340px] rounded-2xl">
          <HeaderSecond />

          {/* Conditional rendering based on the current page */}
          {!isSecondPage ? (
            <>
              <UserCountInput className="w-full max-w-[300px] sm:max-w-[90%]" /> {/* Ensure responsiveness */}
              <CouponCodeInput
                closeRequestAdditionalUserModal={closeModal} // Close modal when requested
                onApplyCoupon={handleApplyCoupon} // Pass the apply coupon handler
              />
            </>
          ) : (
            <>
              <UserCountInputOne className="w-full max-w-[300px] sm:max-w-[90%]" /> {/* Ensure responsiveness */}
              <DiscountCode />
              <TotalAmount />
            </>
          )}
        </section>
      </ModalAnt>

      {/* Conditionally render ActiveInactiveUsers */}
      {showActiveInactiveUsers && (
        <ActiveInactiveUsers closePopup={closeActiveInactiveUsers} show={showActiveInactiveUsers} />
      )}

      {showUserLimitExceeded && (
        <ModalAnt
          isVisible={showUserLimitExceeded}
          onClose={closeUserLimitExceeded} // Close the UserLimitExceeded modal
          showOkButton={false} // You can configure buttons as needed
          showCancelButton={false} // You can configure buttons as needed
          showTitle={false} // Optionally show a title
          centered={true}
          padding="8px"
        >
          <UserLimitExceeded /> {/* Render the UserLimitExceeded component here */}
        </ModalAnt>
      )}
    </article>
  );
}

export default LoyaltriWebApp;

import React, { useState } from "react";
import Invoice from "../../../../assets/images/Invoice.png";
import Uparrow from "../../../../assets/images/uparrow.png";
import Downarrow from "../../../../assets/images/downarrow.png";
import detailbg from "../../../../assets/images/detailbg.png";

function BillingHistoryItem({ date, orderId, isLatest, companyInfo, amount, invoiceFile }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`flex flex-col p-3.5 mt-6 w-full rounded-xl border border-solid ${
        isLatest ? "bg-slate-50" : "bg-slate-50"
      } border-gray-500 border-opacity-10 max-md:max-w-full cursor-pointer`}
      onClick={toggleExpand}
    >
      <div className="flex flex-wrap gap-5 justify-between w-full max-md:max-w-full">
        <div className="flex gap-4 items-center">
          <div className="font-bold text-black text-sm">{date}</div>
          {isLatest && <div className="text-gray-500 text-xs">Latest Payment</div>}
        </div>
        <div className="flex items-center gap-4 font-medium max-md:flex-col max-md:items-start">
          <div className="my-auto text-sm text-black">Order ID: {orderId}</div>
          <div className="flex items-center gap-2 max-md:gap-1">
            <a
              href={invoiceFile}
              download
              className="flex items-center px-4 py-2 text-sm bg-white rounded-lg border border-solid shadow-sm border-black border-opacity-10 text-stone-950 max-md:px-3 max-md:py-2 max-md:text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                loading="lazy"
                src={Invoice}
                alt="Download Invoice"
                className="object-contain w-5 h-5"
              />
              <span className="ml-2">Download Invoice</span>
            </a>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevents the entire card's toggle
                toggleExpand();
              }}
            >
              <img
                src={isExpanded ? Uparrow : Downarrow}
                alt="Toggle"
                className="w-6 max-md:w-4"
              />
            </button>
          </div>
        </div>
      </div>
      <div
        className={`transition-all duration-700 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-[500px]" : "max-h-0"
        }`} // Adjust max height based on content
      >
        {isExpanded && companyInfo && (
          <div className="relative w-full rounded-lg overflow-hidden">
            <img
              src={detailbg}
              alt="Details Background"
              className="absolute inset-0 w-full h-full object-fill"
              style={{ minHeight: "110%", height: "auto" }}
            />
            <div className="relative z-10 p-3 bg-opacity-80">
              <div className="ml-6 my-4 text-gray-500 text-xs">Company Information</div>
              <div className="relative mx-6 lg:mr-[60%] my-10 mr-0 overflow-y-auto space-y-2 text-sm max-md:text-xs">
                <div className="flex">
                  <span className="whitespace-nowrap w-28">Company:</span>
                  <span className="flex-grow text-right">{companyInfo.company}</span>
                </div>
                <div className="flex">
                  <span className="whitespace-nowrap w-28">Email:</span>
                  <span className="flex-grow text-right">{companyInfo.email}</span>
                </div>
                <div className="flex">
                  <span className="whitespace-nowrap w-28">Phone:</span>
                  <span className="flex-grow text-right">{companyInfo.phone}</span>
                </div>
                <div className="flex">
                  <span className="whitespace-nowrap w-28">Invoice Amount:</span>
                  <span className="flex-grow text-right">{amount} AED</span>
                </div>
                <div className="flex">
                  <span className="whitespace-nowrap w-28">Invoice File:</span>
                  <a href={invoiceFile} target="_blank" rel="noopener noreferrer" className="flex-grow text-right">
                    View Invoice
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BillingHistoryItem;

import React, { useEffect, useState } from "react";
import BillingHistoryItem from "./BillingHistoryItem";

function BillingHistory() {
  const [billingHistoryData, setBillingHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the updated API
    async function fetchBillingData() {
      try {
        const response = await fetch("https://dev-api.loyaltri.com/api/main", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJMT1lBTFRSSSBTRVJWRVIiLCJhdWQiOiJMT1lBTFRSSSBDTElFTlQiLCJzdWIiOiJBVVRIRU5USUNBVElPTiIsImlhdCI6MTcyNDkzMDU5NCwidXNlck5hbWUiOiJhZG1pbiJ9.WftJvLCgEd9lJYfrjbBeKWdfn1g5FT_5HkOiYhJB8ds`,
          },
          body: JSON.stringify({
            action: "getSuppInvoice",
            method: "POST",
            kwargs: {
              organisationId: 1,
            },
          }),
        });

        const data = await response.json();
        if (data && data.result && data.result.result) {
          const invoiceData = data.result.result;
          const formattedData = [
            {
              date: invoiceData.invoiceDate || "N/A",  // Use 'N/A' if null
              orderId: invoiceData.invoiceNo || "N/A",  // Use 'N/A' if invoice number is not provided
              isLatest: true,  // Set a default value for isLatest
              companyInfo: {
                company: invoiceData.organisation || "N/A",  // Company name
                email: invoiceData.email || "N/A",  // Company email
                phone: invoiceData.phone || "N/A",  // Company phone
              },
              invoiceFile: invoiceData.invoiceFile_url || "",  // Invoice file URL
              amount: invoiceData.invoiceAmount || "N/A",  // Invoice amount
            },
          ];
          setBillingHistoryData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching billing data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBillingData();
  }, []);

  return (
    <section className="flex flex-col px-6 mt-6 w-full max-md:px-5 max-lg:max-w-full">
      <h2 className="self-start text-base font-medium text-black">
        Billing History
      </h2>
      {loading ? (
        <div>Loading billing history...</div>
      ) : billingHistoryData.length > 0 ? (
        billingHistoryData.map((item, index) => (
          <BillingHistoryItem key={index} {...item} />
        ))
      ) : (
        <div>No billing history available</div>
      )}
    </section>
  );
}

export default BillingHistory; 

import React from "react";
import LoyaltriWebApp from "../LoyaltriWebApp/LoyaltriWebApp";
import LoyaltriMobileApplication from "../LoyaltriApp/LoyaltriMobileApplication";

function SubscriptionDetails() {
  return (
    <section className="w-full h-auto px-4 py-0">
      {/* Subscription Overview */}
      <div className="flex flex-col lg:flex-row justify-between w-full">
        <div>
          <h2 className="text-lg font-semibold text-black">
            Subscription Overview
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your active Loyaltri plans, users, and renewals with ease.
          </p>
        </div>
        <div className="gap-2.5 self-stretch px-3.5 py-3 my-auto text-sm font-medium leading-none text-primaryalpha bg-primaryalpha/20 rounded-md border border-violet-300 border-dashed">
          Client ID: 35846895
        </div>
      </div>

      {/* Active Plans */}
      <div className="flex items-center gap-2 mt-4">
        <h3 className="text-base font-medium text-black">Active Plans</h3>
        <span className="px-2 py-1 text-xs font-semibold bg-indigo-50 text-violet-600 rounded-md">
          02
        </span>
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row mt-4">
        {/* LoyaltriWebApp */}
        <div className="flex-none min-h-[350px] max-h-[500px] md:min-h-[300px]">
          <LoyaltriWebApp className="w-full h-full rounded-lg shadow-lg" />
        </div>

        {/* LoyaltriMobileApplication */}
        <div className="flex-none mr-10 min-h-[350px] max-h-[500px] md:min-h-[300px]">
          <LoyaltriMobileApplication className="w-full h-full rounded-lg border border-dashed border-violet-600" />
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-1">
        <div className="h-2 w-2 rounded-full bg-violet-600 /"></div>
        <div className="h-2 w-2 rounded-full bg-gray-300"></div>
      </div>
    </section>
  );
}

export default SubscriptionDetails; 

import React from "react";
import SubscriptionDetails from "./SubscriptionDetails";
import BillingHistory from "./BillingHistory";

function SubscriptionOverview() {
  return (
    <main className="flex flex-col w-full h-full">
      <SubscriptionDetails />
      <BillingHistory />
    </main>
  );
}

export default SubscriptionOverview;

this is the overall pages of subscritionoverview pages components

i need to fit the overall content without any spaces without chnaging any designs and content

i dont want space , i want without spaces the correct code
