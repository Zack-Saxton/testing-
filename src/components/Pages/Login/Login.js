import CloseIcon from "@mui/icons-material/Close";
import { FormControl, FormControlLabel } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useQueryClient, useQuery } from "react-query";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import globalMessages from "../../../assets/data/globalMessages.json";
import getClientIp from "../../Controllers/CommonController";
import LoginController from "../../Controllers/LoginController";
import { RecaptchaValidationController } from "../../Controllers/RecaptchaController";
import {
  ButtonPrimary,
  EmailTextField,
  PasswordField,
  Popup,
  RenderContent
} from "../../FormsUI";
import Recaptcha from "../../Layout/Recaptcha/GenerateRecaptcha";
import { encryptAES } from "../../lib/Crypto";
import ErrorLogger from "../../lib/ErrorLogger";
import { FormValidationRules } from "../../lib/FormValidationRule";
import ScrollToTopOnMount from "../../Pages/ScrollToTop";
import "./Login.css";
import { useStylesLogin } from "./style";
let formValidation = new FormValidationRules();
const moment = require("moment");
const moment_timezone = require("moment-timezone");
let addVal = moment_timezone().tz("America/New_York").isDST() ? 4 : 5;

//Yup validations for all the input fields
const validationSchema = formValidation.getFormValidationRule("login");

