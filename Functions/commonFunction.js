import API, { action } from "../../Api";
import dayjs from "dayjs";
import CryptoJS from "crypto-js";
import { Payrollaction } from "../../PayRollApi";

const companyId = localStorage.getItem("companyId");

// get Company Data

const getCompanyList = async (id) => {
  try {
    const result = await action(API.GET_COMPANY_RECORDS, {
      organisationId: id,
      isActive: 1,
    });
    // console.log(result.result);
    if (result.status === 200) {
      return result.result;
    } else {
      // console.log(result.message);
    }
  } catch (error) {
    // console.log(error.message);
    // return error;
  }
};

// get all Employee

const getEmployeeList = async (id = localStorage.getItem("companyId")) => {
  try {
    const result = await action(API.GET_EMPLOYEE, {
      companyId: id,
      isActive: 1,
    });
    if (result.status === 200) {
      return result.result;
    } else {
      // console.log(result.message);
    }
  } catch (error) {
    // console.log(error.message);
    // return error;
  }
};
const dateFormater = (data) => {
  // console.log(data, "data");
  const date = data === undefined ? new Date() : data;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  // Create the YYYY-MM-DD format
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

// Add Month ex: +6
const addMonths = (date, months) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return dayjs(result).format("YYYY-MM");
};

const fetchCompanyDetails = async (Id) => {
  try {
    const result = await action(API.GET_COMPANY_ID_BASED_RECORDS, {
      id: Id || localStorage.getItem("companyId"),
    });
    localStorage.setItem("pfDetails", result?.result?.isPFESIenabled);
    return result.result;
  } catch (error) {
    // console.log(error);
  }
};

// Encrypt---Data

const encrypt = (data) => {
  return btoa(data.toString());
};

// Decrypt -- Data

const decrypt = (data) => {
  try {
    return atob(data);
  } catch (error) {
    console.error("Failed to decrypt actionID:", error);
    return null;
  }
};

const decryptFun = (key) => {
  const secretKey = "your-secret-key";
  // const decryptData = (cipherText, secretKey) => {
  if (key) {
    const bytes = CryptoJS.AES.decrypt(key, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
  // };
  // const storedEncryptedData = await localStorage.getItem("encryptedData");

  // const decryptedData = decryptData(storedEncryptedData, secretKey);

  // return decryptedData;
};

const checkEmployeeMonthPayout = async (id, month) => {
  try {
    const result = await Payrollaction(API.CHECK_EMPLOYEE_MONTH_PAYOUT, {
      employeeId: id,
      salaryMonthYear: month,
    });
    return result;
  } catch (error) {
    // return error.code;
  }
};

export {
  getCompanyList,
  getEmployeeList,
  dateFormater,
  addMonths,
  fetchCompanyDetails,
  decryptFun,
  encrypt,
  decrypt,
  checkEmployeeMonthPayout,
};
