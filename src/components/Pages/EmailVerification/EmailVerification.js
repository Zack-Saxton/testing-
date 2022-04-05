import React, { useEffect, useState } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useLocation } from "react-router-dom";
import { useQuery } from 'react-query';
import "./EmailVerification.css";
import DocumentIdAndPhotoId from "./DocumentIdAndPhotoId";
import IncomeVerification from "./IncomeVerification";
import BankAccountVerification from "./BankAccountVerification";
import VehiclePhotos from "./VehiclePhotos";
import { ButtonPrimary } from "../../../components/FormsUI";
import { useStylesEmailVerification } from "./Style";
import { validateActivationToken, saveConsentStatus } from "../../Controllers/EmailVerificationController";

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
  const useQueryURL = () => new URLSearchParams(useLocation().search);
  const queryString = useQueryURL();
  const activationToken = queryString.get("activation_token");
  const email = queryString.get("email");
  const applicationNumber = queryString.get("applicationNumber");
  const autoVerification = queryString.get("autoVerification");
  const collaborateOption = queryString.get("collaborateOption");

  const [activeStep, setActiveStep] = useState(0);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ consentLoading, setConsentLoading ] = useState(false);
  const [ verificationInfo, setVerificationInfo ] = useState(null);
  const steps = getSteps();
  const { isLoading, data: verificationData } = useQuery([ 'branch-mail-verification-data', activationToken, email, applicationNumber ], () => validateActivationToken(activationToken, email, applicationNumber));
  useEffect(() => {
    setVerificationInfo(verificationData);
    let applicationData = verificationData?.data?.emailVerificationRecord?.sorad?.applcationData ?? [];
    let currentApplication = applicationData.filter((application, index) => {
        return application.applicationNumber === applicationNumber;
      });
    if(currentApplication.length && currentApplication[0]?.consents){
      setAgreeTerms(true);
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ verificationData ]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = async (event) => {    
    setConsentLoading(true);
    let response = await saveConsentStatus(email, applicationNumber);
    if (response) {
      setAgreeTerms(event.target.checked);
      setLoading(false);
    }
    setConsentLoading(false);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <DocumentIdAndPhotoId 
          applicationNumber= { applicationNumber } 
          customerEmail={ email } 
          next={ handleNext }
					prev={ handleBack }
					reset={ handleReset }
					steps={ steps }
					activeStep={ activeStep }
          />;
      case 1:
        return <IncomeVerification 
          applicationNumber= { applicationNumber } 
          customerEmail={ email } 
          next={ handleNext }
          prev={ handleBack }
          reset={ handleReset }
          steps={ steps }
          activeStep={ activeStep }
        />;
      case 2:
        return <BankAccountVerification 
          applicationNumber= { applicationNumber } 
          customerEmail={ email } 
          next={ handleNext }
          prev={ handleBack }
          reset={ handleReset }
          steps={ steps }
          activeStep={ activeStep }
          />;
      case 3:
        return <VehiclePhotos 
          applicationNumber= { applicationNumber } 
          customerEmail={ email } 
          next={ handleNext }
          prev={ handleBack }
          reset={ handleReset }
          steps={ steps }
          activeStep={ activeStep }
        />;
      default:
        return "Unknown step";
    }
  }

  return (    
    <Grid>
      { isLoading ? 
        <Grid className="circleprog" style={ { width: "100%", textAlign: "center", margin: "20px 0px" } }>
          <CircularProgress />
        </Grid>
      : 
        <Grid className="emailVirificationWrap">
          <Grid>
            <h2 className="documetVirificationHeading">
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
              requires that your verify identity as well as your income. Please
              acknowledge and sign our disclosures to proceed.
            </Typography>
            <Grid container>            
              { agreeTerms ? 
                  <Grid className="acknowledgeText">
                  <Typography>
                    Consent documents that were acknowledged  
                    <br />
                    <a
                      href="https://loans.marinerfinance.com/application/form"
                      target="blank"
                    >
                      E-Signature Disclosure and Consent
                    </a>
                    <a
                      href="https://loans.marinerfinance.com/application/form"
                      target="blank"
                    >
                      Credit and Contact Authorization
                    </a>
                    <a
                      href="https://loans.marinerfinance.com/application/form"
                      target="blank"
                    >
                      Website Terms of Use
                    </a>
                    <a
                      href="https://loans.marinerfinance.com/application/form"
                      target="blank"
                    >
                      Website Privacy Statement
                    </a>
                  </Typography>
                </Grid> 
              : 
              <>
              { consentLoading ? 
                <Grid className="circleprog" style={ { width: "100%", textAlign: "center", margin: "20px 0px" } }>
                <CircularProgress />
                </Grid> 
              :
                <>
                  <Grid>
                    <Checkbox
                      checked={agreeTerms}
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
                      <a
                        href="https://loans.marinerfinance.com/application/form"
                        target="blank"
                      >
                        E-Signature Disclosure and Consent
                      </a>
                      <a
                        href="https://loans.marinerfinance.com/application/form"
                        target="blank"
                      >
                        Credit and Contact Authorization
                      </a>
                      <a
                        href="https://loans.marinerfinance.com/application/form"
                        target="blank"
                      >
                        Website Terms of Use
                      </a>
                      <a
                        href="https://loans.marinerfinance.com/application/form"
                        target="blank"
                      >
                        Website Privacy Statement
                      </a>
                    </Typography>
                  </Grid>
                </>                
              }              
              </>            
              }
              
            </Grid>
            <Grid className={ agreeTerms ? classes.showCheckbox : classes.hideCheckbox }>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                  <Step key={Math.random() * 1000}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                      <span>{getStepContent(index)}</span>                    
                    </StepContent>
                    ``
                  </Step>
                ))}
              </Stepper>

              <Grid className={classes.secureLoanButton}>
                <Typography className={classes.secureLoanText}>
                  Click the Button below to begin the secure loan closing process
                </Typography>
                <ButtonPrimary stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px"}'>
                  Secure Closing Portal
                </ButtonPrimary>
              </Grid>
            </Grid>
            {activeStep === steps.length && (
              <Paper square elevation={0} className={classes.resetContainer}>
                <Typography>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={handleReset} className={classes.button}>
                  Reset
                </Button>
              </Paper>
            )}
          </Grid>
        </Grid>
      }      
    </Grid>
  );
}
