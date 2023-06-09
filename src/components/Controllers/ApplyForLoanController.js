import Cookies from "js-cookie";
import {toast} from "react-toastify";
import globalMessages from "../../assets/data/globalMessages.json";
import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";
import messages from "../lib/Lang/applyForLoan.json";
import { trimSpecialCharacters } from "../Controllers/CommonController";

/***** Get Available offer details *****/
export async function fetchAvailableOffers() {
  try {
    let url = "fetch_available_offers";
    let param = "";
    let data = {};
    let method = "GET";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_fetchAvailableOffers_API, error);
  }
}

/***** Submit selected offer *****/
export async function submitSelectedOfferAPI(selectedOffer) {
  try {
    let url = "submit_selected_offers";
    let param = "";
    let method = "POST";
    let addAccessToken = true;
    let data = {
      selected_offer: selectedOffer
    };
    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_submitSelectedOfferAPI_API, error);
  }
}

/***** Refer selected branch offer *****/
export async function referSelectedBranchOfferAPI(selectedOffer) {
  try {
    let url = "refer_branch_offers";
    let param = "";
    let method = "POST";
    let addAccessToken = true;
    let data = {
      selected_offer: selectedOffer
    };
    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_referSelectedBranchOfferAPI_API, error);
  }
}

/***** Get signature Iframe *****/
export async function getSignatureIframe() {
  try {
    let url = "esignature_iframe";
    let param = "";
    let data = {};
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_getSignatureIframe_API, error);
  }
}

/***** Get complete signature *****/
export async function completeSignature() {
  try {
    let url = "esignature_complete";
    let param = "";
    let data = {};
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_completeSignature_API, error);
  }
}

/***** Resend Verification *****/
export async function resendVerificationEmail() {
  const email = Cookies.get("email");
  let url = "resend_verification_email";
  let param = "";
  let data = {};
  let method = "POST";
  let addAccessToken = true;

  //API call
  let resendVerificationEmailMethod = await APICall(url, param, data, method, addAccessToken);
  if (resendVerificationEmailMethod?.status === 200 && resendVerificationEmailMethod?.statusText === "OK") {
    if (!toast.isActive("closeToast")) {
      toast.success(messages?.emailVerification?.emailSentSuccess + email, {toastId: "closeToast"});
    }
  }
  return resendVerificationEmailMethod;
}

/***** OTP submission *****/
export async function OTPInitialSubmission(phoneNumber, deliverMethod) {
  try {
    let url = "otp_initial_submission";
    let param = "";
    let data = {
      phone_number_primary_formatted: trimSpecialCharacters(phoneNumber),
      deliverMethod: deliverMethod,
    };
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_OTPInitialSubmission_API, error);
  }
}

/***** Verify Passcode for Phone *****/
export async function verifyPasscode(passcode) {
  try {
    let url = "verify_passcode";
    let param = "";
    let data = {passcode: passcode};
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_verifyPasscode_API, error);
  }
}

export async function hardPullCheck(applicantID) {
  const userCustomerId = Cookies.get('userCustomerId')
  const userApplicantId = Cookies.get('userApplicantId')

  try {
    let url = "cis_hardpull";
    let param = "";
    let data = {
      customer_id: userCustomerId,
      applicant_id: applicantID ?? userApplicantId
    }
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
    
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_hardPullCheck_API, error);
  }
}

/***** Submit financial information *****/
export async function submitFinancialInformation(body) {
  try {
    let url = "submit_final_verification";
    let param = "";
    let data = body;
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_submitFinancialInformation_API, error);
  }
}

/***** Get IFrame *****/
export async function getIframe() {
  try {
    let url = "get_iframe";
    let param = "";
    let data = {};
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_getIframe_API, error);
  }
}

/***** Upload Document *****/
export async function uploadDocument(fileData, fileName, fileType, documentType, applicantGuid) {
  try {
    const loginToken = JSON.parse(Cookies.get("token") ? Cookies.get("token") : '{ }');
    let url = "upload_verification_document";
    let param = "";
    let data = {
      applicantGuid: applicantGuid !== '' ? applicantGuid : loginToken.applicantGuid,
      file: {
        document_file: {
          name: fileName,
          mimetype: fileType,
          data: fileData,
        },
      },
      documentType: documentType,
    };
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_uploadDocument_API, error);
  }
}

/***** Submit id verification answers multi*****/
export async function idVerificationAnswer(passData) {
  try {
    let url = "kba_answers_cac";
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

/***** Get verificationSteps details *****/
export async function verificationSteps() {
  try {
    let url = "verification_steps_cac";
    let param = "";
    let data = {};
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_AccountDetails_API, error);
  }
}

/**** To verify uploaded document ********************/
export async function saveIDScan(requestID) {
  try {
    let url = "save_id_scane";
    let param = "";
    let data = {requestID: requestID};
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger("Error uploading document", error);
  }
}

/**** To upload the scaned document ********************/
export async function saveIDScanBeforeCAC(bodyContent) {
  try {
    let url = "save_id_scane_before_cac";
    let param = "";
    let data = bodyContent;
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger("Error uploading document ", error);
  }

}