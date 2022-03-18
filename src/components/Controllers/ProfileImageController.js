import Cookies from "js-cookie";
import globalMessages from "../../assets/data/globalMessages.json";
import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";

export default async function UserImageInformation() {
  try {
    if (Cookies.get("profilePictureURL") && Cookies.get("profilePictureURL") !== "") {
      return Cookies.get("profilePictureURL");
    }
    const email = Cookies.get("email");
    let url = "get_profile_picture";
    let param = "";
    const profile_picture = Cookies.get("profile_picture");
    let data = {
      email: email,
      user: {
        mobile: {
          profile_picture: profile_picture,
        },
      },
    };
    let method = "POST";
    let addAccessToken = true;
    let res = await APICall(url, param, data, method, addAccessToken);
    Cookies.set("profilePictureURL", res?.data?.profile_picture_url ? res?.data?.profile_picture_url : "");
    return res?.data?.profile_picture_url;
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_UserImageInformation_API, error);
  }
}