import React, {useState} from 'react'
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { ButtonPrimary } from "../../FormsUI";
import { useStylesMFA } from "./Style";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ScrollToTopOnMount from "../ScrollToTop";


const OnePhoneNumber = ({phoneNumber, setSelection, selection, selectionValue, sendPassCode, isLoading, mfaDetails, securityQuestionsSaved, phoneNumberSaved}) => {

  const classes = useStylesMFA();
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClick = async() =>{
    if (selectionValue !== 'security questions'){ 
      const passCodeResponse = await sendPassCode(selectionValue);
      console.log(passCodeResponse); //Left this console log intentionally for QA
      passCodeResponse?.data?.passcodeInTextMessage ? navigate('/MFA-OTP', {state: {phoneNumber : selectionValue, mfaQueries:mfaDetails, currentFlow : true}}) : toast.error(passCodeResponse.data?.Message);   
    } else if (selectionValue === 'security questions' && securityQuestionsSaved) {
      navigate('/MFA-SecurityQuestions', {state: {mfaSecurityQuestions: mfaDetails, currentFlow : true}});
    } else {
      selectionValue === 'security questions' && !securityQuestionsSaved && navigate('/mfa-kbaQuestions', {state: {mfaSecurityQuestions: mfaDetails, currentFlow : true}})
    }
  }

  const securityCode = (
    <div className={classes.securityCodeText} >
      <b className='boldText'> 
      Select a phone number to receive an authentication PIN via text :
      </b><br />
      <span>{`Get a code on (***) *** ${phoneNumber?.substr(-4)}`}</span>
    </div>
  );
  const securityQuestions = (
    <div className={classes.securityQuestions}>
      <b className='boldText'>
        Security Questions :
      </b> <br />
      Answer security questionsAnswer Identity Verification Questions.{" "}
    </div>
  );

  return (
    <div data-testid = "OnePhoneNumber_component" className={isLoading ? classes.loadingOn : classes.loadingOff}>
      <ScrollToTopOnMount />
      <Grid>
        <Grid
          spacing={1}
          container
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          className={classes.twoStepWrap}
        >
          <Paper className={classes.twoStepPaper}>
            <Typography className={classes.twoStepHeading} variant="h5">
              2-Step Verification
            </Typography>
            <Typography className={classes.twoStepParagraph}>
              {phoneNumberSaved 
              ? 
              `For your security, please select a method to verify your identity.`
              :
              `For your security, please select security question verification to complete your login.`
              }
            </Typography>
          <FormControl
              className={classes.radioButtonwrap}
              component="fieldset"
            >
              <RadioGroup
                className={classes.radioGroupWrap}
                id="textAndCallss"
                data-testid = "textAndCallss"
                aria-label="method"
                name="method"
                row={true}
                value={value}
                onChange={handleChange}
              >
                {phoneNumberSaved &&
                    <FormControlLabel style={{ display: phoneNumber ? 'flex' : 'none'}}
                      id="FormControlLabel_securityCode"
                      className={classes.smallRadioButton}
                      data-testid = "securityCode"
                      value="phone"
                      control={<Radio color="primary" onClick={()=>setSelection(`${phoneNumber}` )} />}
                      label={securityCode}
                    />
                }
                    <FormControlLabel
                      id="FormControlLabel_securityQuestion"
                      className={classes.smallRadioButton}
                      data-testid = "securityQuestion"
                      value="security questions"
                      control={<Radio color="primary" onClick={()=>setSelection('security questions')} />}
                      label={securityQuestions}
                    />
              </RadioGroup>
            </FormControl>
            <Grid className={classes.nextButtonGrid} container>
              <ButtonPrimary  data-testid = "next_button" stylebutton='{"color":""}' disabled={selection} onClick={handleClick}> {value ? (value === "phone" ? "Send PIN Code" : "Proceed to Questions") : "Next"}</ButtonPrimary>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

OnePhoneNumber.propTypes = {
  phoneNumber: PropTypes.string,
  setSelection: PropTypes.func,
  selection: PropTypes.bool,
  selectionValue: PropTypes.any,
  sendPassCode: PropTypes.func,
  isLoading: PropTypes.bool,
  mfaDetails: PropTypes.object,
  securityQuestionsSaved: PropTypes.bool,
  phoneNumberSaved: PropTypes.bool,
};

export default OnePhoneNumber