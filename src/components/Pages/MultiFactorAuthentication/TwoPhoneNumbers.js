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
import { ButtonPrimary, Popup } from "../../FormsUI";
import { useStylesMFA } from "./Style";
import PropTypes from "prop-types";
import PhoneNumberPopUp from './PhoneNumberPopUp';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TwoPhoneNumbers = ({cellPhoneNumber, optionalPhoneNumber, mfaPhoneNumber, setSelection, selection, selectionValue, sendPassCode, isLoading, mfaDetails, securityQuestionsSaved}) => {
  const classes = useStylesMFA();
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [popUp, setPopUp] = useState(false);
  const [singlePhoneNumberPopUp, setSinglePhoneNumberPopUp] = useState(false);
  const [mfaPhoneNumberPopUp, setMfaPhoneNumberPopUp] = useState(false);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handlePopUp = () => {
    (mfaPhoneNumber) ?  (mfaPhoneNumber === optionalPhoneNumber || mfaPhoneNumber === cellPhoneNumber)? setPopUp(true) :setMfaPhoneNumberPopUp(true): (cellPhoneNumber === optionalPhoneNumber) ? setSinglePhoneNumberPopUp(true) : setPopUp(true);
	};
  const handlePopUpClose = () => {
    setPopUp(false);
  }
  const handleSinglePhoneNumberPopUpClose = () =>{
    setSinglePhoneNumberPopUp(false);
  }
  const handleMfaPhoneNumberPopUpClose = () =>{
    setMfaPhoneNumberPopUp(false);
  }
  const handleClick = async() =>{
    if (selectionValue !== 'security questions'){ 
      const passCodeResponse = await sendPassCode(selectionValue);
      console.log(passCodeResponse); //Left this console log intentionally for QA
      passCodeResponse?.data?.passcodeInTextMessage ? navigate('/MFA-OTP', {state: {phoneNumber : selectionValue, mfaQueries:mfaDetails}}) : toast.error(passCodeResponse.data?.Message); //Navigate to OTP page or else show error.  
    } else if (selectionValue === 'security questions' && securityQuestionsSaved) {
      navigate('/MFA-SecurityQuestions', {state: {mfaSecurityQuestions: mfaDetails}});
    } else {
      selectionValue === 'security questions' && !securityQuestionsSaved && navigate('/mfa-kbaQuestions', {state: {mfaSecurityQuestions: mfaDetails}})
    }
  }

  const securityCode = (
    <div className={classes.securityCodeText}>
      Security code via SMS :<br />
      {
        selection || selectionValue?.substr(-4) == "ions" ? <span>Get a code on your preferred phone number</span> : <span>To phone number : {`(***) *** ${selectionValue?.substr(-4)}`}</span>
      }
    </div>
  );
  const securityQuestions = (
    <div className={classes.securityQuestions}>
      Security Questions : <br />
      Answer security questions{" "}
    </div>
  );

  return (
    <div className={isLoading ? classes.loadingOn : classes.loadingOff} >
      <Grid data-testid="twophoneNumber">
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
            <Typography className={classes.twoStepHeading} variant="h5" data-testid="title">
              2-Step Verification
            </Typography>
            <Typography className={classes.twoStepParagraph} data-testid="title1">
              For your security we are asking you to verify your identity.
              Select one of the following methods to complete your login.
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
                <FormControlLabel
                  id="FormControlLabel"
                  className={classes.smallRadioButton}
                  value="phone"
                  control={<Radio color="primary" data-testid="phoneSelection" onClick={() => { handlePopUp(); }} />}
                  label={securityCode}
                />
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
      <Popup maxWidth="sm" popupFlag={popUp} closePopup={handlePopUpClose} title="Select your preferred Phone Number">
        <PhoneNumberPopUp cellPhoneNumber={cellPhoneNumber} optionalPhoneNumber={optionalPhoneNumber} setSelection={setSelection}/>
      </Popup>
      <Popup maxWidth="sm" popupFlag={singlePhoneNumberPopUp} closePopup={handleSinglePhoneNumberPopUpClose} title="Select your preferred Phone Number">
        <PhoneNumberPopUp cellPhoneNumber={cellPhoneNumber} setSelection={setSelection}/>
      </Popup>
      <Popup maxWidth="sm" popupFlag={mfaPhoneNumberPopUp} closePopup={handleMfaPhoneNumberPopUpClose} title="Select your preferred Phone Number" data-testid="mfaPhoneNumber">
        <PhoneNumberPopUp cellPhoneNumber={cellPhoneNumber} optionalPhoneNumber={optionalPhoneNumber} mfaPhoneNumber={mfaPhoneNumber} setSelection={setSelection}/>
      </Popup>

    </div>
  )
}

TwoPhoneNumbers.propTypes = {
  cellPhoneNumber: PropTypes.string,
  optionalPhoneNumber: PropTypes.string,
  mfaPhoneNumber : PropTypes.string,
  setSelection: PropTypes.func,
  selection: PropTypes.bool,
  selectionValue: PropTypes.any,
  sendPassCode: PropTypes.func,
  isLoading: PropTypes.bool,
  mfaDetails: PropTypes.object,
  securityQuestionsSaved: PropTypes.bool,
};

export default TwoPhoneNumbers