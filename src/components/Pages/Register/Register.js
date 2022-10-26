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
import React, { useRef, useState, useEffect } from "react";
import { useQueryClient, useQuery } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import globalMessages from "../../../assets/data/globalMessages.json";
import getClientIp from "../../Controllers/CommonController";
import LoginController, {
  RegisterController, handleSuccessLogin
} from "../../Controllers/LoginController";
import LogoutController from "../../Controllers/LogoutController";
import ZipCodeLookup from "../../Controllers/ZipCodeLookup";
import validateUserEnteredInput from "../../Pages/Login/ValidateUserEnteredInput";

import {
  Button,
  ButtonPrimary,
  DatePicker,
  EmailTextField,
  PasswordField,
  SocialSecurityNumber,
  TextField,
  Zipcode,
} from "../../FormsUI";
import Recaptcha from "../../Layout/Recaptcha/GenerateRecaptcha";
import ErrorLogger from "../../lib/ErrorLogger";
import { FormValidationRules } from "../../lib/FormValidationRule";
import "./Register.css";
import { useStylesRegister } from "./Style";
import ScrollToTop from "../CheckMyOffers/ScrollToTop";


let formValidation = new FormValidationRules();

//Yup validations for all the input fields
const validationSchema = formValidation.getFormValidationRule("");

