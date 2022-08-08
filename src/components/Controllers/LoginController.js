import Cookies from "js-cookie";
import globalMessages from "../../assets/data/globalMessages.json";
import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";
import { encryptAES } from "../lib/Crypto";
const moment = require("moment");
const moment_timezone = require("moment-timezone");
let addVal = moment_timezone().tz("America/New_York").isDST() ? 4 : 5;
/***** Login method *****/
export default async function LoginController(email, password, clientIp,longitude,latitude, deviceType) {
  try {
    let url = "login_customer";
    let param = "";
    let data = {
      email: email,
      password: password,
      clientIp: clientIp,
      deviceType: deviceType,
      longitude : longitude || "",
      latitude : latitude || ""
    };
    let method = "POST";
    let addAccessToken = false;

    //API call
    let loginMethod = await APICall(url, param, data, method, addAccessToken);
    localStorage.setItem("user", JSON.stringify({ user: loginMethod?.data?.user }));
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
    return await APICall(api, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_RegisterController_API, error);
  }
}


const setCookiesPostLogin = (retVal, now, values, login_date, mfaData, remMe) => {
  Cookies.set(
    "token",
    JSON.stringify({
      isLoggedIn: true,
      apiKey: retVal?.data?.user?.extensionattributes?.login?.jwt_token,
      setupTime: now,
      applicantGuid: retVal?.data?.user?.attributes?.sor_data?.applicant_guid,
      isMFA:retVal?.data?.user?.extensionattributes?.MFA ?? false,
      isMFACompleted: false
    })
  );
  Cookies.set("cred", encryptAES(JSON.stringify({ email: values?.email, password: values?.password })));
  Cookies.set("email", values?.email);
  Cookies.set("firstName", retVal?.data?.user?.firstname);
  Cookies.set("lastName", retVal?.data?.user?.lastname);
  Cookies.set("userId", retVal?.data?.user?._id);
  Cookies.set("profile_picture", retVal?.data?.user?.mobile?.profile_picture ? retVal?.data?.user?.mobile?.profile_picture : "");
  Cookies.set("login_date", login_date);
  Cookies.set("userToken", retVal?.data?.user?.attributes?.UserToken);
  Cookies.set("temp_opted_phone_texting", "");
  Cookies.set("rememberMe", remMe ? JSON.stringify({ selected: true, email: values?.email }) : JSON.stringify({ selected: false, email: '' }));
  Cookies.set("mfaDetails", JSON.stringify(mfaData));
}

export const handleSuccessLogin = (retVal, values, mfaData, rememberMe, queryClient,navigate, location) => {
  let login_date = retVal?.data?.user?.extensionattributes?.login
  ?.last_timestamp_date
  ? moment(retVal.data.user.extensionattributes.login.last_timestamp_date)
    .subtract(addVal, "hours")
    .format("MM/DD/YYYY")
  : "";
  let now = new Date().getTime();
  // On login success storing the needed data in the local storage
  setCookiesPostLogin(retVal, now, values, login_date, mfaData, rememberMe);
  queryClient.removeQueries();  
  if(retVal?.data?.user?.extensionattributes?.LockUserByMFACounter === 1 && retVal?.data?.user?.extensionattributes?.MFA){
    Cookies.set("forceResetPassword", retVal?.data?.user?.attributes?.password_reset);
    navigate("/MFA-phoneNumber", {state:mfaData });
  }
  else if(retVal?.data?.user?.extensionattributes?.MFA){
    Cookies.set("forceResetPassword", retVal?.data?.user?.attributes?.password_reset);
    Cookies.set("mfaDetails", mfaData);
    navigate("/MFA", { state: mfaData });
  } 
  else if(retVal?.data?.user?.extensionattributes?.LockUserByMFACounter > 0 && !retVal?.data?.user?.extensionattributes?.securityQuestionsSaved && !retVal?.data?.user?.extensionattributes?.MFA){
    navigate('/MFA-SelectSecurityQuestions', { state: { currentFlow: true } });
  } 
  else {
    retVal?.data?.user?.attributes?.password_reset
    ? navigate("/resetpassword", { state: { Email: values?.email } })
    : navigate(location.state?.redirect ? location.state?.redirect : "/customers/accountoverview");
  }
  if (location.state?.activationToken) {
    navigate(0);
  }
}