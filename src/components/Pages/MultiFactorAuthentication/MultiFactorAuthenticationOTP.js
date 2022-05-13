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
import {VerifyLoginPassCode} from "./../../Controllers/MFAController"
import { useNavigate, useLocation } from "react-router-dom";

const MultiFactorAuthenticationOTP = () => {
  const otpLocation = useLocation();
  const navigate = useNavigate();
  const classes = useStylesMFA();
  const [ currentCount, setCount ] = useState(10); 
  const customerPhoneNumber = otpLocation?.state?.phoneNumber;
  const customerEmail = otpLocation?.state?.mfaQueries?.customerEmail;
  const customerDevice = otpLocation?.state?.mfaQueries?.deviceType; 
  const [ disabledButton, setDisabledButton ] = useState(false);  
  const [ otpValue, setOtpValue ] = useState({ otp1: "", otp2: "", otp3: "", otp4: "", otp5: "", otp6: ""});
  const isSecurityQuestionSaved = otpLocation?.state?.mfaQueries?.mfaDetails?.securityQuestionsSaved ?? false;
  
  // const [currentCount, setCount] = useState(10);  
  // const [ otpValue, setOtpValue ] = useState({ otp1: "", otp2: "", otp3: "", otp4: "", otp5: "", otp6: ""});
  console.log(otpLocation);
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
      if (next < 6) {
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
    console.log(customerPhoneNumber);
    let response = await VerifyLoginPassCode(enteredOTP, customerEmail, customerDevice, customerPhoneNumber);
    console.log(response);
    if(response?.data?.statusCode === 200){
      toast.success(response.data?.Message);
      if(isSecurityQuestionSaved){// redirect to Account overview
        navigate("/customers/accountOverview");
      }else{// redirect to security question page
        navigate("/MFA-SecurityQuestions");
      }
    }else {
      toast.error(response.data?.Message ?? response.data?.errorMessage);
    }
    setDisabledButton(false);
  }

  const resendOTP = async () => {    
    let response = await SendLoginPassCode(customerPhoneNumber);
    if(response?.data?.passcodeInTextMessage){
      toast.success("Successfully sent passcode");
      setCount(60);
    }else {
      toast.error(response.data?.Message);
    }
  }

  const backToVarificationStep = () => {
    navigate(-1);
  }
  
  const getOTPTextField = (id, name, tabIndex) => {
    return (<Grid item xs={2} sm={2} md={2} lg={2}>
      <TextField
        id={ id }
        name={ name }
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
    </Grid>);
  }
  return (
    <div>
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
          <Paper className={classes.twoStepPaper}>
            <Grid className={classes.headingTextWrap}>
              <Typography className={classes.twoStepHeading} variant="h5">
                Security Code
              </Typography>
              <IconButton className={classes.backArrow}>
                <ArrowBackIcon className={classes.yellowBackArrow} onClick={ backToVarificationStep }/>
              </IconButton>
            </Grid>
            <Typography className={classes.twoStepParagraph}>
              Enter the 6 digit passcode received on your mobile{" "}
              <span>{`(**) ** ${customerPhoneNumber.substr(-4)}`}</span>. Code is valid for 15 minutes.
            </Typography>

            <Grid container>
              <Typography className={classes.twoStepParagraph}>
                Enter 6 digit security code
              </Typography>

              <Grid className={classes.otpWrap} container>                
                { getOTPTextField("otpNumberOne", "otp1", 1) }
                { getOTPTextField("otpNumberTwo", "otp2", 2) }
                { getOTPTextField("otpNumberThree", "otp3", 3) }
                { getOTPTextField("otpNumberFour", "otp4", 4) }
                { getOTPTextField("otpNumberFive", "otp5", 5) }
                { getOTPTextField("otpNumberSix", "otp6", 6) }
              </Grid>
            </Grid>

            <Grid className={classes.nextButtonGrid} container>
              <ButtonPrimary stylebutton='{"color":""}'
                disabled={ checkEnteredOTP(otpValue) || disabledButton } 
                onClick={ handleClickSubmit }
                >
                Verify Now
              </ButtonPrimary>
            </Grid>
            <Typography className={classes.resetText}>
              Didnt receive code?{" "}
              { currentCount > 0 ? 
              <Link href="#" className="blueColorLink" >
                Resend 
              </Link>  : 
              <Link href="#" onClick={ resendOTP } className="blueColorLink" >
                Resend 
              </Link> 
            }
                           
              { currentCount>0 ? ` (in 0:${currentCount} secs)` : "" }
            </Typography>
          </Paper>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default MultiFactorAuthenticationOTP;
