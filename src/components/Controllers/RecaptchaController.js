import globalMessages from "../../assets/data/globalMessages.json";
import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";

/*****Generate Recaptcha details *****/
export default async function RecaptchaController() {
  try {
    let url = "recaptcha_generate";
    let param = "";
    let data = {};
    let method = "POST";
    let addAccessToken = false;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_RecaptchaController_API, error);
  }
}

/***** Verify Recaptcha *****/
export async function RecaptchaValidationController(grecaptchaResponse, ipAddress) {
  try {
    let url = "recaptcha_validate";
    let param = "";
    let data = {
      recaptcha_response: grecaptchaResponse,
      ip: ipAddress
    };
    let method = "POST";
    let addAccessToken = false;

    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_RecaptchaValidationController_API, error);
  }
}
