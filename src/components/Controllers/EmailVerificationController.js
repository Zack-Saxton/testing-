import {toast} from "react-toastify";
import globalMessages from "../../assets/data/globalMessages.json";
import getClientIp from "../Controllers/CommonController";
import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";

const getOSName = (userAgent) => {
  let osName = "Unknown OS";
  if (userAgent.indexOf("Win") != -1) osName = "Windows";
  if (userAgent.indexOf("Mac") != -1) osName = "MacOS";
  if (userAgent.indexOf("X11") != -1) osName = "UNIX";
  if (userAgent.indexOf("Linux") != -1) osName = "Linux";
  return osName;
}
/***** To validate token *****/
export async function validateActivationToken(verify) {
  try {
    let url = "branch_mail_verification";
    let param = "";
    let userAgent = navigator.userAgent;
    let capturedInfo = {
      click_timestamp: new Date().toISOString(),
      ip_address: await getClientIp(),
      user_agent: userAgent,
      browser: userAgent,
      os: getOSName(userAgent)
    }
    let data = {
      captured_info: capturedInfo,
      queryParams: verify
    };
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_EmailVerificationController_API, error);
  }
}
/***** To upload document *****/

export async function uploadEmailVerificationDocument(compressedFile, filesInfo, applicationNumber, customerEmail, documentType) {
  try {
    let url = "upload_email_verification_document";
    let param = "";
    let data = {
      files: filesInfo,
      compressedFile: compressedFile,
      applicationNumber: applicationNumber,
      customerEmail: customerEmail,
      document_type: documentType,
    };
    let method = "POST";
    let addAccessToken = true;

    //API call
    let uploadData = await APICall(url, param, data, method, addAccessToken);

    if (uploadData.status !== 200) {
      toast.error(uploadData?.data?.message ?? globalMessages.File_Size_Too_Large);
    }
    return uploadData;
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_EmailVerificationController_API, error);
  }

}

/***** save consent *****/

export async function saveConsentStatus(customerEmail, applicationNumber) {
  try {
    let url = "save_consents";
    let param = "";
    let data = {
      save_consents: true,
      customer_email: customerEmail,
      applicationNumber: applicationNumber,
      consentdata: {}
    };
    let method = "POST";
    let addAccessToken = true;

    //API call
    let uploadData = await APICall(url, param, data, method, addAccessToken);
    if (uploadData.status !== 200) {
      toast.error(uploadData?.data?.message ?? globalMessages.ConsentStatusUpdateError)
    }
    return uploadData.status === 200;
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_EmailVerificationController_API, error);
  }
}

/***** Save Acquire Click *****/

export async function saveAcquireClick(customerEmail, applicationNumber) {
  try {
    let url = "save_acquire_click";
    let param = "";
    let acquireClickedat = new Date().toLocaleString("en-US", {
      timeZone: 'America/New_York',
      hour12: false
    })
    let data = {
      customer_email: customerEmail,
      applicationNumber: applicationNumber,
      acquireClickedat
    }
    let method = "POST";
    let addAccessToken = true;
    //API call
    let uploadData = await APICall(url, param, data, method, addAccessToken);
    return uploadData.status === 200;
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_EmailVerificationController_API, error);
  }

}