//Begin: Login page
export default function Login(props) {
  const classes = useStylesLogin();
  const navigate = useNavigate();
  const [ loginFailed, setLoginFailed ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ cacTerms, setCacTerms ] = useState(false);
  const [ counter, setCounter ] = useState(0);
  const [ openDeleteSchedule, setopenDeleteSchedule ] = useState(false);
  const [ disableRecaptcha, setDisableRecaptcha ] = useState(true);
  const queryClient = useQueryClient();
  const {data:ClientIP} = useQuery('ipaddress', getClientIp);
  let location = useLocation();

  const remMeDataRaw = Cookies.get("rememberMe") ?? '{}';
  let remMeData = JSON.parse(remMeDataRaw);
  const [ remMe, setRemMe ] = useState(remMeData?.selected);

  //reCaptcha validation
  window.onReCaptchaSuccess = async function () {
    try {
      let grecaptchaResponse = grecaptcha.getResponse();
      let recaptchaVerifyResponse = await RecaptchaValidationController(grecaptchaResponse, ClientIP);

      if (recaptchaVerifyResponse.status === 200) {
        toast.success(globalMessages.Recaptcha_Verify);
        setDisableRecaptcha(false);
      }
      else {
        toast.error(globalMessages.Recaptcha_Error);
        grecaptcha.reset();
        setDisableRecaptcha(true);
      }
    } catch (error) {
      ErrorLogger("Error executing reCaptcha", error);
    }
  };

  window.OnExpireCallback = function () {
    grecaptcha.reset();
    setDisableRecaptcha(true);
  };

  //Form Submission
  const formik = useFormik({
    initialValues: {
      email: remMeData?.email ?? '',
      password: ''
    },
    validationSchema: validationSchema,
    // On login submit
    onSubmit: async (values) => {
      setLoading(true);
      // Sending value to  login controller
      let retVal = await LoginController(
        values?.email,
        values?.password,
        ClientIP,
        'Mozilla HP', //It is static for now. Will add the dynamic code later
        props?.setToken
      );
       if(!retVal?.data?.user?.extensionattributes?.MFA){
      if (retVal?.data?.user && retVal?.data?.userFound) {
        let login_date = retVal?.data?.user?.extensionattributes?.login
          ?.last_timestamp_date
          ? moment(retVal.data.user.extensionattributes.login.last_timestamp_date)
            .subtract(addVal, "hours")
            .format("MM/DD/YYYY")
          : "";
        let now = new Date().getTime();
        // On login success storing the needed data in the local storage
        Cookies.set(
          "token",
          JSON.stringify({
            isLoggedIn: true,
            apiKey: retVal?.data?.user?.extensionattributes?.login?.jwt_token,
            setupTime: now,
            applicantGuid: retVal?.data?.user?.attributes?.sor_data?.applicant_guid,
          })
        );
        Cookies.set("cred", encryptAES(JSON.stringify({ email: values?.email, password: values?.password })));
        Cookies.set("email", values?.email);
        Cookies.set("profile_picture", retVal?.data?.user?.mobile?.profile_picture ? retVal?.data?.user?.mobile?.profile_picture : "");
        Cookies.set("login_date", login_date);
        Cookies.set("userToken", retVal?.data?.user?.attributes?.UserToken);
        Cookies.set("temp_opted_phone_texting", "");
        Cookies.set("rememberMe", remMe ? JSON.stringify({ selected: true, email: values?.email }) : JSON.stringify({ selected: false, email: '' }));
        queryClient.removeQueries();
        setLoading(false);
        if (retVal?.data?.user?.attributes?.password_reset) {
          navigate("/resetpassword", { state: { Email: values?.email } });
        } else {
          navigate(location.state?.redirect ? location.state?.redirect : "/customers/accountoverview");
        }
        if (location.state?.activationToken) {
          navigate(0);
        }
      } else if (
        retVal?.data?.result === "error" ||
        retVal?.data?.hasError
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
        setCounter(counter + 1);
        setLoading(false);
        setLoginFailed(retVal?.data?.errorMessage);
      } else {
        setLoading(false);
        alert(globalMessages.Network_Error);
      }
    } else {
      navigate("/MFA", {state:{mfaDetails : retVal?.data?.user?.extensionattributes}}); 
    }
    },
  });

  const emailOnChange = (event) => {
    setLoginFailed("");
    formik.handleChange(event);
  }

  const passwordOnChange = (event) => {
    setLoginFailed("");
    formik.handleChange(event);
  };

  const handleRemMeChange = (event) => {
    setRemMe(event.target.checked);
  };

  //Preventing space key
  const preventSpace = (event) => {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  };

  const handleHelpLoginClose = () => {
    setopenDeleteSchedule(false);
  };
  //Cancel Payment
  const handlePaymentcancel = () => {
    setopenDeleteSchedule(true);
  };

  const handleOnClickCacTerms = () => {
    setCacTerms(true);
  };
  const handleOnClickCacTermsClose = () => {
    setCacTerms(false);
  };

  //View Part
  return (
    <div>
      <ScrollToTopOnMount />
      <div className={classes.mainContentBackground} id="mainContentBackground">
        <Box>
          <Grid
            className={classes.mainContentGrid}
            xs={12}
            item
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              id="main-content"
              item
              xs={11}
              sm={10}
              md={8}
              lg={6}
              xl={6}
              justifyContent="center"
              alignItems="center"
              container
              style={{
                opacity: loading ? 0.55 : 1,
                pointerEvents: loading ? "none" : "initial",
              }}
            >
              <Paper id="loginPaperCard" className={classes.paper}>
                <Typography
                  className={classes.title}
                  data-testid="title"
                  color="textSecondary"
                >
                  Sign in
                </Typography>

                <form onSubmit={formik.handleSubmit}>
                  <Grid className={classes.logInGrid}>
                    <Grid
                      id="fullWidth"
                      className={classes.emailGrid}
                    >
                      <EmailTextField
                        id="email"
                        name="email"
                        type="email"
                        testid="email-input"
                        placeholder="Enter your email address"
                        label="Email Address *"
                        materialProps={{ maxLength: "100" }}
                        suffix={
                          <p id="helpLogin" onClick={handlePaymentcancel}>
                            {" "}
                            Help
                          </p>
                        }
                        onKeyDown={preventSpace}
                        value={formik.values?.email}
                        onChange={emailOnChange}
                        onBlur={formik.handleBlur}
                        disablePaste={true}
                        error={
                          formik.touched?.email && Boolean(formik.errors?.email)
                        }
                        helperText={formik.touched?.email && formik.errors?.email}
                      />
                    </Grid>

                    <Grid
                      className="fullWidth"
                    >
                      <PasswordField
                        name="password"
                        label="Password *"
                        placeholder="Enter your password"
                        id="password"
                        type="password"
                        onKeyDown={preventSpace}
                        materialProps={{ maxLength: "100" }}
                        value={formik.values?.password}
                        onChange={passwordOnChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched?.password &&
                          Boolean(formik.errors?.password)
                        }
                        helperText={
                          formik.touched?.password && formik.errors?.password
                        }
                      />
                      <p
                        className={
                          loginFailed !== "" ? "showError add Pad" : "hideError"
                        }
                        data-testid="subtitle"
                      >
                        {" "}
                        {loginFailed === "Invalid Email or Password" ? globalMessages.Invalid_Login_Message : loginFailed}
                      </p>
                    </Grid>
                    <Grid className={classes.checkbox}>
                      <FormControl>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={remMe}
                              onChange={handleRemMeChange}
                              inputProps={{ "data-test-id": "switch" }}
                              color="primary"
                            />
                          }
                          label=" Remember me"
                        />
                      </FormControl>
                    </Grid>

                    <Grid className={classes.loginRecaptcha} >
                      <Recaptcha />
                    </Grid>

                    <Grid item xs={12} className={classes.loginButton}>
                      <ButtonPrimary
                        type="submit"
                        data-testid="submit"
                        stylebutton='{"background": "", "color":"" , "fontSize" : "15px", "padding" : "0px 30px"}'
                        disabled={disableRecaptcha ? disableRecaptcha : loading}
                      >
                        Sign In
                        <i
                          className="fa fa-refresh fa-spin customSpinner"
                          style={{
                            marginRight: "10px",
                            display: loading ? "block" : "none",
                          }}
                        />
                      </ButtonPrimary>
                    </Grid>
                    <Grid className={classes.registerGrid}>
                      <Typography className={classes.termsText}>
                        By logging into the site, you agree to
                        <span className={classes.linkDesign} onClick={() => { handleOnClickCacTerms(); }}>{' '}CAC terms of use</span>
                      </Typography>
                    </Grid>
                    <Grid className={classes.registerGrid}>
                      <NavLink
                        className="nonDecoratedLink"
                        to="/register"
                      >
                        <p className={classes.register}>
                          Sign in Help / Register
                        </p>
                      </NavLink>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </div>

      <Dialog
        id="deletePayment"
        open={openDeleteSchedule}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.dialogPaper }}
      >
        <div id="closeBtn" className={classes.buttonClose}>
          <IconButton
            aria-label="close"
            onClick={handleHelpLoginClose}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <DialogTitle id="alert-dialog-title">
          <Typography id="loginHelpDialogHeading"
            className={classes.loginHelpDialogHeading}>
            Having Trouble Logging In?{" "}
          </Typography>
        </DialogTitle>
        <ul>
          <li>
            {" "}
            If you&apos;re a new user, click on
            <NavLink to="/register" className="nonDecoratedLink">
              <span id="helpLogin"> {`"Sign in help/Register"`} </span>
            </NavLink>{" "}
            option and enter your registration details.
          </li>
        </ul>
        <ul>
          <li>
            {" "}
            If you have been making payments with our existing customer
            account center, use your email address in place of your userid and
            existing password
          </li>
        </ul>

        <DialogActions
          className="dialogActionsWrap"
        >
          <ButtonPrimary
            stylebutton='{"background": "", "color":"" }'
            onClick={handleHelpLoginClose}
          >
            ok
          </ButtonPrimary>
        </DialogActions>
      </Dialog>
      <Popup popupFlag={cacTerms} title='Terms Of Use' closePopup={handleOnClickCacTermsClose}>
        <RenderContent disclosureLink="/cacTermsOfUse" findContent="<h2>Terms Of Use</h2>" replaceContent='' />
      </Popup>
    </div>

  );
}

Login.propTypes = {
  setToken: PropTypes.string
};