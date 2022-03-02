import Cookies from "js-cookie";
import { toast } from "react-toastify";
import LogoutController from "../Controllers/LogoutController";
import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";

let statusStrLink = {
  approved: "/customers/finalVerification",
  completing_application: "/customers/finalVerification",
  contact_branch: "/customers/myBranch",
  confirming_info: "/partner/confirm-signup",
  expired: "/select-amount",
  invalid: "/select-amount",
  offer_selected: "/customers/reviewAndSign",
  offers_available: "/customers/selectOffer",
  pre_qual_referred: "/select-amount",
  pre_qual_rejected: "/select-amount",
  pre_qualified: "/select-amount",
  referred: "/referred-to-branch",
  rejected: "/no-offers-available",
  under_review: "/customers/loanDocument",
  closing_process: "/customers/finalVerification",
  final_review: "/customers/loanDocument",
};

export default async function PartnerSignup(navigate, partnerToken, applicantId, partnerSignupData) {
  let url = "partner_signup";
  let param = "";
  let data = {
    partner_token: partnerToken,
    applicant_id: applicantId,
    ssn_last_four: partnerSignupData.ssn,
    phone: partnerSignupData.phone,
    phone_type: partnerSignupData.phoneType,
    password: partnerSignupData.password,
    password_confirm: partnerSignupData.confirm_password,
    isAuthenticated: true
  };
  let method = "POST";
  let addAccessToken = false;

  //API call
  let partnerSignupMethod = await APICall(url, param, data, method, addAccessToken);

  partnerSignupMethod?.status === 200
    ? toast.success(partnerSignupMethod?.data?.statusText ? partnerSignupMethod?.data?.statusText
      : partnerSignupMethod?.data?.applicant?.processing?.status === "confirming_info" ? "Successfully Registered, Please confirm your information" : "Successfully Registered",
      {
        onClose: () => {
          var now = new Date().getTime();
          LogoutController();
          Cookies.set("redirec", JSON.stringify({ to: "/select-amount" }));
          Cookies.set(
            "token",
            JSON.stringify({
              isLoggedIn: true,
              apiKey:
                partnerSignupMethod?.data?.user?.extensionattributes
                  ?.login?.jwt_token,
              setupTime: now,
            })
          );
          Cookies.set("email", partnerSignupMethod?.data?.applicant.contact.email);
          navigate(statusStrLink[ partnerSignupMethod?.data?.applicant.processing.status ],
            {
              state: {
                jwt_token: partnerSignupMethod?.data?.user.extensionattributes.login.jwt_token,
                partner_token: partnerSignupMethod?.data?.user.attributes.partner_token,
                first_name: partnerSignupMethod?.data?.applicant.contact.first_name,
                last_name: partnerSignupMethod?.data?.applicant.contact.last_name,
                email: partnerSignupMethod?.data?.applicant.contact.email,
                address_postal_code: partnerSignupMethod?.data?.applicant.contact.address_postal_code,
                address_city: partnerSignupMethod?.data?.applicant.contact.address_city,
                address_state: partnerSignupMethod?.data?.applicant.contact.address_state,
                address_street: partnerSignupMethod?.data?.applicant.contact.address_street,
                citizenship: partnerSignupMethod?.data?.applicant.self_reported.citizenship,
                annual_income: partnerSignupMethod?.data?.applicant.self_reported.annual_income,
                household_annual_income: partnerSignupMethod?.data?.applicant.self_reported.household_annual_income,
                employment_status: partnerSignupMethod?.data?.applicant.self_reported.employment_status,
                military_status: partnerSignupMethod?.data?.applicant.self_reported.military_status,
                spouse_address_street: partnerSignupMethod?.data?.applicant.self_reported.spouse_address_street,
                spouse_address_postal_code: partnerSignupMethod?.data?.applicant.self_reported.spouse_address_postal_code,
                spouse_address_state: partnerSignupMethod?.data?.applicant.self_reported.spouse_address_state,
                spouse_address_city: partnerSignupMethod?.data?.applicant.self_reported.spouse_address_city,
              }
            });
        },
      }
    )
    : toast.error(partnerSignupMethod?.statusText ?? "Please check your data");
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
    ErrorLogger("Error executing PopulatePartnerSignup API", error);
  }
}
export async function partnerConfirmInfo(dataConfirmInfo, navigate) {
  let url = "partner_confirm_info";
  let param = "";
  let data = {
    lead_id: "",
    fname: dataConfirmInfo.firstname,
    lname: dataConfirmInfo.lastname,
    home_phone: "",
    email: dataConfirmInfo.email,
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
    partner_token: dataConfirmInfo.partner_token
  };
  let method = "POST";
  let addAccessToken = true;
  //API call
  let PartnerConfirmationAPI = await APICall(url, param, data, method, addAccessToken);

  PartnerConfirmationAPI?.status === 200
    ? toast.success(PartnerConfirmationAPI?.data?.statusText ? PartnerConfirmationAPI?.data?.statusText : "Successfully registered",
      {
        onClose: () => {
          navigate(statusStrLink[ PartnerConfirmationAPI?.data.applicationStatus ]);
        },
      }
    )
    : toast.error("Please login again");
  return PartnerConfirmationAPI;
}
