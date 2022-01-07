import React, { useState, useEffect } from "react";
import { useHistory,useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import * as yup from "yup";
import Box from "@material-ui/core/Box";
import {
  ButtonPrimary,
  PhoneNumber,
  Select,
  EmailTextField,
  PasswordField,
  SocialSecurityNumber,
  Checkbox,
} from "../../FormsUI";
import Paper from "@material-ui/core/Paper";
import Logo from "../../../assets/images/loginbg.png";
import "./Style.css";
import creditkarmalogo from "../../../assets/partners/WelcomeCKMember.png";
import OneLoanPlacelogo from "../../../assets/partners/WelcomeOLPMember.png";
import GTLlogo from "../../../assets/partners/WelcomeGTLMember.png";
import amonelogo from "../../../assets/partners/WelcomeAOMember.png";
import monevologo from "../../../assets/partners/WelcomeMonevoMember.png";
import NerdWalletlogo from "../../../assets/partners/WelcomeNWMember.png";
import LendingTreelogo from "../../../assets/partners/WelcomeLTMember.png";
import partnerSignup,{PopulatePartnerSignup} from "../../Controllers/PartnerSignupController";
import "react-toastify/dist/ReactToastify.css";

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
  email: yup
    .string("Enter your email")
    .email("A valid email address is required")
    .matches(
      /^[a-zA-Z][a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      "A valid email address is required"
    )
    .required("Your email address is required"),

  password: yup
    .string("Enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/,
      "Your password doesn't meet the criteria"
    )
    .max(30, "Password can be upto 30 characters length")
    .min(8, "Password should be minimum of 8 characters length")
    .required("Your password is required"),
  confirmPassword: yup
    .string()
    .max(30, "Password can be upto 30 characters length")
    .min(8, "Password should be minimum of 8 characters length")
    .required("Your password confirmation is required")
    .when("password", {
      is: (password) => password && password.length > 0,
      then: yup
        .string()
        .oneOf(
          [yup.ref("password")],
          "Your confirmation password must match your password"
        ),
    }),
  ssn: yup
    .string("Enter a SSN")
    .required("Your SSN is required")
    .transform((value) => value.replace(/[^\d]/g, ""))
    .matches(/^(?!0000)\d{4}$/, "Please enter a valid SSN")
    .min(4, "Name must contain at least 4 digits"),

  callPhNo: yup
    .string("Enter a name")
    .required("Your Phone number is required")
    .transform((value) => value?.replace(/[^\d]/g, ""))
    .matches(/^[1-9]{1}\d{2}[\d]{3}\d{4}$/, "Please enter a valid Phone number")
    .matches(/^(\d)(?!\1+$)\d{9}$/, "Please enter a valid Phone number")
    .min(10, "Name must contain at least 10 digits"),

  phoneType: yup
    .string("Select Phone Type")
    .max(30, "Should be less than 30 characters")
    .required("Your Phone Type is required"),
});

