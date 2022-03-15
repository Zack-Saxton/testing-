import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import globalMessages from "../../assets/data/globalMessages.json";
import "../App/App.css";
import CheckLoginStatus from "../App/CheckLoginStatus";
import LoginController from "../Controllers/LoginController";
import LogoutController from "../Controllers/LogoutController";
import { ButtonPrimary } from "../FormsUI";
import { decryptAES, encryptAES } from "../lib/Crypto";

const CheckLoginTimeout = () => {
  const navigate = useNavigate();
  const expiryMinute = process.env.REACT_APP_SESSION_EXPIRY_MINUTES;
  const tokenString = Cookies.get("token") ? Cookies.get("token") : "{ }";
  const userToken = JSON.parse(tokenString);
  let min = expiryMinute;
  let actualSetupTime = userToken?.setupTime ?? 0;
  let nowTime = new Date().getTime();
  const [ openPopUp, setOpenPopUp ] = useState(false);
  const [ logOutTimer, setLogOutTimer ] = useState();

  const backgroundLogin = async () => {
    const cred = JSON.parse(
      Cookies.get("cred") ? decryptAES(Cookies.get("cred")) : "{ }"
    );
    var now = new Date().getTime();
    actualSetupTime = now;
    if (!cred) {
      navigate("/login", { state: { redirect: window.location.pathname } });
    } else {
      let retVal = await LoginController(cred.email, cred.password, "");
      if (retVal?.data?.user && retVal?.data?.userFound === true) {
        // On login success storing the needed data in the local storage
        let nowTimeStamp = new Date().getTime();
        Cookies.set(
          "token",
          JSON.stringify({
            isLoggedIn: true,
            apiKey: retVal?.data?.user?.extensionattributes?.login?.jwt_token,
            setupTime: nowTimeStamp,
            applicantGuid:
              retVal?.data?.user?.attributes?.sor_data?.applicant_guid,
          })
        );
        Cookies.set(
          "cred",
          encryptAES(
            JSON.stringify({ email: cred.email, password: cred.password })
          )
        );
        actualSetupTime = now;
      } else if (
        retVal?.data?.result === "error" ||
        retVal?.data?.hasError === true
      ) {
        Cookies.set(
          "token",
          JSON.stringify({
            isLoggedIn: false,
            apiKey: "",
            setupTime: "",
            applicantGuid: "",
          })
        );
        Cookies.set(
          "cred",
          encryptAES(JSON.stringify({ email: "", password: "" }))
        );
        navigate("/login", { state: { redirect: window.location.pathname } });
      } else {
        alert("Network error");
        navigate("/login", { state: { redirect: window.location.pathname } });
      }
    }
    return true;
  };

  const handleClosePopUp = () => {
    reset();
    setOpenPopUp(false);
  };

  const handleOnIdleLogout = (event) => {
    LogoutController();
    toast.success(globalMessages.LoggedOut);
    Cookies.set("redirec", JSON.stringify({ to: "/select-amount" }));
    navigate("/login");
  };

  const handleOnAction = (event) => {
    nowTime = new Date().getTime();
    if (userToken?.isLoggedIn && nowTime - actualSetupTime > min * 60 * 1000) {
      backgroundLogin();
    }
  };

  function millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  const { reset } = useIdleTimer({
    timeout: 1000 * 60 * 5,
    onIdle: () => {
      setOpenPopUp(true);
    },
    events: [ "click", "dblclick", "scroll", "keydown" ],
    onAction: handleOnAction,
    debounce: 500,
  });

  useEffect(() => {
    setLogOutTimer(remTimeToLogout());
    const clearUpInterval = setInterval(() => {
      setLogOutTimer(remTimeToLogout());
    }, 1000);
    return () => clearInterval(clearUpInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRemainingTime: remTimeToLogout } = useIdleTimer({
    timeout: 1000 * 60 * 7,
    events: [ "click", "dblclick" ],
    onIdle: handleOnIdleLogout,
    debounce: 500,
  });

  const loginToken = JSON.parse(
    Cookies.get("token") ? Cookies.get("token") : "{ }"
  );

  return (
    <div>
      { loginToken.isLoggedIn === true ? (
        <>
          <Dialog
            onClose={ handleClosePopUp }
            aria-labelledby="customized-dialog-title"
            maxWidth="xs"
            open={ openPopUp }
          >
            <div id="printableArea">
              <DialogTitle
                id="customized-dialog-title"
                onClose={ handleClosePopUp }
              >
                Alert
              </DialogTitle>
              <DialogContent dividers>
                <Typography align="justify" gutterBottom>
                  You will be logged out due to inactivity. Press Ok to remain
                  logged into the system{ " " }
                  <span>{ millisToMinutesAndSeconds(logOutTimer) }</span>
                </Typography>
                <br />
              </DialogContent>
            </div>
            <DialogActions className="modalAction">
              <ButtonPrimary
                stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px"}'
                onClick={ handleClosePopUp }
              >
                <Typography align="center">Ok</Typography>
              </ButtonPrimary>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <CheckLoginStatus />
      ) }
    </div>
  );
};

export default CheckLoginTimeout;
