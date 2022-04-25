import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import React, { useRef, useState } from "react";
import { useQueryClient } from 'react-query';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import globalMessages from "../../../assets/data/globalMessages.json";
import getClientIp from "../../Controllers/CommonController";
import LoginController, { RegisterController } from "../../Controllers/LoginController";
import LogoutController from "../../Controllers/LogoutController";
import { RecaptchaValidationController } from "../../Controllers/RecaptchaController";
import ZipCodeLookup from "../../Controllers/ZipCodeLookup";
import {
  Button,
  ButtonPrimary,
  DatePicker,
  EmailTextField,
  PasswordField,
  SocialSecurityNumber,
  TextField,
  Zipcode
} from "../../FormsUI";
import Recaptcha from "../../Layout/Recaptcha/GenerateRecaptcha";
import { encryptAES } from "../../lib/Crypto";
import ErrorLogger from "../../lib/ErrorLogger";
import { FormValidationRules } from "../../lib/FormValidationRule";
import "./Register.css";
import { useStylesRegister } from "./Style";

let formValidation = new FormValidationRules();

//Yup validations for all the input fields
const validationSchema = formValidation.getFormValidationRule("");

//Begin: Login page
export default function Register() {

  const classes = useStylesRegister();
  const [ validZip, setValidZip ] = useState(true);
  const [ state, setState ] = useState("");
  const [ city, setCity ] = useState("");
  const [ successPopup, setSuccessPopup ] = useState(false);
  const [ failed, setFailed ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ disableRecaptcha, setDisableRecaptcha ] = useState(true);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  let refFirstName = useRef();
  let refLastName = useRef();

  window.onReCaptchaSuccess = async function () {
    try {
      let grecaptchaResponse = grecaptcha.getResponse();
      let ipAddress = await getClientIp();
      let recaptchaVerifyResponse = await RecaptchaValidationController(grecaptchaResponse, ipAddress);

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

  //Date implementation for verifying 18 years
  const myDate = new Date();
  myDate.setDate(myDate.getDate() - 6571);

  const loginUser = async (values) => {
    try {
      let retrivedValue = await LoginController(values.email, values.password, "");
      if (retrivedValue?.data?.user && retrivedValue?.data?.userFound) {
        let rememberMe = false;
        let now = new Date().getTime();
        LogoutController();
        Cookies.set("redirec", JSON.stringify({ to: "/select-amount" }));
        Cookies.set(
          "token",
          JSON.stringify({
            isLoggedIn: true,
            apiKey: retrivedValue?.data?.user?.extensionattributes?.login?.jwt_token,
            setupTime: now,
          })
        );
        Cookies.set(
          "cred",
          encryptAES(
            JSON.stringify({
              email: values.email,
              password: values.password,
            })
          )
        );
        queryClient.removeQueries();
        rememberMe
          ? Cookies.set(
            "rememberMe",
            JSON.stringify({
              isLoggedIn: true,
              apiKey: retrivedValue?.data?.user?.extensionattributes?.login?.jwt_token,
              setupTime: now,
            })
          )
          : Cookies.set("rememberMe", JSON.stringify({ selected: false, email: "", password: "" }));

        setLoading(false);
        navigate("/customers/accountoverview");
      } else if (retrivedValue?.data?.result === "error" || retrivedValue?.data?.hasError) {
        Cookies.set("token", JSON.stringify({ isLoggedIn: false, apiKey: "", setupTime: "" }));
        setLoading(false);
      } else {
        setLoading(false);
        alert(globalMessages.Network_Error);
      }
    } catch (error) {
      ErrorLogger("Error executing Login API", error);
    }
  };
  //Form Submission
  const queryParams = new URLSearchParams(window.location?.search);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: queryParams.get("email") ?? "",
      password: "",
      confirmPassword: "",
      zip: "",
      ssn: "",
      dob: null,
      isRegisterForm: 1
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setFailed("");
      //structuring the data for api call
      let body = {
        fname: values.firstName,
        lname: values.lastName,
        email: values.email,
        ssn: values.ssn,
        zip_code: values.zip,
        password: values.password,
        birth_year: values.dob.getFullYear().toString(),
        birth_month: String(values.dob.getMonth() + 1).padStart(2, '0'),
        birth_day: String(values.dob.getDate()).padStart(2, '0'),
        address_street: "",
        address_city: city,
        address_state: state,
      };
      //API call
      try {
        let customerStatus = await RegisterController(body);

        if (
          (!customerStatus.data?.customerFound && !customerStatus.data?.userFound && !customerStatus.data?.is_registration_failed) ||
          (customerStatus.data?.result === "success" && !customerStatus.data?.hasError)
        ) {
          //On succes, calls the login API to the JWT token and save it in storage, and make the user logged in and redirecting to home page
          loginUser(values);
        }
        else if (customerStatus.data?.result === "succcces" && customerStatus.data?.successMessage === "Password reset successful") {
          toast.success(customerStatus.data?.successMessage);
          loginUser(values);
        }
        else if (
          customerStatus.data?.result === "error" &&
          customerStatus.data?.hasError
        ) {
          setFailed(customerStatus.data?.errorMessage);
          setSuccessPopup(false);
          setLoading(false);
        } else {
          alert(globalMessages.Network_Error);
          setFailed(globalMessages.Network_Error_Please_Try_Again);
          setSuccessPopup(false);
          setLoading(false);
        }
      } catch (error) {
        setFailed(globalMessages.Please_Contact_Us_At);
        setLoading(false);
        ErrorLogger('Error from register_new_user API', error);
      }
    },
  });

  const NameChange = (event) => {
    const pattern = /^([a-zA-Z]+[.]?[ ]?|[a-z]+['-]?)+$/;
    let name = event.target.value.trim();
    if (!name || pattern.test(name)) {
      formik.handleChange(event);
    }
  };

  const handleCloseFailed = () => {
    setFailed("");
  };

  const handleCloseSuccess = () => {
    setSuccessPopup(false);
    navigate("/customers/accountOverview");
  };

  //Preventing space key
  const preventSpace = (event) => {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  };

  const autoFocus = () => {
    if (!refFirstName.current.value) {
      refFirstName.current.focus();
    } else if (!refLastName.current.value) {
      refLastName.current.focus();
    } else {
      return false;
    }
  };

  //Fetching valid zipcode
  const fetchAddress = async (event) => {
    try {
      formik.handleChange(event);
      setValidZip(false);
      setState("");
      setCity("");
      if (event.target.value && event.target.value.length === 5) {
        let result = await ZipCodeLookup(event.target.value.trim());
        if (result?.data?.cityName) {
          setValidZip(true);
          setState(result.data.stateCode);
          setCity(result.data.cityName);
        } else {
          formik.setFieldValue("city", "");
          formik.setFieldValue("state", "");
          setValidZip(false);
          setErrorMsg("Please enter a valid Zipcode");
        }
      }
    } catch (error) {
      ErrorLogger(" Error from fetchAddress", error);
    }
  };

  const andLogic = (valueOne, valueTwo) => {
    return (valueOne && valueTwo);
  };

  //View Part
  return (
    <div>
      <div className={classes.mainContentBackground} id="mainContentBackground">
        <Box>
          <Grid
            xs={12}
            item
            container
            justifyContent="center"
            alignItems="center"
            className={classes.gridInsideBox}
          >
            <Grid
              xs={11}
              sm={10}
              md={8}
              lg={6}
              xl={6}
              id="registerMainContent"
              className="cardWrapper"
              justifyContent="center"
              alignItems="center"
              container
              item
            >
              <Paper className={classes.paper}>
                <Typography
                  className={classes.title}
                  data-testid="title"
                  color="textSecondary"
                >
                  Sign in help / register
                </Typography>
                <p className={classes.subtitle} data-testid="subtitle">
                  {" "}
                  Let us help you get signed in another way
                </p>

                <form onSubmit={formik.handleSubmit}>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid
                      className="fullWidth"
                      item
                      xs={12}
                      sm={6}
                      container
                      direction="row"
                    >
                      <TextField
                        className={classes.paddingRight}
                        name="firstName"
                        id="firstName"
                        label="First Name *"
                        placeholder={globalMessages.FirstNameEnter}
                        materialProps={{ maxLength: "30", ref: refFirstName, }}
                        value={formik.values.firstName}
                        onChange={(event) => NameChange(event)}
                        onBlur={formik.handleBlur}
                        error={
                          andLogic(formik.touched.firstName, Boolean(formik.errors.firstName))

                        }
                        helperText={
                          andLogic(formik.touched.firstName, formik.errors.firstName)

                        }
                      />
                    </Grid>

                    <Grid
                      className="fullWidth"
                      item
                      xs={12}
                      sm={6}
                      container
                      direction="row"
                    >
                      <TextField
                        className={classes.paddingBottom}
                        name="lastName"
                        id="lastName"
                        label="Last Name *"
                        placeholder={globalMessages.LastNameEnter}
                        materialProps={{ maxLength: "30", ref: refLastName }}
                        value={formik.values.lastName}
                        onChange={NameChange}
                        onBlur={formik.handleBlur}
                        error={

                          andLogic(formik.touched.lastName, Boolean(formik.errors.lastName)

                          )
                        }
                        helperText={
                          andLogic(formik.touched.lastName, formik.errors.lastName)

                        }
                      />
                    </Grid>

                    <Grid
                      className="fullWidth"
                      item
                      xs={12}
                      container
                      direction="row"
                    >
                      <EmailTextField
                        className={classes.paddingBottom}
                        id="email"
                        name="email"
                        label="Email *"
                        placeholder={globalMessages.EmailEnter}
                        materialProps={{ maxLength: "100" }}
                        onKeyDown={preventSpace}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={andLogic(formik.touched.email, Boolean(formik.errors.email))}
                        helperText={andLogic(formik.touched.email, formik.errors.email)}
                      />
                    </Grid>

                    <Grid
                      className={classes.paddingBottom}
                      id="socialNum"
                      item
                      xs={12}
                      sm={4}
                      container
                      direction="row"
                    >
                      <SocialSecurityNumber
                        name="ssn"
                        label="Social Security Number *"
                        placeholder={globalMessages.SSNEnter}
                        id="ssn"
                        type="ssn"
                        value={formik.values.ssn}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={andLogic(formik.touched.ssn, Boolean(formik.errors.ssn))}
                        helperText={andLogic(formik.touched.ssn, formik.errors.ssn)}
                      />
                    </Grid>
                    <Grid
                      className={classes.paddingLeft}
                      id="ZipcodeWrap"
                      item
                      xs={12}
                      sm={4}
                      container
                      direction="row"
                    >
                      <Zipcode
                        fullWidth
                        id="zip"
                        name="zip"
                        label="Zip Code *"
                        placeholder={globalMessages.ZipCodeEnter}
                        value={formik.values.zip}
                        onChange={fetchAddress}
                        onBlur={formik.handleBlur}
                        error={(formik.touched.zip && Boolean(formik.errors.zip)) || !validZip}
                        helperText={validZip ? formik.touched.zip && formik.errors.zip : `${ globalMessages.ZipCodeValid }`}
                      />
                    </Grid>

                    <Grid
                      className={classes.paddingLeft}
                      id="dateWrap"
                      item
                      xs={12}
                      sm={4}
                      container
                      direction="row"
                    >
                      <DatePicker
                        name="dob"
                        label="Date of Birth *"
                        id="dob"
                        placeholder="MM/DD/YYYY"
                        format="MM/dd/yyyy"
                        autoComplete="off"
                        maxdate={myDate}
                        minyear={102}
                        value={formik.values.dob}
                        onChange={(values) => {
                          formik.values.dob = values;
                          formik.setFieldValue("dob", values);
                        }}
                        onBlur={formik.handleBlur}
                        error={andLogic(formik.touched.dob, Boolean(formik.errors.dob))}
                        helperText={andLogic(formik.touched.dob, formik.errors.dob)}
                      />
                    </Grid>

                    <Grid
                      className="passwordGrid"
                      item
                      xs={12}
                      container
                      direction="row"
                    >
                      <PasswordField
                        name="password"
                        label="Create New Password *"
                        placeholder={globalMessages.PasswordEnter}
                        id="password"
                        type="password"
                        onKeyDown={preventSpace}
                        materialProps={{ maxLength: "30" }}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={andLogic(formik.touched.password, Boolean(formik.errors.password))

                        }
                        helperText={
                          andLogic(formik.touched.password, formik.errors.password)

                        }
                      />
                      <p id="passwordTitle" className={classes.passwordTitle}>
                        Please ensure your password meets the following
                        criteria: between 10 and 30 characters in length, at
                        least 1 uppercase letter, at least 1 lowercase letter,
                        at least 1 symbol and at least 1 number.
                      </p>
                    </Grid>
                    <Grid
                      className="confirmPasswordGrid"
                      item
                      xs={12}
                      container
                      direction="row"
                    >
                      <PasswordField
                        name="confirmPassword"
                        label="Confirm Your Password *"
                        placeholder={globalMessages.PasswordConfirmEnter}
                        id="cpass"
                        type="password"
                        onKeyDown={preventSpace}
                        materialProps={{ maxLength: "30" }}
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={andLogic(formik.touched.confirmPassword, Boolean(formik.errors.confirmPassword))

                        }
                        helperText={
                          andLogic(formik.touched.confirmPassword, formik.errors.confirmPassword)

                        }
                      />
                      <br />
                      <p
                        className={
                          failed !== "" || failed !== undefined
                            ? "showError add Pad"
                            : "hideError"
                        }
                        data-testid="subtitle"
                      >
                        {" "}
                        {failed}
                      </p>
                    </Grid>

                    <Grid >
                      <Recaptcha />
                    </Grid>

                    <Grid item xs={12} className={classes.signInButtonGrid}>
                      <ButtonPrimary
                        onClick={autoFocus}
                        type="submit"
                        data-testid="submit"
                        stylebutton='{"background": "", "color":"", "fontSize" : "15px ! important", "padding" : "0px 30px" }'
                        disabled={disableRecaptcha ? disableRecaptcha : loading}
                      >
                        Sign in
                        <i
                          className="fa fa-refresh fa-spin customSpinner"
                          style={{
                            marginRight: "10px",
                            display: loading ? "block" : "none",
                          }}
                        />
                      </ButtonPrimary>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </div>
      <Dialog
        onClose={handleCloseFailed}
        aria-labelledby="customized-dialog-title"
        open={false}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleCloseFailed}>
          Notice
        </DialogTitle>
        <DialogContent dividers>
          <Typography align="justify" gutterBottom>
            Account already exists. Please use the login page and forgot
            password function to login
          </Typography>
        </DialogContent>
        <DialogActions className="modalAction">
          <Button
            stylebutton='{"background": "#FFBC23", "color": "black", "border-radius": "50px"}'
            onClick={handleCloseFailed}
            className="modalButton"
          >
            <Typography align="center">Ok</Typography>
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        onClose={handleCloseSuccess}
        aria-labelledby="customized-dialog-title"
        open={successPopup}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleCloseSuccess}>
          Notice
        </DialogTitle>
        <DialogContent dividers>
          <Typography align="justify" gutterBottom>
            Account created Successfully!
          </Typography>
        </DialogContent>
        <DialogActions className="modalAction">
          <Button
            stylebutton='{"background": "#FFBC23", "color": "black", "border-radius": "50px"}'
            onClick={handleCloseSuccess}
            className="modalButton"
          >
            <Typography align="center">Ok</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
