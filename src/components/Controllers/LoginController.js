import Cookies from "js-cookie";
import APICall from "../lib/AxiosLib";

/***** Login method *****/
export default async function LoginController(email, password) {
  try {
    let url = "login_customer";
    let param = "";
    let data = {
      email: email,
      password: password,
    };
    let method = "POST";
    let addAccessToken = false;

    //API call
    let loginMethod = await APICall(url, param, data, method, addAccessToken);
    Cookies.set("user", JSON.stringify({ user: loginMethod?.data?.user }));
    return loginMethod;
  } catch (error) {
    Error("Error executing LoginController API");
  }
}
