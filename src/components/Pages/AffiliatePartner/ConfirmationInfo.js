import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import globalMessages from "../../../assets/data/globalMessages.json";
import states from '../../../assets/data/States.json';
import creditkarmalogo from "../../../assets/images/ck_logo.png";
import { partnerConfirmInfo } from "../../Controllers/PartnerSignupController";
import ZipCodeLookup from "../../Controllers/ZipCodeLookup";
import { ButtonPrimary, Checkbox, Popup, RenderContent, Select, TextField, Zipcode } from "../../FormsUI";
import ErrorLogger from "../../lib/ErrorLogger";
import "./Style.css";
import {useStylesPartner} from "./style"

//Yup validations for all the input fields
const validationSchema = yup.object({
  firstName: yup
    .string(globalMessages?.FirstNameEnter)
    .trim()
    .max(30, globalMessages?.FirstNameMax)
    .matches(/^(?!\s+$).*/g, globalMessages?.No_Backspace_Only)
    .required(globalMessages?.FirstNameRequired),
  lastName: yup
    .string(globalMessages?.LastNameEnter)
    .trim()
    .max(30, globalMessages?.LastNameMax)
    .matches(/^(?!\s+$).*/g, globalMessages?.No_Backspace_Only)
    .required(globalMessages?.LastNameRequired),
  streetAddress: yup
    .string(globalMessages?.Address_Street)
    .trim()
    .max(100, globalMessages?.Address_Street_Max)
    .matches(/^(?!\s+$).*/g, globalMessages?.No_Backspace_Only)
    .required(globalMessages?.Address_Street_Required),
  city: yup
    .string(globalMessages?.Address_City)
    .max(30, globalMessages?.Address_City_Max)
    .required(globalMessages?.Address_Home_City),
  state: yup
    .string(globalMessages?.Address_State)
    .max(30, globalMessages?.Address_State_Max)
    .required(globalMessages?.Address_State_Required),
  zip: yup
    .string(globalMessages?.ZipCodeEnter)
    .min(5, globalMessages?.ZipCodeMax)
    .required(globalMessages?.ZipCodeRequired),
  citizenship: yup
    .string(globalMessages?.CitizenshipEnter)
    .max(30, globalMessages?.CitizenshipMax)
    .required(globalMessages?.CitizenshipRequired),
  employementStatus: yup
    .string(globalMessages?.EmploymentEnter)
    .max(30, globalMessages?.EmploymentMax)
    .required(globalMessages?.EmploymentRequired),
  activeDuty: yup.string().when("state", {
    is: "NC",
    then: yup.string().required(globalMessages?.Active_DutyRequired),
  }),
  activeDutyRank: yup.string().when("activeDuty", {
    is: "Yes",
    then: yup.string().required(globalMessages?.Active_Duty_Rank_Required),
  }),
  martialStatus: yup.string().when("state", {
    is: "Wisconsin",
    then: yup.string().required(globalMessages?.Marital_Status_Required),
  }),
  spouseadd: yup
    .string()
    .when("martialStatus", {
      is: "Married",
      then: yup
        .string()
        .trim()
        .max(100, globalMessages?.Marital_Status_Max)
        .matches(/^(?!\s+$).*/g, globalMessages?.No_Backspace_Only),
    })
    .when("martialStatus", {
      is: "Separated, under decree of legal separation",
      then: yup
        .string()
        .trim()
        .max(100, globalMessages?.Marital_Status_Max)
        .matches(/^(?!\s+$).*/g, globalMessages?.No_Backspace_Only),
    }),
  spouseZipcode: yup
    .string()
    .when("martialStatus", {
      is: "Married",
      then: yup.string().required(globalMessages?.ZipCodeRequired),
    })
    .when("martialStatus", {
      is: "Separated, under decree of legal separation",
      then: yup.string().required(globalMessages?.ZipCodeRequired),
    }),
  spousecity: yup
    .string()
    .when("martialStatus", {
      is: "Married",
      then: yup
        .string()
        .required(globalMessages?.Address_Home_City),
    })
    .when("martialStatus", {
      is: "Separated, under decree of legal separation",
      then: yup
        .string()
        .required(globalMessages?.Address_Home_City),
    }),
  spouseSelectState: yup
    .string()
    .when("martialStatus", {
      is: "Married",
      then: yup.string().required(globalMessages?.Address_State_Required),
    })
    .when("martialStatus", {
      is: "Separated, under decree of legal separation",
      then: yup.string().required(globalMessages?.Address_State_Required),
    }),
});

