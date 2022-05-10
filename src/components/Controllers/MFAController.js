import { toast } from "react-toastify";
import globalMessages from "../../assets/data/globalMessages.json";
import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";


/***** To verify the login passcode  *****/
export default async function VerifyLoginPassCode(passCode, email, customerPhone) {
  try {
    //API
    let url = "verify_login_passcode";
    let param = "";
    let data = {
      email: email,
      passCode: passCode,
      deviceType: "",
      customerPhone: customerPhone,
    };
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_Verify_Login_Passcode_API, error);
  }
}