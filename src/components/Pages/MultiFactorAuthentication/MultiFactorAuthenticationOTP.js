import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, TextField, Typography, Hidden } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { ButtonPrimary } from "../../FormsUI";
import "./MultiFactorAuthentication.css";
import { useStylesMFA } from "./Style";
import { toast } from "react-toastify";
import VerifyLoginPassCode from "./../../Controllers/MFAController"

const MultiFactorAuthenticationOTP = (props) => {
  const classes = useStylesMFA();
  const [currentCount, setCount] = useState(10);  
  const [ otpValue, setOtpValue ] = useState({ otp1: "", otp2: "", otp3: "", otp4: "", otp5: "", otp6: ""});
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
  const checkEnteredOTP = (obj) => {
      for (var key in obj) {
          if (obj[key] === "")
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
  const inputfocus = (event) => {
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
    let enteredOTP = getPasscode(otpValue);
    let response = await VerifyLoginPassCode(enteredOTP, "zdunkerton@marinerfinance.com","1231231234");
    if(response?.data?.statusCode === 200){
      toast.success(response.data?.Message);
    }else {
      toast.error(response.data?.Message);
    }

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
                <ArrowBackIcon className={classes.yellowBackArrow} />
              </IconButton>
            </Grid>
            <Typography className={classes.twoStepParagraph}>
              Enter the 6 digit passcode received on your mobile{" "}
              <span>(**) ** 1234</span>. Code is valid for 15 minutes.
            </Typography>

            <Grid container>
              <Typography className={classes.twoStepParagraph}>
                Enter 6 digit security code
              </Typography>

              <Grid className={classes.otpWrap} container>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                  <TextField
                    id="otpNumberOne"
                    name="otp1"
                    // inputProps={{ style: { textAlign: 'center' }}}
                    className={classes.otpNumber}
                    lable="OTP"
                    type="number"
                    variant="standard"
                    onChange={event => handleChange(event)}
                    inputProps={{ tabIndex: "1", maxLength: 1 }}  
                    onKeyUp={event => inputfocus( event)}   
                    onInput = {(e) =>{
                      e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,1)
                    }}
                  />
                </Grid>

                <Grid item xs={2} sm={2} md={2} lg={2}>
                  <TextField
                    id="otpNumberTwo"
                    name="otp2"
                    className={classes.otpNumber}
                    lable="OTP"
                    type="number"
                    variant="standard"
                    onChange={event => handleChange(event)}
                    inputProps={{ tabIndex: "2", maxLength: 1 }}
                    onKeyUp={event => inputfocus(event)}
                    onInput = {(e) =>{
                      e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,1)
                    }}
                  />
                </Grid>

                <Grid item xs={2} sm={2} md={2} lg={2}>
                  <TextField
                    id="otpNumberThree"
                    name="otp3"
                    className={classes.otpNumber}
                    lable="OTP"
                    type="number"
                    variant="standard"
                    onChange={event => handleChange(event)}
                    inputProps={{ tabIndex: "3", maxLength: 1 }}
                    onKeyUp={event => inputfocus(event)}  
                    onInput = {(e) =>{
                      e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,1)
                    }}
                  />
                </Grid>

                <Grid item xs={2} sm={2} md={2} lg={2}>
                  <TextField
                    id="otpNumberFour"
                    name="otp4"
                    className={classes.otpNumber}
                    lable="OTP"
                    type="number"
                    variant="standard"
                    onChange={event => handleChange(event)}
                    inputProps={{ tabIndex: "4", maxLength: 1 }}
                    onKeyUp={event => inputfocus(event)}
                    onInput = {(e) =>{
                      e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,1)
                    }}
                  />
                </Grid>

                <Grid item xs={2} sm={2} md={2} lg={2}>
                  <TextField
                    id="otpNumberFive"
                    name="otp5"
                    className={classes.otpNumber}
                    lable="OTP"
                    type="number"
                    variant="standard"
                    onChange={event => handleChange(event)}
                    inputProps={{ tabIndex: "5", maxLength: 1 }}
                    onKeyUp={event => inputfocus(event)}
                    onInput = {(e) =>{
                      e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,1)
                    }}
                  />
                </Grid>

                <Grid item xs={2} sm={2} md={2} lg={2}>
                  <TextField
                    id="otpNumberSix"
                    name="otp6"
                    className={classes.otpNumber}
                    lable="email"
                    type="number"
                    variant="standard"
                    onChange={event => handleChange(event)}
                    inputProps={{ tabIndex: "6", maxLength: 1 }}
                    onKeyUp={event => inputfocus(event)}
                    onInput = {(e) =>{
                      e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,1)
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid className={classes.nextButtonGrid} container>
              <ButtonPrimary stylebutton='{"color":""}'
                disabled={ checkEnteredOTP(otpValue) } 
                onClick={ handleClickSubmit }
                >
                Verify Now
              </ButtonPrimary>
            </Grid>
            <Typography className={classes.resetText}>
              Didnt receive code?{" "}
              <Link href="#" className={ currentCount > 0 ? "" : "blueColorLink"}>
                Resend 
              </Link>              
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
