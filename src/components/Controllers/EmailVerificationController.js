import globalMessages from "../../assets/data/globalMessages.json";
import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";
import getClientIp from "../Controllers/CommonController";
import { toast } from "react-toastify";
import { func } from "prop-types";

const getOSName = (userAgent) => {
    var osName="Unknown OS";
    if (navigator.userAgent.indexOf("Win")!=-1) osName="Windows";
    if (navigator.userAgent.indexOf("Mac")!=-1) osName="MacOS";
    if (navigator.userAgent.indexOf("X11")!=-1) osName="UNIX";
    if (navigator.userAgent.indexOf("Linux")!=-1) osName="Linux";
    return osName;
} 
/***** Get loan document *****/
export async function validateActivationToken(activationToken, customerMail, applicationNumber) {
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
      user_activation_token_link: activationToken,
      customer_email: customerMail,
      applicationNumber: applicationNumber
    };  
    let method = "POST";
    let addAccessToken = true;    

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_loanDocumentController_API, error);
  }
}

export async function uploadEmailVerificationDocument(compressedFile, filesInfo, applicationNumber, customerEmail, documentType) {
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
  //API response
  uploadData.status === 200 ? "" : toast.error(uploadData?.data?.message ?? globalMessages.Document_upload_error);
  return uploadData;
}

export async function saveConsentStatus(customerEmail, applicationNumber) {
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
  //API response
  uploadData.status === 200
    ? ""
    : toast.error(uploadData?.data?.message ?? globalMessages.ConsentStatusUpdateError);

  return uploadData.status === 200;
}

export async function saveAcquireClick(customerEmail, applicationNumber){
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
}