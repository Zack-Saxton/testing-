import React from "react";
import { makeStyles } from "@mui/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import "./EmailVerification.css";
import DocumentIdAndPhotoId from "./DocumentIdAndPhotoId";
import IncomeVerification from "./IncomeVerification";
import BankAccountVerification from "./BankAccountVerification";
import VehiclePhotos from "./VehiclePhotos";
import { ButtonPrimary } from "../../../components/FormsUI";
import { useStylesEmailVerification } from "./Style";

function getSteps() {
  return [
    "ID Document & Photo",
    "Income Verification",
    "Bank Account Verification",
    "Vehicle Photos",
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <DocumentIdAndPhotoId />;
    case 1:
      return <IncomeVerification />;
    case 2:
      return <BankAccountVerification />;
    case 3:
      return <VehiclePhotos />;
    default:
      return "Unknown step";
  }
}

export default function EmailVerification() {
  const classes = useStylesEmailVerification();
  const [activeStep, setActiveStep] = React.useState(0);
  const [checked, setChecked] = React.useState(false);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Grid>
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
            <Grid>
              <Checkbox
                checked={checked}
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
          </Grid>
          <Grid>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label, index) => (
                <Step key={Math.random() * 1000}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <span>{getStepContent(index)}</span>
                    <Grid className={classes.actionsContainer}>
                      <Grid>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          className={classes.button}
                        >
                          {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                      </Grid>
                    </Grid>
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
    </Grid>
  );
}
