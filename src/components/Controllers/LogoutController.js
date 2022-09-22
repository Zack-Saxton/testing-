import Cookies from "js-cookie";
import {encryptAES} from "../lib/Crypto";

export default function LogoutController() {
  // check whether the userToken available
  let userToken = {isLoggedIn: false};
  Cookies.set("token", JSON.stringify(userToken));
  Cookies.set("cred", encryptAES(JSON.stringify({email: "", password: ""})));
  Cookies.remove('branchname');
  Cookies.remove("branchopenstatus");
  Cookies.remove("login_date");
  Cookies.remove("user");
  Cookies.remove("branchphone");
  Cookies.remove("profile_picture");
  Cookies.remove("skip");
  Cookies.remove("getProfileImage");
  Cookies.remove("profilePictureURL");
  Cookies.remove("firstName");
  Cookies.remove("lastName");
  Cookies.remove("userId");
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
  Cookies.remove("userCustomerId")
  Cookies.remove("userApplicantId")
  Cookies.remove("userLastLogin")
}