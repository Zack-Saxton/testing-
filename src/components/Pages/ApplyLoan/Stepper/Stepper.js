import React, { useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import EmailVerification from "./EmailVerification";
import PhoneVerification from "./PhoneVerification";
import FinancialInformation from "./FinancialInformation";
import DocumentPhoto from "./DocumentPhoto";
import VerificationQuestion from "./VerificationQuestion";
import IncomeVerification from "./IncomeVerification";
import BankAccountVerification from "./BankAccountVerification";
import { ButtonPrimary } from "../../../FormsUI";
import { NavLink } from "react-router-dom";
import { Grid } from "@material-ui/core";
import APICall from '../../../App/APIcall';
import "./VerticalLinearStepper.css"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    paddingBottom: "30px",
  },
  button_div: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
  steplabel: {
    fontSize: "15px",
    fontWeight: "600",
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return [
    "Email Verification",
    "Phone Verification",
    "Financial Information",
    "ID Document & Photo",
    "ID Verification Questions",
    "Bank Account Verification",
    "Income Verification",
  ];
}





export default function VerticalLinearStepper() {

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState();
  const steps = getSteps();

  const getApplicationStatus = async () => {
let data = {

};
    let res = await APICall("/verification/verification_steps_cac", data, 'POST', true);
    let tabPosition;
    tabPosition = '';
    if(res?.data?.data?.email === false){
      tabPosition = 0;
    }
    if(res?.data?.data?.phone_verification === false && tabPosition === ''){
      tabPosition = 1;
    }
    if(res?.data?.data?.financial_information === false && tabPosition === ''){
      tabPosition = 2;
    }
    if(res?.data?.data?.id_document === false && tabPosition === ''){
      tabPosition = 3 ;
    }
    if(res?.data?.data?.id_questions === false && tabPosition === ''){
      tabPosition = 4;
    }
    if(res?.data?.data?.id_photo === false && tabPosition === ''){
      tabPosition = 3;
    }
    if(res?.data?.data?.bank_account_information === false && tabPosition === ''){
      tabPosition = 5;
    }
    if(res?.data?.data?.bank_account_verification === false && tabPosition === ''){
      tabPosition = 5;
    }
    if(res?.data?.data?.income_verification === false && tabPosition === ''){
      tabPosition = 6;
    }
   setActiveStep(tabPosition);
  }

  useEffect(() => {
    getApplicationStatus();
  }, []);




  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    if (activeStep === 0) {
      setActiveStep(0);
    }
    if (activeStep === 1) {
      setActiveStep(1);
    }
    if (activeStep === 2) {
      setActiveStep(2);
    }
    if (activeStep === 3) {
      setActiveStep(3);
    }
    if (activeStep === 4) {
      setActiveStep(4);
    }
    if (activeStep === 5) {
      setActiveStep(5);
    }
    if (activeStep === 6) {
      setActiveStep(6);
    }
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <EmailVerification next={handleNext} prev={handleBack} reset={handleReset} steps={steps} activeStep = {activeStep} classes= {classes} />;
      case 1:
        return <PhoneVerification  next={handleNext} prev={handleBack} reset={handleReset} steps={steps} activeStep = {activeStep} classes= {classes} />;
      case 2:
        return <FinancialInformation  next={handleNext} prev={handleBack} reset={handleReset} steps={steps} activeStep = {activeStep} classes= {classes} />;
      case 3:
        return <DocumentPhoto  next={handleNext} prev={handleBack} reset={handleReset} steps={steps} activeStep = {activeStep} classes= {classes} />;
      case 4:
        return <VerificationQuestion  next={handleNext} prev={handleBack} reset={handleReset} steps={steps} activeStep = {activeStep} classes= {classes} />;
      case 5:
        return <BankAccountVerification  next={handleNext} prev={handleBack} reset={handleReset} steps={steps} activeStep = {activeStep} classes= {classes} />;
      case 6:
        return <IncomeVerification  next={handleNext} prev={handleBack} reset={handleReset} steps={steps} activeStep = {activeStep} classes= {classes} />;
      default:
        return "Unknown step";
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>
              {<span className={classes.steplabel}>{label}</span>}
            </StepLabel>
            <StepContent>
              <div>{getStepContent(index)}</div>
              <div className={classes.actionsContainer}>
                {/* <div className={classes.button_div} >
                  
                  <ButtonSecondary
                    stylebutton='{"margin-right": "10px", "color":"" }'
                    onClick={handleReset}
                    id = "button_stepper_reset"
                  >
                    Reset
                  </ButtonSecondary>
                 
                  <ButtonSecondary
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    id = "button_stepper_prev"
                    stylebutton='{"margin-right": "10px", "color":"" }'
                  >
                    Prev
                  </ButtonSecondary>
                  <ButtonPrimary
                    variant="contained"
                    color="primary"
                    id = "button_stepper_next"
                    stylebutton='{"margin-right": "10px", "color":"" }'
                    onClick={handleNext}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </ButtonPrimary>
                </div> */}
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Grid style={{ paddingTop: "20px" }}>
            <NavLink
              to="/customers/receiveYourMoney"
              style={{ textDecoration: "none" }}
            >
              <ButtonPrimary stylebutton='{ "color":"" }'>
                Click here for application status
              </ButtonPrimary>
            </NavLink>
          </Grid>
        </Paper>
      )}
    </div>
  );
}
