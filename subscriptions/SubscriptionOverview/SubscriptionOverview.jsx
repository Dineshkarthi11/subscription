import React from "react";
import SubscriptionDetails from "./SubscriptionDetails";
import BillingHistory from "./BillingHistory";

function SubscriptionOverview() {
  return (
        <main className="flex flex-col">
          <SubscriptionDetails />
          <BillingHistory />
        </main>
  );
}

export default SubscriptionOverview;
