/* eslint-disable react/prop-types */
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
import ScrollToTopOnMount from "../ScrollToTop";
import { useMutation } from 'react-query';
import {SendLoginPassCode} from "../../Controllers/MFAController"


const MFASelection = ({ securityQuestionsSaved, phoneNumberList, mfaDetails }) => {

  const classes = useStylesMFA();
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [popUp, setPopUp] = useState(false);
  const [selection, setSelection] = useState();
  const {mutateAsync, isLoading} = useMutation(SendLoginPassCode);
  const SECURITY_QUESTIONS = "security questions";
  const PHONE = "phone"
  const DISABLE_CONDITION = value === PHONE && selection !== SECURITY_QUESTIONS && Boolean(selection)

  const buttonDisable = () => {
    if(!value && !selection) {
      return true
    } else if ((value === SECURITY_QUESTIONS && selection === SECURITY_QUESTIONS) || (DISABLE_CONDITION)){
      return false
    } else {
      return true
    }
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handlePopUp = () => {
    setPopUp(true);
	};
  const handlePopUpClose = () => {
    setPopUp(false);
  }

  const handleClick = async() =>{
    if (selection !== SECURITY_QUESTIONS){ 
      const passCodeResponse = await mutateAsync(selection);
      console.log(passCodeResponse); //Left this console log intentionally for QA
      passCodeResponse?.data?.passcodeInTextMessage ? navigate('/MFA-OTP', {state: {phoneNumber : selection, mfaQueries:mfaDetails, currentFlow : true}}) : toast.error(passCodeResponse.data?.Message); //Navigate to OTP page or else show error.  
    } else if (selection === SECURITY_QUESTIONS && securityQuestionsSaved) {
      navigate('/MFA-SecurityQuestions', {state: {mfaSecurityQuestions: mfaDetails, currentFlow : true}});
    } else {
      selection === SECURITY_QUESTIONS && !securityQuestionsSaved && navigate('/mfa-kbaQuestions', {state: {mfaSecurityQuestions: mfaDetails, currentFlow : true}})
    }
  }

  const securityCode = (
    <div className={classes.securityCodeText}>
      <b>Select a phone number to receive an authentication PIN via text :</b><br />
      {
        phoneNumberList?.length === 1 
        ? <span>{`Get a code on (***) *** ${phoneNumberList[0]?.number.substr(-4)}`}</span>
        : (DISABLE_CONDITION ? <span>To phone number : {`(***) *** ${selection?.substr(-4)}`}</span> : <span>Get a code on your preferred phone number</span>)
      } 
    </div>
  );
  const securityQuestions = (
    <div className={classes.securityQuestions}>
      <b>Security Questions :</b> <br />
      Answer Identity Verification Questions.{" "}
    </div>
  );

  return (
    <div className={isLoading ? classes.loadingOn : classes.loadingOff} >
      <ScrollToTopOnMount />
      <Grid data-testid="mfa_Selection">
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
              Please complete Multi Factor Authentication
            </Typography>
            <Typography className={classes.twoStepParagraph} data-testid="title1">
            
            {phoneNumberList?.length 
              ? 
              `For your security, please select a method to verify your identity.`
              :
              `For your security, please select security question verification to complete your login.`
              } 
              {/* Phone Number Array Length is 0, then only security question */}
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
                {phoneNumberList?.length > 0 
                ?
                <FormControlLabel
                  id="FormControlLabel"
                  className={classes.smallRadioButton}
                  value={PHONE}
                  control={<Radio color="primary" data-testid="phoneSelection"
                                  onClick={phoneNumberList.length > 1 
                                              ? () => handlePopUp()
                                              : () => setSelection(`${phoneNumberList[0].number}` )
                                            } 
                                            />}
                  label={securityCode}
                />
                :
                null
                  }
                <FormControlLabel
                  id="FormControlLabel"
                  className={classes.smallRadioButton}
                  value={SECURITY_QUESTIONS}
                  control={<Radio color="primary" data-testid="questionSelection" onClick={()=>setSelection(SECURITY_QUESTIONS)} />}
                  label={securityQuestions}
                />
              </RadioGroup>
            </FormControl>
            <Grid className={classes.nextButtonGrid} container>
              <ButtonPrimary data-testid= "next_Step" stylebutton='{"color":""}' disabled={buttonDisable()} onClick={handleClick}> {value ? (value === PHONE ? "Send PIN Code" : "Proceed to Questions") : "Next"}</ButtonPrimary>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Popup maxWidth="sm" popupFlag={popUp} closePopup={handlePopUpClose} title="Select your preferred Phone Number">
        <PhoneNumberPopUp phoneNumberList={phoneNumberList} setSelection={setSelection}/>
      </Popup>
    </div>
  )
}

MFASelection.propTypes = {
  securityQuestionsSaved: PropTypes.bool,
  phoneNumberList: PropTypes.array,
  mfaDetails: PropTypes.object,
}

export default MFASelection