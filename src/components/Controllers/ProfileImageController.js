import Cookies from "js-cookie";
import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";

export default async function UserImageInformation() {
  try {
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
    if (Cookies.get("profile_picture_url")) {
      res.profile_picture_url = Cookies.get("profile_picture_url");
    } else {
      res.profile_picture_url = res?.data?.profile_picture_url;
    }
    return res.profile_picture_url;
  } catch (error) {
    ErrorLogger("Error executing UserImageInformation API", error);
  }
}