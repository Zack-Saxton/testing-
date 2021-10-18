import { useHistory } from "react-router-dom";
// check the login status 
const CheckLoginStatus = () => {
  const history = useHistory();
  const expiryMinute = process.env.REACT_APP_SESSION_EXPIRY_MINUTES
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  var min = expiryMinute; // Reset when storage is more than 24hours
  var now = new Date().getTime();
  var actualSetupTime = userToken?.setupTime ?? '';
  // check whether the userToken available
  if (!userToken?.isLoggedIn) {
    history.push({
      pathname: "/login",
    });
  }
  // calculating the session time
  else if ((now - actualSetupTime) > min * 60 * 1000) {
    alert("Your session has been ended, Please login again to continue");
    history.push({
      pathname: "/login",
    });
  }
  return null;
}

export default CheckLoginStatus;
