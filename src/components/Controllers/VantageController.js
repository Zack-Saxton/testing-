import APICall from "../lib/AxiosLib";

/***** Get vantage score details *****/
export async function getVantageScore() {
  let url = "vantagescore_credit_monitoring";
  let param = "";
  let data = {};
  let method = "GET";
  let addAccessToken = true;

  //API call
  let vantageScore = await APICall(url, param, data, method, addAccessToken);
  return vantageScore;
}