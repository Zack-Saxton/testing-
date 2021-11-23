import { useHistory } from "react-router-dom";
import loginSubmit from "../Controllers/LoginController"
// check the login status 
const CheckLoginStatus = () => {
  const history = useHistory();
  const expiryMinute = process.env.REACT_APP_SESSION_EXPIRY_MINUTES
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  var min = expiryMinute; // Reset when storage is more than 24hours
  var now = new Date().getTime();
  var actualSetupTime = userToken?.setupTime ?? '';
  var confirmationDone = false;
  const backgroundLogin = async () => {
    confirmationDone = false;
    const cred = JSON.parse(localStorage.getItem("cred"));
    if(!cred){
      alert("Your credentials are not available, please try login manually");
      history.push({
        pathname: "/login",
        state: { redirect: window.location.pathname }
      });
    }
    else{
      let retVal = await loginSubmit(cred.email, cred.password, '');
      if (retVal?.data?.data?.user && retVal?.data?.data?.userFound === true) {
        
        // On login success storing the needed data in the local storage
        localStorage.setItem("token", JSON.stringify({ isLoggedIn: true, apiKey: retVal?.data?.data?.user?.extensionattributes?.login?.jwt_token, setupTime: now, applicantGuid: retVal?.data?.data?.user?.attributes?.sor_data?.applicant_guid }));
        localStorage.setItem("cred", JSON.stringify({email: cred.email, password: cred.password }));
      
  }
  else if (retVal?.data?.data?.result === "error" || retVal?.data?.data?.hasError === true) {
  localStorage.setItem('token', JSON.stringify({ isLoggedIn: false, apiKey: '', setupTime: '', applicantGuid: '' }));
  localStorage.setItem("cred", JSON.stringify({email: "", password: "" }));
  history.push({
    pathname: "/login",
    state: { redirect: window.location.pathname }
  });
  
  }
  else {
  alert("Network error");
  history.push({
    pathname: "/login",
    state: { redirect: window.location.pathname }
  });
  }
    }
 

  }
  // check whether the userToken available
  if (!userToken?.isLoggedIn) {
    history.push({
      pathname: "/login",
      state: { redirect: window.location.pathname }
    });
  }
   // calculating the session time
  else if ((now - actualSetupTime) > min * 60 * 1000 && (now - actualSetupTime) > 45 * 60 * 1000) {
    history.push({
      pathname: "/login",
      state: { redirect: window.location.pathname }
    });
  } 

  else if ((now - actualSetupTime) > min * 60 * 1000 && (now - actualSetupTime) > 30 * 60 * 1000) {
    alert("Your session has been expired, please login to continue");
    
    history.push({
      pathname: "/login",
      state: { redirect: window.location.pathname }
    });
  } 

  else if ((now - actualSetupTime) > min * 60 * 1000 && confirmationDone === false) {
    confirmationDone = true;
    var r = window.confirm("Your session is going to end, Do you need to continue?");
    if (r === true) {
      backgroundLogin();

    } else {
          history.push({
      pathname: "/login",
      state: { redirect: window.location.pathname }
    });

    }
    // history.push({
    //   pathname: "/login",
    //   state: { redirect: window.location.pathname }
    // });
  }
  return null;
}

export default CheckLoginStatus;
