import Cookies from "js-cookie";
import {toast} from "react-toastify";
import globalMessages from "../../assets/data/globalMessages.json";
import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";
import {statusStrLinks_PartnerSignUp} from "../lib/StatusStrLinks";
import LoginController from "../Controllers/LoginController"
import getClientIp, { trimSpecialCharacters } from "../Controllers/CommonController";


let statusStrLink = statusStrLinks_PartnerSignUp;

export default async function PartnerSignup(navigate, partnerToken, applicantId, partnerSignupData, utm_source) {
  
  let dateNow = new Date().toISOString();
		let browserType = navigator.userAgent;
		let ipAddress = await getClientIp();
let esignConsent = {
  "date": dateNow,
  "useragent": browserType,
  "ipaddress": ipAddress,
};

//API for latest consent versions
  let url_consent = "get_active_documents";
  let param_consent = "";
  let data_consent = {};
  let method_consent = "GET";
  let addAccessToken_consent = false;


  //API call
  let activeConsetDocument = await APICall(url_consent, param_consent, data_consent, method_consent, addAccessToken_consent);
  let consent = {};
  let esign = {};
  let user = {};

  //Assemble 'consent', 'user' Object with dynamic data
  activeConsetDocument.data.documents.forEach(doc => {
    if (doc.displayname.toLowerCase() === 'credit_contact_authorization') {
      consent.credit_contact_authorization = {
        "consent": true,
        "version": doc.version.toString(),
      }
      user.Consent_Credit_Contact_Authorization_Version__c = doc.version.toString();
    } else if (doc.displayname.toLowerCase() === 'electronic_disclosure_consent') {
      consent.electronic_communications = {
        "consent": true,
        "version": doc.version.toString(),
      }
      user.Consent_Electronic_Communication_Policy_Version__c = doc.version.toString();
    } else if (doc.displayname.toLowerCase() === 'terms_of_use_document') {
      consent.terms_of_use = {
        "consent": true,
        "version": doc.version.toString(),
      }
      user.Consent_Terms_Of_Use_Version__c = doc.version.toString();
    } else if (doc.displayname.toLowerCase() === 'privacy_policy_document') {
      consent.privacy_policy = {
        "consent": true,
        "version": doc.version.toString(),
      }
      user.Consent_Privacy_Policy_Version__c = doc.version.toString();
    }
  });
//dynamically update deleware 'consent' and 'esign' if applicable
if (partnerSignupData.state === 'DE') {
  consent.delaware_itemized_schedule_of_charges = {
    "consent": true,
    "version": "1.0",
  };
     esign.delaware_itemized_schedule_of_charges = esignConsent;
 }

 //dynamically update california 'consent' and 'esign' if applicable
 if (partnerSignupData.state === 'CA') {
  consent.california_credit_education_program = {
    "consent": true,
    "version": "1.0",
  };
   esign.california_credit_education_program = esignConsent;
 }

 if (partnerSignupData.state === 'NM') {
  consent.new_mexico_disclosure = {
    "consent": true,
    "version": "1.0",
  };
  esign.new_mexico_disclosure = esignConsent;
}
  //assemble 'esign' Object
  esign.credit_contact_authorization = esignConsent;
  esign.electronic_communications = esignConsent;
  esign.privacy_policy = esignConsent;
  esign.terms_of_use = esignConsent;

  let consentdata = partnerSignupData?.utm_source === "CreditKarma" ? "" :  {consentdata : {
      "consents": consent,
      "esigns": esign,
    }}
  
  
  let url = "partner_signup";
  let param = "";
  let data = { 
    partner_token: partnerToken,
    applicant_id: applicantId,
    ssn_last_four: partnerSignupData.ssn,
    phone: trimSpecialCharacters(partnerSignupData.phone),
    phone_type: partnerSignupData.phoneType,
    password: partnerSignupData.password,
    password_confirm: partnerSignupData.confirm_password,
    isAuthenticated: true,
    active_duty: partnerSignupData.activeDuty,
    active_duty_rank: partnerSignupData.activeDutyRank,
    spouse_city: partnerSignupData.spousecity,
    spouse_zipcode: partnerSignupData.spouseZipcode,
    spouse_state: partnerSignupData.spouseSelectState,
    spouse_address: partnerSignupData.spouseadd,
    marital_status: partnerSignupData.martialStatus,
    ...consentdata
  };
  let method = "POST";
  let addAccessToken = false;

  //API call
  let partnerSignupMethod = await APICall(url, param, data, method, addAccessToken);

  partnerSignupMethod?.status === 200
    ? toast.success(partnerSignupMethod?.data?.statusText ? partnerSignupMethod?.data?.statusText
      : partnerSignupMethod?.data?.applicant?.processing?.status === "confirming_info" ? globalMessages.confirm_Info_Login : globalMessages.confirm_Info_LoginMessage,
      {
        onClose: async () => {
          let now = new Date().getTime();
          Cookies.set("redirec", JSON.stringify({to: "/select-amount"}));         

         let jwtTokenCheck =  partnerSignupMethod?.data?.user?.extensionattributes
          ?.login?.jwt_token  ?? ""

          if(!jwtTokenCheck ){
            let loginRes =  await LoginController(
              partnerSignupData?.email,
              partnerSignupData.password, partnerSignupData?.ClientIP,"","",
              window.navigator.userAgent, //It is static for now. Will add the dynamic code later
              ""
            );
            jwtTokenCheck = loginRes?.data?.user?.extensionattributes
            ?.login?.jwt_token
          }

          Cookies.set(
            "token",
            JSON.stringify({
              isLoggedIn: true,
              apiKey: jwtTokenCheck,                
              setupTime: now,
            })
          )
          Cookies.set("email", partnerSignupMethod?.data?.applicant.contact.email);
          Cookies.set("firstName", partnerSignupMethod?.data?.applicant?.contact?.first_name);
          Cookies.set("lastName", partnerSignupMethod?.data?.applicant?.contact?.last_name);
          localStorage.setItem("user", JSON.stringify({user: partnerSignupMethod?.data?.user}));
          if (utm_source === "amone" && partnerSignupMethod?.data?.applicant?.processing?.status === "rejected") {
            navigate("/offers/no-offers")
          }
          else {
            navigate(statusStrLink[partnerSignupMethod?.data?.applicant.processing.status],
              {
                state: {
                  partnerSignupData: partnerSignupMethod?.data,
                  firstname: partnerSignupMethod?.data?.applicant?.contact?.first_name
                }
              });
          }
        },
      }
    )
    : toast.error(partnerSignupMethod?.statusText ?? globalMessages.Confirm_Info_checkData);
  return partnerSignupMethod;
}
export async function PopulatePartnerSignup(
  partnerToken,
  applicantId,
  requestAmt,
  requestApr,
  requestTerm
) {
  try {
    let url = "populate_partner_signup";
    let param = "";
    let data = {
      partner_token: partnerToken,
      applicant_id: applicantId,
      affiliateSelection: {
        requestedAmount: requestAmt,
        requestedAPR: requestApr,
        requestedTerm: requestTerm,
      },
    };
    let method = "POST";
    let addAccessToken = false;
    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_PopulatePartnerSignup_API, error);
  }
}

