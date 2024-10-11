import React from "react";
import BillingHistoryItem from "./BillingHistoryItem";

const billingHistoryData = [
  {
    date: "02 SEP 2024",
    orderId: "37489",
    isLatest: true,
    planDetails: [
      { label: "Loyaltri Mobile App - Staff Limit", value: "40 Staff" },
      { label: "Loyaltri Web App - Staff Limit", value: "40 Staff" },
      { label: "Loyaltri Lens Subscription", value: "1 Year(s)" },
    ],
  },
  {
    date: "02 SEP 2023",
    orderId: "37489",
    isLatest: false,
  },
  {
    date: "02 SEP 2022",
    orderId: "37489",
    isLatest: false,
  },
];

function BillingHistory() {
  return (
    <section className="flex flex-col px-6 mt-6 w-full max-md:px-5 max-md:max-w-full">
      <h2 className="self-start text-base font-medium text-black">
        Billing History
      </h2>
      {billingHistoryData.map((item, index) => (
        <BillingHistoryItem key={index} {...item} />
      ))}
    </section>
  );
}

export default BillingHistory;




