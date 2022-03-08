import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";
import globalMessages from "../../assets/data/globalMessages.json";


/***** Get Account overview details *****/
export default async function offercodeValidation(OfferCode) {
  try {
    let url = "offercode_validation";
    let param = "";
    let data = { "offerCode": OfferCode };
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_offercodeValidation_API, error);
  }
}
