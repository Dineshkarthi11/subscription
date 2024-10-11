import React, { useEffect, useState } from "react";
import BillingHistoryItem from "./BillingHistoryItem";

function BillingHistory() {
  const [billingHistoryData, setBillingHistoryData] = useState([]);
  const [companyInfo, setCompanyInfo] = useState(null); // To store company data

  useEffect(() => {
    // Fetch company info from the provided API
    const fetchCompanyInfo = async () => {
      try {
        const response = await fetch("https://dev-api.loyaltri.com/api/main", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "getAllTransferDetails",
            method: "POST",
            kwargs: { companyId: "22" },
          }),
        });

        if (response.ok) {
          const result = await response.json();
          // Assuming the API returns data in the format { company, email, phone }
          const { company, email, phone } = result; 
          setCompanyInfo({ company, email, phone });
        } else {
          console.error("Failed to fetch company info");
        }
      } catch (error) {
        console.error("Error fetching company info:", error);
      }
    };

    // Billing history data (static or real)
    const billingHistory = [
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

    setBillingHistoryData(billingHistory);
    fetchCompanyInfo(); // Fetch company info from API
  }, []);

  return (
    <section className="flex flex-col px-6 mt-6 w-full max-md:px-5 max-md:max-w-full">
      <h2 className="self-start text-base font-medium text-black">
        Billing History
      </h2>
      {billingHistoryData.map((item, index) => (
        <BillingHistoryItem key={index} {...item} companyInfo={companyInfo} />
      ))}
    </section>
  );
}

export default BillingHistory;
