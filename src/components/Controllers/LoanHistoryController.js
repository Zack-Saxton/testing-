import APICall from "../lib/AxiosLib";

/***** Get Loan history *****/
export default async function LoanHistoryController() {
  try {
    //API
    let url = "account_overview";
    let param = "";
    let data = {};
    let method = "GET";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    Error("Error executing LoanHistoryController API");
  }
}