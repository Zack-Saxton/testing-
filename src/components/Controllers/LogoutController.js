import Cookies from "js-cookie";
import { encryptAES } from "../lib/Crypto";

export default function LogoutController() {
  // check whether the userToken available
  let userToken = { isLoggedIn: false };
  let emptyString = (JSON.stringify({}));
  Cookies.set("token", JSON.stringify(userToken));
  Cookies.set("cred", encryptAES(JSON.stringify({ email: "", password: "" })));
  Cookies.set('branchname', emptyString);
  Cookies.set("branchopenstatus", emptyString);
  Cookies.set("login_date", emptyString);
  Cookies.set("user", emptyString);
  Cookies.set("branchphone", emptyString);
  Cookies.set("profile_picture", emptyString);
  Cookies.set("skip", emptyString);
  Cookies.set("getProfileImage", '');
  Cookies.set("profilePictureURL", '');
  Cookies.set("firstName", '');
  Cookies.set("lastName", '');
}