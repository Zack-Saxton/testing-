import Cookies from "js-cookie";
import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";
import globalMessages from "../../assets/data/globalMessages.json"


/***** Login method *****/
export default async function LoginController(email, password, clientIp) {
  try {
    let url = "login_customer";
    let param = "";
    let data = {
      email: email,
      password: password,
      clientIp: clientIp,
    };
    let method = "POST";
    let addAccessToken = false;

    //API call
    let loginMethod = await APICall(url, param, data, method, addAccessToken);
    Cookies.set("user", JSON.stringify({ user: loginMethod?.data?.user }));
    return loginMethod;
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_LoginController_API, error);
  }
}

/***** Register method *****/
export async function RegisterController(registerData) {
  try {
    let api = "register_customer";
    let param = "";
    let data = registerData;
    let method = "POST";
    let addAccessToken = false;

    //API call
    return APICall(api, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_RegisterController_API, error);
  }
}
