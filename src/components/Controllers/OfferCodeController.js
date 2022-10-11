import globalMessages from "../../assets/data/globalMessages.json";
import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";

/***** Get Account overview details *****/
export default async function OfferCodeController(offerCode) {
  try {
    let url = "offercode_validation";
    let param = "";
    let data = {"offerCode": offerCode};
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_offercodeValidation_API, error);
  }
}
