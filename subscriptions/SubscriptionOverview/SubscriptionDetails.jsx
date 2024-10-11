import React from "react";
import LoyaltriWebApp from "../LoyaltriWebApp/LoyaltriWebApp";
import LoyaltriMobileApplication from "../LoyaltriApp/LoyaltriMobileApplication";

function SubscriptionDetails() {
  return (
    <section className="w-full h-full px-4 py-4">
      {/* Subscription Overview */}
      <div className="flex flex-col lg:flex-row justify-between w-full">
        <div>
          <h2 className="text-lg font-semibold text-black">
            Subscription Overview
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your active Loyaltri plans, users, and renewals with ease.
          </p>
        </div>
        <div className="gap-2.5 self-stretch px-3.5 py-3 my-auto text-sm font-medium leading-none text-violet-600 bg-indigo-50 rounded-md border border-violet-300 border-dashed">
          Client ID: 35846895
        </div>
      </div>

      {/* Active Plans */}
      <div className="flex items-center gap-2 mt-4">
        <h3 className="text-base font-medium text-black">Active Plans</h3>
        <span className="px-2 py-1 text-xs font-semibold bg-indigo-50 text-violet-600 rounded-md">
          02
        </span>
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row gap-[50px] mt-4">
        {/* LoyaltriWebApp */}
        <div className="min-h-[350px] max-h-[500px]">
          <LoyaltriWebApp className="w-full h-full rounded-lg shadow-lg" />
        </div>

        {/* LoyaltriMobileApplication */}
        <div className="min-h-[350px] max-h-[500px]">
          <LoyaltriMobileApplication className="w-full h-full rounded-lg border border-dashed border-violet-600" />
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-1">
        <div className="h-2 w-2 rounded-full bg-violet-600 /"></div>
        <div className="h-2 w-2 rounded-full bg-gray-300"></div>
      </div>
    </section>
  );
}

export default SubscriptionDetails;


