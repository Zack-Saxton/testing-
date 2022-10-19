import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import Link from "@mui/material/Link";
import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import globalMessages from "../../../assets/data/globalMessages.json";
import amonelogo from "../../../assets/partners/WelcomeAOMember.png";
import creditkarmalogo from "../../../assets/partners/WelcomeCKMember.png";
import GTLlogo from "../../../assets/partners/WelcomeGTLMember.png";
import LendingTreelogo from "../../../assets/partners/WelcomeLTMember.png";
import NerdWalletlogo from "../../../assets/partners/WelcomeNWMember.png";
import OneLoanPlacelogo from "../../../assets/partners/WelcomeOLPMember.png";
import PartnerSignup, { PopulatePartnerSignup } from "../../Controllers/PartnerSignupController";
import validateUserEnteredInput from "../../Pages/Login/ValidateUserEnteredInput";
import { ButtonPrimary, Checkbox, EmailTextField, PasswordField,Zipcode, Select, SocialSecurityNumber, TextField } from "../../FormsUI";
import { useStylesPartner } from "./style";
import "./Style.css";
import Cookies from "js-cookie";
import ZipCodeLookup from "../../Controllers/ZipCodeLookup";
import states from '../../../assets/data/States.json';
import getClientIp, { phoneNumberMask, maskPhoneNumberWithAsterisk } from "../../Controllers/CommonController";
import { usePhoneNumber } from '../../../hooks/usePhoneNumber'
import {OhioUser, CaUser, EsignPartner,CreditPartner,WebTermsPartner,PrivacyPartner,DelawareTerms} from "./PartnerTerms"
import { FormValidationRules } from "../../lib/FormValidationRule";
let formValidation = new FormValidationRules();

//Yup validations for all the input fields
const validationSchema = yup.object({
  email: formValidation.email(),
  password: yup
    .string(globalMessages.PasswordEnter)
    .max(30, globalMessages.PasswordMax)
    .min(10, globalMessages.PasswordMin)
    .matches(/^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,30}$/, globalMessages.PasswordCriteria)
    .required(globalMessages.PasswordRequired),
  confirmPassword: yup
    .string()
    .max(30, globalMessages.PasswordMax)
    .min(10, globalMessages.PasswordMin)
    .matches(/^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,30}$/, globalMessages.PasswordCriteria)
    .required(globalMessages.PasswordConfirmationRequired)
    .when("password", {
      is: (password) => password?.length > 0,
      then: yup
        .string()
        .oneOf(
          [ yup.ref("password") ],
          globalMessages.PasswordConfirmationMatch
        ),
    }),
  ssn: formValidation.ssnLastFourDigitValidation(),
  callPhNo: formValidation.phoneNumber(),
  phoneType: formValidation.phoneTypeValidation(),
  activeDuty: formValidation.activeDutyValidation(),
  activeDutyRank: formValidation.activeDutyRankValidation(),
  martialStatus: formValidation.martialStatusValidation(),
  spouseadd: formValidation.spouseAddressValidation(),
  spouseZipcode: formValidation.spouseZipcode(),
  spousecity: formValidation.spouseCityValidation(),
  spouseSelectState: formValidation.spouseSelectState(),
});

