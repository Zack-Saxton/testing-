import { toast } from "react-toastify";
import APICall from "../lib/AxiosLib";

export async function changePassword(oldPassword, newPassword) {
  const email = localStorage.getItem("email");
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
      primaryPhoneNumber: body.primaryPhoneNumber,
      email: body.email,
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
  const email = localStorage.getItem("email");
  const userToken = localStorage.getItem("userToken");
  const token = JSON.parse(localStorage.getItem("token"));
  const accountDetails = JSON.parse(localStorage.getItem("accountDetails"));
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
  const email = localStorage.getItem("email");
  const userToken = localStorage.getItem("userToken");
  const token = JSON.parse(localStorage.getItem("token"));
  const accountDetails = JSON.parse(localStorage.getItem("accountDetails"));
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

export async function profileImage() {
  const email = localStorage.getItem("email");
  let url = "get_profile_picture";
  let param = "";
  let data = {
    email: email,
  };
  let method = "POST";
  let addAccessToken = true;
  return APICall(url, param, data, method, addAccessToken);
 }


export async function uploadNewProfileImage(
  test,
  fileName,
  fileType,
  documentType
) {
  const email = localStorage.getItem("email");
  let url = "upload_profile_picture";
  let param = "";
  let data = {
    email: email,
    isAuthenticated: true,
    file: 
      {
        profile_picture: {
          data: test,
          mimetype: fileType,
          documentType: documentType,
          fileName: fileName,
        }
      },
  };

  let method = "POST";
  let addAccessToken = true;
  let uploadData = await APICall(url, param, data, method, addAccessToken);
  uploadData.data.status === 200
    ? toast.success(
        uploadData?.data?.data?.data?.message
          ? uploadData.data.data.data.message
          : "Uploaded Successfully",
        {
          position: "bottom-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      )
    : toast.error(
        uploadData?.data?.data?.data?.message
          ? uploadData.data.data.data.message
          : "Error uploading file",
        {
          position: "bottom-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
}
