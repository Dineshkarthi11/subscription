import React, { useEffect, useState } from 'react';

const BillingHistory = () => {
    const [companyData, setCompanyData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dev-api.loyaltri.com/api/main', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJMT1lBTFRSSSBTRVJWRVIiLCJhdWQiOiJMT1lBTFRSSSBDTElFTlQiLCJzdWIiOiJBVFRIRU5USUNBVElPTiIsImlhdCI6MTcyNDkzMDU5NCwidXNlck5hbWUiOiJhZG1pbiJ9.WftJvLCgEd9lJYfrjbBeKWdfn1g5FT_5HkOiYhJB8ds`,
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setCompanyData(data.result || []);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) return <div>Loading company data...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Billing History</h2>
            <div className="bg-white shadow-md rounded-lg p-4">
                {companyData.length === 0 ? (
                    <div>No company data available.</div>
                ) : (
                    <ul className="space-y-4">
                        {companyData.map((company) => (
                            <li key={company.companyId} className="border p-4 rounded-lg">
                                <h3 className="text-lg font-semibold">{company.company}</h3>
                                <div className="text-gray-700">
                                    <div>Email: {company.email}</div>
                                    <div>Phone: {company.phone}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default BillingHistory;
