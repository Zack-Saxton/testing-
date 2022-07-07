import React, { useEffect, useState } from 'react';
import {
	FormControl,
	Typography
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
	ButtonPrimary,
	PhoneNumber
} from "../../FormsUI";
import { useStylesMFA } from "./Style";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import globalMessages from '../../../assets/data/globalMessages.json';
import { SavePhoneNumber,fetchQuestionMFA } from "./../../Controllers/MFAController";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import "./mfa.css";
import CheckLoginTimeout from '../../Layout/CheckLoginTimeout';
import CheckLoginStatus from '../../App/CheckLoginStatus';


//Yup validation schema
const validationSchema = yup.object({
	phone: yup
		.string(globalMessages.PhoneEnter)
		.required(globalMessages.PhoneRequired)
		.transform((value) => value.replace(/[^\d]/g, ""))
		//eslint-disable-next-line
		.matches(
			/^[1-9]{1}\d{2}\d{3}\d{4}$/,
			globalMessages.PhoneValid
		)
		.matches(/^(\d)(?!\1+$)\d{9}$/, globalMessages.PhoneValid)
		.min(10, globalMessages.PhoneMin)
});

const MFAGetPhoneNumber = ({
}) => {
	const classes = useStylesMFA();
	const navigate = useNavigate();
	const loginToken = JSON.parse(Cookies.get("token") ? Cookies.get("token") : '{ }');
	const [disabledButton, setDisabledButton] = useState(true);
	const [phoneNumber, SetPhoneNumber] = useState("");
	const location = useLocation();

	useEffect(() => {
    let mfaPhoneCookie = Cookies.get("mfaPhone")
		if (!location?.state) {
			navigate("/customers/accountOverview");
		}
    else if (mfaPhoneCookie){
      navigate("/login");
    }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const preventSpace = (event) => {
		if (event.keyCode === 32) {
			event.preventDefault();
		}
	};
	const checkMobileNumber = (event) => {
		let mobileNUmber = event.target.value;
		SetPhoneNumber(event.target.value);
		let phone = mobileNUmber.replace(/[()-\s]/g, '');
		if (phone.length >= 10) {
			setDisabledButton(false);
		} else {
			setDisabledButton(true);
		}
	}
  const maskPhoneNumberWithAsterisk = (phoneNumberToMask) => {
    let firstNumber = phoneNumberToMask.slice(0, 10);
    return firstNumber.replace(/\d/g, '*') + phoneNumberToMask.slice(10);
  }
	const handleToSaveContinue = async () => {
		if (location?.state) {
    let maskedNumber = maskPhoneNumberWithAsterisk(phoneNumber);
    let numberToSend = phoneNumber.replace(/[()-\s]/g, '');
		setDisabledButton(true);
		const email = Cookies.get("email");
		let response = await SavePhoneNumber(email, numberToSend);
		if (response?.data?.statusCode === 200) {
			toast.success((response.data?.Message).replace(numberToSend, maskedNumber));
			 let mfaResponse = await fetchQuestionMFA(email);
       
			 if (mfaResponse?.data?.statusCode === 200) {
        Cookies.set("mfaPhone", numberToSend)
				navigate("/MFA", { state: { mfaDetails: mfaResponse?.data?.MFAInformation, customerEmail: location?.state?.customerEmail, deviceType: window.navigator.userAgent } });
			 }
			 else{
				toast.error(mfaResponse.data?.Message ?? mfaResponse.data?.errorMessage);
			 }
		} else {
			toast.error(response.data?.Message ?? response.data?.errorMessage);
		}
		setDisabledButton(false);
	}
	}
	const handleToSkipContinue = async () => {
		if (location?.state) {
		const email = Cookies.get("email");
		let mobile = "";
		let response = await SavePhoneNumber(email, mobile);
		if (response?.data?.statusCode === 200) {
			let mfaResponse = await fetchQuestionMFA(email);
			 if (mfaResponse?.data?.statusCode === 200) {
				navigate("/MFA", { state: { mfaDetails: mfaResponse?.data?.MFAInformation, customerEmail: location?.state?.customerEmail, deviceType: window.navigator.userAgent } });
			 }
			 else{
				toast.error(mfaResponse.data?.Message ?? mfaResponse.data?.errorMessage);
			 }
		} else {
			toast.error(response.data?.Message ?? response.data?.errorMessage);
		}
	}
	}
	//configuring formik
	const formik = useFormik({
		initialValues: {
			phone: "",
		},
		validationSchema: validationSchema,
	});
	const backToVerificationStep = () => {
		navigate(-1);
	}
	return (
    <div>
      <CheckLoginTimeout />
      {loginToken.isLoggedIn && location?.state ? (
        <>
          <div data-testid="phoneNumber-container">
            <Grid>
              <Grid
                spacing={1}
                container
                item
                xs={12}
                sm={12}
                md={6}
                lg={5}
                xl={6}
                className={classes.twoStepWrap}
              >
                <Paper className={classes.twoStepPaper}>
                  <Grid className={classes.headingTextWrap}>
                    <IconButton
                      className={classes.backArrow}
                      onClick={backToVerificationStep}
                    >
                      <ArrowBackIcon className={classes.yellowBackArrow} />
                    </IconButton>
                    <Typography className={classes.twoStepHeading} variant="h5">
                      Let&apos;s set up your phone for 2-Step Verification
                    </Typography>
                  </Grid>
                  <Typography
                    className={classes.twoStepParagraph}
                    style={{ textAlign: "center" }}
                  >
                    What mobile number do you want to use? We will send a text
                    message to make sure the number is yours.
                  </Typography>
                  <FormControl
                    className={classes.radioButtonwrap}
                    component="fieldset"
                  >
                    <Grid
                      container
                      alignItems="center"
                      item
                      lg={12}
                      md={12}
                      xs={12}
                      className="textBlock"
                      id="phoneInput"
                    >
                      <PhoneNumber
                        name="phone"
                        label="Phone number"
                        placeholder="Enter your phone number"
                        id="phone"
                        type="text"
                        onKeyDown={preventSpace}
                        value={formik.values.phone}
                        onChange={checkMobileNumber}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.phone && Boolean(formik.errors.phone)
                        }
                        helperText={formik.touched.phone && formik.errors.phone}
                      />
                    </Grid>
                  </FormControl>
                  <Typography
                    className={classes.twoStepParagraph}
                    style={{ textAlign: "center", fontSize: "0.85rem" }}
                  >
                    We will only use this number for account security.
                  </Typography>
                  <Grid className={classes.nextButtonGrid} container>
                    <ButtonPrimary
                      data-testid="skip_button"
                      stylebutton='{"color":""}'
                      onClick={handleToSkipContinue}
                      className={classes.skip_button}
                    >
                      Skip
                    </ButtonPrimary>
                    <ButtonPrimary
                      data-testid="next_button"
                      stylebutton='{"color":""}'
                      disabled={disabledButton}
                      className={classes.button_space}
                      onClick={handleToSaveContinue}
                    >
                      Next
                    </ButtonPrimary>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </>
      ) : (
        <CheckLoginStatus />
      )}
    </div>
  );
}
export default MFAGetPhoneNumber