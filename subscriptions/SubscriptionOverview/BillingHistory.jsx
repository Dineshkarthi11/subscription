import React, { useEffect, useState } from "react";
import axios from "axios";

function BillingHistory() {
  const [transferData, setTransferData] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Fetch transfer details from API
    const fetchTransferDetails = async () => {
      try {
        const response = await axios.post(
          "https://dev-api.loyaltri.com/api/main",
          {
            action: "getAllTransferDetails",
            method: "POST",
            kwargs: {
              companyId: "22", // Replace with the appropriate company ID if necessary
            },
          }
        );
        // Assuming the response contains the required data
        setTransferData(response.data.data || []); // Use an empty array as fallback if no data
      } catch (error) {
        console.error("Error fetching transfer details", error);
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };

    fetchTransferDetails();
  }, []);

  return (
    <section className="flex flex-col px-6 mt-6 w-full max-md:px-5 max-md:max-w-full">
      <h2 className="self-start text-base font-medium text-black">
        Company Transfer Details
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : transferData.length === 0 ? (
        <p>No transfer details available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="text-left py-3 px-4">Company</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Phone</th>
              </tr>
            </thead>
            <tbody>
              {transferData.map((company, index) => (
                <tr key={index}>
                  <td className="text-left py-3 px-4">{company.companyName}</td>
                  <td className="text-left py-3 px-4">{company.email}</td>
                  <td className="text-left py-3 px-4">{company.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default BillingHistory;
