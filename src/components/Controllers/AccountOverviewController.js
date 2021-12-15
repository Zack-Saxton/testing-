import APICall from "../lib/AxiosLib";

/***** Get Account overview details *****/
export default async function setAccountDetails() {
  let url = "account_overview";
  let param = "";
  let data = {};
  let method = "GET";
  let addAccessToken = true;

  //API call
  let accountOverview = await APICall(url, param, data, method, addAccessToken);
  return accountOverview;
}