//Begin: Login page
export default function CreditKarma() {
  //Decoding URL for partner signup
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const url = window.location.href;
  const splitHash = url.split("/") ? url.split("/") : "";
  const splitPartnerToken = splitHash[5] ? splitHash[5].split("?") : "";
  const partnerToken = splitPartnerToken[0] ? splitPartnerToken[0] : "";
  const utm_source = query.get("utm_source");
  const offer = query.get("offer");
  const useQueryOffer = () => new URLSearchParams(offer);
  const queryOffer = useQueryOffer();
  const applicantId = queryOffer.get("REF");
  const requestAmt = queryOffer.get("AMOUNT");
  const requestApr = queryOffer.get("APR");
  const requestTerm = queryOffer.get("TERM");

   //API call
  const [populatePartnerSignupState, SetPopulatePartnerSignupState] =    useState(null);

  async function AsyncEffect_PopulatePartnerSignup() {
    SetPopulatePartnerSignupState(await PopulatePartnerSignup(
        partnerToken,
        applicantId,
        requestAmt, 
        requestApr,
        requestTerm
      )
    );
  }
  useEffect(() => {
    AsyncEffect_PopulatePartnerSignup();
  }, []);

  //Populate partner signup from API
  let populateSignupData =
    populatePartnerSignupState != null
      ? populatePartnerSignupState.data.data.applicant
      : null;

  const classes = useStyles();
  const [failed, setFailed] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [agree, setAgree] = useState(false);

 

  //Form Submission
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: populateSignupData !== null ? populateSignupData?.email : "",
      password: "",
      confirmPassword: "",
      ssn: "",
      callPhNo: populateSignupData !== null ? populateSignupData?.phoneNumber : "",
      phoneType: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setFailed("");
      let partnerSignupData = {
       ssn : values.ssn,
       phone : values.callPhNo,
       phoneType : values.phoneType,
       password : values.password,
       confirm_password : values.confirmPassword
      }

      let partnerRes = await partnerSignup(
        history,
        partnerToken,
        applicantId,
        partnerSignupData,
       
      );
      if (partnerRes.data.status === 404) {
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

 

  //View Part
  return (
    <div>
      <div className={classes.mainContentBackground} id="mainContentBackground">
        <Box>
          <Grid
            xs={10}
            item
            style={{
              paddingTop: "30px",
              paddingBottom: "40px",
              margin: "auto",
              width: "100%",
            }}
          >
            <Grid
              xs={11}
              sm={10}
              md={8}
              lg={6}
              xl={7}
              className="cardWrapper"
              item
              style={{ margin: "auto" }}
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
                        src={creditkarmalogo}
                        style={{ width: "100%" }}
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
                        src={OneLoanPlacelogo}
                        style={{ width: "100%" }}
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
                        src={GTLlogo}
                        style={{ width: "100%" }}
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
                        src={amonelogo}
                        style={{ width: "100%" }}
                        alt="amonelogo"
                      />
                    </a>
                  </Typography>
                ) : utm_source === "monevo" || utm_source === "monevoN" ? (
                  <Typography
                    className={classes.title}
                    data-testid="title"
                    color="textSecondary"
                  >
                    <a href="/#" target="blank">
                      <img
                        src={monevologo}
                        style={{ width: "100%" }}
                        alt="monevologo"
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
                        src={NerdWalletlogo}
                        style={{ width: "100%" }}
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
                        src={LendingTreelogo}
                        style={{ width: "100%" }}
                        alt="LendingTreelogo"
                      />
                    </a>
                  </Typography>
                ) : (
                  ""
                )}

                <p style={{ textAlign: "center" }}>
                  Thank you for choosing Mariner Finance. Please provide the
                  following information to view your offers.
                </p>
                {/* </div> */}

                <form onSubmit={formik.handleSubmit}>
                  <Grid
                    container
                    spacing={4}
                  >
                    <Grid item xs={12} style={{ width: "100%" }}>
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

                    <Grid item xs={12}>
                      <SocialSecurityNumber
                        name="ssn"
                        label="Enter your last 4 digits of SSN"
                        placeholder="Enter your SSN"
                        id="ssn"
                        type="ssn"
                        mask="9999"
                        value={formik.values.ssn}
                        onChange={formik.handleChange}
                        materialProps={{ maxLength: "4" }}
                        onBlur={formik.handleBlur}
                        error={formik.touched.ssn && Boolean(formik.errors.ssn)}
                        helperText={formik.touched.ssn && formik.errors.ssn}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} container direction="row">
                      <PhoneNumber
                        name="callPhNo"
                        label="Phone Number"
                        id="phone"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.callPhNo}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.callPhNo &&
                          Boolean(formik.errors.callPhNo)
                        }
                        helperText={
                          formik.touched.callPhNo && formik.errors.callPhNo
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} container direction="row">
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
                        select='[{ "label": "Cell", "value": "cell"}, 
                                        {"label": "Home","value": "home"}]'
                      />
                    </Grid>

                    <Grid item xs={12}>
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
                      <p id="passwordTitle" className={classes.passwordTitle}>
                        Please ensure your password meets the following
                        criteria: between 8 and 30 characters in length, at
                        least 1 uppercase letter, at least 1 lowercase letter,
                        at least 1 symbol and at least 1 number.
                      </p>
                    </Grid>
                    <Grid item xs={12}>
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
                        onChange={(e) => {
                          setAgree(e.target.checked);
                        }}
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
                              {" "}
                              E-Signature Disclosure and Consent,{" "}
                            </a>
                            <a
                              className="formatHref"
                              href={
                                "https://loans.marinerfinance.com/application/form"
                              }
                              target="_blank"
                              rel="noreferrer noopener"
                            >
                              Credit and Contact Authorization,{" "}
                            </a>
                            <a
                              className="formatHref"
                              href={
                                "https://loans.marinerfinance.com/application/form"
                              }
                              target="_blank"
                              rel="noreferrer noopener"
                            >
                              Website Terms of Use,{" "}
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
                         required={utm_source ? utm_source !== "CreditKarma" ? true : false : ""   }
                        stylelabelform='{ "color":"" }'
                        stylecheckbox='{ "color":"blue"}'
                        stylecheckboxlabel='{ "color":"" }'
                      />
                    </Grid>

                    <Grid item xs={12} className={classes.signInButtonGrid}>
                      <ButtonPrimary
                        // onClick={autoFocus}
                        type="submit"
                        data-testid="submit"
                        stylebutton='{"background": "", "color":"" }'
                        disabled={loading}
                      >
                        <Typography align="center" className="textCSS ">
                          Continue
                        </Typography>
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
    </div>
  );
}