export default function PartnerSignUp() {
  //Decoding URL for partner signup
  const useQueryURL = () => new URLSearchParams(useLocation().search);
  const query = useQueryURL();
  const url = window.location.href;
  const splitHash = url.split("/") ?? "";
  const splitPartnerToken = splitHash[ 5 ] ? splitHash[ 5 ].split("?") : "";
  const partnerToken = splitPartnerToken[ 0 ] ?? "";
  const utm_source = query.get("utm_source");
  const offer = query.get("offer");
  const useQueryOffer = () => new URLSearchParams(offer);
  const queryOffer = useQueryOffer();
  const applicantId = queryOffer.get("REF");
  const requestAmt = queryOffer.get("AMOUNT");
  const requestApr = queryOffer.get("APR");
  const requestTerm = queryOffer.get("TERM");
  Cookies.set("selectTerm" ,requestTerm);

  //API call
  const [ populatePartnerSignupState, SetPopulatePartnerSignupState ] = useState(null);
  const [ populatePartnerPhone, SetPopulatePartnerPhone ] = useState("");
  const { phoneNumberValue, setPhoneNumberValue, phoneNumberCurrentValue, setPhoneNumberCurrentValue, updateActualValue, updateMaskValue, updateEnterPhoneNo } = usePhoneNumber();
  const {data:ClientIP} = useQuery('ipaddress', getClientIp);


  //API Call
  const { data: PopulatePartnerSignupData } = useQuery([ 'populate-data', partnerToken, applicantId, requestAmt, requestApr, requestTerm ], () => PopulatePartnerSignup(partnerToken, applicantId, requestAmt, requestApr, requestTerm));

  useEffect(() => {
    let phoneNum = PopulatePartnerSignupData?.data?.applicant?.phoneNumber;
    formik.setFieldValue("callPhNo", phoneNum);
    SetPopulatePartnerSignupState(PopulatePartnerSignupData);
    setPhoneNumberValue(phoneNum);
    SetPopulatePartnerPhone(phoneNum);
    setPhoneNumberCurrentValue(maskPhoneNumberWithAsterisk(phoneNumberMask(phoneNum)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ PopulatePartnerSignupData, populatePartnerPhone ]);

  //Populate partner signup from API
  let populateSignupData = populatePartnerSignupState?.data?.applicant;

  const classes = useStylesPartner();
  const [ failed, setFailed ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();
  const [ openDelaware, setOpenDelaware ] = useState(false);
  const [ agree, setAgree ] = useState(false);
  const [ agreeDelaware, setAgreeDelaware ] = useState("");
  const [ agreeCalifornia, setAgreeCalifornia ] = useState("");
  const [ agreeNewMexico, setAgreeNewMexico ] = useState("");
  const [ esignPopup, setEsignPopup ] = useState(false);
  const [ creditPopup, setCreditPopup ] = useState(false);
  const [ webTOUPopup, setWebTOUPopup ] = useState(false);
  const [ privacyPopup, setPrivacyPopup ] = useState(false);
  const [ openCA, setOpenCA ] = useState(false);
  const [ openOhio, setOpenOhio ] = useState(false);
  const [ validSpouseZip, setValidSpouseZip ] = useState(true);

  const handlePopupCA = populateSignupData?.state === "CA" ? true : false;
  const handlePopupOhio = populateSignupData?.state === "OH" ? true : false;
  const otherPartnerState = utm_source === "CreditKarma" ? "" : populateSignupData?.state

  useEffect(() => {
    if (handlePopupCA) {
      setOpenCA(true);
    }
    else if (handlePopupOhio) {
      setOpenOhio(true);
    }
  }, [ handlePopupCA, handlePopupOhio ]);

  const handleClickDelawareOpen = () => setOpenDelaware(true);
  const handleOnClickEsign = () => setEsignPopup(true);
  const handleOnClickCredit = () => setCreditPopup(true);
  const handleOnClickwebTOU = () => setWebTOUPopup(true);
  const handleOnClickPrivacy = () => setPrivacyPopup(true);

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

  //Form Submission
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: populateSignupData?.email ?? "",
      password: "",
      confirmPassword: "",
      ssn: "",
      callPhNo: populatePartnerPhone ?? "",
      phoneType: "",
      state: otherPartnerState ?? "",
      activeDuty: "",
      activeDutyRank: "",
      militaryStatus: "",
      martialStatus: "",
      spouseadd: "",
      spouseZipcode: "",
      spousecity: "",
      spouseSelectState: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setFailed("");
      let partnerSignupData = {
        email: values.email,
        ssn: values.ssn,
        phone: phoneNumberValue.replace(/\)|\(|\s+|\-/g, "") || "",
        phoneType: values.phoneType,
        password: values.password,
        confirm_password: values.confirmPassword,
        activeDuty: values.activeDuty,
        activeDutyRank: values.activeDutyRank,
        martialStatus: values.martialStatus,
        spouseadd: values.spouseadd,
        spouseZipcode: values.spouseZipcode,
        spousecity: values.spousecity,
        spouseSelectState: values.spouseSelectState.length !== 2 ? Object.keys(states).find(key => states[ key ] === values.spouseSelectState) : values.spouseSelectState,  
        ClientIP : ClientIP,
        state: values.state.length !== 2 ? Object.keys(states).find(key => states[ key ] === values.state) : values.state,
        utm_source : utm_source

      };
      let partnerRes = await PartnerSignup(
        navigate,
        partnerToken,
        applicantId,
        partnerSignupData,
        utm_source,
      );
      if (partnerRes.status === 404 && partnerRes.statusText === "Last four SSN do not match") {
        setLoading(false);
        formik.values.ssn = "";
      }
      else if (partnerRes.status === 404) {
        setLoading(false);
        formik.values.ssn = "";
        formik.values.phoneType = "";
        formik.values.password = "";
        formik.values.confirmPassword = "";
      }
    },
  });
  //Preventing space key
  const preventSpace = (event) => {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  };

  const selectPhoneType = [
  { "label": "Cell", "value": "cell"},
  {"label": "Home","value": "home"}
]
const legalMaritalStatus =  "Separated, under decree of legal separation"

const preventEvent = (event) => {
  event.preventDefault();
  };
  const utmSourceList = ["OneLoanPlace","GTL","amone","NerdWallet","LendingTree"];
  const utmLogoList = {"OneLoanPlace": OneLoanPlacelogo,"GTL": GTLlogo,"amone": amonelogo,"NerdWallet": NerdWalletlogo,"LendingTree": LendingTreelogo};
  //View Part
  return (
    <div data-testid="partnerSignup_component">
      <div className={classes.mainContentBackground} id="mainContentBackground">
        <Box>
          <Grid
            className={classes.partnerSignUpGrid}
            xs={12}
            item
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              xs={11}
              sm={10}
              md={8}
              lg={6}
              xl={7}
              className="partnerSignUpCard"
              item
            >
              <Paper className={classes.paper}
                style={{
                  opacity: loading ? 0.55 : 1,
                  pointerEvents: loading ? "none" : "initial"
                }}>
                {utm_source === "CreditKarma" ? (
                  <Typography
                    className={classes.title}
                    data-testid="title"
                    color="textSecondary"
                  >
                    <a href="https://www.creditkarma.com/" target="blank">
                      <img
                        className={classes.fullWidth}
                        src={creditkarmalogo}
                        alt="creditkarmalogo"
                      />
                    </a>
                  </Typography>
                ) : utmSourceList.includes(utm_source)  ? (
                  <Typography
                    className={classes.title}
                    data-testid="title"
                    color="textSecondary"
                  >
                    <Link to="/#" target="blank">
                      <img
                        className={classes.fullWidth}
                        src={utmLogoList[utm_source]}
                        alt={`${utm_source}logo`}
                      />
                    </Link>
                  </Typography>
                ) : (
                  ""
                )}
                <p className={classes.introText}>
                  Thank you for choosing Mariner Finance. Please provide the
                  following information to view your offers.
                </p>
                {/* </div> */}
                <form onSubmit={formik.handleSubmit}>
                  <Grid
                    container
                  >
                    <Grid className={`${classes.fullWidth} ${classes.paddingBottom}`} item xs={12}>
                      <EmailTextField
                        id="emailPartner"
                        name="email"
                        label="Email Address"
                        placeholder="Enter your email address"
                        materialProps={{ maxLength: "100" }}
                        onKeyDown={preventSpace}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                        disabled={true}
                      />
                    </Grid>

                    <Grid id="socialSecurityNumber" className={`${classes.fullWidth} ${classes.paddingBottom}`} item xs={12}>
                      <SocialSecurityNumber
                        name="ssn"
                        label="Enter your last 4 digits of SSN"
                        placeholder="Enter your SSN"
                        id="ssn"
                        mask="9999"
                        value={formik.values.ssn}
                        onChange={formik.handleChange}
                        materialProps={{ maxLength: "4" }}
                        onBlur={formik.handleBlur}
                        error={formik.touched.ssn && Boolean(formik.errors.ssn)}
                        helperText={formik.touched.ssn && formik.errors.ssn}
                      />
                    </Grid>

                    <Grid className={`${classes.fullWidth} ${classes.paddingBottom_Right}`} item xs={12} sm={6} container direction="row" id="phoneNumberWrapPartner">
                      <TextField
                        name="callPhNo"
                        label="Phone number *"
                        id="phonePartner"
                        type="text"
                        materialProps={{ maxLength: "14" }}
                        onKeyDown={preventSpace}
                        onBlur={(event)=>{
                          updateMaskValue(event);
                          formik.handleBlur(event);
                        }}
                        value = { phoneNumberCurrentValue }
                        onChange={(event)=>{
                          updateEnterPhoneNo(event);
                          formik.handleChange(event);
                        }}
                        error={formik.touched.callPhNo && Boolean(formik.errors.callPhNo)}
                        helperText={formik.touched.callPhNo && formik.errors.callPhNo}
                        onFocus={ updateActualValue }
                      />
                    </Grid>

                    <Grid className={`${classes.fullWidth} ${classes.paddingBottom}`} item xs={12} sm={6} container direction="row" id="phoneTypeWrap">
                      <Select
                        id="phoneType"
                        name="phoneType"
                        labelform="Phone Type"
                        value={formik.values.phoneType}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.phoneType &&
                          Boolean(formik.errors.phoneType)
                        }
                        helperText={
                          formik.touched.phoneType && formik.errors.phoneType
                        }
                        select= {JSON.stringify(selectPhoneType)}
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
                          className={`${ formik.values.activeDutyRank === "E4 and below" ? "showCheckbox" : "hideCheckbox" } ${ classes.redTextPartner }`}
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

                    {/* ****************************************************  Password Fields ***************************************** */}
                    <Grid id = "passwordGrid" className={`${classes.fullWidth} ${classes.paddingBottom}`} item xs={12}>
                      <PasswordField
                        name="password"
                        label="Create New Password *"
                        placeholder="Enter your password"
                        id="password"
                        type="password"
                        onKeyDown={preventSpace}
                        materialProps={{ maxLength: "30" }}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                      />
                      </Grid>

                      <Grid container className="errorvalidationWrap">
                      <Grid className="errorvalidationOne">
                      <ul className="error-validation">
                        {validateUserEnteredInput(formik.values.password, 1)}
                      </ul>
                      </Grid>
                      <Grid>
                       <ul className="error-validation">
                       {validateUserEnteredInput(formik.values.password, 0)}
                       </ul>

                    </Grid>
                    </Grid>

                    <Grid className={`${classes.fullWidth} ${classes.paddingBottom}`} item xs={12}>
                      <PasswordField
                        name="confirmPassword"
                        label="Re-enter Your Password *"
                        placeholder="Enter your confirm password"
                        id="cpass"
                        type="password"
                        onKeyDown={preventSpace}
                        materialProps={{ maxLength: "30" }}
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.confirmPassword &&
                          Boolean(formik.errors.confirmPassword)
                        }
                        helperText={
                          formik.touched.confirmPassword &&
                          formik.errors.confirmPassword
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

    {/* **************************************************** Acknowledgements  ***************************************** */}

                    <Grid
                      item
                      xs={12}
                      className={
                        utm_source !== "CreditKarma"
                          ? "showCheckbox"
                          : "hideCheckbox"
                      }
                    >
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
                        required={utm_source !== "CreditKarma" }
                        stylelabelform='{ "color":"" }'
                        stylecheckbox='{ "color":"blue"}'
                        stylecheckboxlabel='{ "color":"" }'
                      />
                      <div
                        className={
                          utm_source !== "CreditKarma" && (populateSignupData?.state === "Delaware" ||
                            populateSignupData?.state === "DE")
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
                              <span
                                className="formatHref"
                                onClick={handleClickDelawareOpen}
                              >
                                Delaware Itemized Schedule Of Charges.{" "}
                              </span>
                            </p>
                          }
                          required={utm_source !== "CreditKarma" && (populateSignupData?.state === "Delaware" ||
                            populateSignupData?.state === "DE") }
                          stylelabelform='{ "color":"" }'
                          stylecheckbox='{ "color":"blue" }'
                          stylecheckboxlabel='{ "color":"" }'
                        />
                      </div>
                      <div
                        className={
                          utm_source !== "CreditKarma" && (populateSignupData?.state === "California" ||
                            populateSignupData?.state === "CA")
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
                          required={utm_source !== "CreditKarma" && (populateSignupData?.state === "California" ||
                            populateSignupData?.state === "CA") }
                          stylelabelform='{ "color":"" }'
                          stylecheckbox='{ "color":"blue" }'
                          stylecheckboxlabel='{ "color":"" }'
                        />
                      </div>
                      <div
                        className={
                          utm_source !== "CreditKarma" &&
                            populateSignupData?.state === "New Mexico" ||
                            populateSignupData?.state === "NM"
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
                              >
                                New Mexico Consumer Brochure.
                              </a>
                            </p>
                          }
                          required={utm_source !== "CreditKarma" &&
                            (populateSignupData?.state === "New Mexico" ||
                              populateSignupData?.state === "NM") }
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
                        id="submitPartnerButton"
                        aria-label = "submitPartnerButton"
                        stylebutton='{"padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
                        disabled={
                           formik.values.activeDutyRank === "E4 and below"
                            ? true
                            : loading
                        }
                      >
                        {utm_source === "CreditKarma" ? "Continue" : "View your offers"}
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
