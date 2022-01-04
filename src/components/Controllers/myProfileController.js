import APICall from "../lib/AxiosLib";
import Cookies from "js-cookie";

export async function changePassword(oldPassword, newPassword) {
  const email = Cookies.get("email");
  let url = "change_password";
  let param = "";
  let data = {
    email: email,
    oldPassword: oldPassword,
    newPassword: newPassword,
  };
  let method = "POST";
  let addAccessToken = true;
  //API call
  return APICall(url, param, data, method, addAccessToken);
}

export async function basicInformation(body) {
  let url = "update_profile_information_cac";
  let param = "";
  let data = {   
    isAuthenticated: true,
    profileInfo: {
      email:  body.email,
      primaryPhoneNumber: body.primaryPhoneNumber,
      updatedPrimaryPhoneNumber: body.primaryPhoneNumber,
      updatedEmail: body.email, 
    },
  };
  let method = "POST";
  let addAccessToken = true;
  return APICall(url, param, data, method, addAccessToken);
}

export async function mailingAddress(body) {
  
  let url = "update_profile_information_cac";
  let param = "";
  let data = {
   
    isAuthenticated: true,
    profileInfo: {
    
      updatedAddressInfo: {
        zipCode: body.zipCode,
        address1: body.address1,
        city: body.city,
        state: body.state,
      },
    },
  };
  let method = "POST";
  let addAccessToken = true;
  return APICall(url, param, data, method, addAccessToken);
}

export async function textNotification(body, sub) {
  const email = Cookies.get("email");
  const userToken = Cookies.get("userToken");
  const token = JSON.parse(Cookies.get("token") ? Cookies.get("token") : '{ }');
  const accountDetails = JSON.parse(Cookies.get("accountDetails") ? Cookies.get("accountDetails") : '{ }');
  let appGUID = token.applicantGuid;
  let cleanednumber = body.phone.replace(/\D/g, "");
  let allLoansClosed = accountDetails?.data?.data?.allLoansClosed ? accountDetails.data.data.allLoansClosed : false;

  let url = "text_unsubscribe";
  if (sub) {
    url = "text_subscribe";
  } 
  let param = "";
  let data = {
    email: email,
    allLoansClosed: allLoansClosed,
    customer: {
      latest_contact: {
        opted_phone_texting: cleanednumber,  
      }
    },
    isAuthenticated: true,
    profileInfo: {
      email: email,
      opted_phone_texting: cleanednumber,
      texting: true,
    },
    user: {
      attributes: {
        UserToken: userToken,
        sor_data: {
          customer_guid: appGUID,
        },
      },
    },
    sbtInfo: [
      {
        SubscriptionOptions: [
          {
            BrandingId: "1",
            BrandingName: "Mariner Finance",
          },
        ],
      },
    ],
  };
  let method = "POST";
  let addAccessToken = true;
  return APICall(url, param, data, method, addAccessToken);
}



export async function getTextNotify() {
  const email = Cookies.get("email");
  const userToken = Cookies.get("userToken");
  const token = JSON.parse(Cookies.get("token"));
  const accountDetails = JSON.parse(Cookies.get("accountDetails"));
  let appGUID = token.applicantGuid;
  let opted_phone_texting = accountDetails?.data?.data?.latest_contact?.opted_phone_texting ? accountDetails?.data?.data?.latest_contact?.opted_phone_texting : "";
  let cleanednumber = opted_phone_texting.replace(/\D/g, "");
  let allLoansClosed = accountDetails?.data?.data?.allLoansClosed ? accountDetails.data.data.allLoansClosed : false;

  let url = "sbt_getInfo";
  let param = "";
  let data = {
    email: email,
    allLoansClosed: allLoansClosed,
    customer: {
      latest_contact: {
        opted_phone_texting: cleanednumber,  
      }
    },
    isAuthenticated: true,
    profileInfo: {
      email: email,
      opted_phone_texting: cleanednumber,
    },
    user: {
      attributes: {
        UserToken: userToken,
        sor_data: {
          customer_guid: appGUID,
        },
      },
    },
  };
  let method = "POST";
  let addAccessToken = true;
  return APICall(url, param, data, method, addAccessToken);
}


 export async function uploadNewProfileImage(
  imgData,
  fileName,
  fileType,
  documentType, 
  email
) {
  let url = "upload_profile_picture";
  let param = "";
  let data = {
    email: email,
    isAuthenticated: true,
    file: {
      profile_picture: {
        data: {
          type: "Buffer",
          data: imgData,
        },
        mimetype: fileType,
        documentType: documentType,
        name: fileName,
        fromweb: true,
      },
    },
  };

  let method = "POST";
  let addAccessToken = true;
  return APICall(url, param, data, method, addAccessToken);
}

export async function addCreditCard(values, cardType) {

  const email = localStorage.getItem("email");
  let url = "add_new_card_payment";
  let param = "";
  let data =  {
"address_street": values.streetAddress,
"address_city": values.city,
"address_state": values.state,
"address_postal_code": values.zipcode,
"cardholder_name": values.cardName,
"card_number": values.cardNumber,
"issuer": cardType,
"cvv": parseInt(values.cvv),
"exp_date": values.expiryMonth + "/" + values.expiryYear ,
"defaultBank": 1,
"isMobile": true
}
  let method = "POST";
  let addAccessToken = true;
  return APICall(url, param, data, method, addAccessToken);
 }


 
 export async function getPaymentMethods(values) {

  let url = "get_payment_methods";
  let param = "";
  let data =  {  }
  let method = "POST";
  let addAccessToken = true;
  return APICall(url, param, data, method, addAccessToken);
 }

 export async function deleteCreditCard(passData) {

  let url = "delete_credit_card";
  let param = "";
  let data =  passData;
  let method = "POST";
  let addAccessToken = true;
  return APICall(url, param, data, method, addAccessToken);
 }

 export async function deleteBankAccount(passData) {

  let url = "delete_bank_account";
  let param = "";
  let data =  passData;
  let method = "POST";
  let addAccessToken = true;
  return APICall(url, param, data, method, addAccessToken);
 }

 export async function setDefaultPayment(passData) {

  let url = "set_default_payment";
  let param = "";
  let data =  passData;
  let method = "POST";
  let addAccessToken = true;
  return APICall(url, param, data, method, addAccessToken);
 }