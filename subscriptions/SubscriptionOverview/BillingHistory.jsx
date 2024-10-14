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
