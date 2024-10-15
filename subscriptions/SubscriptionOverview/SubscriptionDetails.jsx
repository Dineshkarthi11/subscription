import React from "react";
import LoyaltriWebApp from "../LoyaltriWebApp/LoyaltriWebApp";
import LoyaltriMobileApplication from "../LoyaltriApp/LoyaltriMobileApplication";

function SubscriptionDetails() {
  return (
    <section className="w-full h-full px-4 py-4">
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
        <div className="gap-2.5 self-stretch px-3.5 py-3 my-auto text-sm font-medium leading-none text-violet-600 bg-indigo-50 rounded-md border border-violet-300 border-dashed">
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
      <div className="flex flex-col md:flex-row gap-[50px] mt-4">
        {/* LoyaltriWebApp */}
        <div className="min-h-[350px] max-h-[500px] md:min-h-[300px]">
          <LoyaltriWebApp className="w-full h-full rounded-lg shadow-lg" />
        </div>

        {/* LoyaltriMobileApplication */}
        <div className="min-h-[350px] max-h-[500px] md:min-h-[300px]">
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