//Begin: Login page
export default function Register() {
  const classes = useStylesRegister();
  const [validZip, setValidZip] = useState(true);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [successPopup, setSuccessPopup] = useState(false);
  const [failed, setFailed] = useState("");
  const [loading, setLoading] = useState(false);
  const [disableRecaptcha, setDisableRecaptcha] = useState(true);
  const [latitude,setLatitude] = useState();
  const [longitude,setLongitude] = useState();
  const navigate = useNavigate();
  let location = useLocation();
  const queryClient = useQueryClient();
  let refFirstName = useRef();
  let refLastName = useRef();
  const {data:ClientIP} = useQuery('ipaddress', getClientIp);
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(function(position){
       setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    })
 },[])

  //Date implementation for verifying 18 years
  const myDate = new Date();
  myDate.setDate(myDate.getDate() - 6571);

  const loginUser = async (values, customerStatus) => {
    try {
      let retrivedValue = customerStatus?.data?.user ? customerStatus : null;
      if(!customerStatus?.data?.user){
        retrivedValue = await LoginController(
          values.email,
          values.password,
          ClientIP,
          longitude,
          latitude,
          window.navigator.userAgent,
        );
      }      
      if (retrivedValue?.data?.user && retrivedValue?.data?.userFound) {        
        LogoutController();
        Cookies.set("redirec", JSON.stringify({ to: "/select-amount" }));
        let mfaData = {mfaDetails : retrivedValue?.data?.user?.extensionattributes, customerEmail: values?.email, deviceType: window.navigator.userAgent }
        setLoading(false);
        handleSuccessLogin(retrivedValue, values, mfaData, false, queryClient, navigate, location);
        setLoading(false);
      } else if (
        retrivedValue?.data?.result === "error" ||
        retrivedValue?.data?.hasError
      ) {
        Cookies.set(
          "token",
          JSON.stringify({ isLoggedIn: false, apiKey: "", setupTime: "" })
        );
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(globalMessages.Network_Error_Please_Try_Again);
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
      isRegisterForm: 1,
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
        birth_month: String(values.dob.getMonth() + 1).padStart(2, "0"),
        birth_day: String(values.dob.getDate()).padStart(2, "0"),
        address_street: "",
        address_city: city,
        address_state: state,
      };
      //API call
      try {
        let customerStatus = await RegisterController(body);
        let register = customerStatus?.data?.message
        let passwordReset = customerStatus?.data?.successMessage
        if(customerStatus?.data?.statusCode !== 400 && (!customerStatus?.data?.errorMessage && !customerStatus?.data?.error)){
          toast.success(register ? register : passwordReset);
          loginUser(values, customerStatus);
        } else if (customerStatus?.data?.errorMessage === globalMessages.Multiple_Records){
          setFailed(globalMessages.Account_Already_Exists);
          setLoading(false);          
        }
        else if (
          customerStatus?.data?.result === "error" &&
          customerStatus?.data?.hasError
        ) {
          toast.error(customerStatus.data?.errorMessage);
          setSuccessPopup(false);
          setLoading(false);
        } else {
          toast.error(globalMessages.Network_Error_Please_Try_Again);
          setFailed(globalMessages.Network_Error_Please_Try_Again);
          setSuccessPopup(false);
          setLoading(false);
        }
      } catch (error) {
        setFailed(globalMessages.Please_Contact_Us_At);
        setLoading(false);
        ErrorLogger("Error from register_new_user API", error);
      }
    },
  });

  // onchange validation
	const onNameChange = (event) => {
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

  const removeSpace = (event, name) => {
    formik.setFieldValue(name, event.target.value.trim());
  }

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
    return valueOne && valueTwo;
  };

  //View Part
  return (
    <div data-testid="register_component">
      <ScrollToTop />
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
                  <Grid container justifyContent="center" alignItems="center">
                    <Grid container>
                      <Grid
                        className="fullWidth"
                        item
                        xs={12}
                        sm={6}
                        container
                        direction="row"
                      >
                        <TextField
                          className={classes.firstNameStyle}
                          name="firstName"
                          id="firstName"
                          label="First Name *"
                          placeholder={globalMessages.FirstNameEnter}
                          materialProps={{ maxLength: "30", ref: refFirstName }}
                          value={formik.values.firstName}
                          onChange={onNameChange}
                          onBlur={(event) => {formik.handleBlur(event);
                          removeSpace(event, "firstName")}}
                          error={andLogic(
                            formik.touched.firstName,
                            Boolean(formik.errors.firstName)
                          )}
                          helperText={andLogic(
                            formik.touched.firstName,
                            formik.errors.firstName
                          )}
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
                          className={classes.lastNameStyle}
                          name="lastName"
                          id="lastName"
                          label="Last Name *"
                          placeholder={globalMessages.LastNameEnter}
                          materialProps={{ maxLength: "30", ref: refLastName }}
                          value={formik.values.lastName}
                          onChange={onNameChange}
                          onBlur={(event) => {formik.handleBlur(event);
                          removeSpace(event, "lastName")}}
                          error={andLogic(
                            formik.touched.lastName,
                            Boolean(formik.errors.lastName)
                          )}
                          helperText={andLogic(
                            formik.touched.lastName,
                            formik.errors.lastName
                          )}
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      className="fullWidth"
                      item
                      xs={12}
                      container
                      direction="row"
                    >
                      <EmailTextField
                        className={classes.emailNameStyle}
                        id="email"
                        name="email"
                        label="Email *"
                        placeholder={globalMessages.EmailEnter}
                        materialProps={{ maxLength: "100" }}
                        onKeyDown={preventSpace}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={andLogic(
                          formik.touched.email,
                          Boolean(formik.errors.email)
                        )}
                        helperText={andLogic(
                          formik.touched.email,
                          formik.errors.email
                        )}
                      />
                    </Grid>

                    <Grid container>
                      <Grid
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
                          error={andLogic(
                            formik.touched.ssn,
                            Boolean(formik.errors.ssn)
                          )}
                          helperText={andLogic(
                            formik.touched.ssn,
                            formik.errors.ssn
                          )}
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
                          error={
                            (formik.touched.zip &&
                              Boolean(formik.errors.zip)) ||
                            !validZip
                          }
                          helperText={
                            validZip
                              ? formik.touched.zip && formik.errors.zip
                              : `${globalMessages.ZipCodeValid}`
                          }
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
                        data-testid="dobtest"
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
                          error={andLogic(
                            formik.touched.dob,
                            Boolean(formik.errors.dob)
                          )}
                          helperText={andLogic(
                            formik.touched.dob,
                            formik.errors.dob
                          )}
                        />
                      </Grid>
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
                        error={andLogic(
                          formik.touched.password,
                          Boolean(formik.errors.password)
                        )}
                        helperText={andLogic(
                          formik.touched.password,
                          formik.errors.password
                        )}
                      />
                      <Grid className="errorValidationWrap" container>
                        <Grid
                          className="errorValidationOne"
                          item
                          md={7}
                          sm={7}
                          xs={12}
                        >
                          <ul>
                            {validateUserEnteredInput(formik.values.password, 1)}
                          </ul>
                        </Grid>

                        <Grid
                          className="errorValidationTwo"
                          item
                          md={5}
                          sm={5}
                          xs={12}
                        >
                          <ul>
                          {validateUserEnteredInput(formik.values.password, 0)}
                          </ul>
                        </Grid>
                      </Grid>
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
                        error={andLogic(
                          formik.touched.confirmPassword,
                          Boolean(formik.errors.confirmPassword)
                        )}
                        helperText={andLogic(
                          formik.touched.confirmPassword,
                          formik.errors.confirmPassword
                        )}
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

                    <Grid>
                      <Recaptcha setDisableRecaptcha={setDisableRecaptcha}/>
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
            <Typography align="center">OK</Typography>
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
            <Typography align="center">OK</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
