import APICall from "../lib/AxiosLib";

/***** Get vantage score details *****/
export default async function getVantageScore() {
  try {
  let url = "vantagescore_credit_monitoring";
  let param = "";
  let data = {};
  let method = "GET";
  let addAccessToken = true;

  //API call
  return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    Error("Error executing VantageScore API")
  }
}