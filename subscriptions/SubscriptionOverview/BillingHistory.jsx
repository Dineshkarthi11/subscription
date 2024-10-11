import React, { useEffect, useState } from "react";
import axios from "axios";

function BillingHistory() {
  const [companyData, setCompanyData] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Fetch company data from API
    const fetchCompanyData = async () => {
      try {
        const response = await axios.post(
          "https://dev-api.loyaltri.com/api/main",
          {
            action: "getCompaniesByLocation",
            method: "POST",
            kwargs: {
              employeeId: "5535", // Pass correct employeeId
              location: "2", // Pass correct location
            },
          }
        );
        setCompanyData(response.data.data || []); // Set the response data or an empty array if no data is present
      } catch (error) {
        console.error("Error fetching company data", error);
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };

    fetchCompanyData();
  }, []);

  return (
    <section className="flex flex-col px-6 mt-6 w-full max-md:px-5 max-md:max-w-full">
      <h2 className="self-start text-base font-medium text-black">
        Company Details
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : companyData.length === 0 ? (
        <p>No company data available.</p>
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
              {companyData.map((company, index) => (
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
