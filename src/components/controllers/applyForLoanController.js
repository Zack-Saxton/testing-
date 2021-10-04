import axios from "axios";
import { toast } from "react-toastify";

async function  fetchAvailableOffers()  {
    //API call to fetch the available offer
    const loginTokenNew = JSON.parse(localStorage.getItem("token"));
    let response = {
        isLoggedIn: "",
        active: "",
        data: "",
    };
    try {
      await axios({
          method: "GET",
          url: "/application/get_offers_cac",

          headers: {
              "Content-Type": "application/json",
           
              "x-access-token": loginTokenNew.apiKey,
          },
          transformRequest: (data, headers) => {
              delete headers.common["Content-Type"];
              return data;
          },
      }).then((res) => (response.data = res));
  } catch (error) {
      response.data = error.response;
  }
  return response;
}

export async function  submitSelectedOfferAPI(selectedOffer)  {
    //API call to fetch the available offer
    const loginToken = JSON.parse(localStorage.getItem("token"));
    let response = {
        isLoggedIn: "",
        active: "",
        data: "",
    };
    let body = 
        {"selected_offer": {
            "model_code": selectedOffer.model_code,
            "cosigner_required": selectedOffer.cosigner_required,
            "loan_amount": selectedOffer.loan_amount,
            "annual_interest_rate": selectedOffer.annual_interest_rate,
            "origination_fee_rate": selectedOffer.origination_fee_rate,
            "origination_fee_amount": selectedOffer.origination_fee_amount,
            "apr": selectedOffer.apr,
            "monthly_payment": selectedOffer.monthly_payment,
            "term": selectedOffer.term,
            "display": selectedOffer.display,
            "type": selectedOffer.type,
            "pricing_grade": selectedOffer.pricing_grade,
            "marginal_offer": selectedOffer.marginal_offer,
            "displayPromoOffer": selectedOffer.displayPromoOffer,
            "postScreenOffer": selectedOffer.postScreenOffer,
            "payment_to_income": selectedOffer.payment_to_income,
            "displayLightBoxOffer": selectedOffer.displayLightBoxOffer,
            "lightBoxOffer": selectedOffer.lightBoxOffer,
            "maximum_post_loan_detni": selectedOffer.maximum_post_loan_detni,
            "post_loan_debt_to_income": selectedOffer.post_loan_debt_to_income,
            "post_loan_debt_and_expenses_to_net_income": selectedOffer.post_loan_debt_and_expenses_to_net_income,
            "post_loan_debt_to_net_income": selectedOffer.post_loan_debt_to_net_income,
            "_id": selectedOffer._id,
            "applicant": selectedOffer.applicant,
            "product": {
            "identification": { "name": selectedOffer.product.identification.name, "guid": selectedOffer.product.identification.guid },
            "contenttypes": selectedOffer.product.contenttypes,
            "entitytype": selectedOffer.product.credit_product,
            "credit_product_type": selectedOffer.product.credit_product_type,
            "parent_product_type": selectedOffer.product.parent_product_type,
            "description": selectedOffer.product.description,
            "_id": selectedOffer.product._id,
            "createdat": selectedOffer.product.createdat,
            "updatedat": selectedOffer.product.updatedat
            },
            "offerType": selectedOffer.offerType
           }};
    
    try {
      await axios({
          method: "POST",
          url: "/application/select_offer_cac",
          data: JSON.stringify(body),
          headers: {
              "Content-Type": "application/json",
              "x-access-token": loginToken.apiKey,
          },
          transformRequest: (data, headers) => {
              delete headers.common["Content-Type"];
              return data;
          },
      }).then((res) => (response.data = res));
  } catch (error) {
      response.data = error.response;
  }
  return response;
}

export async function  getSignatureIframe(selectedOffer)  {
    //API call to fetch the available offer
    const loginToken = JSON.parse(localStorage.getItem("token"));
    let response = {
        active: "",
    };
    
    
    try {
      await axios({
          method: "POST",
          url: "/integration/eoriginal/authenticate_cac",
          headers: {
              "Content-Type": "application/json",
              "x-access-token": loginToken.apiKey,
          },
          transformRequest: (data, headers) => {
              delete headers.common["Content-Type"];
              return data;
          },
      }).then((res) => (response.data = res));
  } catch (error) {
      response.data = error.response;
  }
  return response;
}


