import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import LogoutController from "../Controllers/LogoutController";
// check the login status
const CheckLoginStatus = () => {
  const history = useHistory();
  const tokenString = Cookies.get("token") ? Cookies.get("token") : '{ }';
  const userToken = JSON.parse(tokenString);
  var nowTime = new Date().getTime();
  var actualSetupTime = userToken?.setupTime ?? '';
  const expiryMinute = process.env.REACT_APP_SESSION_EXPIRY_MINUTES;
  var min = expiryMinute;

  // check whether the userToken available
  if (!userToken?.isLoggedIn || (nowTime - actualSetupTime) > min * 60 * 1000) {
    LogoutController();
    history.push({
      pathname: "/login",
      state: { redirect: window.location.pathname }
    });
  }

  return null;
};

export default CheckLoginStatus;