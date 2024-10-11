import React, { useState, useEffect } from 'react';

const BillingHistory = () => {
    const [companyData, setCompanyData] = useState(null); // Initialize as null
    const [error, setError] = useState(null); // Error state

    // Fetch data from the API
    useEffect(() => {
        fetch('https://dev-api.loyaltri.com/api/main', {
            method: 'GET',
            headers: {
                Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJMT1lBTFRSSSBTRVJWRVIiLCJhdWQiOiJMT1lBTFRSSSBDTElFTlQiLCJzdWIiOiJBVFRIRU5USUNBVElPTiIsImlhdCI6MTcyNDkzMDU5NCwidXNlck5hbWUiOiJhZG1pbiJ9.WftJvLCgEd9lJYfrjbBeKWdfn1g5FT_5HkOiYhJB8ds`,
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('API Data:', data); // Log the entire response
            if (data && data.result) {
                setCompanyData(data.result); // Update state with the API result
            } else {
                throw new Error("No result field in API response");
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setError(error.message); // Set error message
        });
    }, []);
    
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Billing History</h2>

            {/* Error Handling */}
            {error ? (
                <p className="text-red-500">Error: {error}</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Show loading while fetching */}
                    {companyData ? (
                        companyData.length > 0 ? (
                            companyData.map(company => (
                                <div 
                                    key={company.companyId} 
                                    className="border border-gray-300 p-4 bg-white shadow-sm rounded-lg"
                                >
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        {company.company || 'No Company Name'}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-1">Address: {company.address || 'N/A'}</p>
                                    <p className="text-sm text-gray-600 mb-1">Email: {company.email || 'N/A'}</p>
                                    <p className="text-sm text-gray-600 mb-1">Phone: {company.phone || 'N/A'}</p>
                                    <p className="text-sm text-gray-600 mb-1">CIN: {company.cin || 'N/A'}</p>
                                    <p className="text-sm text-gray-600">Created On: {new Date(company.createdOn).toLocaleDateString()}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No company data available.</p>
                        )
                    ) : (
                        <p className="text-gray-600">Loading company data...</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default BillingHistory;