export async function  completeSignature(selectedOffer)  {
    //API call to fetch the available offer
    const loginToken = JSON.parse(localStorage.getItem("token"));
    let response = {
        active: "",
    };
    
    
    try {
      await axios({
          method: "POST",
          url: "/integration/eoriginal/complete_cac",
          headers: {
              "Content-Type": "application/json",
              "x-access-token": loginToken.apiKey,
          },
          transformRequest: (data, headers) => {
              delete headers.common["Content-Type"];
              return data;
          },
      }).then((res) => (response.data = res));
  } catch (error) {
      response.data = error.response;
  }
  return response;
}

export async function  resendVerificationEmail()  {
    //API call to fetch the available offer
    const loginToken = JSON.parse(localStorage.getItem("token"));
    let response = {
        active: "",
    };
    
    try {
      await axios({
          method: "POST",
          url: "/verification/resend_email_verification_cac",
          headers: {
              "Content-Type": "application/json",
              "x-access-token": loginToken.apiKey,
          },
          transformRequest: (data, headers) => {
              delete headers.common["Content-Type"];
              return data;
          },
      }).then((res) => (response.data = res));
  } catch (error) {
      response.data = error.response;
  }
  return response;
}

export async function  OTPInitialSubmission(phoneNumber, method)  {
    //API call to fetch the available offer
    const loginToken = JSON.parse(localStorage.getItem("token"));
    let response = {
        data: "",
    };
    let body = {
            "phone_number_primary_formatted": phoneNumber,
            "deliverMethod" : method
        };
    
    try {
      await axios({
          method: "POST",
          url: "/integration/lexisnexis/otp_initial_submission_cac",
          data: JSON.stringify(body),
          headers: {
              "Content-Type": "application/json",
              "x-access-token": loginToken.apiKey,
          },
          transformRequest: (data, headers) => {
              delete headers.common["Content-Type"];
              return data;
          },
      }).then((res) => (response.data = res));
  } catch (error) {
      response.data = error.response;
  }
  return response;
}

export async function  verifyPasscode(passcode)  {
    //API call to fetch the available offer
    const loginToken = JSON.parse(localStorage.getItem("token"));
    let response = {
        active: "",
    };
    let body = { "passcode" : passcode};
    
    
    try {
      await axios({
          method: "POST",
          url: "/integration/LexisNexis/otp_verify_cac",
          data: JSON.stringify(body),
          headers: {
              "Content-Type": "application/json",
              "x-access-token": loginToken.apiKey,
          },
          transformRequest: (data, headers) => {
              delete headers.common["Content-Type"];
              return data;
          },
      }).then((res) => (response.data = res));
  } catch (error) {
      response.data = error.response;
  }
  return response;
}

export async function  verifyFinancialInformation(selectedOffer)  {
    //API call to fetch the available offer
    const loginToken = JSON.parse(localStorage.getItem("token"));
    let response = {
        active: "",
    };
    let body = { 
        "employer_name" : "vicky",
        "current_job_title" : "develoer",
        "employer_phone" : "9876543210",
        "years_at_current_address" : "12",
        "refer" : "nil"
    };
    
    
    try {
      await axios({
          method: "POST",
          url: "/verification/financial_information_cac",
          data: body,
          headers: {
              "Content-Type": "application/json",
              "x-access-token": loginToken.apiKey,
          },
          transformRequest: (data, headers) => {
              delete headers.common["Content-Type"];
              return data;
          },
      }).then((res) => (response.data = res));
  } catch (error) {
      response.data = error.response;
  }
  return response;
}

export async function  getIDVerificationIframe(selectedOffer)  {
    //API call to fetch the available offer
    const loginToken = JSON.parse(localStorage.getItem("token"));
    let response = {
        active: "",
    };
    try {
      await axios({
          method: "POST",
          url: "/idscan/get_idscan_iframe_cac",
          headers: {
              "Content-Type": "application/json",
              "x-access-token": loginToken.apiKey,
          },
          transformRequest: (data, headers) => {
              delete headers.common["Content-Type"];
              return data;
          },
      }).then((res) => (response.data = res));
  } catch (error) {
      response.data = error.response;
  }
  return response;
}

