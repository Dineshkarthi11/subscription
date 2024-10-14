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




{
    "status": 200,
    "message": "",
    "errors": [],
    "result": {
        "status": 200,
        "message": "Organisation has been fetched.",
        "result": {
            "organisationId": "1",
            "companyId": null,
            "countryId": "2",
            "cityId": "139",
            "organisation": "NIMS",
            "currency": "AED",
            "description": null,
            "logo": "organization/logo/66decd9e256f0.png",
            "url": "nimsuae.com",
            "address": "Garhoud ",
            "email": "nims@gmail.com",
            "phone": null,
            "isActive": "1",
            "createdOn": "2024-05-01 00:00:00+00",
            "modifiedBy": "1",
            "modifiedOn": "2024-10-01 04:12:53+00",
            "createdBy": "1",
            "stateId": "6",
            "contactInfo1Name": "Murshid",
            "contactInfo1Designation": "Product Specialist",
            "contactInfo1Email": "murshid@technoalliance.ae",
            "contactInfo1Phone": "0987654321",
            "contactInfo2Name": "Contact Person",
            "contactInfo2Designation": "Designation",
            "contactInfo2Email": "info@email.com",
            "contactInfo2Phone": "0987654322",
            "organisationDocuments": null,
            "contactInfo1Image": null,
            "contactInfo2Image": null,
            "subscriptionType": "subscribed",
            "subscriptionEndDate": "2025-07-31 00:00:00+00",
            "employeeCodeType": "0",
            "maximumEmployeeCount": null,
            "clientId": "LOY-202405011001",
            "id": "3",
            "invoiceDate": "2024-09-24",
            "invoiceName": "nims",
            "invoiceAmount": "650",
            "invoiceFile": "InvoiceImage/1727175619-image_2.jpeg",
            "created_by": null,
            "updated_by": "1",
            "created_at": "2024-09-24 11:00:21",
            "updated_at": "2024-09-24 11:02:01",
            "orderNo": null,
            "invoiceNo": null,
            "invoiceFile_url": "https://loyaltri-product.s3.me-central-1.amazonaws.com/InvoiceImage/1727175619-image_2.jpeg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2AOO7M54VPQKHEPV%2F20241014%2Fme-central-1%2Fs3%2Faws4_request&X-Amz-Date=20241014T052657Z&X-Amz-SignedHeaders=host&X-Amz-Expires=900&X-Amz-Signature=e6eaa4946bc617fd54a6dbd60bdd1215d37600f3e1d56d04efae1744b365231c"
        }
    }
}
