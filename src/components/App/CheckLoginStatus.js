import { useHistory } from "react-router-dom";
// check the login status 
const CheckLoginStatus = () => {
  const history = useHistory();
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  var nowTime = new Date().getTime();
  var actualSetupTime = userToken?.setupTime ?? '';
  const expiryMinute = process.env.REACT_APP_SESSION_EXPIRY_MINUTES;
  var min = expiryMinute; 

  // check whether the userToken available
  if (!userToken?.isLoggedIn || (nowTime - actualSetupTime) > min * 60 * 1000) {
    let userToken = { isLoggedIn: false };
    localStorage.setItem("token", JSON.stringify(userToken));
    localStorage.setItem("cred", JSON.stringify({email: "", password: "" }));
    localStorage.setItem("branchname", JSON.stringify({ }));
    localStorage.setItem("branchopenstatus", JSON.stringify({ }));
    localStorage.setItem("login_date", JSON.stringify({ }));
    localStorage.setItem("user", JSON.stringify({ }));
    localStorage.setItem("branchphone", JSON.stringify({ }));
    localStorage.setItem("profile_picture", JSON.stringify({ }));
    history.push({
      pathname: "/login",
      state: { redirect: window.location.pathname }
    });
  }

  return null;
}

export default CheckLoginStatus;