export async function  saveIDVerificationResponseBefore(selectedOffer)  {
    //API call to fetch the available offer
    const loginToken = JSON.parse(localStorage.getItem("token"));
    let response = {
        active: "",
    };
    try {
      await axios({
          method: "POST",
          url: "/idscan/save_response_before_cac",
          headers: {
              "Content-Type": "application/json",
              "x-access-token": loginToken.apiKey,
          },
          transformRequest: (data, headers) => {
              delete headers.common["Content-Type"];
              return data;
          },
      }).then((res) => (response.data = res));
  } catch (error) {
      response.data = error.response;
  }
  return response;
}


export async function  submitFinancialInformation(body)  {
    //API call to fetch the available offer
    const loginToken = JSON.parse(localStorage.getItem("token"));
    let response = {
        active: "",
    };
    try {
      await axios({
          method: "POST",
          url: "/verification/financial_information_cac",
          data: JSON.stringify(body),
          headers: {
              "Content-Type": "application/json",
              "x-access-token": loginToken.apiKey,
          },

          transformRequest: (data, headers) => {
              delete headers.common["Content-Type"];
              return data;
          },
      }).then((res) => (response.data = res));
  } catch (error) {
      response.data = error.response;
  }
  return response;
}
export default fetchAvailableOffers;


export async function  getIfrmae()  {
    //API call to fetch the available offer
    const loginToken = JSON.parse(localStorage.getItem("token"));
    let response = {
        active: "",
    };
    try {
      await axios({
          method: "POST",
          url: "/idscan/get_idscan_iframe_cac",
          headers: {
              "Content-Type": "application/json",
              "x-access-token": loginToken.apiKey,
          },

          transformRequest: (data, headers) => {
              delete headers.common["Content-Type"];
              return data;
          },
      }).then((res) => (response.data = res));
  } catch (error) {
      response.data = error.response;
  }
  return response;
}

export async function uploadDocument(fileData, fileName, fileType, documentType) {
  
    let resAccDetails = [];
    // let body = {
    //   compressedFile: [
    //     {
    //       data: fileData,
    //       mimetype: fileType,
    //       documentType: documentType,
    //       fileName: fileName,
    //     },
    //   ],
    // };
    // const loginToken = JSON.parse(localStorage.getItem("token"));
    const loginToken = JSON.parse(localStorage.getItem("token"));
    let body = { 
        applicantGuid: loginToken.applicantGuid,
        file : {document_file:
        {
        name: fileName,
        mimetype: fileType,
        data: fileData
        }
    },
    documentType: documentType 
}
  
    try {
      await axios({
        method: "POST",
        url: "/verification/upload_document_cac",
        data: JSON.stringify(body),
  
        headers: {
          "Content-Type": "application/json",
          "x-access-token": loginToken.apiKey,
        },
        transformRequest: (data, headers) => {
          delete headers.common["Content-Type"];
          return data;
        },
      })
        .then((res) => {
          toast.success(res.data.data.message, {
            position: "bottom-left",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((err) => {
          toast.error(err.data.data.message, {
            position: "bottom-left",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } catch (error) {
    //   handleTokenExpiry(error);
      resAccDetails.push(error.resAccDetails);
    }
  
    return resAccDetails;
  }


// export async function verifyToken( required, activation_token ) {​​​​​​
// constemail = localStorage.getItem("email");
// letbody = {​​​​​​
// "user_email" :email,
// "required":required,
// "activation_token":"-2b-10-szy6aec2ld1ocelehseqk-2nkcdk-0ahcor2biegmulk0g29dej4m"
//     }​​​​​​
// letresponse = {​​​​​​
// isLoggedIn:'',
// active:'',
// data:''
//     }​​​​​​
// try {​​​​​​
 
// response.data = awaitaxios({​​​​​​
// method:"POST",
// url:"/verification/verify_user_email_cac",
// data:JSON.stringify(body),
// headers: {​​​​​​
// "Content-Type":"application/json",
// // Accept: "*/*",
// // Host: "psa-development.marinerfinance.io",
// // "Accept-Encoding": "gzip, deflate, br",
// // Connection: "keep-alive",
// // "Content-Length": "6774",
//                 }​​​​​​,
// transformRequest: (data, headers) => {​​​​​​
// deleteheaders.common["Content-Type"];
// returndata;
//                 }​​​​​​,
//             }​​​​​​);


//     }​​​​​​ catch (error) {​​​​​​
// response.data = error.response;
//     }​​​​​​
// return response
// }​​​​​​


// export default fetchAvailableOffers;