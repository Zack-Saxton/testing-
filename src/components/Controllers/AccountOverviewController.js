import APICall from "../lib/AxiosLib";

/***** Get Account overview details *****/
export default async function setAccountDetails() {
  try {
    let url = "account_overview";
    let param = "";
    let data = {};
    let method = "GET";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    Error("Error executing setAccountDetails API");
  }
}
