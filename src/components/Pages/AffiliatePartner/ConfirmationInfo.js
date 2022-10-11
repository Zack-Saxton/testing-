import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useQuery } from 'react-query';
import PropTypes from "prop-types";
import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import globalMessages from "../../../assets/data/globalMessages.json";
import states from '../../../assets/data/States.json';
import { validStates } from "../../../assets/data/constants";
import creditkarmalogo from "../../../assets/images/ck_logo.png";
import { partnerConfirmInfo, getCreditKarmaData } from "../../Controllers/PartnerSignupController";
import usrAccountDetails from "../../Controllers/AccountOverviewController";
import ZipCodeLookup from "../../Controllers/ZipCodeLookup";
import { ButtonPrimary, Checkbox, Select, TextField, Zipcode } from "../../FormsUI";
import ErrorLogger from "../../lib/ErrorLogger";
import { useStylesPartner } from "./style";
import "./Style.css";
import {OhioUser, CaUser, EsignPartner,CreditPartner,WebTermsPartner,PrivacyPartner,DelawareTerms} from "./PartnerTerms"

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
    is: "North Carolina",
    then: yup.string().required(globalMessages?.Active_DutyRequired),
  })
    .when("state", {
      is: "NC",
      then: yup.string().required(globalMessages?.Active_DutyRequired),
    }
    ),
  activeDutyRank: yup.string().when("activeDuty", {
    is: "Yes",
    then: yup.string().required(globalMessages?.Active_Duty_Rank_Required),
  }),
  martialStatus: yup.string().when("state", {
    is: "Wisconsin",
    then: yup.string().required(globalMessages?.Marital_Status_Required),
  }).when("state", {
    is: "WI",
    then: yup.string().required(globalMessages?.Marital_Status_Required),
  }
  ),
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
      is: globalMessages.MaritalStatusLegal,
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
      is: globalMessages.MaritalStatusLegal,
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
      is: globalMessages.MaritalStatusLegal,
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
      is: globalMessages.MaritalStatusLegal,
      then: yup.string().required(globalMessages?.Address_State_Required),
    }),
});