export async function PopulatePartnerReferred(applicantId) {
  try {
    let url = "populate_partner_referred";
    let param = "";
    let data = {application_id: applicantId};
    let method = "POST";
    let addAccessToken = false;
    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_PopulatePartnerSignup_API, error);
  }
}

export async function partnerConfirmInfo(dataConfirmInfo, navigate, refetch) {
  const email = Cookies.get("email");

 //API for latest consent versions
 let url_consent = "get_active_documents";
 let param_consent = "";
 let data_consent = {};
 let method_consent = "GET";
 let addAccessToken_consent = false;

 //API call
 let activeConsetDocument = await APICall(url_consent, param_consent, data_consent, method_consent, addAccessToken_consent);
 let consent = {};

 //Assemble 'consent', 'user' Object with dynamic data
 activeConsetDocument.data.documents.forEach(doc => {
   if (doc.displayname.toLowerCase() === 'credit_contact_authorization') {
     consent.credit_contact_authorization = doc.version.toString()
   } 
   else if (doc.displayname.toLowerCase() === 'electronic_disclosure_consent') {
     consent.electronic_communications = doc.version.toString()
   }
    else if (doc.displayname.toLowerCase() === 'terms_of_use_document') {
     consent.terms_of_use = doc.version.toString()
   }
    else if (doc.displayname.toLowerCase() === 'privacy_policy_document') {
     consent.privacy_policy = doc.version.toString()
   }
 });
 
 //dynamically update deleware 'consent' and 'esign' if applicable
 if (dataConfirmInfo.state === 'DE') {
  consent.delaware_itemized_schedule_of_charges = true
 }

 //dynamically update california 'consent' and 'esign' if applicable
 if (dataConfirmInfo.state === 'CA') {
  consent.california_credit_education_program = true
 }

 if (dataConfirmInfo.state === 'NM') {
  consent.new_mexico_disclosure =true
}

  let url = "partner_confirm_info";
  let param = "";
  let data = {
    lead_id: "",
    fname: dataConfirmInfo.firstName,
    lname: dataConfirmInfo.lastName,
    home_phone: "",
    email: email,
    address_street: dataConfirmInfo.streetAddress,
    address_city: dataConfirmInfo.city,
    address_state: dataConfirmInfo.state,
    address_postal_code: dataConfirmInfo.zip,
    country: "",
    ssn: "",
    employment_status: dataConfirmInfo.employementStatus,
    citizenship: dataConfirmInfo.citizenship,
    dob: "",
    requested_loan_amount: "",
    income: JSON.stringify(dataConfirmInfo.personalIncome),
    household_annual_income: JSON.stringify(dataConfirmInfo.householdIncome),
    active_duty: dataConfirmInfo.activeDuty,
    active_duty_rank: dataConfirmInfo.activeDutyRank,
    spouse_city: dataConfirmInfo.spousecity,
    spouse_zipcode: dataConfirmInfo.spouseZipcode,
    spouse_state: dataConfirmInfo.spouseSelectState,
    spouse_address: dataConfirmInfo.spouseadd,
    marital_status: dataConfirmInfo.martialStatus,
    partner_token: dataConfirmInfo.partner_token,
    credit_contact_authorization_version:  consent.credit_contact_authorization,
    electronic_communications_version : consent.electronic_communications,
    privacy_policy_version: consent.privacy_policy,
    terms_of_use_version:  consent.terms_of_use,
    delaware_itemized_schedule_of_charges: consent.delaware_itemized_schedule_of_charges ?? false,
    california_credit_education_program: consent.california_credit_education_program ?? false,
    new_mexico_disclosure: consent.new_mexico_disclosure ?? false
  };
  let method = "POST";
  let addAccessToken = true;
  //API call
  let PartnerConfirmationAPI = await APICall(url, param, data, method, addAccessToken);

  PartnerConfirmationAPI?.status === 200
    ? toast.success(PartnerConfirmationAPI?.data?.statusText ? PartnerConfirmationAPI?.data?.statusText : "Successfully registered",
      {
        onClose: async () => {
          let stateDataToPass = {
            firstname: dataConfirmInfo.firstName,
            partnerSignupData: {
              applicant: {
                contact: {
                  last_name: dataConfirmInfo.lastName,
                  first_name: dataConfirmInfo.firstName
                }
              }
            }
          }
          await refetch();
          navigate(statusStrLink[PartnerConfirmationAPI?.data.applicationStatus], {state: stateDataToPass});
        },
      }
    )
    : toast.error(globalMessages.TryAgain);
  return PartnerConfirmationAPI;
}

export async function getCreditKarmaData() {
  try {
    const email = Cookies.get("email");
    let url = "get_credit_karma_data";
    let param = "";
    let data = {
      email: email,
    };
    let method = "POST";
    let addAccessToken = true;
    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_getCreditKarmaData_API, error);
  }
}