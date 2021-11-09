import APICall from "../lib/AxiosLib";

/***** Get Loan history *****/
export default async function LoanHistoryController() {
  //API
  let url = "account_overview";
  let param = "";
  let data = {};
  let method = "GET";
  let addAccessToken = true;

  //API call
  let loanHistory = await APICall(url, param, data, method, addAccessToken);

  return loanHistory;
}
