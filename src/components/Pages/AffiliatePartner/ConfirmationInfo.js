import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import creditkarmalogo from "../../../assets/images/ck_logo.png";
import Logo from "../../../assets/images/loginbg.png";
import { partnerConfirmInfo } from "../../Controllers/PartnerSignupController";
import ZipCodeLookup from "../../Controllers/ZipCodeLookup";
import { ButtonPrimary, Checkbox, Select, TextField, Zipcode } from "../../FormsUI";
import states from "../../lib/States.json";
import statesFullform from "../../lib/StatesFullform.json";
import "./Style.css";
//Styling
const useStyles = makeStyles((theme) => ({
  mainContentBackground: {
    backgroundImage: "url(" + Logo + ")",
    backgroundSize: "cover",
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
    fontSize: "20px",
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
const validationSchema = yup.object({
  firstname: yup
    .string("Enter your Firstname")
    .trim()
    .max(30, "Should be less than 30 characters")
    .matches(/^(?!\s+$).*/g, "* This field cannot contain only backspaces")
    .required("Your firstname is required"),
  lastname: yup
    .string("Enter your Lastname")
    .trim()
    .max(30, "Should be less than 30 characters")
    .matches(/^(?!\s+$).*/g, "* This field cannot contain only backspaces")
    .required("Your lastname is required"),

  streetAddress: yup
    .string("Enter Street Address")
    .trim()
    .max(100, "Should be less than 100 characters")
    .matches(/^(?!\s+$).*/g, "* This field cannot contain only backspaces")
    .required("Your Address is required"),

  city: yup
    .string("Enter City")
    .max(30, "Should be less than 30 characters")
    .required("Your home city is required. Please re-enter your zip code to populate your city"),
  state: yup
    .string("Enter State")
    .max(30, "Should be less than 30 characters")
    .required("Your home state is required."),
  zip: yup
    .string("Enter your Zip")
    .min(5, "Zipcode should be of minimum 5 characters length")
    .required("Your home ZIP Code is required"),
  citizenship: yup
    .string("Enter citizenship")
    .max(30, "Should be less than 30 characters")
    .required("Your citizenship is required"),
  employementStatus: yup
    .string("Enter Employement Status")
    .max(30, "Should be less than 30 characters")
    .required("Your Employement Status is required"),
  activeDuty: yup.string().when("state", {
    is: "NC",
    then: yup.string().required("Active duty required"),
  }),
  activeDutyRank: yup.string().when("activeDuty", {
    is: "Yes",
    then: yup.string().required("Active duty rank is required"),
  }),
  martialStatus: yup.string().when("state", {
    is: "Wisconsin",
    then: yup.string().required("Marital Status required"),
  }),
  spouseadd: yup
    .string()
    .when("martialStatus", {
      is: "Married",
      then: yup
        .string()
        .trim()
        .max(100, "Should be less than 100 characters")
        .matches(/^(?!\s+$).*/g, "* This field cannot contain only backspaces"),
    })
    .when("martialStatus", {
      is: "Separated, under decree of legal separation",
      then: yup
        .string()
        .trim()
        .max(100, "Should be less than 100 characters")
        .matches(/^(?!\s+$).*/g, "* This field cannot contain only backspaces"),
    }),
  spouseZipcode: yup
    .string()
    .when("martialStatus", {
      is: "Married",
      then: yup.string().required("Your home ZIP Code is required"),
    })
    .when("martialStatus", {
      is: "Separated, under decree of legal separation",
      then: yup.string().required("Your home ZIP Code is required"),
    }),
  spousecity: yup
    .string()
    .when("martialStatus", {
      is: "Married",
      then: yup
        .string()
        .required("Your home city is required. Please re-enter your zip code to populate your city"),
    })
    .when("martialStatus", {
      is: "Separated, under decree of legal separation",
      then: yup
        .string()
        .required("Your home city is required. Please re-enter your zip code to populate your city"),
    }),
  spouseSelectState: yup
    .string()
    .when("martialStatus", {
      is: "Married",
      then: yup.string().required("Your home state is required"),
    })
    .when("martialStatus", {
      is: "Separated, under decree of legal separation",
      then: yup.string().required("Your home state is required"),
    }),
});

//Begin: Login page
export default function CreditKarma(props) {
  const classes = useStyles();
  const [ loading, setLoading ] = useState(false);
  const [ validZip, setValidZip ] = useState(true);
  const [ errorMsg, setErrorMsg ] = useState("");
  const [ open, setOpen ] = useState(false);
  const [ openDelaware, setOpenDelaware ] = useState(false);
  const [ openOhio, setOpenOhio ] = useState(false);
  const [ citizenship, setCitizenship ] = useState(false);
  const [ agreeDelaware, setAgreeDelaware ] = useState("");
  const [ agreeCalifornia, setAgreeCalifornia ] = useState("");
  const [ agreeNewMexico, setAgreeNewMexico ] = useState("");
  const [ agree, setAgree ] = useState(false);
  const [ errorAnnual, setErrorAnnual ] = useState("");
  const [ errorPersonal, setErrorPersonal ] = useState("");
  const history = useHistory();

  window.zeHide();
  const validate = (personal, household) => {
    if (!isNaN(personal) && !isNaN(household)) {
      if (personal <= household) {
        setErrorAnnual("");
        setErrorPersonal("");
        return true;
      } else {
        setErrorAnnual("Annual household income must be greater than or equal to Annual personal income");
        return false;
      }
    } else {
      setErrorPersonal(isNaN(personal) ? "Annual personal income is required" : "");
      setErrorAnnual(isNaN(household) ? "Annual household income is required" : "");
      return false;
    }
  };
  const autoFocus = () => {
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var streetAddress = document.getElementById("streetAddress").value;
    var zip = document.getElementById("zip").value;
    var citizenshipCnf = document.getElementById("citizenship").value;
    var personalIncome = document.getElementById("personalIncome").value;
    var employementStatus = document.getElementById("employementStatus").value;
    var annualhousehold = document.getElementById("annualhousehold").value;

    if (firstname === "") {
      document.getElementById("firstname").focus();
    } else if (lastname === "") {
      document.getElementById("lastname").focus();
    } else if (streetAddress === "") {
      document.getElementById("streetAddress").focus();
    } else if (zip === "") {
      document.getElementById("zip").focus();
    } else if (citizenshipCnf === "" || citizenshipCnf === undefined) {
      document.getElementById("citizenship").focus();
    } else if (employementStatus === "" || employementStatus === undefined) {
      document.getElementById("employementStatus").focus();
    } else if (personalIncome === "") {
      document.getElementById("personalIncome").focus();
      validate();
    } else if (annualhousehold === "") {
      validate();
      document.getElementById("annualhousehold").focus();
    } else {
      return false;
    }
  };
  //Form Submission
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: props?.location?.state?.first_name ?? "",
      lastname: props?.location?.state?.last_name ?? "",
      streetAddress: props?.location?.state?.address_street ?? "",
      city: props?.location?.state?.address_city ?? "",
      state: props?.location?.state?.address_state
        ? states[ props.location.state.address_state ]
        : "",
      zip: props?.location?.state?.address_postal_code ?? "",
      citizenship: props?.location?.state?.citizenship ?? "",
      personalIncome: props?.location?.state?.annual_income
        ? "$" +
        parseFloat(props.location.state.annual_income)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
          .slice(0, -3)
        : "",
      householdIncome: props?.location?.state?.household_annual_income
        ? "$" +
        parseFloat(props.location.state.household_annual_income)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
          .slice(0, -3)
        : "",
      employementStatus: props?.location?.state?.employment_status ?? "",
      activeDuty: props?.location?.state?.active_duty ?? "",
      activeDutyRank: props?.location?.state?.active_duty_rank ?? "",
      militaryStatus: props?.location?.state?.military_status ?? "",
      martialStatus: props?.location?.state?.marital_status ?? "",
      spouseadd: props?.location?.state?.spouse_address_street ?? "",
      spouseZipcode: props?.location?.state?.spouse_address_postal_code ?? "",
      spousecity: props?.location?.state?.spouse_address_city ?? "",
      spouseSelectState: props?.location?.state?.spouse_address_state
        ? states[ props.location.state.spouse_address_state ]
        : "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const modPersonalIncome = parseInt(values.personalIncome.replace(/\$/g, "").replace(/,/g, ""));
      const modHouseholdIncome = parseInt(values.householdIncome.replace(/\$/g, "").replace(/,/g, ""));

      if (errorPersonal === "" && errorAnnual === "" && validate(modPersonalIncome, modHouseholdIncome)) {
        values.personalIncome = modPersonalIncome;
        values.householdIncome = modHouseholdIncome;

        setLoading(true);
        let confirmInfoData = {
          firstname: values.firstname,
          lastname: values.lastname,
          streetAddress: values.streetAddress,
          city: values.city,
          state: statesFullform[ values.state ],
          zip: values.zip,
          citizenship: values.citizenship,
          personalIncome: values.personalIncome,
          householdIncome: values.householdIncome,
          employementStatus: values.employementStatus,
          activeDuty: values.activeDuty,
          activeDutyRank: values.activeDutyRank,
          martialStatus: values.martialStatus,
          spouseadd: values.spouseadd,
          spouseZipcode: values.spouseZipcode,
          spousecity: values.spousecity,
          spouseSelectState: statesFullform[ values.spouseSelectState ],
          partner_token: props?.location?.state?.partner_token ?? "",
          email: props?.location?.state?.email ?? "",
        };
        let partnerConfirmRes = await partnerConfirmInfo(confirmInfoData, history);
        if (partnerConfirmRes.data.status !== 200) {
          setLoading(false);
        }
      }
    },
  });

  const onBlurAddress = (event) => {
    formik.setFieldValue("streetAddress", event.target.value.trim());
    formik.setFieldValue("spouseadd", event.target.value.trim());
  };

  const fetchAddress = async (event) => {
    try {
      setErrorMsg(event.target.value === "" ? "Please enter a zipcode" : errorMsg);
      if (event.target.value !== "" && event.target.value.length === 5) {
        let result = await ZipCodeLookup(event.target.value);
        if (result) {
          fetchAddressValidate(result);
        } else {
          formik.setFieldValue("city", "");
          formik.setFieldValue("state", "");
          setValidZip(false);
          setErrorMsg("Please enter a valid Zipcode");
        }
      }
      if (event.target.name !== "") {
        formik.handleChange(event);
      }
    } catch (error) {
      toast.error("Error from [fetchAddress].");
    }
  };

  function fetchAddressValidate(result) {
    try {
      if (result.data) {
        formik.setFieldValue("city", result?.data?.cityName);
        formik.setFieldValue("state", result?.data?.stateCode);
        setValidZip(true);
        if (result?.data?.cityName === "California" || result?.data?.stateCode === "CA") {
          handleClickOpen();
        }
        if (result?.data?.cityName === "Ohio" || result?.data?.stateCode === "OH") {
          handleClickOpenOhio();
        }
      } else {
        formik.setFieldValue("city", "");
        formik.setFieldValue("state", "");
        setValidZip(false);
        setErrorMsg("Please enter a valid Zipcode");
      }
    } catch (error) {
      Error("Error from [fetchAddressValidate].");
    }
  }
  //fetch the state and city based in zip code
  const fetchSpouseAddress = async (event) => {
    try {
      if (event.target.value !== "" && event.target.value.length === 5) {
        let result = await ZipCodeLookup(event.target.value);
        if (result) {
          formik.setFieldValue("spousecity", result?.data?.cityName);
          formik.setFieldValue("spouseSelectState", result?.data?.stateCode);
          setValidZip(true);
        } else {
          formik.setFieldValue("spouseSelectState", "");
          formik.setFieldValue("spousecity", "");
          setValidZip(false);
        }
        formik.handleChange(event);
      }
    } catch (error) {
      Error("Error from [fetchSpouseAddress].");
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenOhio = () => {
    setOpenOhio(true);
  };

  const handleCloseOhio = () => {
    setOpenOhio(false);
  };

  const handleClickDelawareOpen = () => {
    setOpenDelaware(true);
  };
  const handleDelawareClose = () => {
    setOpenDelaware(false);
  };

  //Restrict alphabets

  const onHandleChangePersonal = (event) => {
    const reg = /^[0-9.,$\b]+$/;
    let acc = event.target.value;

    if (acc === "" || reg.test(acc)) {
      setErrorPersonal("");
      formik.handleChange(event);
    }
  };
  const onHandleChangeHouse = (event) => {
    const reg = /^[0-9.,$\b]+$/;
    let acc = event.target.value;

    if (acc === "" || reg.test(acc)) {
      setErrorAnnual("");
      formik.handleChange(event);
    }
  };

  const preventUnwanted = (event) => {
    if (event.keyCode === 190 || event.keyCode === 188) {
      event.preventDefault();
    }
  };

  // To change text to currency format and check for validations
  const currencyFormat = (event) => {
    const inputName = event.target.name;
    if (inputName === "personalIncome") {
      const n = event.target.value
        .replace(/\$/g, "")
        .replace(/,/g, "")
        .substr(0, 7);
      const formated = parseFloat(n);
      const currency = "$";
      const forCur = currency + formated.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      formik.setFieldValue(event.target.name, forCur.slice(0, -3));
      const modPersonalIncome = parseInt(formik.values.personalIncome.replace(/\$/g, "").replace(/,/g, ""));
      const modHouseholdIncome = parseInt(formik.values.householdIncome.replace(/\$/g, "").replace(/,/g, ""));
      if (isNaN(modPersonalIncome)) {
        setErrorPersonal("Annual personal income is required");
      } else {
        const nLen = event.target.value
          .replace(/\$/g, "")
          .replace(/,/g, "")
          .substr(0, 7);
        if (nLen.length < 4) {
          setErrorPersonal("Annual personal income should not be less than 4 digits");
          return false;
        }
        if (!isNaN(modPersonalIncome) && !isNaN(modHouseholdIncome)) {
          if (modPersonalIncome <= modHouseholdIncome) {
            setErrorAnnual("");
            setErrorPersonal("");
            return true;
          } else {
            setErrorAnnual("Annual household income must be greater than or equal to Annual personal income");
            return false;
          }
        }
      }
    } else if (inputName === "householdIncome") {
      const n = event.target.value
        .replace(/\$/g, "")
        .replace(/,/g, "")
        .substr(0, 7);
      const formated = parseFloat(n);
      const currency = "$";
      const forCur = currency + formated.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      formik.setFieldValue(event.target.name, forCur.slice(0, -3));
      const modPersonalIncome = parseInt(formik.values.personalIncome.replace(/\$/g, "").replace(/,/g, ""));
      const modHouseholdIncome = parseInt(formik.values.householdIncome.replace(/\$/g, "").replace(/,/g, ""));
      if (isNaN(modHouseholdIncome)) {
        setErrorAnnual("Annual household income is required");
      } else {
        const nLen = event.target.value
          .replace(/\$/g, "")
          .replace(/,/g, "")
          .substr(0, 7);
        if (nLen.length < 4) {
          setErrorAnnual("Annual household income should not be less than 4 digits");
          return false;
        }
        const perval = document
          .getElementById("personalIncome")
          .value.replace(/\$/g, "")
          .replace(/,/g, "")
          .substr(0, 7);
        if (perval.length < 4) {
          setErrorPersonal("Annual personal income should not be less than 4 digits");
          return false;
        }
        if (!isNaN(modPersonalIncome) && !isNaN(modHouseholdIncome)) {
          if (modPersonalIncome <= modHouseholdIncome) {
            setErrorAnnual("");
            setErrorPersonal("");
            return true;
          } else {
            setErrorAnnual("Annual household income must be greater than or equal to Annual personal income");
            return false;
          }
        }
      }
    }
  };
  const onNameChange = (event) => {
    const reg = /^([a-zA-Z]+[.]?[ ]?|[a-z]+['-]?)+$/;
    let acc = event.target.value;
    if (acc === "" || reg.test(acc)) {
      formik.handleChange(event);
    }
  };
  const changeCitizenship = (event) => {
    let acc = event.target.value;
    if (acc === "Foreign Resident") {
      setCitizenship(true);
      formik.handleChange(event);
    } else {
      setCitizenship(false);
      formik.handleChange(event);
    }
  };

  //View Part
  return (
    <div>
      <div className={ classes.mainContentBackground } id="mainContentBackground">
        <Box>
          <Grid
            xs={ 12 }
            item
            style={ {
              paddingTop: "30px",
              paddingBottom: "40px",
              margin: "auto",
              width: "100%",
            } }
          >
            <Grid
              xs={ 11 }
              sm={ 10 }
              md={ 6 }
              lg={ 6 }
              xl={ 6 }
              className="cardWrapper"
              item
              style={ { margin: "auto" } }
            >
              <Paper
                className={ classes.paper }
                style={ {
                  opacity: loading ? 0.55 : 1,
                  pointerEvents: loading ? "none" : "initial",
                } }
              >
                <Typography
                  className={ classes.title }
                  data-testid="title"
                  color="textSecondary"
                >
                  Welcome to Mariner Finance{ " " }
                </Typography>
                <p style={ { textAlign: "center" } }>
                  Please review and confirm the information that{ " " }
                  <a href="https://www.creditkarma.com/" target="blank">
                    { " " }
                    <img
                      src={ creditkarmalogo }
                      style={ { height: "13px" } }
                      alt="creditkarmalogo"
                    />
                  </a>{ " " }
                  provided about you, it will only take a minute.
                </p>
                {/* </div> */ }

                <form onSubmit={ formik.handleSubmit }>
                  <Grid container spacing={ 4 }>
                    <Grid item xs={ 12 } sm={ 6 } style={ { width: "100%" } }>
                      <TextField
                        id="firstname"
                        name="firstname"
                        label="First Name"
                        materialProps={ {
                          "data-test-id": "name",
                          maxLength: "30",
                        } }
                        value={ formik.values.firstname }
                        onChange={ onNameChange }
                        onBlur={ formik.handleBlur }
                        error={
                          formik.touched.firstname &&
                          Boolean(formik.errors.firstname)
                        }
                        helperText={
                          formik.touched.firstname && formik.errors.firstname
                        }
                      />
                    </Grid>

                    <Grid item xs={ 12 } sm={ 6 } style={ { width: "100%" } }>
                      <TextField
                        id="lastname"
                        name="lastname"
                        label="Last Name"
                        materialProps={ {
                          "data-test-id": "lastname",
                          maxLength: "30",
                        } }
                        value={ formik.values.lastname }
                        onChange={ onNameChange }
                        onBlur={ formik.handleBlur }
                        error={
                          formik.touched.lastname &&
                          Boolean(formik.errors.lastname)
                        }
                        helperText={
                          formik.touched.lastname && formik.errors.lastname
                        }
                      />
                    </Grid>

                    <Grid item xs={ 12 }>
                      <TextField
                        fullWidth
                        id="streetAddress"
                        name="streetAddress"
                        label="Address"
                        materialProps={ {
                          "data-test-id": "streetAddress",
                          maxLength: "100",
                        } }
                        value={ formik.values.streetAddress }
                        onChange={ formik.handleChange }
                        onBlur={ onBlurAddress }
                        error={
                          formik.touched.streetAddress &&
                          Boolean(formik.errors.streetAddress)
                        }
                        helperText={
                          formik.touched.streetAddress &&
                          formik.errors.streetAddress
                        }
                      />
                    </Grid>

                    <Grid item xs={ 12 } sm={ 4 } container direction="row">
                      <Zipcode
                        fullWidth
                        id="zip"
                        name="zip"
                        label="Zipcode *"
                        materialProps={ { "data-test-id": "zipcode" } }
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
                            : "Please enter a valid ZIP Code"
                        }
                      />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 4 } container direction="row">
                      <TextField
                        fullWidth
                        id="city"
                        name="city"
                        label="City"
                        disabled={ true }
                        materialProps={ { "data-test-id": "city" } }
                        value={ formik.values.city }
                        onChange={ formik.handleChange }
                        onBlur={ formik.handleBlur }
                        error={
                          formik.touched.city && Boolean(formik.errors.city)
                        }
                        helperText={ formik.touched.city && formik.errors.city }
                      />
                    </Grid>

                    <Grid item xs={ 12 } sm={ 4 } container direction="row">
                      <TextField
                        fullWidth
                        id="state"
                        name="state"
                        label="State"
                        disabled={ true }
                        materialProps={ { "data-test-id": "state" } }
                        value={ formik.values.state }
                        onChange={ formik.handleChange }
                        onBlur={ formik.handleBlur }
                        error={
                          formik.touched.state && Boolean(formik.errors.state)
                        }
                        helperText={ formik.touched.state && formik.errors.state }
                      />
                    </Grid>

                    <Grid item xs={ 12 }>
                      <Grid
                        item
                        xs={ 12 }
                        style={ { paddingTop: "10px" } }
                        id="citizenshipWrap"
                      >
                        <Select
                          id="citizenship"
                          name="citizenship"
                          labelform="Citizenship"
                          value={ formik.values.citizenship }
                          onChange={ changeCitizenship }
                          onBlur={ formik.handleBlur }
                          error={
                            (formik.touched.citizenship &&
                              Boolean(formik.errors.citizenship)) ||
                            citizenship
                          }
                          helperText={
                            !citizenship
                              ? formik.touched.citizenship &&
                              formik.errors.citizenship
                              : "We are sorry. We do not offer loans to foreign residents."
                          }
                          select='[{ "label": "USA Citizen", "value": "USA Citizen"},
                                        {"label": "Permanent Resident","value": "Permanent Resident"},
                                        { "label": "Foreign Resident","value": "Foreign Resident"}]'
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={ 12 } sm={ 4 } container direction="row">
                      <TextField
                        name="personalIncome"
                        label="Annual Personal Income"
                        id="personalIncome"
                        value={ formik.values.personalIncome }
                        onChange={ onHandleChangePersonal }
                        materialProps={ {
                          "data-testid": "personalIncome",
                          maxLength: "10",
                        } }
                        autoComplete="off"
                        onBlur={ currencyFormat }
                        onKeyDown={ preventUnwanted }
                        error={ errorPersonal !== "" }
                        helperText={ errorPersonal !== "" ? errorPersonal : "" }
                      />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 4 } container direction="row">
                      <TextField
                        name="householdIncome"
                        label="Annual Household Income"
                        id="annualhousehold"
                        value={ formik.values.householdIncome }
                        materialProps={ {
                          "data-testid": "annualIncome",
                          maxLength: "10",
                        } }
                        autoComplete="off"
                        onChange={ onHandleChangeHouse }
                        onBlur={ currencyFormat }
                        onKeyDown={ preventUnwanted }
                        error={ errorAnnual !== "" }
                        helperText={ errorAnnual !== "" ? errorAnnual : "" }
                      />
                    </Grid>

                    <Grid
                      item
                      xs={ 12 }
                      sm={ 4 }
                      container
                      direction="row"
                      id="employementStatusWrap"
                    >
                      <Select
                        id="employementStatus"
                        name="employementStatus"
                        labelform="Employement Status"
                        value={ formik.values.employementStatus }
                        onChange={ formik.handleChange }
                        onBlur={ formik.handleBlur }
                        error={
                          formik.touched.employementStatus &&
                          Boolean(formik.errors.employementStatus)
                        }
                        helperText={
                          formik.touched.employementStatus &&
                          formik.errors.employementStatus
                        }
                        select='[{ "label": "Employed - Hourly", "value": "Employed - Hourly"},
                                        {"label": "Employed Salaried","value": "Employed Salaried"},
                                        { "label": "Self Employed / 1099","value": "Self Employed / 1099"},
                                        { "label": "Unemployed","value": "Unemployed"},
                                        { "label": "Retired","value": "Retired"}]'
                      />
                    </Grid>
                    {/* **************************************************active duty***************************************************** */ }
                    <Grid
                      item
                      xs={ 12 }
                      className={
                        formik.values.state === "North Carolina" ||
                          formik.values.state === "NC"
                          ? "showCheckbox"
                          : "hideCheckbox"
                      }
                    >
                      <p>
                        { " " }
                        <b>
                          Are you active duty military or do you have a future
                          active duty date?
                        </b>
                      </p>
                      <Grid>
                        <Select
                          name="activeDuty"
                          labelform="Active Duty *"
                          select='[{"value":"Yes"}, {"value":"No"}]'
                          value={ formik.values.activeDuty }
                          onChange={ formik.handleChange }
                          onBlur={ formik.handleBlur }
                          error={
                            formik.touched.activeDuty &&
                            Boolean(formik.errors.activeDuty)
                          }
                          helperText={
                            formik.touched.activeDuty &&
                            formik.errors.activeDuty
                          }
                          inputTestID="ADinput"
                          selectTestID="ADselect"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={ 12 }
                        className={
                          formik.values.activeDuty === "Yes"
                            ? "showCheckbox"
                            : "hideCheckbox"
                        }
                      >
                        <Select
                          name="activeDutyRank"
                          labelform="Active duty rank *"
                          select='[{"value":"E4 and below"}, {"value":"E5 and above"}]'
                          value={ formik.values.activeDutyRank }
                          onChange={ formik.handleChange }
                          onBlur={ formik.handleBlur }
                          error={
                            formik.touched.activeDutyRank &&
                            Boolean(formik.errors.activeDutyRank)
                          }
                          helperText={
                            formik.touched.activeDutyRank &&
                            formik.errors.activeDutyRank
                          }
                        />
                      </Grid>
                    </Grid>

                    {/* ****************************************************Married Statue ***************************************** */ }

                    <Grid
                      item
                      xs={ 12 }
                      className={
                        formik.values.state === "Wisconsin" ||
                          formik.values.state === "WI"
                          ? "showCheckbox"
                          : "hideCheckbox"
                      }
                    >
                      <Grid item xs={ 12 } id="marriedStatusWrap">
                        <p>
                          <b>Are you married?*</b>
                        </p>
                        <Select
                          name="martialStatus"
                          labelform="Marital Status *"
                          id="marriedStatus"
                          select='[{"value":"Married"}, {"value":"Unmarried"}, {"value":"Separated, under decree of legal separation"}]'
                          value={ formik.values.martialStatus }
                          onChange={ formik.handleChange }
                          onBlur={ formik.handleBlur }
                          error={
                            formik.touched.martialStatus &&
                            Boolean(formik.errors.martialStatus)
                          }
                          helperText={
                            formik.touched.martialStatus &&
                            formik.errors.martialStatus
                          }
                        />
                      </Grid>
                      <Grid
                        item
                        xs={ 12 }
                        className={
                          formik.values.martialStatus === "Married" ||
                            formik.values.martialStatus ===
                            "Separated, under decree of legal separation"
                            ? "showCheckbox"
                            : "hideCheckbox"
                        }
                      >
                        <TextField
                          name="spouseadd"
                          label="Spouse's Address (if different)"
                          value={ formik.values.spouseadd }
                          onChange={ formik.handleChange }
                        />
                      </Grid>
                      <Grid
                        item
                        xs={ 12 }
                        className={
                          formik.values.martialStatus === "Married" ||
                            formik.values.martialStatus ===
                            "Separated, under decree of legal separation"
                            ? "showCheckbox"
                            : "hideCheckbox"
                        }
                      >
                        <p>
                          <b>Location</b>{ " " }
                        </p>

                        <Grid container direction="row">
                          <Grid
                            item
                            xs={ 12 }
                            sm={ 4 }
                            id="spouseZipWrap"
                            className={
                              formik.values.martialStatus === "Married" ||
                                formik.values.martialStatus ===
                                "Separated, under decree of legal separation"
                                ? "showCheckbox"
                                : "hideCheckbox"
                            }
                            style={ { paddingRight: "10px" } }
                          >
                            <Zipcode
                              id="spouseZip"
                              name="spouseZipcode"
                              label="Zipcode *"
                              value={ formik.values.spouseZipcode }
                              onChange={ fetchSpouseAddress }
                              onBlur={ formik.handleBlur }
                              error={
                                (formik.touched.spouseZipcode &&
                                  Boolean(formik.errors.spouseZipcode)) ||
                                !validZip
                              }
                              helperText={
                                validZip
                                  ? formik.touched.spouseZipcode &&
                                  formik.errors.spouseZipcode
                                  : "Please enter a valid Zip code"
                              }
                            />
                          </Grid>
                          <Grid
                            item
                            xs={ 12 }
                            sm={ 4 }
                            id="spouseCityWrap"
                            style={ { paddingRight: "10px" } }
                            className={
                              formik.values.martialStatus === "Married" ||
                                formik.values.martialStatus ===
                                "Separated, under decree of legal separation"
                                ? "showCheckbox"
                                : "hideCheckbox"
                            }
                          >
                            <TextField
                              name="spousecity"
                              label="City"
                              id="spouseCity"
                              value={ formik.values.spousecity }
                              onChange={ formik.handleChange }
                              onBlur={ formik.handleBlur }
                              disabled={ true }
                              error={
                                formik.touched.spousecity &&
                                Boolean(formik.errors.spousecity)
                              }
                              helperText={
                                formik.touched.spousecity &&
                                formik.errors.spousecity
                              }
                            />
                          </Grid>

                          <Grid
                            item
                            xs={ 12 }
                            sm={ 4 }
                            id="spouseStateWrap"
                            className={
                              formik.values.martialStatus === "Married" ||
                                formik.values.martialStatus ===
                                "Separated, under decree of legal separation"
                                ? "showCheckbox"
                                : "hideCheckbox"
                            }
                          >
                            <TextField
                              name="spouseSelectState"
                              id="spouseState"
                              label="State"
                              value={ formik.values.spouseSelectState }
                              onChange={ formik.handleChange }
                              onBlur={ formik.handleBlur }
                              disabled={ true }
                              error={
                                formik.touched.spouseSelectState &&
                                Boolean(formik.errors.spouseSelectState)
                              }
                              helperText={
                                formik.touched.spouseSelectState &&
                                formik.errors.spouseSelectState
                              }
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* **********************************************Disclosures******************************************************** */ }
                    <Grid item xs={ 12 }>
                      <p>
                        <b>Please acknowledge and sign our disclosures.</b>
                      </p>
                      <Checkbox
                        name="termsOfService"
                        labelform="Terms & Service"
                        value={ agree }
                        onChange={ (event) => {
                          setAgree(event.target.checked);
                        } }
                        label={
                          <p className="agreeCheckbox">
                            By clicking this box you acknowledge that you have
                            received, reviewed and agree to the
                            <a
                              className="formatHref"
                              href={
                                "https://loans.marinerfinance.com/application/form"
                              }
                              target="_blank"
                              rel="noreferrer noopener"
                            >
                              { " " }
                              E-Signature Disclosure and Consent,{ " " }
                            </a>
                            <a
                              className="formatHref"
                              href={
                                "https://loans.marinerfinance.com/application/form"
                              }
                              target="_blank"
                              rel="noreferrer noopener"
                            >
                              Credit and Contact Authorization,{ " " }
                            </a>
                            <a
                              className="formatHref"
                              href={
                                "https://loans.marinerfinance.com/application/form"
                              }
                              target="_blank"
                              rel="noreferrer noopener"
                            >
                              Website Terms of Use,{ " " }
                            </a>
                            <a
                              className="formatHref"
                              href={
                                "https://loans.marinerfinance.com/application/form"
                              }
                              target="_blank"
                              rel="noreferrer noopener"
                            >
                              Website Privacy Statement.
                            </a>
                          </p>
                        }
                        required={ true }
                        stylelabelform='{ "color":"" }'
                        stylecheckbox='{ "color":"blue"}'
                        stylecheckboxlabel='{ "color":"" }'
                      />
                      <div
                        className={
                          formik.values.state === "Delaware" ||
                            formik.values.state === "DE"
                            ? "showCheckbox"
                            : "hideCheckbox"
                        }
                      >
                        <Checkbox
                          name="delaware"
                          labelform="delaware"
                          value={ agreeDelaware }
                          onChange={ (event) => {
                            setAgreeDelaware(event.target.checked);
                          } }
                          label={
                            <p className="agreeCheckbox">
                              By clicking this box you acknowledge that you have
                              received and reviewed the{ " " }
                              <span
                                className="formatHref"
                                onClick={ handleClickDelawareOpen }
                              >
                                Delaware Itemized Schedule Of Charges.{ " " }
                              </span>
                            </p>
                          }
                          stylelabelform='{ "color":"" }'
                          stylecheckbox='{ "color":"blue" }'
                          stylecheckboxlabel='{ "color":"" }'
                        />
                      </div>
                      <div
                        className={
                          formik.values.state === "California" ||
                            formik.values.state === "CA"
                            ? "showCheckbox"
                            : "hideCheckbox"
                        }
                      >
                        <Checkbox
                          name="california"
                          labelform="california"
                          value={ agreeCalifornia }
                          onChange={ (event) => {
                            setAgreeCalifornia(event.target.checked);
                          } }
                          label={
                            <p className="agreeCheckbox">
                              By clicking this box you acknowledge that you have
                              been offered and had the opportunity to review
                              this{ " " }
                              <a
                                className="formatHref"
                                href={
                                  "https://lms.moneyskill.org/yourcreditrating/module/mariner/en"
                                }
                                target="_blank"
                                rel="noreferrer noopener"
                              >
                                Credit Education Program
                              </a>
                            </p>
                          }
                          stylelabelform='{ "color":"" }'
                          stylecheckbox='{ "color":"blue" }'
                          stylecheckboxlabel='{ "color":"" }'
                        />
                      </div>
                      <div
                        className={
                          formik.values.state === "New Mexico" ||
                            formik.values.state === "NM"
                            ? "showCheckbox"
                            : "hideCheckbox"
                        }
                      >
                        <Checkbox
                          name="newmexico"
                          labelform="newmexico"
                          value={ agreeNewMexico }
                          onChange={ (event) => {
                            setAgreeNewMexico(event.target.checked);
                          } }
                          label={
                            <p className="agreeCheckbox">
                              NM Residents: By clicking this box you acknowledge
                              that you have reviewed the Important Consumer
                              Information in Mariner’s New Mexico Consumer
                              Brochure located at{ " " }
                              <a
                                className="formatHref"
                                href={ "http://marfi.me/NMBrochure." }
                                target="_blank"
                                rel="noreferrer noopener"
                              >
                                http://marfi.me/NMBrochure
                              </a>
                            </p>
                          }
                          stylelabelform='{ "color":"" }'
                          stylecheckbox='{ "color":"blue" }'
                          stylecheckboxlabel='{ "color":"" }'
                        />
                      </div>
                    </Grid>

                    <Grid item xs={ 12 } className={ classes.signInButtonGrid }>
                      <ButtonPrimary
                        type="submit"
                        data-testid="submit"
                        stylebutton='{"background": "","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
                        disabled={
                          formik.values.citizenship === "Foreign Resident"
                            ? true
                            : loading
                        }
                        onClick={ () => autoFocus() }
                      >
                        Continue
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
        onClose={ handleClose }
        aria-labelledby="customized-dialog-title"
        open={ open }
      >
        <DialogTitle id="customized-dialog-title" onClose={ handleClose }>
          Notice to CA Residents
        </DialogTitle>
        <DialogContent dividers>
          <Typography align="justify" gutterBottom>
            If you are married, you may apply for a separate account.
          </Typography>
        </DialogContent>
        <DialogActions className="modalAction">
          <ButtonPrimary
            stylebutton='{"background": "#FFBC23", "color": "black", "border-radius": "50px"}'
            onClick={ handleClose }
            className="modalButton"
          >
            <Typography align="center">Ok</Typography>
          </ButtonPrimary>
        </DialogActions>
      </Dialog>

      <Dialog
        onClose={ handleCloseOhio }
        aria-labelledby="customized-dialog-title"
        open={ openOhio }
      >
        <DialogTitle id="customized-dialog-title" onClose={ handleCloseOhio }>
          Notice to OH Residents
        </DialogTitle>
        <DialogContent dividers>
          <Typography align="justify" gutterBottom>
            The Ohio laws against discrimination require that all creditors make
            credit equally available to all credit worthy customers, and that
            credit reporting agencies maintain separate credit histories on each
            individual upon request. The Ohio civil rights commission
            administers compliance with this law.
          </Typography>
        </DialogContent>
        <DialogActions className="modalAction">
          <ButtonPrimary
            stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px"}'
            onClick={ handleCloseOhio }
            className="modalButton"
          >
            <Typography align="center">Ok</Typography>
          </ButtonPrimary>
        </DialogActions>
      </Dialog>

      <Dialog
        onClose={ handleDelawareClose }
        aria-labelledby="customized-dialog-title"
        open={ openDelaware }
      >
        <DialogTitle id="customized-dialog-title" onClose={ handleDelawareClose }>
          Delware Itemized Shedule of Charges
        </DialogTitle>
        <DialogContent dividers>
          <Typography align="center" className="textCSS modalText">
            { " " }
            Itemized Schedule of Charges (DE){ " " }
          </Typography>
          <Typography align="center" className="textCSS modalText">
            { " " }
            Closed End Loans{ " " }
          </Typography>
          <TableContainer component={ Paper }>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className="tableHeader">
                    Description
                  </TableCell>
                  <TableCell align="center" className="tableHeader">
                    Fee
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center"> Periodic Interest </TableCell>
                  <TableCell align="center">0.00% - 36.00%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    { " " }
                    Recording/Satisfaction Fee{ " " }
                  </TableCell>
                  <TableCell align="center">$23 - 151</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"> Legal Fee </TableCell>
                  <TableCell align="center">Actual cost Incurred</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"> Repossession Fee </TableCell>
                  <TableCell align="center">Actual cost Incurred</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"> Late Fee </TableCell>
                  <TableCell align="center">5% of Unpaid Installment</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"> Bad Check Fee </TableCell>
                  <TableCell align="center">$15</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"> Check by Phone Fee </TableCell>
                  <TableCell align="center">$6</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"> Internet Payment Fee </TableCell>
                  <TableCell align="center">$2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    { " " }
                    Loan by Mail Commitment Fee{ " " }
                  </TableCell>
                  <TableCell align="center">$10</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"> Refinancing Fee </TableCell>
                  <TableCell align="center">$150</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center"> Non-Filing Insurance </TableCell>
                  <TableCell align="center">$25</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions className="modalAction">
          <ButtonPrimary
            stylebutton='{"background": "#FFBC23", "color": "black", "border-radius": "50px"}'
            onClick={ handleDelawareClose }
            className="modalButton"
          >
            <Typography align="center">Ok</Typography>
          </ButtonPrimary>
        </DialogActions>
      </Dialog>
    </div>
  );
}