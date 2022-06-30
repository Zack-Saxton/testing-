import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { ButtonPrimary } from "../../FormsUI";
import "./MultiFactorAuthentication.css";
import { useStylesMFA } from "./Style";
import { toast } from "react-toastify";
import {VerifyLoginPassCode, SendLoginPassCode} from "./../../Controllers/MFAController"
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import CheckLoginTimeout from '../../Layout/CheckLoginTimeout';
import CheckLoginStatus from '../../App/CheckLoginStatus';

const MultiFactorAuthenticationOTP = () => {
  const otpLocation = useLocation();
  const navigate = useNavigate();
  const classes = useStylesMFA();
  const loginToken = JSON.parse(Cookies.get("token") ? Cookies.get("token") : '{ }');
  const [ currentCount, setCount ] = useState(10); 
  const customerPhoneNumber = otpLocation?.state?.phoneNumber;
  const customerEmail = otpLocation?.state?.mfaQueries?.customerEmail;
  const customerDevice = otpLocation?.state?.mfaQueries?.deviceType; 
  const [ disabledButton, setDisabledButton ] = useState(false);  
  const [ otpValue, setOtpValue ] = useState({ otp1: "", otp2: "", otp3: "", otp4: "", otp5: "", otp6: ""});
  const isSecurityQuestionSaved = otpLocation?.state?.mfaQueries?.mfaDetails?.securityQuestionsSaved ?? false;
  
  useEffect(() => {
		if (!otpLocation?.state?.mfaQueries) {
			navigate("/customers/accountOverview");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

  useEffect(
    () => {
        const timer = () => setCount(currentCount - 1);
        if (currentCount <= 0) {
            return;
        }
        const id = setInterval(timer, 1000);
        return () => clearInterval(id);
    },
        [currentCount]
    );  
  const checkEnteredOTP = (OTPObject) => {
      for (var key in OTPObject) {
          if (OTPObject[key] === "")
            return true;
      }
      return false;
  }
  const handleChange = (event) =>{
    const { name, value } = event.target;
    setOtpValue(prevState => ({
        ...prevState,
        [name]: value
    }));
  }
  const focusInputBox = (event) => {
    if (event.key === "Delete" || event.key === "Backspace") {
      const next = event.target.tabIndex - 1;
      if (next > 0) {
        event.target.form.elements[next].focus()
      }
    }
    else if (event.key !== "Tab"){
      const next = event.target.tabIndex;
      if (next < 6 && (event.target.value)) {
        event.target.form.elements[next+1].focus()
      }
    }
  }

  const getPasscode = (otpValue) => {
    let passCode = "";
    for (var key in otpValue) {
      passCode += otpValue[key];
    }
    return passCode;
  }

  const handleClickSubmit = async () => {
    setDisabledButton(true);
    let enteredOTP = getPasscode(otpValue);
    let response = await VerifyLoginPassCode(enteredOTP, customerEmail, customerDevice, customerPhoneNumber);
    if(response?.data?.statusCode === 200){
      toast.success(response.data?.Message);
      if(isSecurityQuestionSaved){// redirect to Account overview
        const resetPassword = JSON.parse(Cookies.get("forceResetPassword") ? Cookies.get("forceResetPassword") : '{ }');
        if(resetPassword){
          const email = Cookies.get("email");
          navigate("/resetpassword", { state: { Email: email } })
        } 
        else{
          const tokenString = Cookies.get("token") ? Cookies.get("token") : '{ }';
          let userToken = JSON.parse(tokenString);
          userToken.isMFACompleted = true;
          Cookies.set("token",JSON.stringify(userToken));//Setting MFA Flag to complete Login
          navigate("/customers/accountOverview");
        }

      }else{// redirect to select security question page
        navigate('/MFA-SelectSecurityQuestions', { state: { currentFlow: true } });
      }
    }else {
      if(response.data?.Message === "Your account has been locked.  Please contact your branch for further assistance." || response.data?.errorMessage === "Your account has been locked.  Please contact your branch for further assistance."){
      toast.error(response.data?.Message ?? response.data?.errorMessage);
      navigate("/login");
      }
      else{
      setOtpValue({ otp1: "", otp2: "", otp3: "", otp4: "", otp5: "", otp6: ""})
      toast.error(response.data?.Message ?? response.data?.errorMessage);
      }
    }
    setDisabledButton(false);
  }

  const resendOTP = async () => {    
    let response = await SendLoginPassCode(customerPhoneNumber);
    console.log('resent response', response); //Left this console log intentionally for QA
    if(response?.data?.passcodeInTextMessage){
      toast.success("Successfully sent passcode");
      setCount(60);
    }else {
      toast.error(response.data?.Message);
    }
  }

  const backToVerificationStep = () => {
    navigate(-1);
  }
  
  const getOTPTextField = (id, name, tabIndex) => {
    const opt = Object.keys(otpValue);
  return (
   <Grid item xs={2} sm={2} md={2} lg={2}>
      <TextField
        id={ id }
        name={ name }
        value = {otpValue[opt[tabIndex - 1]]}
        className={classes.otpNumber}
        lable="OTP"
        type="number"
        variant="standard"
        onChange={event => handleChange(event)}
        inputProps={{ tabIndex: tabIndex, maxLength: 1 }}  
        onKeyUp={event => focusInputBox( event)}   
        onInput = {(e) =>{
          e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,1)
        }}
      />
    </Grid>
    );
  }
  return (
    <div>
      <CheckLoginTimeout />
      {loginToken.isLoggedIn && otpLocation?.state?.mfaQueries ? (
        <>
          <div data-testid="passcode-verification-container">
            <Grid>
              <Grid
                spacing={1}
                container
                item
                md={6}
                lg={6}
                xl={6}
                className={classes.twoStepWrap}
              >
                <form>
                  <Paper className={classes.otpPaper}>
                    <Grid className={classes.headingTextWrap}>
                      <Typography
                        className={classes.twoStepHeading}
                        variant="h5"
                      >
                        Security Code
                      </Typography>
                      <IconButton
                        className={classes.backArrow}
                        onClick={backToVerificationStep}
                      >
                        <ArrowBackIcon className={classes.yellowBackArrow} />
                      </IconButton>
                    </Grid>
                    <Typography className={classes.twoStepParagraph}>
                      Enter the 6 digit passcode received on your mobile{" "}
                      <span>{`(***) *** ${customerPhoneNumber.substr(
                        -4
                      )}`}</span>
                      . Code is valid for 15 minutes.
                    </Typography>
                    {/* {${customerPhoneNumber.substr(-4)} */}
                    <Grid container>
                      <Typography className={classes.twoStepParagraph}>
                        Enter 6 digit security code
                      </Typography>

                      <Grid className={classes.otpWrap} container>
                        {getOTPTextField("otpNumberOne", "otp1", 1)}
                        {getOTPTextField("otpNumberTwo", "otp2", 2)}
                        {getOTPTextField("otpNumberThree", "otp3", 3)}
                        {getOTPTextField("otpNumberFour", "otp4", 4)}
                        {getOTPTextField("otpNumberFive", "otp5", 5)}
                        {getOTPTextField("otpNumberSix", "otp6", 6)}
                      </Grid>
                    </Grid>

                    <Grid className={classes.nextButtonGrid} container>
                      <ButtonPrimary
                        stylebutton='{"color":""}'
                        disabled={checkEnteredOTP(otpValue) || disabledButton}
                        onClick={handleClickSubmit}
                      >
                        Verify Now
                      </ButtonPrimary>
                    </Grid>
                    <Typography className={classes.resetText}>
                      Didnt receive code?{" "}
                      {currentCount > 0 ? (
                        <span
                          className="blueColorLink"
                          style={{ cursor: "pointer" }}
                        >
                          Resend
                        </span>
                      ) : (
                        <span
                          onClick={resendOTP}
                          style={{ cursor: "pointer" }}
                          className="blueColorLink"
                        >
                          Resend
                        </span>
                      )}
                      {currentCount > 0 ? ` (in 0:${currentCount} secs)` : ""}
                    </Typography>
                  </Paper>
                </form>
              </Grid>
            </Grid>
          </div>
        </>
      ) : (
        <CheckLoginStatus />
      )}
    </div>
  );
};

export default MultiFactorAuthenticationOTP;
