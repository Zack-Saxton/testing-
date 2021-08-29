import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import EmailVerification from './EmailVerification';
import PhoneVerification from './PhoneVerification';
import FinancialInformation from './FinancialInformation';
import DocumentPhoto from './DocumentPhoto';
import VerificationQuestion from './VerificationQuestion';
import IncomeVerification from './IncomeVerification';
import BankAccountVerification from './BankAccountVerification'
import {ButtonPrimary, ButtonSecondary} from "../../../FormsUI";
import { NavLink } from "react-router-dom";
import { Grid } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingBottom: "30px"
  },
  button_div: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
  steplabel:{
fontSize:"15px",
fontWeight: "600"
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Email Verification', 'Phone Verification', 'Financial Information','ID Document & Photo',
  'ID Verification Questions', 'Bank Account Verification', 'Income Verification'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <EmailVerification />
    case 1:
      return <PhoneVerification />
    case 2:
      return <FinancialInformation />
    case 3:
        return <DocumentPhoto /> 
    case 4:
      return <VerificationQuestion /> 
    case 5:
      return <BankAccountVerification /> 
    case 6:
      return <IncomeVerification /> 
    default:
      return 'Unknown step';
  }
}

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    if(activeStep == 0){
    setActiveStep(0);
    }
    if(activeStep == 1){
      setActiveStep(1);
      }
      if(activeStep == 2){
        setActiveStep(2);
        }
        if(activeStep == 3){
          setActiveStep(3);
          }
          if(activeStep == 4){
            setActiveStep(4);
            }
            if(activeStep == 5){
              setActiveStep(5);
              }
              if(activeStep == 6){
                setActiveStep(6);
                }
  };

  return (
    <div className={classes.root} >
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel  >
            {<span className={classes.steplabel}>{label}</span>}</StepLabel>
            <StepContent>
              <Typography >{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div className={classes.button_div}>
                <ButtonSecondary
                    
                    
                    stylebutton='{"margin-right": "10px", "color":"" }'
                    onClick={handleReset}
                   
                  >
                    Reset
                  </ButtonSecondary>
                  <ButtonSecondary
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    stylebutton='{"margin-right": "10px", "color":"" }'
                   
                   
                  >
                    Prev
                  </ButtonSecondary>
                  <ButtonPrimary
                    variant="contained"
                    color="primary"
                    stylebutton='{"margin-right": "10px", "color":"" }'
                    onClick={handleNext}
                   
                   
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </ButtonPrimary>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Grid style={{paddingTop:"20px"}}>
          <NavLink
                      to="/customers/receiveyourmoney"
                      style={{ textDecoration: "none" }}
                    >
          <ButtonPrimary   stylebutton='{ "color":"" }'>
            Click here for application status
          </ButtonPrimary>
          </NavLink>
          </Grid>
        </Paper>
      )}
    </div>
  );
}
