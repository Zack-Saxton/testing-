import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
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
import partnerSignup, { PopulatePartnerSignup } from "../../Controllers/PartnerSignupController";
import validateUserEnteredInput from "../../Pages/Login/ValidateUserEnteredInput";
import { ButtonPrimary, Checkbox, EmailTextField, PasswordField, Popup, RenderContent, Select, SocialSecurityNumber, TextField } from "../../FormsUI";
import { useStylesPartner } from "./style";
import "./Style.css";
import Cookies from "js-cookie";


//Yup validations for all the input fields
const validationSchema = yup.object({
  email: yup
    .string(globalMessages.EmailEnter)
    .email(globalMessages.EmailValid)
    .matches(/^[a-zA-Z][a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, globalMessages.EmailValid)
    .required(globalMessages.EmailRequired),
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
  ssn: yup
    .string(globalMessages.SSNEnter)
    .required(globalMessages.SSNRequired)
    .transform((value) => value.replace(/[^\d]/g, ""))
    .matches(/^(?!0000)\d{4}$/, globalMessages.SSNValid)
    .min(4, globalMessages.SSNMin_four),
  callPhNo: yup
    .string(globalMessages.PhoneEnter)
    .required(globalMessages.PhoneRequired)
    .transform((value) => value?.replace(/[^\d]/g, ""))
    .matches(/^[1-9]{1}\d{2}[\d]{3}\d{4}$/, globalMessages.PhoneValid)
    .matches(/^(\d)(?!\1+$)\d{9}$/, globalMessages.PhoneValid)
    .min(10, globalMessages.PhoneMin),
  phoneType: yup
    .string(globalMessages.PhoneType)
    .max(30, globalMessages.PhoneTypeMax)
    .required(globalMessages.PhoneTypeRequired),
});
const phoneNumberMask = (values) => {
	if(values){
		let phoneNumber = values.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
  	values = !phoneNumber[ 2 ] ? phoneNumber[ 1 ] : '(' + phoneNumber[ 1 ] + ') ' + phoneNumber[ 2 ] + (phoneNumber[ 3 ] ? '-' + phoneNumber[ 3 ] : '');
  	return (values);
	}
  return '';
}
const maskPhoneNumberWithAsterisk = (phoneNumber) => {
  let firstNumber = phoneNumberMask(phoneNumber).slice(0, 10);
  return firstNumber.replace(/\d/g, '*') + phoneNumber.slice(10);
}

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
  const [ phoneNumberValue, setPhoneNumberValue ] = useState("");
  const [ phoneNumberCurrentValue, setPhoneNumberCurrentValue ] = useState("");

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
  const [ webTOUPopup, setwebTOUPopup ] = useState(false);
  const [ privacyPopup, setPrivacyPopup ] = useState(false);
  const [ openCA, setOpenCA ] = useState(false);
  const [ openOhio, setOpenOhio ] = useState(false);

  const handlePopupCA = populateSignupData?.state === "CA" ? true : false;
  const handlePopupOhio = populateSignupData?.state === "OH" ? true : false;

  useEffect(() => {
    if (handlePopupCA) {
      setOpenCA(true);
    }
    else if (handlePopupOhio) {
      setOpenOhio(true);
    }
  }, [ handlePopupCA, handlePopupOhio ]);

  const handleCloseCA = () => setOpenCA(false);
  const handleCloseOhio = () => setOpenOhio(false);
  const handleClickDelawareOpen = () => setOpenDelaware(true);
  const handleDelawareClose = () => setOpenDelaware(false);
  const handleOnClickEsign = () => setEsignPopup(true);
  const handleOnClickEsignClose = () => setEsignPopup(false);
  const handleOnClickCredit = () => setCreditPopup(true);
  const handleOnClickCreditClose = () => setCreditPopup(false);
  const handleOnClickwebTOU = () => setwebTOUPopup(true);
  const handleOnClickwebTOUClose = () => setwebTOUPopup(false);
  const handleOnClickPrivacy = () => setPrivacyPopup(true);
  const handleOnClickPrivacyClose = () => setPrivacyPopup(false);

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
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setFailed("");
      let partnerSignupData = {
        ssn: values.ssn,
        phone: phoneNumberValue.replace(/\)|\(|\s+|\-/g, "") || "",
        phoneType: values.phoneType,
        password: values.password,
        confirm_password: values.confirmPassword
      };      
      let partnerRes = await partnerSignup(
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
  const updateActualValue = (_event) => {
    setPhoneNumberCurrentValue(phoneNumberMask(phoneNumberValue));
  }
  const updateMaskValue = (_event) => {
    setPhoneNumberCurrentValue(maskPhoneNumberWithAsterisk(phoneNumberMask(phoneNumberValue))) ;
  }
  const updateEnterPhoneNo = (event) =>{
    setPhoneNumberValue(event.target.value);
    setPhoneNumberCurrentValue(phoneNumberMask(event.target.value));
  }

  const selectPhoneType = [
  { "label": "Cell", "value": "cell"},
  {"label": "Home","value": "home"}
]
const preventEvent = (event) => {
  event.preventDefault();
  };
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
                ) : utm_source === "OneLoanPlace" ? (
                  <Typography
                    className={classes.title}
                    data-testid="title"
                    color="textSecondary"
                  >
                    <a href="/#" target="blank">
                      <img
                        className={classes.fullWidth}
                        src={OneLoanPlacelogo}
                        alt="OneLoanPlacelogo"
                      />
                    </a>
                  </Typography>
                ) : utm_source === "GTL" ? (
                  <Typography
                    className={classes.title}
                    data-testid="title"
                    color="textSecondary"
                  >
                    <a href="/#" target="blank">
                      <img
                        className={classes.fullWidth}
                        src={GTLlogo}
                        alt="GTLlogo"
                      />
                    </a>
                  </Typography>
                ) : utm_source === "amone" ? (
                  <Typography
                    className={classes.title}
                    data-testid="title"
                    color="textSecondary"
                  >
                    <a href="/#" target="blank">
                      <img
                        className={classes.fullWidth}
                        src={amonelogo}
                        alt="amonelogo"
                      />
                    </a>
                  </Typography>
                ) : utm_source === "NerdWallet" ? (
                  <Typography
                    className={classes.title}
                    data-testid="title"
                    color="textSecondary"
                  >
                    <a href="/#" target="blank">
                      <img
                        className={classes.fullWidth}
                        src={NerdWalletlogo}
                        alt="NerdWalletlogo"
                      />
                    </a>
                  </Typography>
                ) : utm_source === "LendingTree" ? (
                  <Typography
                    className={classes.title}
                    data-testid="title"
                    color="textSecondary"
                  >
                    <a href="/#" target="blank">
                      <img
                        className={classes.fullWidth}
                        src={LendingTreelogo}
                        alt="LendingTreelogo"
                      />
                    </a>
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
                        id="email"
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

                    <Grid className={`${classes.fullWidth} ${classes.paddingBottom_Right}`} item xs={12} sm={6} container direction="row">
                      <TextField
                        name="callPhNo"
                        label="Phone number *"
                        id="phone"
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

                    <Grid className={`${classes.fullWidth} ${classes.paddingBottom}`} item xs={12}>
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
                                target="_blank"
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
                                href={"https://www.marinerfinance.com/wp-content/uploads/2021/03/NM-Consumer-Brochure-1.pdf"}
                                target="_blank"
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
                        stylebutton='{"padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
                        disabled={loading}
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

      <Popup popupFlag={esignPopup} closePopup={handleOnClickEsignClose} title="E-Signature Disclosure and Consent">
        <Typography className="printPage" onClick={() => window.print()}>Print This Page</Typography>
        <RenderContent disclosureLink="/eSign" />
      </Popup>
      <Popup popupFlag={creditPopup} closePopup={handleOnClickCreditClose} title="Credit and Contact Authorization">
        <Typography className="printPage" onClick={() => window.print()}>Print This Page</Typography>
        <RenderContent disclosureLink="/credit" />
      </Popup>
      <Popup popupFlag={webTOUPopup} closePopup={handleOnClickwebTOUClose} title="Terms of Use">
        <Typography className="printPage" onClick={() => window.print()}>Print This Page</Typography>
        <RenderContent disclosureLink="/websiteTermsOfUse" />
      </Popup>
      <Popup popupFlag={privacyPopup} closePopup={handleOnClickPrivacyClose} title="Privacy Statement">
        <Typography className="printPage" onClick={() => window.print()}>Print This Page</Typography>
        <RenderContent disclosureLink="/privacy" />
      </Popup>

      <Popup popupFlag={openDelaware} closePopup={handleDelawareClose} title="Delaware Itemized Schedule of Charges">
        <Typography className="printPage" onClick={() => window.print()}>Print This Page</Typography>
        <RenderContent disclosureLink="/delaware" />
      </Popup>

      {/* CA user */}
      <Dialog
        onClose={handleCloseCA}
        aria-labelledby="customized-dialog-title"
        open={openCA}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleCloseCA}>
          Notice to CA Residents
        </DialogTitle>
        <DialogContent dividers>
          <Typography align="justify" gutterBottom>
            If you are married, you may apply for a separate account.
          </Typography>
        </DialogContent>
        <DialogActions className="modalAction">
          <ButtonPrimary
            stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px"}'
            onClick={handleCloseCA}
            className="modalButton"
          >
            <Typography align="center">OK</Typography>
          </ButtonPrimary>
        </DialogActions>
      </Dialog>

      {/* Ohio users */}
      <Dialog
        onClose={handleCloseOhio}
        aria-labelledby="customized-dialog-title"
        open={openOhio}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleCloseOhio}>
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
            onClick={handleCloseOhio}
            className="modalButton"
          >
            <Typography align="center">OK</Typography>
          </ButtonPrimary>
        </DialogActions>
      </Dialog>

    </div>
  );
}
