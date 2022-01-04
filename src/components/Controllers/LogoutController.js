import Cookies from "js-cookie";
import { encryptAES } from "../lib/Crypto"
export default function LogoutController(){
  
    // check whether the userToken available
      let userToken = { isLoggedIn: false };
      Cookies.set("token", JSON.stringify(userToken));
      Cookies.set("cred", encryptAES(JSON.stringify({email: "", password: "" })));
      Cookies.set('branchname',(JSON.stringify({ })));
      Cookies.set("branchopenstatus", JSON.stringify({ }));
      Cookies.set("login_date", JSON.stringify({ }));
      Cookies.set("user", JSON.stringify({ }));
      Cookies.set("branchphone", JSON.stringify({ }));
      Cookies.set("profile_picture", JSON.stringify({ }));
      Cookies.set("getProfileImage", '');
      Cookies.set("profile_picture_url", '');
  }