//Begin: Login page
export default function CreditKarma() {
  const classes = useStylesPartner();
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
  const navigate = useNavigate();
  const [ esignPopup, setEsignPopup ] = useState(false);
  const [ creditPopup, setCreditPopup ] = useState(false);
  const [ webTOUPopup, setWebTOUPopup ] = useState(false);
  const [ privacyPopup, setPrivacyPopup ] = useState(false);
  const refFirstName = useRef();
  const refLastName = useRef();
  const refStreetAddress = useRef();
  const refZip = useRef();
  const refCitizenship = useRef();
  const refPersonalIncome = useRef();
  const refEmployementStatus = useRef();
  const refAnnualHousehold = useRef();
  let location = useLocation();
  const handleOnClickEsign = () => setEsignPopup(true);
  const handleOnClickEsignClose = () => setEsignPopup(false);
  const handleOnClickCredit = () => setCreditPopup(true);
  const handleOnClickCreditClose = () => setCreditPopup(false);
  const handleOnClickwebTOU = () => setWebTOUPopup(true);
  const handleOnClickwebTOUClose = () => setWebTOUPopup(false);
  const handleOnClickPrivacy = () => setPrivacyPopup(true);
  const handleOnClickPrivacyClose = () => setPrivacyPopup(false);
  
  const validate = (personal, household) => {
    let returnValue = false;
    if (!isNaN(personal) && !isNaN(household)) {
      if (personal <= household) {
        setErrorAnnual("");
        setErrorPersonal("");
        returnValue = true;
      } else {
        setErrorAnnual(globalMessages.Annual_Household_Equal_Personal);
      }
    } else {
      setErrorPersonal(isNaN(personal) ? globalMessages.Annual_Personal_Income_Required : "");
      setErrorAnnual(isNaN(household) ? globalMessages.Annual_Household_Income_Required : "");
    }
    return returnValue;
  };
  const autoFocus = () => {
    let firstName = refFirstName.current.value;
    let lastName = refLastName.current.value;
    let streetAddress = refStreetAddress.current.value;
    let zip = refZip.current.value;
    let citizenshipCnf = refCitizenship.current.value;
    let personalIncome = refPersonalIncome.current.value;
    let employementStatus = refEmployementStatus.current.value;
    let annualHousehold = refAnnualHousehold.current.value;

    if (!firstName) {
      refFirstName.current.focus();
    } else if (!lastName) {
      refLastName.current.focus();
    } else if (!streetAddress) {
      refStreetAddress.current.focus();
    } else if (!zip) {
      refZip.current.focus();
    } else if (!citizenshipCnf) {
      refCitizenship.current.focus();
    } else if (!employementStatus) {
      refEmployementStatus.current.focus();
    } else if (!personalIncome) {
      refPersonalIncome.current.focus();
      validate();
    } else if (!annualHousehold) {
      validate();
      refAnnualHousehold.current.focus();
    } else {
      return false;
    }
  };
  //Form Submission
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: location?.state?.first_name ?? "",
      lastName: location?.state?.last_name ?? "",
      streetAddress: location?.state?.address_street ?? "",
      city: location?.state?.address_city ?? "",
      state: location?.state?.address_state ? states[ location.state.address_state ] : "",
      zip: location?.state?.address_postal_code ?? "",
      citizenship: location?.state?.citizenship ?? "",
      personalIncome: location?.state?.annual_income
        ? "$" +
        parseFloat(location.state.annual_income)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
          .slice(0, -3)
        : "",
      householdIncome: location?.state?.household_annual_income
        ? "$" +
        parseFloat(location.state.household_annual_income)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
          .slice(0, -3)
        : "",
      employementStatus: location?.state?.employment_status ?? "",
      activeDuty: location?.state?.active_duty ?? "",
      activeDutyRank: location?.state?.active_duty_rank ?? "",
      militaryStatus: location?.state?.military_status ?? "",
      martialStatus: location?.state?.marital_status ?? "",
      spouseadd: location?.state?.spouse_address_street ?? "",
      spouseZipcode: location?.state?.spouse_address_postal_code ?? "",
      spousecity: location?.state?.spouse_address_city ?? "",
      spouseSelectState: location?.state?.spouse_address_state ? states[ location.state.spouse_address_state ] : "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const modPersonalIncome = parseInt(values.personalIncome.replace(/\$/g, "").replace(/,/g, ""));
      const modHouseholdIncome = parseInt(values.householdIncome.replace(/\$/g, "").replace(/,/g, ""));
      if (!errorPersonal && !errorAnnual && validate(modPersonalIncome, modHouseholdIncome)) {
        values.personalIncome = modPersonalIncome;
        values.householdIncome = modHouseholdIncome;
        setLoading(true);
        let confirmInfoData = {
          firstName: values.firstname,
          lastName: values.lastname,
          streetAddress: values.streetAddress,
          city: values.city,
          state: Object.keys(states).find(key => states[ key ] === values.state),
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
          spouseSelectState: Object.keys(states).find(key => states[ key ] === values.spouseSelectState),
          partner_token: location?.state?.partner_token ?? "",
          email: location?.state?.email ?? "",
        };

        let partnerConfirmRes = await partnerConfirmInfo(confirmInfoData, navigate);
        if (partnerConfirmRes.status !== 200) {
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
      let eventValue = event.target.value.trim();
      setErrorMsg(eventValue ? errorMsg : globalMessages.ZipCodeEnter);
      if (eventValue?.length === 5) {
        let result = await ZipCodeLookup(eventValue);
        if (result) {
          fetchAddressValidate(result);
        } else {
          formik.setFieldValue("city", "");
          formik.setFieldValue("state", "");
          setValidZip(false);
          setErrorMsg(globalMessages.ZipCodeValid);
        }
      }
      if (event.target.name.trim()) {
        formik.handleChange(event);
      }
    } catch (error) {
      ErrorLogger("Error from fetchAddress.", error);
    }
  };

  function fetchAddressValidate(result) {
    try {
      if (result.data) {
        formik.setFieldValue("city", result?.data?.cityName);
        formik.setFieldValue("state", result?.data?.stateCode);
        setValidZip(true);
        if (result?.data?.stateCode === "CA") {
          handleClickOpen();
        }
        if (result?.data?.stateCode === "OH") {
          handleClickOpenOhio();
        }
      } else {
        formik.setFieldValue("city", "");
        formik.setFieldValue("state", "");
        setValidZip(false);
        setErrorMsg("Please enter a valid Zipcode");
      }
    } catch (error) {
      ErrorLogger("Error from fetchAddressValidate.", error);
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
      ErrorLogger("Error from fetchSpouseAddress.",);
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
    let income = event.target.value;
    if (!income || reg.test(income)) {
      setErrorPersonal("");
      formik.handleChange(event);
    }
  };
  const onHandleChangeHouse = (event) => {
    const reg = /^[0-9.,$\b]+$/;
    let income = event.target.value;
    if (!income || reg.test(income)) {
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
      const income = event.target.value
        .replace(/\$/g, "")
        .replace(/,/g, "")
        .substr(0, 7);
      const formated = parseFloat(income);
      const forCur = "$" + formated.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      formik.setFieldValue(event.target.name, forCur.slice(0, -3));
      const modPersonalIncome = parseInt(formik.values.personalIncome.replace(/\$/g, "").replace(/,/g, ""));
      const modHouseholdIncome = parseInt(formik.values.householdIncome.replace(/\$/g, "").replace(/,/g, ""));
      if (isNaN(modPersonalIncome)) {
        setErrorPersonal(globalMessages.Annual_Personal_Income_Required);
      } else {
        if (income.length < 4) {
          setErrorPersonal(globalMessages.Annual_Personal_Income_4_digits);
          return false;
        }
        if (!isNaN(modPersonalIncome) && !isNaN(modHouseholdIncome)) {
          if (modPersonalIncome <= modHouseholdIncome) {
            setErrorAnnual("");
            setErrorPersonal("");
            return true;
          } else {
            setErrorAnnual(globalMessages.Annual_Household_Equal_Personal);
            return false;
          }
        }
      }
    } else if (inputName === "householdIncome") {
      const income = event.target.value
        .replace(/\$/g, "")
        .replace(/,/g, "")
        .substr(0, 7);
      const formated = parseFloat(income);
      const forCur = "$" + formated.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      formik.setFieldValue(event.target.name, forCur.slice(0, -3));
      const modPersonalIncome = parseInt(formik.values.personalIncome.replace(/\$/g, "").replace(/,/g, ""));
      const modHouseholdIncome = parseInt(formik.values.householdIncome.replace(/\$/g, "").replace(/,/g, ""));
      if (isNaN(modHouseholdIncome)) {
        setErrorAnnual(globalMessages.Annual_Household_Income_Required);
      } else {
        if (income.length < 4) {
          setErrorAnnual(globalMessages.Annual_Household_Income_4_digits);
          return false;
        }
        const perval = document
          .getElementById("personalIncome")
          .value.replace(/\$/g, "")
          .replace(/,/g, "")
          .substr(0, 7);
        if (perval.length < 4) {
          setErrorPersonal(globalMessages.Annual_Personal_Income_4_digits);
          return false;
        }
        if (!isNaN(modPersonalIncome) && !isNaN(modHouseholdIncome)) {
          if (modPersonalIncome <= modHouseholdIncome) {
            setErrorAnnual("");
            setErrorPersonal("");
            return true;
          } else {
            setErrorAnnual(globalMessages.Annual_Household_Equal_Personal);
            return false;
          }
        }
      }
    }
  };
  const onNameChange = (event) => {
    const reg = /^([a-zA-Z]+[.]?[ ]?|[a-z]+['-]?)+$/;
    let acc = event.target.value;
    if (!acc || reg.test(acc)) {
      formik.handleChange(event);
    }
  };
  const changeCitizenship = (event) => {
    let citizenshipValue = event.target.value;
    if (citizenshipValue === "Foreign Resident") {
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
            className={classes.confirmationGrid}
            xs={ 12 }
            item
          >
            <Grid
              xs={ 11 }
              sm={ 10 }
              md={ 6 }
              lg={ 6 }
              xl={ 6 }
              className="confirmationCard"
              item
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
                <p className={classes.introText}>
                  Please review and confirm the information that{ " " }
                  <a href="https://www.creditkarma.com/" target="blank">
                    { " " }
                    <img
                      className="creditkarmaLogoImage"
                      src={ creditkarmalogo }
                      alt="creditkarmalogo"
                    />
                  </a>{ " " }
                  provided about you, it will only take a minute.
                </p>
                {/* </div> */ }

                <form onSubmit={ formik.handleSubmit }>
                  <Grid container spacing={ 4 }>
                    <Grid item xs={ 12 } sm={ 6 } className={classes.fullWidth} >
                      <TextField
                        id="firstName"
                        name="firstName"
                        ref={ refFirstName }
                        label="First Name"
                        materialProps={ {
                          "data-test-id": "name",
                          maxLength: "30",
                        } }
                        value={ formik.values.firstName }
                        onChange={ onNameChange }
                        onBlur={ formik.handleBlur }
                        error={ formik.touched.firstName && Boolean(formik.errors.firstName) }
                        helperText={ formik.touched.firstName && formik.errors.firstName }
                      />
                    </Grid>

                    <Grid item xs={ 12 } sm={ 6 } className={classes.fullWidth}>
                      <TextField
                        id="lastName"
                        name="lastName"
                        ref={ refLastName }
                        label="Last Name"
                        materialProps={ {
                          "data-test-id": "lastName",
                          maxLength: "30",
                        } }
                        value={ formik.values.lastName }
                        onChange={ onNameChange }
                        onBlur={ formik.handleBlur }
                        error={ formik.touched.lastName && Boolean(formik.errors.lastName) }
                        helperText={ formik.touched.lastName && formik.errors.lastName }
                      />
                    </Grid>

                    <Grid item xs={ 12 }>
                      <TextField
                        fullWidth
                        id="streetAddress"
                        name="streetAddress"
                        ref={ refStreetAddress }
                        label="Address"
                        materialProps={ {
                          "data-test-id": "streetAddress",
                          maxLength: "100",
                        } }
                        value={ formik.values.streetAddress }
                        onChange={ formik.handleChange }
                        onBlur={ onBlurAddress }
                        error={ formik.touched.streetAddress && Boolean(formik.errors.streetAddress) }
                        helperText={ formik.touched.streetAddress && formik.errors.streetAddress }
                      />
                    </Grid>

                    <Grid item xs={ 12 } sm={ 4 } container direction="row">
                      <Zipcode
                        fullWidth
                        id="zip"
                        name="zip"
                        ref={ refZip }
                        label="Zip Code *"
                        materialProps={ { "data-test-id": "zipcode" } }
                        value={ formik.values.zip }
                        onChange={ fetchAddress }
                        onBlur={ formik.handleBlur }
                        error={ (formik.touched.zip && Boolean(formik.errors.zip)) || !validZip }
                        helperText={ validZip ? formik.touched.zip && formik.errors.zip : globalMessages.ZipCodeValid }
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
                        error={ formik.touched.city && Boolean(formik.errors.city) }
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
                        error={ formik.touched.state && Boolean(formik.errors.state) }
                        helperText={ formik.touched.state && formik.errors.state }
                      />
                    </Grid>

                    <Grid item xs={ 12 }>
                      <Grid
                        item
                        xs={ 12 }
                        id="citizenshipWrap"
                      >
                        <Select
                          id="citizenship"
                          name="citizenship"
                          ref={ refCitizenship }
                          labelform="Citizenship"
                          value={ formik.values.citizenship }
                          onChange={ changeCitizenship }
                          onBlur={ formik.handleBlur }
                          error={ (formik.touched.citizenship && Boolean(formik.errors.citizenship)) || citizenship }
                          helperText={ !citizenship ? formik.touched.citizenship && formik.errors.citizenship : "We are sorry. We do not offer loans to foreign residents." }
                          select='[{"label": "USA Citizen", "value": "USA Citizen"},
                                  {"label": "Permanent Resident", "value": "Permanent Resident"},
                                  {"label": "Foreign Resident", "value": "Foreign Resident"}]'
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={ 12 } sm={ 4 } container direction="row">
                      <TextField
                        name="personalIncome"
                        ref={ refPersonalIncome }
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
                        helperText={ errorPersonal ?? "" }
                      />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 4 } container direction="row">
                      <TextField
                        name="householdIncome"
                        ref={ refAnnualHousehold }
                        label="Annual Household Income"
                        id="annualHousehold"
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
                        helperText={ errorAnnual ??  "" }
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
                        ref={ refEmployementStatus }
                        labelform="Employement Status"
                        value={ formik.values.employementStatus }
                        onChange={ formik.handleChange }
                        onBlur={ formik.handleBlur }
                        error={ formik.touched.employementStatus && Boolean(formik.errors.employementStatus) }
                        helperText={ formik.touched.employementStatus && formik.errors.employementStatus }
                        select='[{"label": "Employed - Hourly", "value": "Employed - Hourly"},
                                {"label": "Employed Salaried", "value": "Employed Salaried"},
                                {"label": "Self Employed / 1099", "value": "Self Employed / 1099"},
                                {"label": "Unemployed", "value": "Unemployed"},
                                {"label": "Retired", "value": "Retired"}]'
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
                          error={ formik.touched.activeDuty && Boolean(formik.errors.activeDuty) }
                          helperText={ formik.touched.activeDuty && formik.errors.activeDuty }
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
                          error={ formik.touched.activeDutyRank && Boolean(formik.errors.activeDutyRank) }
                          helperText={ formik.touched.activeDutyRank && formik.errors.activeDutyRank }
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
                          error={ formik.touched.martialStatus && Boolean(formik.errors.martialStatus) }
                          helperText={ formik.touched.martialStatus && formik.errors.martialStatus }
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
                          >
                            <Zipcode
                              id="spouseZip"
                              name="spouseZipcode"
                              label="Zipcode *"
                              value={ formik.values.spouseZipcode }
                              onChange={ fetchSpouseAddress }
                              onBlur={ formik.handleBlur }
                              error={ (formik.touched.spouseZipcode && Boolean(formik.errors.spouseZipcode)) || !validZip }
                              helperText={ validZip ? formik.touched.spouseZipcode && formik.errors.spouseZipcode : "Please enter a valid Zip code" }
                            />
                          </Grid>
                          <Grid
                            item
                            xs={ 12 }
                            sm={ 4 }
                            id="spouseCityWrap"
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
                            received, reviewed and agree to the { "" }
                            <span className="formatHref" onClick={ () => { handleOnClickEsign(); } }>E-Signature Disclosure and Consent,</span>
                            { "" } <span className="formatHref" onClick={ () => { handleOnClickCredit(); } }>Credit and Contact Authorization,</span>
                            { "" } <span className="formatHref" onClick={ () => { handleOnClickwebTOU(); } }>Website Terms of Use,</span>
                            { "" } <span className="formatHref" onClick={ () => { handleOnClickPrivacy(); } }>Website Privacy Statement.</span>
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

      <Popup popupFlag={ esignPopup } closePopup={ handleOnClickEsignClose }>
        <RenderContent disclosureLink="/eSign" />
      </Popup>
      <Popup popupFlag={ creditPopup } closePopup={ handleOnClickCreditClose }>
        <RenderContent disclosureLink="/credit" />
      </Popup>
      <Popup popupFlag={ webTOUPopup } closePopup={ handleOnClickwebTOUClose }>
        <RenderContent disclosureLink="/websiteTermsOfUse" />
      </Popup>
      <Popup popupFlag={ privacyPopup } closePopup={ handleOnClickPrivacyClose }>
        <RenderContent disclosureLink="/privacy" />
      </Popup>
      <Popup popupFlag={ openDelaware } closePopup={ handleDelawareClose }>
        <RenderContent disclosureLink="/delaware" />
      </Popup>

    </div>
  );
}

CreditKarma.propTypes = {
  location: PropTypes.object,
};