{
    "status": 200,
    "message": "date feteched successfully",
    "errors": [],
    "result": [
        {
            "companyId": "32",
            "organisationId": "1",
            "countryId": "2",
            "company": "Spartan Pvt Ltd",
            "description": "",
            "logo": null,
            "url": "www.spartan.com",
            "address": "test po chennai",
            "country": null,
            "zipCode": "655555",
            "cin": "12346",
            "phone": "9888888888",
            "email": "spartan@gmail.com",
            "isActive": "1",
            "createdBy": "1",
            "createdOn": "2024-08-14 05:20:10+00",
            "modifiedBy": null,
            "modifiedOn": null,
            "fileType": null,
            "stateId": "6",
            "cityId": "133",
            "groupId": "0"
        },
        {
            "companyId": "29",
            "organisationId": "1",
            "countryId": "2",
            "company": "⚠️please-dont-use-its-for-beno",
            "description": "",
            "logo": null,
            "url": "www.tesla.com",
            "address": "tesla hq",
            "country": null,
            "zipCode": "565436",
            "cin": "hgedf35476436",
            "phone": "1234567899",
            "email": "tesla@gmail.com",
            "isActive": "1",
            "createdBy": "1",
            "createdOn": "2024-08-12 05:59:00+00",
            "modifiedBy": null,
            "modifiedOn": "2024-08-23 01:04:36+00",
            "fileType": null,
            "stateId": "6",
            "cityId": "133",
            "groupId": "0"
        },
        {
            "companyId": "1",
            "organisationId": "1",
            "countryId": "2",
            "company": "Seed",
            "description": null,
            "logo": "company/logo/66b46b6b6e42e.png",
            "url": "seed.ae",
            "address": "Dubai",
            "country": null,
            "zipCode": "0001",
            "cin": "0001",
            "phone": "0987654321",
            "email": "info@seed.ae",
            "isActive": "1",
            "createdBy": "1",
            "createdOn": "2024-05-01 00:00:00+00",
            "modifiedBy": null,
            "modifiedOn": "2024-08-08 08:31:00+00",
            "fileType": "png",
            "stateId": "6",
            "cityId": "139",
            "groupId": null
        },
        {
            "companyId": "40",
            "organisationId": "1",
            "countryId": "2",
            "company": "Demo Company",
            "description": "",
            "logo": "company/logo/66c84a0deebf8.png",
            "url": "www.demo.com",
            "address": "twsttttttttttt",
            "country": null,
            "zipCode": "665144",
            "cin": "125",
            "phone": "9555666444",
            "email": "demo1@gmail.com",
            "isActive": "1",
            "createdBy": "1",
            "createdOn": "2024-08-14 09:44:00+00",
            "modifiedBy": null,
            "modifiedOn": "2024-08-23 08:36:29+00",
            "fileType": "png",
            "stateId": "6",
            "cityId": "134",
            "groupId": "0"
        },
        {
            "companyId": "38",
            "organisationId": "1",
            "countryId": "2",
            "company": "Democompany Pvt Ltd",
            "description": "",
            "logo": null,
            "url": "www.democomp.com",
            "address": "testtttttttttttt",
            "country": null,
            "zipCode": "4444",
            "cin": "55555",
            "phone": "9633333333",
            "email": "demo@gmail.com",
            "isActive": "0",
            "createdBy": "1",
            "createdOn": "2024-08-14 09:37:00+00",
            "modifiedBy": null,
            "modifiedOn": "2024-08-21 05:46:23+00",
            "fileType": null,
            "stateId": "15",
            "cityId": "178",
            "groupId": "0"
        },
        {
            "companyId": "48",
            "organisationId": "1",
            "countryId": "2",
            "company": "Testing Don't Delete",
            "description": "",
            "logo": "company/logo/66c6c0bc6f2c3.jpg",
            "url": "https://ytff.in",
            "address": "",
            "country": null,
            "zipCode": "343567",
            "cin": "67",
            "phone": "4651234567",
            "email": "testing@gmail.com",
            "isActive": "1",
            "createdBy": "1",
            "createdOn": "2024-08-22 04:34:24+00",
            "modifiedBy": null,
            "modifiedOn": "2024-08-22 04:42:46+00",
            "fileType": "jpg",
            "stateId": "10",
            "cityId": "168",
            "groupId": "0"
        },
        {
            "companyId": "49",
            "organisationId": "1",
            "countryId": "2",
            "company": "Hj",
            "description": "",
            "logo": null,
            "url": "httsp;;jjf.in",
            "address": "",
            "country": null,
            "zipCode": "678912",
            "cin": "yt",
            "phone": "6576812345",
            "email": "kky@gmqail.com",
            "isActive": "1",
            "createdBy": "1",
            "createdOn": "2024-08-22 04:43:27+00",
            "modifiedBy": null,
            "modifiedOn": null,
            "fileType": null,
            "stateId": "11",
            "cityId": "175",
            "groupId": "0"
        },
        {
            "companyId": "56",
            "organisationId": "1",
            "countryId": "2",
            "company": "Dxb - Nims123",
            "description": null,
            "logo": null,
            "url": "www.dxbnims.com",
            "address": "Test123",
            "country": null,
            "zipCode": "695874",
            "cin": "456987",
            "phone": "7485961235",
            "email": "dxbnims@gmail.com",
            "isActive": "1",
            "createdBy": "1",
            "createdOn": "2024-08-24 01:17:05+00",
            "modifiedBy": "1",
            "modifiedOn": "2024-08-24 01:22:24+00",
            "fileType": null,
            "stateId": "15",
            "cityId": "5",
            "groupId": "0"
        },
        {
            "companyId": "58",
            "organisationId": "1",
            "countryId": "2",
            "company": "Test Company Qa ",
            "description": "",
            "logo": null,
            "url": "https:test.in",
            "address": "test",
            "country": null,
            "zipCode": "56578",
            "cin": "76547",
            "phone": "7879912345",
            "email": "test@gmail.com",
            "isActive": "1",
            "createdBy": "1",
            "createdOn": "2024-08-28 05:05:39+00",
            "modifiedBy": null,
            "modifiedOn": null,
            "fileType": null,
            "stateId": "6",
            "cityId": "134",
            "groupId": "0"
        },
        {
            "companyId": "7",
            "organisationId": "1",
            "countryId": "2",
            "company": "Imprint",
            "description": "",
            "logo": "company/logo/66e2a82a348bc.jpg",
            "url": "https://www.imprintuae.com/",
            "address": "Imprint Office",
            "country": null,
            "zipCode": "00256",
            "cin": "1111223",
            "phone": "0123456789",
            "email": "imprintuae@gmail.com",
            "isActive": "1",
            "createdBy": null,
            "createdOn": "2024-05-25 06:06:31+00",
            "modifiedBy": null,
            "modifiedOn": "2024-09-12 08:36:58+00",
            "fileType": "jpg",
            "stateId": "15",
            "cityId": "178",
            "groupId": "0"
        }
    ]
}
