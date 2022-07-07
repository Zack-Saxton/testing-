import { Grid } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import {
  ButtonPrimary,
  Popup,
  RenderContent
} from "../../../components/FormsUI";
import { saveAcquireClick, saveConsentStatus } from "../../Controllers/EmailVerificationController";
import ErrorLogger from "../../lib/ErrorLogger";
import BankAccountVerification from "./BankAccountVerification";
import DocumentIdAndPhotoId from "./DocumentIdAndPhotoId";
import "./EmailVerification.css";
import IncomeVerification from "./IncomeVerification";
import { useStylesEmailVerification } from "./Style";
import VehiclePhotos from "./VehiclePhotos";
import { useBranchPortalHook } from './BranchPortalTest/useBranchPortalHook';


function getSteps() {
  return [
    "ID Document & Photo",
    "Income Verification",
    "Bank Account Verification",
    "Vehicle Photos",
  ];
}

export default function EmailVerification() {
  const classes = useStylesEmailVerification();
  const [ customerEmail, setCustomerEmail ] = useState("");
  const [ applicationNumber, setApplicationNumber ] = useState("");
  const [ autoVerification, setAutoVerification ] = useState("off");
  const [ collaborateOption, setCollaborateOption ] = useState("off");
  const [ activeStep, setActiveStep ] = useState(0);
  const [ agreeTerms, setAgreeTerms ] = useState(false);
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
    let collaborateOptionFromAPI = verificationData?.data?.emailVerificationRecord?.attributes?.collaborateOption ?? "off";
    let emailVerifiedStatus = verificationData?.data?.emailVerificationRecord?.attributes?.consents_verified ?? false;
    let customerEmailFromAPI = verificationData?.data?.emailVerificationRecord?.customer_email ?? "";
    setCustomerEmail(customerEmailFromAPI);
    setApplicationNumber(applicationNo);
    setAutoVerification(autoVerificationFromAPI);
    setCollaborateOption(collaborateOptionFromAPI);
    if (applicationNo !== '') {
      setAgreeTerms(emailVerifiedStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ verificationData ]);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://s.acquire.io/a-4db8e/init.js?full";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  if (autoVerification !== 'on') {
    steps.pop();
  }
  function getValueByLable(text, ctx) {
    return document.evaluate("//*[.='" + text + "']",
      ctx || document, null, XPathResult.ANY_TYPE, null).iterateNext();
  }
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep <= 1) {
      getValueByLable("ID Document & Photo").scrollIntoView();
    }
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
  const handleOnClickCacTerms = () => {
    setCacTerms(true);
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
  const showCoBrowseCodeBox = async () => {
    window.location = "javascript:acquireIO.startCoBrowseCodeBox()";
    try {
      await saveAcquireClick(customerEmail, applicationNumber);
    } catch (error) {
      ErrorLogger(" Error in saveAcquireClick API", error);
    }
  }
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <DocumentIdAndPhotoId
          applicationNumber={applicationNumber}
          customerEmail={customerEmail}
          next={handleNext}
          prev={handleBack}
          reset={handleReset}
          steps={steps}
          activeStep={activeStep}
        />;
      case 1:
        return <IncomeVerification
          applicationNumber={applicationNumber}
          customerEmail={customerEmail}
          next={handleNext}
          prev={handleBack}
          reset={handleReset}
          steps={steps}
          activeStep={activeStep}
        />;
      case 2:
        return <BankAccountVerification
          applicationNumber={applicationNumber}
          customerEmail={customerEmail}
          next={handleNext}
          prev={handleBack}
          reset={handleReset}
          steps={steps}
          activeStep={activeStep}
        />;
      case 3:
        return <VehiclePhotos
          applicationNumber={applicationNumber}
          customerEmail={customerEmail}
          next={handleNext}
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
        <a>{' '}<span data-testid = "creditContact" className={classes.linkDesign} onClick={() => { handleOnClickCreditTerms(); }}>Credit and Contact Authorization,</span></a>
        <a>{' '}<span data-testid = "websiteTerms"className={classes.linkDesign} onClick={() => { handleOnClickCacTerms(); }}>Website Terms of Use,</span></a>
        <a>{' '}<span data-testid = "websitePrivacy" className={classes.linkDesign} onClick={() => { handleOnClickWebsiteTerms(); }}>Website Privacy Statement</span></a>
      </>
    );
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
            <Typography className="stepperHeading">
              Thank you for verifying your email.
            </Typography>
            <Typography className="stepperParagraph">
              As discussed with your Mariner Finance team member, your application
              requires that you verify your identity as well as your income. Please
              acknowledge and sign our disclosures to proceed.
            </Typography>
            <Grid container>
              {agreeTerms || verificationData?.data?.messageType === 'error' ?
                <Grid className="acknowledgeText">
                  <Typography>
                    Consent documents that were acknowledged
                    <br />
                    {showConsentsLinks()}
                  </Typography>
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
                      <Grid>
                        <Checkbox
                          checked={agreeTerms}
                          data-testid = "checkboxTerms"
                          onChange={handleChange}
                          color="primary"
                          inputProps={{ "aria-label": "primary checkbox" }}
                        />
                      </Grid>
                      <Grid className="acknowledgeText">
                        <Typography>
                          By clicking this box you acknowledge that you have received,
                          reviewed and agree to the following terms and conditions:
                          <br />
                          {showConsentsLinks()}
                        </Typography>
                      </Grid>
                    </>
                  }
                </>
              }

            </Grid>
            <Grid data-testid ="checkboxGrid" id="checkBoxGrid" className={agreeTerms ? classes.showCheckbox : classes.hideCheckbox}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                  <Step key={Math.random() * 1000}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                      <span>{getStepContent(index)}</span>
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
              <Grid className={`${ classes.secureLoanButton } ${ collaborateOption === 'on' ? classes.showCheckbox : classes.hideCheckbox }`}>
                <Typography className={classes.secureLoanText}>
                  Click the Button below to begin the secure loan closing process
                </Typography>
                <ButtonPrimary
                data-testid = "closing_button"
                  onClick={showCoBrowseCodeBox}
                  stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px"}'>
                  Secure Closing Portal
                </ButtonPrimary>
              </Grid>
            </Grid>
          </Grid>
          <Popup data-testid = "eSign" popupFlag={eSign} title='E-Signature Disclosure and Consent' closePopup={handleOnClickeSignClose}>
            <Typography className="printPage" onClick={() => window.print()}>Print This Page</Typography>
            <RenderContent disclosureLink="/eSign" />
          </Popup>
          <Popup data-testid = "creditTerms" popupFlag={creditTerms} title='Credit and Contact Authorization' closePopup={handleOnClickCreditTermsClose}>
            <Typography className="printPage" onClick={() => window.print()}>Print This Page</Typography>
            <RenderContent disclosureLink="/credit" findContent="<h2>Credit and Contact Authorization</h2>" replaceContent='' />
          </Popup>
          <Popup data-testid = "cacTerms" popupFlag={cacTerms} title='Website Terms of Use' closePopup={handleOnClickCacTermsClose}>
            <Typography className="printPage" onClick={() => window.print()}>Print This Page</Typography>
            <RenderContent disclosureLink="/cacTermsOfUse" findContent="<h2>Terms Of Use</h2>" replaceContent='' />
          </Popup>
          <Popup data-testid = "websiteTerms" popupFlag={websiteTerms} title='Website Privacy Statement' closePopup={handleOnClickWebsiteTermsClose}>
            <Typography className="printPage" onClick={() => window.print()}>Print This Page</Typography>
            <RenderContent disclosureLink="/websiteAccessibility" findContent="<h2>Website Privacy Statement</h2>" replaceContent='' />
          </Popup>
        </Grid>
      }
    </Grid>
  );
}
