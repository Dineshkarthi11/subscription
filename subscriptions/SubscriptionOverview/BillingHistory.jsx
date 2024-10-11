import React, { useState, useEffect } from "react";
import BillingHistoryItem from "./BillingHistoryItem";

function BillingHistory() {
  const [billingHistoryData, setBillingHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch API data when component mounts
    const fetchBillingHistory = async () => {
      try {
        const response = await fetch("https://dev-api.loyaltri.com/api/main", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_BEARER_TOKEN",
          },
          body: JSON.stringify({
            action: "getAllTransferDetails",
            method: "POST",
            kwargs: {
              companyId: "22",
            },
          }),
        });
        const data = await response.json();
        setBillingHistoryData(data?.transferDetails || []);
      } catch (error) {
        console.error("Error fetching billing history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBillingHistory();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
