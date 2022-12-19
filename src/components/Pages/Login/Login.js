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
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useFormik } from "formik";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useQueryClient, useQuery } from "react-query";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import globalMessages from "../../../assets/data/globalMessages.json";
import getClientIp from "../../Controllers/CommonController";
import LoginController, { handleSuccessLogin } from "../../Controllers/LoginController";
import {
  ButtonPrimary,
  EmailTextField,
  PasswordField,
  Popup,
  RenderContent
} from "../../FormsUI";
import Recaptcha from "../../Layout/Recaptcha/GenerateRecaptcha";
import { FormValidationRules } from "../../lib/FormValidationRule";
import ScrollToTop from "../../Pages/ScrollToTop";
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
  const [ disableEmailPaste, setDisableEmailPaste] = useState(true);
  const [ counter, setCounter ] = useState(0);
  const [ openDeleteSchedule, setopenDeleteSchedule ] = useState(false);
  const [ disableRecaptcha, setDisableRecaptcha ] = useState(true);
  const queryClient = useQueryClient();
  const {data:ClientIP} = useQuery('ipaddress', getClientIp);
  let location = useLocation();
  const [latitude,setLatitude] = useState();
  const [longitude,setLongitude] = useState();
  const remMeDataRaw = Cookies.get("rememberMe") ?? '{}';
  let remMeData = JSON.parse(remMeDataRaw);
  const [ remMe, setRemMe ] = useState(remMeData?.selected);
  Cookies.set("forceResetPassword", false);
  Cookies.remove("mfaPhone");
  Cookies.remove("mfaPhoneSkip");
  Cookies.remove("selectTerm")
  let enableRecaptchaFlag = process.env.REACT_APP_ENABLE_RECAPTCHA_LOGIN === 'true';
  
  useEffect(()=>{
     navigator.geolocation.getCurrentPosition(function(position){
        setLatitude(position.coords.latitude);
         setLongitude(position.coords.longitude);
     });
    let currentUrl = window.location.href;
    let currentHost = currentUrl.replace(/:/g, '.').substring(currentUrl.indexOf('//') + 2).split('.')[0];
    if (['localhost', 'cac-dev', 'cac-qa', 'cac-staging'].includes(currentHost)) setDisableEmailPaste(false);
    
  },[])

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
        longitude,
        latitude,
        window.navigator.userAgent, //It is static for now. Will add the dynamic code later
        props?.setToken
      );
      if (retVal?.data?.user && retVal?.data?.userFound) {
        let mfaData = {mfaDetails : retVal?.data?.user?.extensionattributes, customerEmail: values?.email, deviceType: window.navigator.userAgent }
        setLoading(false);
        handleSuccessLogin(retVal, values, mfaData, remMe, queryClient, navigate, location);
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
          }),
          toast.error(retVal?.data?.message)
        );
        if( retVal?.data?.message !== globalMessages.Account_Locked){
          setCounter(counter + 1);
        }
        else {
          formik.resetForm();
        }
        setLoading(false);
        setLoginFailed(retVal?.data?.errorMessage);
        if(counter >= 2) {
          navigate("/register?email=" + values?.email);
        }
      } else {
        setLoading(false);
        toast.error(globalMessages.Network_Error_Please_Try_Again);
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
      <ScrollToTop />
      <div className={classes.mainContentBackground} id="mainContentBackgroundWrap">
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
                        disablePaste={disableEmailPaste}
                        error={
                          formik.touched?.email && Boolean(formik.errors?.email)
                        }
                        helperText={formik.touched?.email && formik.errors?.email}
                      />
                    </Grid>

                    <Grid
                      className="fullWidth"
                      id="loginPassword"
                    >
                      <PasswordField
                        name="password"
                        label="Password *"
                        placeholder="Enter your password"
                        id="password"
                        type="password"
                        onKeyDown={preventSpace}
                        materialProps={{ maxLength: "30" }}
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
                    {enableRecaptchaFlag ? 
                    <Grid className={classes.loginRecaptcha} >
                      <Recaptcha setDisableRecaptcha={setDisableRecaptcha}/>
                    </Grid> 
                    : <></>}
                    

                    <Grid item xs={12} className={classes.loginButton}>
                      <ButtonPrimary
                        type="submit"
                        data-testid="submit"
                        stylebutton='{"background": "", "color":"" , "fontSize" : "15px", "padding" : "0px 30px"}'
                        disabled={disableRecaptcha && enableRecaptchaFlag ? disableRecaptcha : loading}
                      >
                        Sign In
                        <AutorenewIcon className="rotatingIcon"
                        style={{
                        display: loading ? "block" : "none",
                    }}/>
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
              <span id="helpLoginButton"> {`"Sign in help/Register"`} </span>
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
            OK
          </ButtonPrimary>
        </DialogActions>
      </Dialog>
      <Popup popupFlag={cacTerms} title='Terms Of Use' closePopup={handleOnClickCacTermsClose}>
        <RenderContent disclosureLink="/termsOfUse" findContent="<h2>Terms of Use</h2>" replaceContent='' />
      </Popup>
    </div>

  );
}

Login.propTypes = {
  setToken: PropTypes.string
};