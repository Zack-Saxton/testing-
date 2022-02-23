import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";

/***** Get Account overview details *****/
export default async function offercodeValidation(OfferCode) {
  try {
    let url = "offercode_validation";
    let param = "";
    let data = {"offerCode":OfferCode};
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger("Error executing setAccountDetails API", error);
  }
}
