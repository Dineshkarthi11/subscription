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
        if (data && data.results) {
          const formattedData = data.results.map((item) => ({
            date: item.date, // Assuming 'date' is provided
            orderId: item.orderId, // Assuming 'orderId' is provided
            isLatest: item.isLatest, // Boolean flag for latest payment
            companyInfo: {
              company: item.company, // Assuming 'company' is provided
              email: item.email, // Assuming 'email' is provided
              phone: item.phone, // Assuming 'phone' is provided
            },
          }));
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
    <section className="flex flex-col px-6 mt-6 w-full max-md:px-5 max-md:max-w-full">
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
