import React, { useEffect, useState } from "react";
import BillingHistoryItem from "./BillingHistoryItem";

function BillingHistory() {
  const [billingHistoryData, setBillingHistoryData] = useState([]);
  const [companyInfo, setCompanyInfo] = useState(null); // To store company data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

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
            kwargs: { companyId: "22" }, // Company ID provided in the API request
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch company info");
        }

        const result = await response.json();
        // Assuming the API returns a response with company, email, and phone fields
        const { company, email, phone } = result.data; // Adjust this to match your API response structure

        setCompanyInfo({ company, email, phone });
        setLoading(false); // Mark loading as done
      } catch (error) {
        console.error("Error fetching company info:", error);
        setError(error.message);
        setLoading(false); // Mark loading as done
      }
    };

    fetchCompanyInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if there is an issue
  }

  return (
    <section className="flex flex-col px-6 mt-6 w-full max-md:px-5 max-md:max-w-full">
      <h2 className="self-start text-base font-medium text-black">
        Billing History
      </h2>
      {/* Pass the real company info into the BillingHistoryItem */}
      {billingHistoryData.length > 0 ? (
        billingHistoryData.map((item, index) => (
          <BillingHistoryItem key={index} {...item} companyInfo={companyInfo} />
        ))
      ) : (
        <div>No billing history available.</div>
      )}
    </section>
  );
}

export default BillingHistory;
