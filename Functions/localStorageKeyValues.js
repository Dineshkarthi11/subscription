import { decrypt } from "./commonFunction";

const localStorageData = {
  employeeId: decrypt(localStorage.getItem("employeeId")),
  companyId: localStorage.getItem("companyId"),
  LoginData: JSON.parse(localStorage.getItem("LoginData")),
  companylogo: localStorage.getItem("companylogo"),
  encryptedData: localStorage.getItem("encryptedData"),
  layout: localStorage.getItem("layout"),
  mainColor: localStorage.getItem("mainColor"),
  myAppTabKey: localStorage.getItem("myAppTabKey"),
  myUniqueTabId: localStorage.getItem("myUniqueTabId"),
  organisationId: localStorage.getItem("organisationId"),
  pfDetails: localStorage.getItem("pfDetails"),
  selectedMainMenu: localStorage.getItem("selectedMainMenu"),
  selectedMainMenuId: localStorage.getItem("selectedMainMenuId"),
  subscriptionMessage: localStorage.getItem("subscriptionMessage"),
  theme: localStorage.getItem("theme"),
};

export default localStorageData;
