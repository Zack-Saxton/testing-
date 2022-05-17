import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoutController from "../Controllers/LogoutController";
// check the login status
const CheckLoginStatus = () => {
  const navigate = useNavigate();
  const tokenString = Cookies.get("token") ? Cookies.get("token") : '{ }';
  const userToken = JSON.parse(tokenString);
  let nowTime = new Date().getTime();
  let actualSetupTime = userToken?.setupTime ?? '';
  const expiryMinute = process.env.REACT_APP_SESSION_EXPIRY_MINUTES;
  let min = expiryMinute;

  // check whether the userToken available
  useEffect(() => {
    if (!userToken?.isLoggedIn || ((nowTime - actualSetupTime) > min * 60 * 1000) || 
      (userToken?.isMFA && !userToken?.isMFACompleted)) {
      LogoutController();
      navigate("/login", { state: { redirect: window.location.pathname !== "/login" ? window.location.pathname : null } });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default CheckLoginStatus;