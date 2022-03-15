import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useQueryClient } from 'react-query';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import globalMessages from "../../../assets/data/globalMessages.json";
import Logo from "../../../assets/images/loginbg.png";
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

let formValidation = new FormValidationRules();

//Styling part
const useStyles = makeStyles((theme) => ({
  mainContentBackground: {
    backgroundImage: "url(" + Logo + ")",
    backgroundRepeat: "noRepeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
  },
  root: {
    flexGrow: 1,
  },
  mainGrid: {
    boxShadow: `0 16px 24px 2px rgb(0 0 0 / 14%),
    0 6px 30px 5px rgb(0 0 0 / 12%),
    0 8px 10px -7px rgb(0 0 0 / 20%)`,
    background: "#f5f2f2",
  },
  title: {
    fontSize: "25px",
    textAlign: "center",
    fontWeight: 400,
    color: "black",
  },
  subtitle: {
    textAlign: "center",
  },
  passwordTitle: {
    fontSize: "14px",
    textAlign: "justify",
  },
  dobTitle: {
    fontSize: "12px",
    textAlign: "justify",
  },
  paper: {
    padding: theme.spacing(3),
    borderRadius: "6px !important",
    display: "flex",
    flexDirection: "column",
    backgroundColor: `rgba(255, 255, 255, .8)`,
    color: theme.palette.text.secondary,
    boxShadow: `0 16px 24px 2px rgb(0 0 0 / 14%),
  0 6px 30px 5px rgb(0 0 0 / 12%),
  0 8px 10px -7px rgb(0 0 0 / 20%)`,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signInButtonGrid: {
    textAlign: "center",
    paddingTop: "20px!important",
  },
}));

//Yup validations for all the input fields
const validationSchema = formValidation.getFormValidationRule('');

//Begin: Login page
export default function Register() {

  const classes = useStyles();
  const [ validZip, setValidZip ] = useState(true);
  const [ state, setState ] = useState("");
  const [ city, setCity ] = useState("");
  const [ success, setSuccess ] = useState(false);
  const [ failed, setFailed ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ disableRecaptcha, setdisableRecaptcha ] = useState(true);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  window.onReCaptchaSuccess = async function () {
    try {
      let grecaptchaResponse = grecaptcha.getResponse();
      let ipResponse = await axios.get('https://geolocation-db.com/json/');
      let ipAddress = ipResponse.data.IPv4;
      let recaptchaVerifyResponse = await RecaptchaValidationController(grecaptchaResponse, ipAddress);

      if (recaptchaVerifyResponse.status === 200) {
        toast.success(globalMessages.Recaptcha_Verify);
        setdisableRecaptcha(false);
      }
      else {
        toast.error(globalMessages.Recaptcha_Error);
        grecaptcha.reset();
        setdisableRecaptcha(true);
      }
    } catch (error) {
      ErrorLogger("Error executing geolocation API", error);
    }
  };

  window.OnExpireCallback = function () {
    grecaptcha.reset();
    setdisableRecaptcha(true);
  };

  //Date implementation for verifying 18 years
  const myDate = new Date();
  myDate.setDate(myDate.getDate() - 6571);

  const loginUser = async (values) => {
    try {
      let retVal = await LoginController(values.email, values.password, "");
      if (retVal?.data?.user && retVal?.data?.userFound) {
        let rememberMe = false;
        var now = new Date().getTime();
        LogoutController();
        Cookies.set("redirec", JSON.stringify({ to: "/select-amount" }));
        Cookies.set(
          "token",
          JSON.stringify({
            isLoggedIn: true,
            apiKey: retVal?.data?.user?.extensionattributes?.login?.jwt_token,
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
              apiKey: retVal?.data?.user?.extensionattributes?.login?.jwt_token,
              setupTime: now,
            })
          )
          : Cookies.set("rememberMe", JSON.stringify({ selected: false, email: "", password: "" }));

        setLoading(false);
        navigate("/customers/accountoverview");
      } else if (retVal?.data?.result === "error" || retVal?.data?.hasError) {
        Cookies.set("token", JSON.stringify({ isLoggedIn: false, apiKey: "", setupTime: "" }));
        setLoading(false);
      } else {
        setLoading(false);
        alert("Network error");
      }
    } catch (error) {
      ErrorLogger("Error executing Login API", error);
    }
  };
  //Form Submission
  const queryParams = new URLSearchParams(window.location.search);
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
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
        fname: values.firstname,
        lname: values.lastname,
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
          (customerStatus.data?.customerFound === false && customerStatus.data?.userFound === false && customerStatus.data?.is_registration_failed === false) ||
          (customerStatus.data?.result === "success" && customerStatus.data?.hasError === false)
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
          setSuccess(false);
          setLoading(false);
        } else {
          alert(globalMessages.Network_Error);
          setFailed(globalMessages.Network_Error_Please_Try_Again);
          setSuccess(false);
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
    let name = event.target.value;
    if (name === "" || pattern.test(name)) {
      formik.handleChange(event);
    }
  };

  const handleCloseFailed = () => {
    setFailed("");
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
    navigate("/customers/accountOverview");
  };

  //Preventing space key
  const preventSpace = (event) => {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  };

  //Auto focus on name field if it has any error on submit
  function autoFocus() {
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    if (firstname === "") {
      document.getElementById("firstname").focus();
    }
    if (lastname === "") {
      if (firstname === "") {
        document.getElementById("firstname").focus();
      } else {
        document.getElementById("lastname").focus();
      }
    }
  }

  //Fetching valid zipcode
  const fetchAddress = async (event) => {
    try {
      formik.handleChange(event);
      setValidZip(false);
      setState("");
      setCity("");
      if (event.target.value !== "" && event.target.value.length === 5) {
        let result = await ZipCodeLookup(event.target.value);
        if (result) {
          setValidZip(true);
          setState(result?.data.stateCode);
          setCity(result?.data.cityName);
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
      <div className={ classes.mainContentBackground } id="mainContentBackground">
        <Box>
          <Grid
            xs={ 12 }
            item
            container
            justifyContent="center"
            alignItems="center"
            style={ { paddingTop: "30px", paddingBottom: "40px" } }
          >
            <Grid
              xs={ 11 }
              sm={ 10 }
              md={ 8 }
              lg={ 6 }
              xl={ 6 }
              id="registerMainContent"
              className="cardWrapper"
              justifyContent="center"
              alignItems="center"
              container
              item
            >
              <Paper className={ classes.paper }>
                <Typography
                  className={ classes.title }
                  data-testid="title"
                  color="textSecondary"
                >
                  Sign in help / register
                </Typography>
                <p className={ classes.subtitle } data-testid="subtitle">
                  { " " }
                  Let us help you get signed in another way
                </p>

                <form onSubmit={ formik.handleSubmit }>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={ 4 }
                  >
                    <Grid
                      item
                      xs={ 12 }
                      sm={ 6 }
                      style={ { width: "100%" } }
                      container
                      direction="row"
                    >
                      <TextField
                        name="firstname"
                        id="firstname"
                        label="First Name *"
                        placeholder={ globalMessages.FirstNameEnter }
                        materialProps={ { maxLength: "30" } }
                        value={ formik.values.firstname }
                        onChange={ (event) => NameChange(event) }
                        onBlur={ formik.handleBlur }
                        error={
                          andLogic(formik.touched.firstname, Boolean(formik.errors.firstname))

                        }
                        helperText={
                          andLogic(formik.touched.firstname, formik.errors.firstname)

                        }
                      />
                    </Grid>

                    <Grid
                      item
                      xs={ 12 }
                      sm={ 6 }
                      style={ { width: "100%" } }
                      container
                      direction="row"
                    >
                      <TextField
                        name="lastname"
                        id="lastname"
                        label="Last Name *"
                        placeholder={ globalMessages.LastNameEnter }
                        materialProps={ { maxLength: "30" } }
                        value={ formik.values.lastname }
                        onChange={ NameChange }
                        onBlur={ formik.handleBlur }
                        error={

                          andLogic(formik.touched.lastname, Boolean(formik.errors.lastname)

                          )
                        }
                        helperText={
                          andLogic(formik.touched.lastname, formik.errors.lastname)

                        }
                      />
                    </Grid>

                    <Grid
                      item
                      xs={ 12 }
                      style={ { width: "100%" } }
                      container
                      direction="row"
                    >
                      <EmailTextField
                        id="email"
                        name="email"
                        label="Email *"
                        placeholder={ globalMessages.EmailEnter }
                        materialProps={ { maxLength: "100" } }
                        onKeyDown={ preventSpace }
                        value={ formik.values.email }
                        onChange={ formik.handleChange }
                        onBlur={ formik.handleBlur }
                        error={
                          andLogic(formik.touched.email, Boolean(formik.errors.email))

                        }
                        helperText={ andLogic(formik.touched.email, formik.errors.email) }
                      />
                    </Grid>

                    <Grid
                      id="socialNum"
                      item
                      xs={ 12 }
                      sm={ 4 }
                      container
                      direction="row"
                    >
                      <SocialSecurityNumber
                        className={ classes.socialNum }
                        name="ssn"
                        label="Social Security Number *"
                        placeholder={ globalMessages.SSNEnter }
                        id="ssn"
                        type="ssn"
                        value={ formik.values.ssn }
                        onChange={ formik.handleChange }
                        onBlur={ formik.handleBlur }
                        error={ andLogic(formik.touched.ssn, Boolean(formik.errors.ssn)) }
                        helperText={ andLogic(formik.touched.ssn, formik.errors.ssn) }
                      />
                    </Grid>
                    <Grid
                      id="ZipcodeWrap"
                      item
                      xs={ 12 }
                      sm={ 4 }
                      container
                      direction="row"
                    >
                      <Zipcode
                        fullWidth
                        id="zip"
                        name="zip"
                        label="Zip Code *"
                        placeholder={ globalMessages.ZipCodeEnter }
                        value={ formik.values.zip }
                        onChange={ fetchAddress }
                        onBlur={ formik.handleBlur }
                        error={
                          (formik.touched.zip && Boolean(formik.errors.zip)) ||
                          !validZip
                        }
                        helperText={
                          validZip
                            ? formik.touched.zip && formik.errors.zip
                            : `${ globalMessages.ZipCodeValid }`
                        }
                      />
                    </Grid>

                    <Grid
                      id="dateWrap"
                      item
                      xs={ 12 }
                      sm={ 4 }
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
                        maxdate={ myDate }
                        minyear={ 102 }
                        value={ formik.values.dob }
                        onChange={ (values) => {
                          formik.setFieldValue("dob", values);
                        } }
                        onBlur={ formik.handleBlur }
                        error={ andLogic(formik.touched.dob, Boolean(formik.errors.dob))

                        }
                        helperText={ andLogic(formik.touched.dob, formik.errors.dob) }
                      />
                    </Grid>

                    <Grid
                      item
                      xs={ 12 }
                      style={ { width: "100%" } }
                      container
                      direction="row"
                    >
                      <PasswordField
                        name="password"
                        label="Create New Password *"
                        placeholder={ globalMessages.PasswordEnter }
                        id="password"
                        type="password"
                        onKeyDown={ preventSpace }
                        materialProps={ { maxLength: "30" } }
                        value={ formik.values.password }
                        onChange={ formik.handleChange }
                        onBlur={ formik.handleBlur }
                        error={ andLogic(formik.touched.password, Boolean(formik.errors.password))

                        }
                        helperText={
                          andLogic(formik.touched.password, formik.errors.password)

                        }
                      />
                      <p id="passwordTitle" className={ classes.passwordTitle }>
                        Please ensure your password meets the following
                        criteria: between 8 and 30 characters in length, at
                        least 1 uppercase letter, at least 1 lowercase letter,
                        at least 1 symbol and at least 1 number.
                      </p>
                    </Grid>
                    <Grid
                      item
                      xs={ 12 }
                      style={ { width: "100%" } }
                      container
                      direction="row"
                    >
                      <PasswordField
                        name="confirmPassword"
                        label="Confirm Your Password *"
                        placeholder={ globalMessages.PasswordConfirmEnter }
                        id="cpass"
                        type="password"
                        onKeyDown={ preventSpace }
                        materialProps={ { maxLength: "30" } }
                        value={ formik.values.confirmPassword }
                        onChange={ formik.handleChange }
                        onBlur={ formik.handleBlur }
                        error={ andLogic(formik.touched.confirmPassword, Boolean(formik.errors.confirmPassword))

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
                        { " " }
                        { failed }
                      </p>
                    </Grid>

                    <Grid >
                      <Recaptcha />
                    </Grid>

                    <Grid item xs={ 12 } className={ classes.signInButtonGrid }>
                      <ButtonPrimary
                        onClick={ autoFocus }
                        type="submit"
                        data-testid="submit"
                        stylebutton='{"background": "", "color":"", "fontSize" : "15px ! important", "padding" : "0px 30px" }'
                        disabled={ disableRecaptcha ? disableRecaptcha : loading }
                      >
                        Sign in
                        <i
                          className="fa fa-refresh fa-spin customSpinner"
                          style={ {
                            marginRight: "10px",
                            display: loading ? "block" : "none",
                          } }
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
        onClose={ handleCloseFailed }
        aria-labelledby="customized-dialog-title"
        open={ false }
      >
        <DialogTitle id="customized-dialog-title" onClose={ handleCloseFailed }>
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
            onClick={ handleCloseFailed }
            className="modalButton"
          >
            <Typography align="center">Ok</Typography>
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        onClose={ handleCloseSuccess }
        aria-labelledby="customized-dialog-title"
        open={ success }
      >
        <DialogTitle id="customized-dialog-title" onClose={ handleCloseSuccess }>
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
            onClick={ handleCloseSuccess }
            className="modalButton"
          >
            <Typography align="center">Ok</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
