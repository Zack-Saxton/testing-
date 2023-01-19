import { Grid } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import React, { useEffect, useState } from "react";
import {
  Popup,
  RenderContent
} from "../../../components/FormsUI";
import { saveConsentStatus } from "../../Controllers/EmailVerificationController";
import ErrorLogger from "../../lib/ErrorLogger";
import BankAccountVerification from "./BankAccountVerification";
import DocumentIdAndPhotoId from "./DocumentIdAndPhotoId";
import "./EmailVerification.css";
import IncomeVerification from "./IncomeVerification";
import { useStylesEmailVerification } from "./Style";
import VehiclePhotos from "./VehiclePhotos";
import OtherDocument from "./OtherDocument";
import { useBranchPortalHook } from './BranchPortalTest/useBranchPortalHook';


function getSteps() {
  return [
    "ID Document & Photo",
    "Income Verification",
    "Bank Account Verification",
    "Auto Collateral Information"
  ];
}

export default function EmailVerification() {
  const classes = useStylesEmailVerification();
  const [ customerEmail, setCustomerEmail ] = useState("");
  const [ applicationNumber, setApplicationNumber ] = useState("");
  const [ autoVerification, setAutoVerification ] = useState("off");
  const [ activeStep, setActiveStep ] = useState(0);
  const [ agreeTerms, setAgreeTerms ] = useState(false);
  const [completed, setCompleted] = useState({});
  const [ consentLoading, setConsentLoading ] = useState(false);
  const [ eSign, seteSign ] = useState(false);
  const [ creditTerms, setCreditTerms ] = useState(false);
  const [ cacTerms, setCacTerms ] = useState(false);
  const [ websiteTerms, setWebsiteTerms ] = useState(false);
  let steps = getSteps();

  //API Call
  const { isLoading, verificationData } = useBranchPortalHook();

  useEffect(() => {
    let applicationNo = verificationData?.data?.emailVerificationRecord?.attributes?.applicationNumber ?? "";
    let autoVerificationFromAPI = verificationData?.data?.emailVerificationRecord?.attributes?.autoVerification ?? "off";
    let emailVerifiedStatus = verificationData?.data?.emailVerificationRecord?.attributes?.consents_verified ?? false;
    let customerEmailFromAPI = verificationData?.data?.emailVerificationRecord?.customer_email ?? "";
    setCustomerEmail(customerEmailFromAPI);
    setApplicationNumber(applicationNo);
    setAutoVerification(autoVerificationFromAPI);
    if (applicationNo !== '') {
      setAgreeTerms(emailVerifiedStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ verificationData ]);
  if (autoVerification !== 'on') {
    steps.pop();
  }
  steps.push("Upload Other Documents");
  function getValueByLable(text, ctx) {
    return document.evaluate("//*[.='" + text + "']",
      ctx || document, null, XPathResult.ANY_TYPE, null).iterateNext();
  }

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
    isLastStep() && !allStepsCompleted()
      ? steps.findIndex((_step, i) => !(i in completed))
      : activeStep + 1;
  setActiveStep(newActiveStep);
    if (activeStep <= 1) {
      getValueByLable("ID Document & Photo").scrollIntoView();
    }
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = async (_event) => {
    try {
      setConsentLoading(true);
      let response = await saveConsentStatus(customerEmail, applicationNumber);
      if (response) {
        setAgreeTerms(true);
      }
      setConsentLoading(false);
    } catch (error) {
      ErrorLogger(" Error from saveConsentStatus API", error);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleOnClickeSign = () => {
    seteSign(true);
  };
  const handleOnClickeSignClose = () => {
    seteSign(false);
  };
  const handleOnClickCreditTerms = () => {
    setCreditTerms(true);
  };
  const handleOnClickCreditTermsClose = () => {
    setCreditTerms(false);
  };
  const handleOnClickCacTermsClose = () => {
    setCacTerms(false);
  };
  const handleOnClickWebsiteTerms = () => {
    setWebsiteTerms(true);
  };
  const handleOnClickWebsiteTermsClose = () => {
    setWebsiteTerms(false);
  };
  function getStepContent(step, label) {
    step = label === 'Upload Other Documents' ? 4 : step;
    switch (step) {
      case 0:
        return <DocumentIdAndPhotoId
          applicationNumber={applicationNumber}
          customerEmail={customerEmail}
          next={handleComplete}
          prev={handleBack}
          reset={handleReset}
          steps={steps}
          activeStep={activeStep}
        />;
      case 1:
        return <IncomeVerification
          applicationNumber={applicationNumber}
          customerEmail={customerEmail}
          next={handleComplete}
          prev={handleBack}
          reset={handleReset}
          steps={steps}
          activeStep={activeStep}
        />;
      case 2:
        return <BankAccountVerification
          applicationNumber={applicationNumber}
          customerEmail={customerEmail}
          next={handleComplete}
          prev={handleBack}
          reset={handleReset}
          steps={steps}
          activeStep={activeStep}
        />;
      case 3:
        return <VehiclePhotos
          applicationNumber={applicationNumber}
          customerEmail={customerEmail}
          next={handleComplete}
          prev={handleBack}
          reset={handleReset}
          steps={steps}
          activeStep={activeStep}
        />;
      case 4:
        return <OtherDocument
          applicationNumber={applicationNumber}
          customerEmail={customerEmail}
          next={handleComplete}
          prev={handleBack}
          reset={handleReset}
          steps={steps}
          activeStep={activeStep}
        />;
      default:
        return "Unknown step";
    }
  }

  const showConsentsLinks = () => {
    return (
      <>
        <a>{' '}<span data-testid = "esignClick" className={classes.linkDesign} onClick={() => { handleOnClickeSign(); }}>E-Signature Disclosure and Consent,</span></a>
        <span className="acknowledgeTextSpan"> the </span>
        <a>{' '}<span data-testid = "creditContact" className={classes.linkDesign} onClick={() => { handleOnClickCreditTerms(); }}>Credit Contact and Authorization,</span></a>
        <span className="acknowledgeTextSpan"> and the </span>
        <a>{' '}<span data-testid = "websitePrivacy" className={classes.linkDesign} onClick={() => { handleOnClickWebsiteTerms(); }}> Privacy Statement.</span></a>
      </>
    );
  }

  const showArrowButton = () =>{
    return(<div className={classes.stepLabelButton}>
      <NavigateNextIcon />
    </div>);
  }

  return (
    <Grid data-testid = "emailVerification_component">
      {isLoading ?
        <Grid   data-testid="while_Loading" className="circleprog" style={{ width: "100%", textAlign: "center", margin: "20px 0px" }}>
          <CircularProgress />
        </Grid>
        :
        <Grid className="emailVirificationWrap">
          <Grid>
            <h2  data-testid = "emailVerification_heading" className="documetVirificationHeading">
              Document and Email Verification
            </h2>
            <Typography className="documetVirificationParagraph">
              Welcome to our Verification Portal where your loan agent will assist
              in guiding you through the rest of the loan closing process. In the
              Verification Portal you will acknowledge and sign the required
              disclosures as well as upload the necessary documents for
              verification.
            </Typography>
          </Grid>
          <Grid className="stepperWrap">
            <Grid container>
              {agreeTerms || verificationData?.data?.messageType === 'error' ?
                <Grid className="acknowledgeText">
                  <Typography>
                    {verificationData?.data?.errorMessage}
                  </Typography>
                </Grid>
                :
                <>
                  {consentLoading ?
                    <Grid className="circleprog" style={{ width: "100%", textAlign: "center", margin: "20px 0px" }}>
                      <CircularProgress />
                    </Grid>
                    :
                    <>
                    <Typography className="stepperHeading">
              Thank you for verifying your email.
            </Typography>
            <Typography className="stepperParagraph">
              As discussed with your Mariner Finance team member, your application
              requires that you verify your identity as well as your income. Please
              acknowledge and sign our disclosures to proceed.
            </Typography>
            <Grid container>
                      <Grid item md={0.5} sm={1} xs={1.5}>
                        <Checkbox
                          checked={agreeTerms}
                          data-testid = "checkboxTerms"
                          onChange={handleChange}
                          color="primary"
                          inputProps={{ "aria-label": "primary checkbox" }}
                        />
                      </Grid>
                      <Grid md={11.5} sm={11} xs={10.5} className="acknowledgeText">
                        <Typography>
                          By clicking this box you acknowledge that you have received,
                          reviewed, and agree to the following terms and conditions:
                          <br />
                          {showConsentsLinks()}
                        </Typography>
                      </Grid>
                      </Grid>
                    </>
                  }
                </>
              }

            </Grid>
            <Grid data-testid ="checkboxGrid" id="checkBoxGrid" className={agreeTerms ? classes.showCheckbox : classes.hideCheckbox}>
              <Stepper nonLinear activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                  <Step key={`email-verification-row-${index}`} completed={completed[index]}>
                    <StepLabel StepIconComponent={showArrowButton} onClick={handleStep(index)}>
                      {label}
                    </StepLabel>
                    <StepContent>
                      <span>{getStepContent(index, label)}</span>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              <Grid>
                {activeStep === steps.length ? (
                  <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>
                      All steps completed - you&apos;re finished
                    </Typography>
                  </Paper>
                ) : ""}
              </Grid>
            </Grid>
          </Grid>
          <Popup popupFlag={eSign} title='E-Signature Disclosure and Consent' closePopup={handleOnClickeSignClose}>
            <Typography className="printPage" data-testid = "printPage" onClick={() => window.print()}>Print This Page</Typography>
            <RenderContent disclosureLink="/eSignBranchPortal" />
          </Popup>
          <Popup popupFlag={creditTerms} title='Credit and Contact Authorization' closePopup={handleOnClickCreditTermsClose}>
            <Typography className="printPage" data-testid = "printPage" onClick={() => window.print()}>Print This Page</Typography>
            <RenderContent disclosureLink="/creditBranchPortal" findContent="<h2>Credit and Contact Authorization</h2>" replaceContent='' />
          </Popup>
          <Popup data-testid = "cacTerms" popupFlag={cacTerms} title='Website Terms of Use' closePopup={handleOnClickCacTermsClose}>
            <Typography className="printPage" data-testid = "printPage" onClick={() => window.print()}>Print This Page</Typography>
            <RenderContent disclosureLink="/cacTermsOfUse" findContent="<h2>Terms Of Use</h2>" replaceContent='' />
          </Popup>
          <Popup data-testid = "websiteTerms" popupFlag={websiteTerms} title='Website Privacy Statement' closePopup={handleOnClickWebsiteTermsClose}>
            <Typography className="printPage" data-testid = "printPage" onClick={() => window.print()}>Print This Page</Typography>
            <RenderContent disclosureLink="/websiteAccessibility" findContent="<h2>Website Privacy Statement</h2>" replaceContent='' />
          </Popup>
        </Grid>
      }
    </Grid>
  );
}
