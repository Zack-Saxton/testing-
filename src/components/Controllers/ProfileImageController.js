import Cookies from "js-cookie";
import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";
import globalMessages from "../../assets/data/globalMessages.json";


export default async function UserImageInformation() {
  try {
    if (Cookies.get("profile_picture_url") && Cookies.get("profile_picture_url") !== "") {
      return Cookies.get("profile_picture_url");
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
    Cookies.set("profile_picture_url", res?.data?.profile_picture_url ? res?.data?.profile_picture_url : "");
    return res?.data?.profile_picture_url;
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_UserImageInformation_API, error);
  }
}