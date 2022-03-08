import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";
import globalMessages from "../../assets/data/globalMessages.json";


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
    ErrorLogger(globalMessages.Error_executing_getVantageScore_API, error);
  }
}