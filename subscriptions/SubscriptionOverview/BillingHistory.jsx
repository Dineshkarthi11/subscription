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


Cannot read properties of undefined (reading 'length')
TypeError: Cannot read properties of undefined (reading 'length')
    at BillingHistory (http://localhost:3000/main.9aafa6b9451bc1a5765b.hot-update.js:58:34)
    at renderWithHooks (http://localhost:3000/static/js/bundle.js:504189:22)
    at updateFunctionComponent (http://localhost:3000/static/js/bundle.js:507756:24)
    at beginWork (http://localhost:3000/static/js/bundle.js:509475:20)
    at HTMLUnknownElement.callCallback (http://localhost:3000/static/js/bundle.js:494445:18)
    at Object.invokeGuardedCallbackDev (http://localhost:3000/static/js/bundle.js:494489:20)
    at invokeGuardedCallback (http://localhost:3000/static/js/bundle.js:494546:35)
    at beginWork$1 (http://localhost:3000/static/js/bundle.js:514444:11)
    at performUnitOfWork (http://localhost:3000/static/js/bundle.js:513692:16)
    at workLoopSync (http://localhost:3000/static/js/bundle.js:513615:9)
