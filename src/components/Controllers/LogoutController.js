import Cookies from "js-cookie";
import {encryptAES} from "../lib/Crypto";

export default function LogoutController() {
  // check whether the userToken available
  let userToken = {isLoggedIn: false};
  let emptyString = (JSON.stringify({}));
  Cookies.set("token", JSON.stringify(userToken));
  Cookies.set("cred", encryptAES(JSON.stringify({email: "", password: ""})));
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
  Cookies.set("userId", '');
  Cookies.remove("isActiveApplicationExist")
  Cookies.remove("activeApplicationGuid")
  Cookies.remove("selectTerm")
  Cookies.remove("CKLightbox_Source")
  Cookies.remove("CKLightbox_Web")
  Cookies.remove("CKLightbox_trkcid")
  Cookies.remove("CKLightbox_campaign")
  Cookies.remove("CKLightbox_term")
  Cookies.remove("CKLightbox_amount")
  Cookies.remove("utm_source_otherPartner")
  Cookies.remove("utm_medium_otherPartner")
  Cookies.remove("utm_campaign_otherPartner")
  Cookies.remove("referer_otherPartner")
  Cookies.remove("gclid")
}