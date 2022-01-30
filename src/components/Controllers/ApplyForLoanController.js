import APICall from "../lib/AxiosLib";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import messages from "../lib/Lang/applyForLoan.json"

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
    Error("Error executing fetchAvailableOffers API");
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
      selected_offer: {
        model_code: selectedOffer.model_code,
        cosigner_required: selectedOffer.cosigner_required,
        loan_amount: selectedOffer.loan_amount,
        annual_interest_rate: selectedOffer.annual_interest_rate,
        origination_fee_rate: selectedOffer.origination_fee_rate,
        origination_fee_amount: selectedOffer.origination_fee_amount,
        apr: selectedOffer.apr,
        monthly_payment: selectedOffer.monthly_payment,
        term: selectedOffer.term,
        display: selectedOffer.display,
        type: selectedOffer.type,
        pricing_grade: selectedOffer.pricing_grade,
        marginal_offer: selectedOffer.marginal_offer,
        displayPromoOffer: selectedOffer.displayPromoOffer,
        postScreenOffer: selectedOffer.postScreenOffer,
        payment_to_income: selectedOffer.payment_to_income,
        displayLightBoxOffer: selectedOffer.displayLightBoxOffer,
        lightBoxOffer: selectedOffer.lightBoxOffer,
        maximum_post_loan_detni: selectedOffer.maximum_post_loan_detni,
        post_loan_debt_to_income: selectedOffer.post_loan_debt_to_income,
        post_loan_debt_and_expenses_to_net_income:
          selectedOffer.post_loan_debt_and_expenses_to_net_income,
        post_loan_debt_to_net_income: selectedOffer.post_loan_debt_to_net_income,
        _id: selectedOffer._id,
        applicant: selectedOffer.applicant,
        product: {
          identification: {
            name: selectedOffer.product.identification.name,
            guid: selectedOffer.product.identification.guid,
          },
          contenttypes: selectedOffer.product.contenttypes,
          entitytype: selectedOffer.product.credit_product,
          credit_product_type: selectedOffer.product.credit_product_type,
          parent_product_type: selectedOffer.product.parent_product_type,
          description: selectedOffer.product.description,
          _id: selectedOffer.product._id,
          createdat: selectedOffer.product.createdat,
          updatedat: selectedOffer.product.updatedat,
        },
        offerType: selectedOffer.offerType,
      },
    };

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    Error("Error executing submitSelectedOfferAPI API");
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
    Error("Error executing getSignatureIframe API");
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
    Error("Error executing completeSignature API");
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
  if (resendVerificationEmailMethod.data.status === 200 && resendVerificationEmailMethod.data.statusText) {
    if (!toast.isActive("closeToast"))  
      { toast.success(messages?.emailVerification?.emailSentSuccess + email, 
        {toastId: "closeToast"}); 
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
      phone_number_primary_formatted: phoneNumber,
      deliverMethod: deliverMethod,
    };
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    Error("Error executing OTPInitialSubmission API");
  }
}

/***** Verify Passcode for Phone *****/
export async function verifyPasscode(passcode) {
  try {
    let url = "verify_passcode";
    let param = "";
    let data = { passcode: passcode };
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    Error("Error executing verifyPasscode API");
  }
}


export async function hardPullCheck() {
  try {
    let url = "cis_hardpull";
    let param = "";
    let data = JSON.parse(Cookies.get("user") ? Cookies.get("user") : '{ }');
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    Error("Error executing hardPullCheck API");
  }
}

/***** Verify Financial Information *****/
export async function verifyFinancialInformation() {
  try {
    let url = "verify_financial_information";
    let param = "";
    let data = {
      employer_name: "vicky",
      current_job_title: "develoer",
      employer_phone: "9876543210",
      years_at_current_address: "12",
      refer: "nil",
    };
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    Error("Error executing verifyFinancialInformation API");
  }
}

/***** ID Verification for IFrame *****/
export async function getIDVerificationIframe() {
  try {
    let url = "id_verification_iframe";
    let param = "";
    let data = {};
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    Error("Error executing getIDVerificationIframe API");
  }
}

/***** Save ID verification response *****/
export async function saveIDVerificationResponseBefore() {
  try {
    let url = "save_id_verification";
    let param = "";
    let data = {};
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    Error("Error executing saveIDVerificationResponseBefore API");
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
    Error("Error executing submitFinancialInformation API");
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
    Error("Error executing getIframe API");
  }
}

/***** Upload Document *****/
export async function uploadDocument(fileData, fileName, fileType, documentType) {
  try {
    const loginToken = JSON.parse(Cookies.get("token") ? Cookies.get("token") : '{ }');
    let url = "upload_verification_document";
    let param = "";
    let data = {
      applicantGuid: loginToken.applicantGuid,
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
    Error("Error executing uploadDocument API");
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
    Error("Error executing idVerificationAnswer API");
  }
}