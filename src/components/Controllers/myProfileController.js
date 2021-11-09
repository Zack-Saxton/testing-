import APICall from "../lib/AxiosLib";

export async function changePassword(oldPassword, newPassword) {
  const email = localStorage.getItem("email");
  let url = "change_password";
  let param = "";
  let data = {
    "email": email,
    "oldPassword": oldPassword,
    "newPassword": newPassword
  };
  let method = "POST";
  let addAccessToken = true;

  //API call
  let changePassword = await APICall(url, param, data, method, addAccessToken);
  return changePassword;
}

/***** Submit Business information *****/
export async function businessInformation(body) {
  let url = "update_profile_information_cac";
  let param = "";
  let data = {
    "email": body.email,
    isAuthenticated: true,
    "profileInfo": {
      "primaryPhoneNumber": body.profileInfo.primaryPhoneNumber,
      "email": body.email,
    }
  };
  let method = "POST";
  let addAccessToken = true;

  //API call
  let businessInformationMethod = await APICall(
    url,
    param,
    data,
    method,
    addAccessToken
  );
  return businessInformationMethod;
}

/***** Submit mailingAddress *****/
export async function mailingAddress(body) {
  const email = localStorage.getItem("email");
  let url = "update_profile_information_cac";
  let param = "";
  let data = {
    "email": email,
    isAuthenticated: true,
    "address1": body.streetAddress,
    "city": body.city,
    "state": body.state,
    "zipCode": body.zipCode,
  };

  let method = "POST";
  let addAccessToken = true;

  //API call
  let mailingAddressMethod = await APICall(
    url,
    param,
    data,
    method,
    addAccessToken
  );
  return mailingAddressMethod;
}

/***** Submit TextNotification *****/
export async function textNotification(body) {
//  const email = localStorage.getItem("email");
  let url = "text_subscribe";
  let param = "";
  let data = {
    "phoneNumber" : body.phone
  };

  let method = "POST";
  let addAccessToken = true;

  //API call
  let textNotificationMethod = await APICall(
    url,
    param,
    data,
    method,
    addAccessToken
  );
  return textNotificationMethod;
}
