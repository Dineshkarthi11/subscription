import React, { useState, useEffect } from 'react';

const BillingHistory = () => {
    const [companyData, setCompanyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dev-api.loyaltri.com/api/main', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJMT1lBTFRSSSBTRVJWRVIiLCJhdWQiOiJMT1lBTFRSSSBDTElFTlQiLCJzdWIiOiJBVFRIRU5USUNBVElPTiIsImlhdCI6MTcyNDkzMDU5NCwidXNlck5hbWUiOiJhZG1pbiJ9.WftJvLCgEd9lJYfrjbBeKWdfn1g5FT_5HkOiYhJB8ds`,
                    },
                });

                console.log('Request URL:', response.url); // Log the request URL
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('API Data:', data); // Log the entire response

                setCompanyData(data.result || []); // Set the company data
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message); // Set error message
                setLoading(false); // Set loading to false even on error
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading company data...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Company Data</h1>
            <ul className="space-y-4">
                {companyData.map((company) => (
                    <li key={company.companyId} className="p-4 bg-white shadow rounded-md">
                        <h2 className="text-xl font-semibold">{company.company}</h2>
                        <p><strong>Email:</strong> {company.email}</p>
                        <p><strong>Phone:</strong> {company.phone}</p>
                        <p><strong>Website:</strong> <a href={`http://${company.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">{company.url}</a></p>
                        <p><strong>Address:</strong> {company.address}</p>
                        <p><strong>CIN:</strong> {company.cin}</p>
                        <p><strong>Zip Code:</strong> {company.zipCode}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BillingHistory;
