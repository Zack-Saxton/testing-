import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger"

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
    ErrorLogger("Error executing getVantageScore API", error)
    Error("Error executing getVantageScore API")
  }
}