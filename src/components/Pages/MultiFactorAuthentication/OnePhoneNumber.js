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
      passCodeResponse?.data?.passCode ? navigate('/MFA-OTP', {state: {phoneNumber : selectionValue, mfaQueries:mfaDetails}}) : toast.error(passCodeResponse.data?.Message);   
    } else if (selectionValue === 'security questions' && securityQuestionsSaved) {
      navigate('/MFA-SecurityQuestions', {state: {mfaSecurityQuestions: mfaDetails}});
    } else {
      selectionValue === 'security questions' && !securityQuestionsSaved && navigate('/mfa-kbaQuestions', {state: {mfaSecurityQuestions: mfaDetails}})
    }
  }

  const securityCode = (
    <div className={classes.securityCodeText}>
      Security code via SMS :<br />
      <span>{`Get a code on (***) *** ${phoneNumber?.substr(-4)}`}</span>
    </div>
  );
  const securityQuestions = (
    <div className={classes.securityQuestions}>
      Security Questions : <br />
      Answer security questions{" "}
    </div>
  );

  return (
    <div className={isLoading ? classes.loadingOn : classes.loadingOff}>
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
              `For your security we are asking you to verify your identity.
              Select one of the following methods to complete your login.`
              :
              `For your security we are asking you to verify your identity.
              Select Security Question Verification to complete your login.`
              }
            </Typography>
          <FormControl
              className={classes.radioButtonwrap}
              component="fieldset"
            >
              <RadioGroup
                className={classes.radioGroupWrap}
                id="textAndCallss"
                aria-label="method"
                name="method"
                row={true}
                value={value}
                onChange={handleChange}
              >
                {phoneNumberSaved &&
                    <FormControlLabel
                      id="FormControlLabel"
                      className={classes.smallRadioButton}
                      value="phone"
                      control={<Radio color="primary" onClick={()=>setSelection(`${phoneNumber}` )} />}
                      label={securityCode}
                    />
                }
                    <FormControlLabel
                      id="FormControlLabel"
                      className={classes.smallRadioButton}
                      value="security questions"
                      control={<Radio color="primary" onClick={()=>setSelection('security questions')} />}
                      label={securityQuestions}
                    />
              </RadioGroup>
            </FormControl>
            <Grid className={classes.nextButtonGrid} container>
              <ButtonPrimary stylebutton='{"color":""}' disabled={selection} onClick={handleClick}>Next</ButtonPrimary>
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