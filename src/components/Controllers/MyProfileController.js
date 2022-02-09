import Cookies from "js-cookie";
import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";

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
    ErrorLogger("Error executing changePassword API", error);
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
        primaryPhoneNumber: body.primaryPhoneNumber,
        updatedPrimaryPhoneNumber: body.primaryPhoneNumber,
        updatedEmail: body.email,
      },
    };
    let method = "POST";
    let addAccessToken = true;
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger("Error executing basicInformation API", error);
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
    ErrorLogger("Error executing mailingAddress API", error);
  }
}

export async function textNotification(body, sub) {
  try {
    const email = Cookies.get("email");
    let cleanednumber = body.phone.replace(/\D/g, "");
    let allLoansClosed = Cookies.get("hasActiveLoan") === "true" ? false : true;
    let url = "text_unsubscribe";
    let textingOn = false;
    if (sub) {
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
    ErrorLogger("Error executing textNotification API", error);
  }
}

export default async function getTextNotify() {
  try {
    const email = Cookies.get("email");
    const userToken = Cookies.get("userToken");
    const token = JSON.parse(Cookies.get("token"));
    let appGUID = token.applicantGuid;
    let opted_phone_texting = Cookies.get("opted_phone_texting");
    let cleanednumber = opted_phone_texting.replace(/\D/g, "");
    let allLoansClosed = Cookies.get("hasActiveLoan") === "true" ? false : true;
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
    ErrorLogger("Error executing getTextNotify API", error);
  }
}

export async function uploadNewProfileImage(imgData, fileName, fileType, documentType, email) {
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
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger("Error executing uploadNewProfileImage API", error);
  }
}

export async function addCreditCard(values, cardType) {
  try {
    let url = "add_new_card_payment";
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
      "cvv": parseInt(values.cvv),
      "exp_date": expiryDate,
      "defaultBank": values.setDefault ? 1 : 0
    };
    let method = "POST";
    let addAccessToken = true;
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger("Error executing addCreditCard API", error);
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
    ErrorLogger("Error executing getPaymentMethods API", error);
  }
}

export async function deleteCreditCard(passData) {
  try {
    let url = "delete_credit_card";
    let param = "";
    let data = passData;
    let method = "POST";
    let addAccessToken = true;
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger("Error executing deleteCreditCard API", error);
  }
}

export async function deleteBankAccount(passData) {
  try {
    let url = "delete_bank_account";
    let param = "";
    let data = passData;
    let method = "POST";
    let addAccessToken = true;
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger("Error executing deleteBankAccount API", error);
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
    ErrorLogger("Error executing setDefaultPayment API", error);
  }
}
