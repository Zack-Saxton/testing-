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
    email: body.email,
    isAuthenticated: true,
    profileInfo: {
      primaryPhoneNumber: body.profileInfo.primaryPhoneNumber,
      email: body.email,
    },
  };
  let method = "POST";
  let addAccessToken = true;
  return APICall(url, param, data, method, addAccessToken);
}

export async function mailingAddress(body) {
  const email = localStorage.getItem("email");
  let url = "update_profile_information_cac";
  let param = "";
  let data = {
    email: email,
    isAuthenticated: true,
    profileInfo: {
      email: email,
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

export async function textNotification(body) {
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const userToken = JSON.parse(token);
  const appGUID = userToken.applicantGuid;
  let cleanednumber = body.phone.replace(/\D/g, "");
  let url = "text_subscribe";
  let param = "";
  let data = {
    email: email,
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
    file: [
      {
        data: test,
        mimetype: fileType,
        documentType: documentType,
        fileName: fileName,
      },
    ],
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
