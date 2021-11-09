import APICall from "../lib/AxiosLib";
import { toast } from "react-toastify";


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
  pre_qualified: "/partner/signup",
  referred: "/referred-to-branch",
  rejected: "/no-offers-available",
  under_review: "/customers/loanDocument",
  closing_process: "/customers/finalVerification",
  final_review: "/customers/loanDocument",
};

export default async function PartnerSignup(
   history,
  partnerToken,
  applicantId,
  ssn,
  phone,
  phoneType,
  password,
  confirm_password
) {
  //  const history = useHistory();

  let url = "partner_signup";
  let param = "";
  let data = {
    partner_token: partnerToken,
    applicant_id: applicantId,
    ssn_last_four: ssn,
    phone: phone,
    phone_type: phoneType,
    password: password,
    password_confirm: confirm_password,
  };
  let method = "POST";
  let addAccessToken = false;

  //API call
  let partnerSignupMethod = await APICall(
    url,
    param,
    data,
    method,
    addAccessToken
  );


  partnerSignupMethod.data.status === 200
    ? toast.success(
        partnerSignupMethod?.data?.data?.statusText
          ? partnerSignupMethod.data.data.statusText
          : "Signedup Successfully",
        {
          position: "bottom-left",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => {
            var now = new Date().getTime();
            localStorage.clear();
            localStorage.setItem(
              "token",
              JSON.stringify({
                isLoggedIn: true,
                apiKey:
                  partnerSignupMethod?.data?.data?.user?.extensionattributes
                    ?.login?.jwt_token,
                setupTime: now,
              })
            );
            history.push({

              pathname: statusStrLink[partnerSignupMethod.data.data.applicant.processing.status],
              state: {
                  jwt_token :  partnerSignupMethod.data.data.user.extensionattributes.login.jwt_token,
                  partner_token :  partnerSignupMethod.data.data.user.attributes.partner_token,
                  first_name : partnerSignupMethod.data.data.applicant.contact.first_name,
                  last_name :  partnerSignupMethod.data.data.applicant.contact.last_name,
                  email :  partnerSignupMethod.data.data.applicant.contact.email,
                  address_postal_code :  partnerSignupMethod.data.data.applicant.contact.address_postal_code,
                  address_city :  partnerSignupMethod.data.data.applicant.contact.address_city,
                  address_state :  partnerSignupMethod.data.data.applicant.contact.address_state,
                  address_street :  partnerSignupMethod.data.data.applicant.contact.address_street,
                  citizenship :  partnerSignupMethod.data.data.applicant.self_reported.citizenship,
                  annual_income :  partnerSignupMethod.data.data.applicant.self_reported.annual_income,
                  household_annual_income :  partnerSignupMethod.data.data.applicant.self_reported.household_annual_income,
                  employment_status : partnerSignupMethod.data.data.applicant.self_reported.employment_status,
                  military_status : partnerSignupMethod.data.data.applicant.self_reported.military_status,
                  spouse_address_street : partnerSignupMethod.data.data.applicant.self_reported.spouse_address_street,
                  spouse_address_postal_code : partnerSignupMethod.data.data.applicant.self_reported.spouse_address_postal_code,
                  spouse_address_state : partnerSignupMethod.data.data.applicant.self_reported.spouse_address_state,
                  spouse_address_city : partnerSignupMethod.data.data.applicant.self_reported.spouse_address_city,
                 

                }
            });
          },
        }
      )
    : toast.error(
        partnerSignupMethod?.data?.statusText
          ? partnerSignupMethod.data.statusText
          : "Please check your data",
        {
          position: "bottom-left",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );

  return partnerSignupMethod;
}

export async function PopulatePartnerSignup(
  partnerToken,
  applicantId,
  requestAmt,
  requestApr,
  requestTerm
) {
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
  let populatePartnerSignUp = await APICall(
    url,
    param,
    data,
    method,
    addAccessToken
  );
  return populatePartnerSignUp;
}
