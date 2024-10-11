import React, { useEffect, useState } from "react";
import BillingHistoryItem from "./BillingHistoryItem";
import axios from "axios";

function BillingHistory() {
  const [billingHistoryData, setBillingHistoryData] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true); // State to handle loading

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
              companyId: "22", // Modify based on requirements
            },
          }
        );
        setBillingHistoryData(response.data.data || []); // Use empty array as fallback
      } catch (error) {
        console.error("Error fetching billing history", error);
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };

    fetchBillingHistory();
  }, []);

  return (
    <section className="flex flex-col px-6 mt-6 w-full max-md:px-5 max-md:max-w-full">
      <h2 className="self-start text-base font-medium text-black">
        Billing History
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : billingHistoryData.length === 0 ? (
        <p>No billing history available.</p>
      ) : (
        billingHistoryData.map((item, index) => (
          <BillingHistoryItem key={index} {...item} />
        ))
      )}
    </section>
  );
}

export default BillingHistory;