//Begin: Login page
export default function ConfirmationInfo() {
  const classes = useStylesPartner();
  const [ loading, setLoading ] = useState(false);
  const [ validZip, setValidZip ] = useState(true);
  const [ validSpouseZip, setValidSpouseZip ] = useState(true);
  const [ errorMsg, setErrorMsg ] = useState("");
  const [ openCA, setOpenCA ] = useState(false);
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
  const [ creditKarmaData, setCreditKarmaData ] = useState();
  const [ zipData, setZipData ] = useState();
  let location = useLocation();
  const handleOnClickEsign = () => setEsignPopup(true);
  const handleOnClickCredit = () => setCreditPopup(true);
  const handleOnClickwebTOU = () => setWebTOUPopup(true);
  const handleOnClickPrivacy = () => setPrivacyPopup(true);
  const { refetch } = useQuery('loan-data', usrAccountDetails);

  const getCreditKarmaDetails = async () => {
    let CK_Data = await getCreditKarmaData();
    setCreditKarmaData(CK_Data);
    let addressFromZip = await ZipCodeLookup(CK_Data?.data?.zipCode);
    setZipData(addressFromZip);

  }
  useEffect(() => {
		if (!location?.state?.partnerSignupData?.applicant?.contact?.first_name || !location?.state?.partnerSignupData?.applicant?.contact?.last_name) {
			navigate("/login");
		}
    else{
      getCreditKarmaDetails();
    }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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

  let refFirstName = useRef();
  let refLastName = useRef();
  let refStreetAddress = useRef();
  let refZip = useRef();
  let refCitizenship = useRef();
  let refPersonalIncome = useRef();
  let refEmployementStatus = useRef();
  let refAnnualHousehold = useRef();


  const autoFocus = () => {
    if (!refFirstName.current.value) {
      refFirstName.current.focus();
    } else if (!refLastName.current.value) {
      refLastName.current.focus();
    } else if (!refStreetAddress.current.value) {
      refStreetAddress.current.focus();
    } else if (!refZip.current.value) {
      refZip.current.focus();
    } else if (!refCitizenship.current.value) {
      refCitizenship.current.focus();
    } else if (!refPersonalIncome.current.value) {
      refPersonalIncome.current.focus();
      validate();
    } else if (!refEmployementStatus.current.value) {
      refEmployementStatus.current.focus();
    } else if (!refAnnualHousehold.current.value) {
      refAnnualHousehold.current.focus();
      validate();
    } else {
      return false;
    }
  };

  const selectCitizenship = [{"label": "USA Citizen", "value": "USA Citizen"},
                            {"label": "Permanent Resident", "value": "Permanent Resident"},
                            {"label": "Foreign Resident", "value": "Foreign Resident"}];

const selectEmploymentStatus =[{"label": "Employed - Hourly", "value": "Employed Hourly"},
                                {"label": "Employed Salaried", "value": "Employed Salaried"},
                                {"label": "Self Employed / 1099", "value": "Self-Employed"},
                                {"label": "Unemployed", "value": "Unemployed"},
                                {"label": "Retired", "value": "Retired"}];

  const legalMaritalStatus =  "Separated, under decree of legal separation"
  //Form Submission
  const parseCurrencyFormat = (currencyVal) => {
    return ("$" + parseFloat(currencyVal)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
          .slice(0, -3))
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: location?.state?.partnerSignupData?.applicant?.contact.first_name ?? creditKarmaData?.data?.firstName ?? "",
      lastName: location?.state?.partnerSignupData?.applicant?.contact.last_name ?? creditKarmaData?.data?.lastName ?? "",
      streetAddress: location?.state?.partnerSignupData?.applicant?.contact.address_street ?? creditKarmaData?.data?.state ?? "",
      city: location?.state?.partnerSignupData?.applicant?.contact.address_city ?? zipData?.data?.cityName ?? "",
      state: location?.state?.partnerSignupData?.applicant?.contact.address_state ?? zipData?.data?.stateCode ?? "",
      zip: location?.state?.partnerSignupData?.applicant?.contact.address_postal_code ?? creditKarmaData?.data?.zipCode ?? "" ,
      citizenship: location?.state?.partnerSignupData?.applicant.self_reported?.citizenship ?? creditKarmaData?.data?.citizenship ?? "",
      personalIncome: location?.state?.partnerSignupData?.applicant.self_reported?.annual_income
        ? parseCurrencyFormat(location?.state?.partnerSignupData?.applicant.self_reported?.annual_income)
        : ( creditKarmaData?.data?.annual_income ? parseCurrencyFormat(creditKarmaData?.data?.annual_income) : "" ),
      householdIncome: location?.state?.partnerSignupData?.applicant.self_reported?.household_annual_income
        ? parseCurrencyFormat(location?.state?.partnerSignupData?.applicant.self_reported?.household_annual_income)
        : ( creditKarmaData?.data?.household_annual_income ? parseCurrencyFormat(creditKarmaData?.data?.household_annual_income) : "" ),
      employementStatus: location?.state?.partnerSignupData?.applicant.self_reported?.employment_status ?? creditKarmaData?.data?.employment_status ?? "",
      activeDuty: location?.state?.partnerSignupData?.applicant.self_reported?.active_duty ?? "",
      activeDutyRank: location?.state?.partnerSignupData?.applicant.self_reported?.active_duty_rank ?? "",
      militaryStatus: location?.state?.partnerSignupData?.applicant.self_reported?.military_status ?? "",
      martialStatus: location?.state?.partnerSignupData?.applicant.self_reported?.marital_status ?? "",
      spouseadd: location?.state?.partnerSignupData?.applicant.self_reported?.spouse_address_street ?? "",
      spouseZipcode: location?.state?.partnerSignupData?.applicant.self_reported?.spouse_address_postal_code ?? "",
      spousecity: location?.state?.partnerSignupData?.applicant.self_reported?.spouse_address_city ?? "",
      spouseSelectState: location?.state?.partnerSignupData?.applicant.self_reported?.spouse_address_state ?? "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const modPersonalIncome = parseInt(values.personalIncome.replace(/[^\d]/g, ""));
      const modHouseholdIncome = parseInt(values.householdIncome.replace(/[^\d]/g, ""));
      if (!errorPersonal && !errorAnnual && validate(modPersonalIncome, modHouseholdIncome)) {
        setLoading(true);
        let confirmInfoData = {
          firstName: values.firstName,
          lastName: values.lastName,
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.state.length !== 2 ? Object.keys(states).find(key => states[ key ] === values.state) : values.state,
          zip: values.zip,
          citizenship: values.citizenship,
          personalIncome: modPersonalIncome,
          householdIncome: modHouseholdIncome,
          employementStatus: values.employementStatus,
          activeDuty: values.activeDuty,
          activeDutyRank: values.activeDutyRank,
          martialStatus: values.martialStatus,
          spouseadd: values.spouseadd,
          spouseZipcode: values.spouseZipcode,
          spousecity: values.spousecity,
          spouseSelectState: values.spouseSelectState.length !== 2 ? Object.keys(states).find(key => states[ key ] === values.spouseSelectState) : values.spouseSelectState,
          partner_token: location?.state?.partnerSignupData?.user?.attributes?.partner_token ?? "",
          email: location?.state?.partnerSignupData?.applicant?.contact?.email ?? "",
        };

        let partnerConfirmRes = await partnerConfirmInfo(confirmInfoData, navigate, refetch);
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
      if (eventValue?.length === 5 || !(eventValue?.length)) {
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
      if (result?.data?.cityName) {
        formik.setFieldValue("city", result?.data?.cityName);
        formik.setFieldValue("state", result?.data?.stateCode);
        setValidZip(true);
        if (validStates.indexOf(result?.data?.stateCode.toUpperCase()) === -1) {
          setValidZip(false);
          setErrorMsg(globalMessages.WeDoNotServeArea);
          formik.setFieldValue("city", "");
          formik.setFieldValue("state", "");
        }
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
      if (event.target.value.length === 5 || !(event.target.value?.length)) {
        let result = await ZipCodeLookup(event.target.value);
        if (result?.data?.cityName) {
          formik.setFieldValue("spousecity", result?.data?.cityName);
          formik.setFieldValue("spouseSelectState", result?.data?.stateCode);
          setValidSpouseZip(true);
        } else {
          setValidSpouseZip(false);
          formik.setFieldValue("spouseSelectState", "");
          formik.setFieldValue("spousecity", "");
        }
        formik.handleChange(event);
      }
    } catch (error) {
      ErrorLogger("Error from fetchSpouseAddress.",);
    }
  };

  //Popup open & close
  const handleClickOpen = () => setOpenCA(true);
  const handleClickOpenOhio = () => setOpenOhio(true);
  const handleClickDelawareOpen = () => setOpenDelaware(true);


  const onHandleChangeIncome = (event,inputType) => {
    //if inputType is 1 check Personal income for 2 check Annual Income
    const reg = /^[0-9.,$\b]+$/;
    let income = event.target.value.trim();
    if (!income || reg.test(income)) {
      if(inputType === 1){
      setErrorPersonal("");
      }
      else{
        setErrorAnnual("");
      }
      formik.handleChange(event);
    }
  };

  const preventUnwanted = (event) => {
    if (event.keyCode === 190 || event.keyCode === 188) {
      event.preventDefault();
    }
  };

  // To change text to currency format and its validation
  const currencyFormat = (event) => {
    const inputName = event.target.name;
    if (inputName === "personalIncome") {
      const income = event.target.value.trim().replace(/[^\d]/g, "").substr(0, 7);

      const formated = parseFloat(income);
      const forCur = "$" + formated.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      formik.setFieldValue(event.target.name, forCur.slice(0, -3));
      const modPersonalIncome = parseInt(formik.values.personalIncome.replace(/[^\d]/g, ""));
      const modHouseholdIncome = parseInt(formik.values.householdIncome.replace(/[^\d]/g, ""));
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
      const income = event.target.value.trim().replace(/[^\d]/g, "").substr(0, 7);

      const formated = parseFloat(income);
      const forCur = "$" + formated.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      formik.setFieldValue(event.target.name, forCur.slice(0, -3));
      const modPersonalIncome = parseInt(formik.values.personalIncome.replace(/[^\d]/g, ""));
      const modHouseholdIncome = parseInt(formik.values.householdIncome.replace(/[^\d]/g, ""));
      if (isNaN(modHouseholdIncome)) {
        setErrorAnnual(globalMessages.Annual_Household_Income_Required);
      } else {
        if (income.length < 4) {
          setErrorAnnual(globalMessages.Annual_Household_Income_4_digits);
          return false;
        }
        const perval = document
          .getElementById("personalIncome")
          .value.replace(/[^\d]/g, "").substr(0, 7);
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
    if (!acc || reg.test(acc)) formik.handleChange(event);
  };
  const changeCitizenship = (event) => {
    let citizenshipValue = event.target.value;
    if (citizenshipValue === "Foreign Resident")
     {setCitizenship(true)}
    else setCitizenship(false);
    formik.handleChange(event);
  };
  const preventEvent = (event) => {
    event.preventDefault();
    };

  //View Part
  return (
    <div data-testid="confirmationInfo_component">
      <div className={classes.mainContentBackground} id="mainContentBackground">
        <Box>
          <Grid
            className={classes.confirmationGrid}
            xs={12}
            item
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              xs={11}
              sm={10}
              md={6}
              lg={6}
              xl={6}
              className="confirmationCard"
              item
            >
              <Paper
                className={classes.paper}
                style={{
                  opacity: loading ? 0.55 : 1,
                  pointerEvents: loading ? "none" : "initial",
                }}
              >
                <Typography
                  className={classes.title}
                  data-testid="title"
                  color="textSecondary"
                >
                  Welcome to Mariner Finance{" "}
                </Typography>
                <p className={classes.introText}>
                  Please review and confirm the information that{" "}
                  <a href="https://www.creditkarma.com/" target="blank">
                    {" "}
                    <img
                      className="creditkarmaLogoImage"
                      src={creditkarmalogo}
                      alt="creditkarmalogo"
                    />
                  </a>{" "}
                  provided about you, it will only take a minute.
                </p>
                {/* </div> */}

                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} className={classes.fullWidth} >
                      <TextField
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        materialProps={{
                          "data-test-id": "name",
                          maxLength: "30",
                          ref: refFirstName,
                        }}
                        disabled={true}
                        value={formik.values.firstName}
                        onChange={onNameChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} className={classes.fullWidth}>
                      <TextField
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        materialProps={{
                          "data-test-id": "lastName",
                          maxLength: "30",
                          ref: refLastName,
                        }}
                        disabled={true}
                        value={formik.values.lastName}
                        onChange={onNameChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="streetAddress"
                        name="streetAddress"
                        label="Address"
                        materialProps={{
                          "data-test-id": "streetAddress",
                          maxLength: "100",
                          ref: refStreetAddress,
                        }}
                        value={formik.values.streetAddress}
                        onChange={formik.handleChange}
                        onBlur={onBlurAddress}
                        error={formik.touched.streetAddress && Boolean(formik.errors.streetAddress)}
                        helperText={formik.touched.streetAddress && formik.errors.streetAddress}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} container direction="row">
                      <Zipcode
                        fullWidth
                        id="zip"
                        name="zip"
                        label="Zip Code *"
                        refId={refZip}
                        value={formik.values.zip}
                        onChange={fetchAddress}
                        onBlur={formik.handleBlur}
                        error={(formik.touched.zip && Boolean(formik.errors.zip)) || !validZip}
                        helperText={validZip ? formik.touched.zip && formik.errors.zip : errorMsg}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} container direction="row">
                      <TextField
                        fullWidth
                        id="city"
                        name="city"
                        label="City"
                        disabled={true}
                        materialProps={{ "data-test-id": "city" }}
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={(formik.touched.city && Boolean(formik.errors.city)) || !validZip}
                        helperText={validZip ? formik.touched.city && formik.errors.city : globalMessages.Address_Home_City}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4} container direction="row">
                      <TextField
                        fullWidth
                        id="state"
                        name="state"
                        label="State"
                        disabled={true}
                        materialProps={{ "data-test-id": "state" }}
                        value={formik.values.state}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={(formik.touched.state && Boolean(formik.errors.state)) || !validZip}
                        helperText={validZip ? formik.touched.state && formik.errors.state : globalMessages.Address_State_Required}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Grid
                        item
                        xs={12}
                        id="citizenshipWrap"
                      >
                        <Select
                          id="citizenship"
                          name="citizenship"
                          labelform="Citizenship"
                          value={formik.values.citizenship}
                          onChange={changeCitizenship}
                          refId={refCitizenship}
                          onBlur={formik.handleBlur}
                          error={(formik.touched.citizenship && Boolean(formik.errors.citizenship)) || citizenship}
                          helperText={!citizenship ? formik.touched.citizenship && formik.errors.citizenship : "We are sorry. We do not offer loans to foreign residents."}
                          select={JSON.stringify(selectCitizenship)}
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={12} sm={4} container direction="row">
                      <TextField
                        name="personalIncome"
                        label="Annual Personal Income"
                        id="personalIncome"
                        value={formik.values.personalIncome}
                        onChange={(event) => {onHandleChangeIncome(event,1)}}
                        materialProps={{
                          "data-testid": "personalIncome",
                          maxLength: "10",
                          ref: refPersonalIncome
                        }}
                        autoComplete="off"
                        onBlur={currencyFormat}
                        onKeyDown={preventUnwanted}
                        error={errorPersonal !== ""}
                        helperText={errorPersonal ?? ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} container direction="row">
                      <TextField
                        name="householdIncome"
                        label="Annual Household Income"
                        id="annualHousehold"
                        value={formik.values.householdIncome}
                        materialProps={{
                          "data-testid": "annualIncome",
                          maxLength: "10",
                          ref: refAnnualHousehold
                        }}
                        autoComplete="off"
                        onChange={(event) => {onHandleChangeIncome(event,2)}}
                        onBlur={currencyFormat}
                        onKeyDown={preventUnwanted}
                        error={errorAnnual !== ""}
                        helperText={errorAnnual ?? ""}
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={4}
                      container
                      direction="row"
                      id="employementStatusWrap"
                    >
                      <Select
                        id="employementStatus"
                        name="employementStatus"
                        labelform="Employement Status"
                        value={formik.values.employementStatus}
                        refId={refEmployementStatus}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.employementStatus && Boolean(formik.errors.employementStatus)}
                        helperText={formik.touched.employementStatus && formik.errors.employementStatus}
                        select={JSON.stringify(selectEmploymentStatus)}
                      />
                    </Grid>
                    {/* **************************************************active duty***************************************************** */}
                    <Grid
                      item
                      xs={12}
                      className={
                        formik.values.state === "North Carolina" ||
                          formik.values.state === "NC"
                          ? "showCheckbox"
                          : "hideCheckbox"
                      }
                    >
                      <p>
                        {" "}
                        <b>
                          Are you active duty military or do you have a future
                          active duty date?
                        </b>
                      </p>
                      <Grid id="activeDutyGrid">
                        <Select
                          id="confirmActiveDuty"
                          name="activeDuty"
                          labelform="Active Duty *"
                          select='[{"value":"Yes"}, {"value":"No"}]'
                          value={formik.values.activeDuty}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.activeDuty && Boolean(formik.errors.activeDuty)}
                          helperText={formik.touched.activeDuty && formik.errors.activeDuty}
                          inputTestID="ADinput"
                          selectTestID="ADselect"
                        />
                      </Grid>
                      <Grid
                        id="activeDutyRankGrid"
                        item
                        xs={12}
                        className={
                          formik.values.activeDuty === "Yes"
                            ? "showCheckbox"
                            : "hideCheckbox"
                        }
                      >
                        <Select
                          id="confirmactiveDutyRank"
                          name="activeDutyRank"
                          labelform="Active duty rank *"
                          select='[{"value":"E4 and below"}, {"value":"E5 and above"}]'
                          value={formik.values.activeDutyRank}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.activeDutyRank && Boolean(formik.errors.activeDutyRank)}
                          helperText={formik.touched.activeDutyRank && formik.errors.activeDutyRank}
                        />
                        <Grid
                          item
                          xs={12}
                          className={`${ formik.values.activeDutyRank === "E4 and below" ? "showCheckbox" : "hideCheckbox" } ${ classes.redText }`}
                        >
                          Unfortunately, based on the application information provided, you do not meet our application requirements.
                        </Grid>
                      </Grid>

                    </Grid>

                    {/* ****************************************************Married Statue ***************************************** */}

                    <Grid
                      item
                      xs={12}
                      className={
                        formik.values.state === "Wisconsin" ||
                          formik.values.state === "WI"
                          ? "showCheckbox"
                          : "hideCheckbox"
                      }
                    >
                      <p>
                      <b>Are you married?*</b>
                     </p>
                      <Grid item xs={12} id="marriedStatusWrap">
                        <Select
                          name="martialStatus"
                          labelform="Marital Status *"
                          id="marriedStatus"
                          select='[{"value":"Married"}, {"value":"Unmarried"}, {"value":"Separated, under decree of legal separation"}]'
                          value={formik.values.martialStatus}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.martialStatus && Boolean(formik.errors.martialStatus)}
                          helperText={formik.touched.martialStatus && formik.errors.martialStatus}
                        />
                      </Grid>
                      <Grid
                        id="maritalStatusGrid"
                        item
                        xs={12}
                        className={
                          formik.values.martialStatus === "Married" ||
                            formik.values.martialStatus ===
                            legalMaritalStatus
                            ? "showCheckbox"
                            : "hideCheckbox"
                        }
                      >
                        <TextField
                          id="maritalStatusInput"
                          name="spouseadd"
                          label="Spouse's Address (if different)"
                          value={formik.values.spouseadd}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        className={
                          formik.values.martialStatus === "Married" ||
                            formik.values.martialStatus ===
                            legalMaritalStatus
                            ? "showCheckbox"
                            : "hideCheckbox"
                        }
                      >
                        <p>
                          <b>Location</b>{" "}
                        </p>

                        <Grid container direction="row">
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            id="spouseZipWrap"
                            className={
                              formik.values.martialStatus === "Married" ||
                                formik.values.martialStatus ===
                                legalMaritalStatus
                                ? "showCheckbox"
                                : "hideCheckbox"
                            }
                          >
                            <Zipcode
                              id="spouseZip"
                              name="spouseZipcode"
                              label="Zipcode *"
                              value={formik.values.spouseZipcode}
                              onChange={fetchSpouseAddress}
                              onBlur={formik.handleBlur}
                              error={(formik.touched.spouseZipcode && Boolean(formik.errors.spouseZipcode)) || !validSpouseZip}
                              helperText={validSpouseZip ? formik.touched.spouseZipcode && formik.errors.spouseZipcode : globalMessages.ZipCodeValid}
                            />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            id="spouseCityWrap"
                            className={
                              formik.values.martialStatus === "Married" ||
                                formik.values.martialStatus ===
                                legalMaritalStatus
                                ? "showCheckbox"
                                : "hideCheckbox"
                            }
                          >
                            <TextField
                              name="spousecity"
                              label="City"
                              id="spouseCity"
                              value={formik.values.spousecity}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              disabled={true}
                              error={
                                formik.touched.spousecity &&
                                Boolean(formik.errors.spousecity) || !validSpouseZip
                              }
                              helperText={
                                validSpouseZip
                                  ? (formik.touched.spousecity && formik.errors.spousecity)
                                  : globalMessages.Address_Home_City
                              }
                            />
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            sm={4}
                            id="spouseStateWrap"
                            className={
                              formik.values.martialStatus === "Married" ||
                                formik.values.martialStatus ===
                                legalMaritalStatus
                                ? "showCheckbox"
                                : "hideCheckbox"
                            }
                          >
                            <TextField
                              name="spouseSelectState"
                              id="spouseState"
                              label="State"
                              value={formik.values.spouseSelectState}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              disabled={true}
                              error={
                                (formik.touched.spouseSelectState &&
                                  Boolean(formik.errors.spouseSelectState)) || !validSpouseZip
                              }
                              helperText={
                                validSpouseZip
                                  ? (formik.touched.spouseSelectState && formik.errors.spouseSelectState)
                                  : globalMessages.Address_State_Required
                              }
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* **********************************************Disclosures******************************************************** */}
                    <Grid item xs={12}>
                      <p>
                        <b>Please acknowledge and sign our disclosures.</b>
                      </p>
                      <Checkbox
                        name="termsOfService"
                        labelform="Terms & Service"
                        value={agree}
                        onChange={(event) => {
                          setAgree(event.target.checked);
                        }}
                        label={
                          <p className="agreeCheckbox">
                            By clicking this box you acknowledge that you have
                            received, reviewed and agree to the {""}
                            <Link
                             onClick={(event) => {
                             preventEvent(event);
                             handleOnClickEsign();
                             }}
                             >
                               E-Signature Disclosure and Consent,
                             </Link>{" "}
                            <Link
                             onClick={(event) => {
                             preventEvent(event);
                             handleOnClickCredit();
                             }}
                             >
                               Credit and Contact Authorization,
                             </Link>{" "}
                            <Link
                             onClick={(event) => {
                             preventEvent(event);
                             handleOnClickwebTOU();
                             }}
                             >
                               Website Terms of Use,
                             </Link>{" "}
                            <Link
                             onClick={(event) => {
                             preventEvent(event);
                             handleOnClickPrivacy();
                             }}
                             >
                              Website Privacy Statement.
                             </Link>
                          </p>
                        }
                        required={true}
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
                          value={agreeDelaware}
                          onChange={(event) => {
                            setAgreeDelaware(event.target.checked);
                          }}
                          label={
                            <p className="agreeCheckbox">
                              By clicking this box you acknowledge that you have
                              received and reviewed the{" "}
                              <Link
                                className="formatHref"
                                onClick={(event) => {
                                  preventEvent(event);
                                  handleClickDelawareOpen();
                                  }}
                              >
                                Delaware Itemized Schedule Of Charges.{" "}
                              </Link>
                            </p>
                          }
                          required={formik.values.state === "Delaware" || formik.values.state === "DE" }
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
                          value={agreeCalifornia}
                          onChange={(event) => {
                            setAgreeCalifornia(event.target.checked);
                          }}
                          label={
                            <p className="agreeCheckbox">
                              By clicking this box you acknowledge that you have
                              been offered and had the opportunity to review
                              this{" "}
                              <a
                                className="formatHref"
                                href={
                                  "https://lms.moneyskill.org/yourcreditrating/module/mariner/en"
                                }
                                rel="noreferrer noopener"
                              >
                                Credit Education Program
                              </a>
                            </p>
                          }
                          required={formik.values.state === "California" || formik.values.state === "CA" }
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
                          value={agreeNewMexico}
                          onChange={(event) => {
                            setAgreeNewMexico(event.target.checked);
                          }}
                          label={
                            <p className="agreeCheckbox">
                              { globalMessages.New_Mexico_Consumer_Text }
                              <a
                                className="formatHref"
                                href={process.env.REACT_APP_NEW_MEXICO_CONSUMER_BROCHURE}
                                rel="noreferrer noopener"
                              > New Mexico Consumer Brochure.</a>
                            </p>
                          }
                          required={formik.values.state === "New Mexico" || formik.values.state === "NM"}
                          stylelabelform='{ "color":"" }'
                          stylecheckbox='{ "color":"blue" }'
                          stylecheckboxlabel='{ "color":"" }'
                        />
                      </div>
                    </Grid>

                    <Grid item xs={12} className={classes.signInButtonGrid}>
                      <ButtonPrimary
                        type="submit"
                        data-testid="submit"
                        stylebutton='{"background": "","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
                        disabled={
                          formik.values.citizenship === "Foreign Resident" || formik.values.activeDutyRank === "E4 and below" || !validZip
                            ? true
                            : loading
                        }
                        onClick={() => autoFocus()}
                      >
                        Continue
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

      <CaUser openCaUser = {openCA} setOpenCA = {setOpenCA}/>
      <OhioUser openOhioUser = {openOhio} setOpenOhio = {setOpenOhio} />
      <EsignPartner  openEsign = {esignPopup} setEsignPopup = {setEsignPopup}/>
      <CreditPartner  openCredit = {creditPopup} setCreditPopup = {setCreditPopup}/>
      <WebTermsPartner openWebTerms = {webTOUPopup} setWebTOUPopup = {setWebTOUPopup}/>
      <PrivacyPartner openPrivacyPartner = {privacyPopup} setPrivacyPopup = {setPrivacyPopup}/>
      <DelawareTerms openDelawareTerms = {openDelaware} setOpenDelaware = {setOpenDelaware}/>

    </div>
  );
}

ConfirmationInfo.propTypes = {
  location: PropTypes.object,
};
