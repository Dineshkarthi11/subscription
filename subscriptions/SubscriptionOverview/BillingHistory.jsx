import React, { useState, useEffect } from 'react';

const BillingHistory = () => {
    const [companyData, setCompanyData] = useState([]);
    
    // Fetch data from the API
    useEffect(() => {
        fetch('https://dev-api.loyaltri.com/api/main', {
            method: 'GET',
            headers: {
                Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJMT1lBTFRSSSBTRVJWRVIiLCJhdWQiOiJMT1lBTFRSSSBDTElFTlQiLCJzdWIiOiJBVFRIRU5USUNBVElPTiIsImlhdCI6MTcyNDkzMDU5NCwidXNlck5hbWUiOiJhZG1pbiJ9.WftJvLCgEd9lJYfrjbBeKWdfn1g5FT_5HkOiYhJB8ds`,
            }
        })
        .then(response => response.json())
        .then(data => {
            setCompanyData(data.result); // Update state with the API result
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);
    
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Billing History</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {companyData.length > 0 ? (
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
                    <p className="text-gray-600">Loading company data...</p>
                )}
            </div>
        </div>
    );
};

export default BillingHistory;

Cannot read properties of undefined (reading 'length')
TypeError: Cannot read properties of undefined (reading 'length')
    at BillingHistory (http://localhost:3000/static/js/bundle.js:65843:29)
    at renderWithHooks (http://localhost:3000/static/js/bundle.js:504174:22)
    at updateFunctionComponent (http://localhost:3000/static/js/bundle.js:507741:24)
    at beginWork (http://localhost:3000/static/js/bundle.js:509460:20)
    at HTMLUnknownElement.callCallback (http://localhost:3000/static/js/bundle.js:494430:18)
    at Object.invokeGuardedCallbackDev (http://localhost:3000/static/js/bundle.js:494474:20)
    at invokeGuardedCallback (http://localhost:3000/static/js/bundle.js:494531:35)
    at beginWork$1 (http://localhost:3000/static/js/bundle.js:514429:11)
    at performUnitOfWork (http://localhost:3000/static/js/bundle.js:513677:16)
    at workLoopSync (http://localhost:3000/static/js/bundle.js:513600:9)
