import React, { useEffect, useState } from "react";
import BillingHistoryItem from "./BillingHistoryItem";
import axios from "axios";

function BillingHistory() {
  const [billingHistoryData, setBillingHistoryData] = useState([]);

  useEffect(() => {
    // Fetch billing history data from API
    const fetchBillingHistory = async () => {
      try {
        const response = await axios.post(
          "https://dev-api.loyaltri.com/api/main",
          {
            action: "getAllTransferDetails",
            method: "POST",
            kwargs: {
              companyId: "22", // You can modify this as per requirements
            },
          }
        );
        setBillingHistoryData(response.data.data); // Assuming the data structure
      } catch (error) {
        console.error("Error fetching billing history", error);
      }
    };

    fetchBillingHistory();
  }, []);

  return (
    <section className="flex flex-col px-6 mt-6 w-full max-md:px-5 max-md:max-w-full">
      <h2 className="self-start text-base font-medium text-black">
        Billing History
      </h2>
      {billingHistoryData.length === 0 ? (
        <p>Loading...</p>
      ) : (
        billingHistoryData.map((item, index) => (
          <BillingHistoryItem key={index} {...item} />
        ))
      )}
    </section>
  );
}

export default BillingHistory;
