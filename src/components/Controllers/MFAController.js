import globalMessages from "../../assets/data/globalMessages.json";
import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";


/***** To Send the passcode *****/
export async function SendLoginPassCode(customerPhone) {
  try {
    //API
    let url = "send_login_passcode";
    let param = "";
    let data = {
      deliveryMethod: "phone",
      customerPhone: customerPhone
    };
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_Send_Login_Passcode_API, error);
  }
}



/***** To verify the login passcode  *****/
export async function VerifyLoginPassCode(passCode, email, deviceType, customerPhone) {
  try {
    //API
    let url = "verify_login_passcode";
    let param = "";
    let data = {
      email: email,
      passCode: passCode,
      deviceType: deviceType,
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

export async function fetchQuestionMFA(emailData) {
  try {
    let url = "mfa_user_detials";
    let param = "";
    let data = {
      email: emailData
    };
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_AccountDetails_API, error);
  }
}

export async function fetchAllMFAQuestion() {
  try {
    let url = "get_all_mfa_question";
    let param = "";
    let data = {};
    let method = "GET";
    let addAccessToken = false;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_AccountDetails_API, error);
  }
}

export async function saveSecurityAnswer(answerData) {
  try {
    let url = "save_security_id_answer";
    let param = "";
    let data = answerData;
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_AccountDetails_API, error);
  }
}

/***** Submit id verification answers multi*****/
export async function idVerificationAnswer(passData) {
  try {
    let url = "mfa_disambiguate_answer";
    let param = "";
    let data = passData;
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_idVerificationAnswer_API, error);
  }
}
/***** Save phonenumber*****/
export async function SavePhoneNumber(email, phone) {
  try {
    let url = "mfa_save_phone_number";
    let param = "";
    let data = {
      email: email,
      mfa_phone_texting: phone
    };
    let method = "POST";
    let addAccessToken = true;
    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_SavePhoneNumber_API, error);
  }
}
