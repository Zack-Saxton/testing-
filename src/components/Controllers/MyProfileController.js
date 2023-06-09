import Cookies from "js-cookie";
import globalMessages from "../../assets/data/globalMessages.json";
import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";
import { trimSpecialCharacters } from "../Controllers/CommonController";

export async function changePassword(oldPassword, newPassword) {
  try {
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
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_changePassword_API, error);
  }
}

export async function basicInformation(body) {
  try {
    let url = "update_profile_information_cac";
    let param = "";
    let data = {
      isAuthenticated: true,
      profileInfo: {
        email: body.email,
        primaryPhoneNumber: trimSpecialCharacters(body.primaryPhoneNumber),
        updatedPrimaryPhoneNumber: trimSpecialCharacters(body.primaryPhoneNumber),
        updatedEmail: body.email,
      },
    };
    let method = "POST";
    let addAccessToken = true;
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_basicInformation_API, error);
  }
}

export async function mailingAddress(body) {
  try {
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
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_mailingAddress_API, error);
  }
}

export async function textNotification(body, subscribe) {
  try {
    const email = Cookies.get("email");
    let cleanednumber = trimSpecialCharacters(body.phone);
    let allLoansClosed = !(/true/i).test(Cookies.get("hasActiveLoan"));
    let url = "text_unsubscribe";
    let textingOn = false;
    if (subscribe) {
      url = "text_subscribe";
      textingOn = true;
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
        texting: textingOn,
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
    let results = await APICall(url, param, data, method, addAccessToken);
    if (results.status === 200) {
      Cookies.set("temp_opted_phone_texting", cleanednumber);
      Cookies.set("isTextNotify", textingOn);
    }
    return results;
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_textNotification_API, error);
  }
}

export default async function getTextNotify() {
  try {
    const email = Cookies.get("email");
    const userToken = Cookies.get("userToken");
    const token = JSON.parse(Cookies.get("token"));
    let appGUID = token.applicantGuid;
    let opted_phone_texting = Cookies.get("opted_phone_texting");
    let cleanednumber = trimSpecialCharacters(opted_phone_texting);
    let allLoansClosed = !(/true/i).test(Cookies.get("hasActiveLoan"));
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
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_getTextNotify_API, error);
  }
}

export async function uploadNewProfileImage(fileData, fileName, fileType, documentType, email) {
  try {
    let url = "upload_profile_picture";
    let param = "";
    let data = {
      email: email,
      isAuthenticated: true,
      file: {
        profile_picture: {
          data: {
            type: "Buffer",
            data: fileData,
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
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_uploadNewProfileImage_API, error);
  }
}

//  ========*******======== Add ACH Bank Payment                ========*******========
export async function AddACHPaymentAPI(accountNickName, accountHolder, bankRoutingNumber, bankAccountNumber, accountType, defaultBank) {
  try {
    //API
    let url = "add_ach_payment_method";
    let param = "";
    let data = {
      nickname: accountNickName,
      account_holder: accountHolder,
      routing_number: bankRoutingNumber,
      account_number: bankAccountNumber,
      account_type: accountType,
      defaultBank: defaultBank
    };
    let method = "POST";
    let addAccessToken = true;
    //API call
    //API response

    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Ach_Error_Add_Achpayment_API, error);
  }
}

export async function addCreditCard(values, cardType) {
  try {
    let url = "add_debit_card_payment_method"; 
    let expiryDate = ("0" + (values.expiryDate.getMonth() + 1)).slice(-2) + "/" + values.expiryDate.getFullYear().toString().substr(-2);
    let param = "";
    let data = {
      "address_street": values.streetAddress,
      "address_city": values.city,
      "address_state": values.state,
      "address_postal_code": values.zipcode,
      "cardholder_name": values.cardName,
      "card_number": values.cardNumber,
      "issuer": cardType,
      "cvv": values.cvv ,
      "exp_date": expiryDate,
      "defaultBank": values.setDefault ? 1 : 0
    };
    let method = "POST";
    let addAccessToken = true;
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_addCreditCard_API, error);
  }
}

export async function getPaymentMethods() {
  try {
    let url = "get_payment_methods";
    let param = "";
    let data = {};
    let method = "POST";
    let addAccessToken = true;
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_getPaymentMethods_API, error);
  }
}

export async function deleteCreditCard(passData) {
  try {
    let url = "delete_debit_card_payment_method";
    let param = "";
    let data = passData;
    let method = "POST";
    let addAccessToken = true;
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_deleteCreditCard_API, error);
  }
}

export async function deleteBankAccount(passData) {
  try {
    let url = "delete_ach_payment_method";
    let param = "";
    let data = passData;
    let method = "POST";
    let addAccessToken = true;
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_deleteBankAccount_API, error);
  }
}

export async function setDefaultPayment(passData) {
  try {
    let url = "set_default_payment";
    let param = "";
    let data = passData;
    let method = "POST";
    let addAccessToken = true;
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_setDefaultPayment_API, error);
  }
}
