import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React, {useState} from "react";
import { ButtonPrimary } from "../../FormsUI";
import "./MultiFactorAuthentication.css";
import { useStylesMFA } from "./Style";
import { useLocation } from "react-router-dom";
import OnePhoneNumber from "./OnePhoneNumber";

const MultiFactorAuthentication = () => {
  const classes = useStylesMFA();
  // const location = useLocation();

  const location = {
    "hash":"",
    "key":"f094a9ts",
    "pathname":"/MFA",
    "search":"",
    "state":{
       "mfaDetails":{
          "MFA":true,
          "opted_phone_texting":"2232223221",
          "phone_number_primary":"1231231234",
          "phone_type":"Cell",
          "securityQuestionsSaved":true,
          "unread_messages":0
       }
    }
 }
  const [selection, setSelection] = useState({});
  // console.log(location);
  // console.log(location?.state?.mfaDetails?.phone_number_primary)

  console.log(selection);

  
  const securityCode = (
    <div className={classes.securityCodeText}>
      Security code via SMS :<br />
      <span>Get a code on (***) *** 2376</span>
    </div>
  );
  const securityQuestions = (
    <div className={classes.securityQuestions}>
      Security Questions : <br />
      Answer security questions{" "}
    </div>
  );

//Display only Security Questions if there is no data about Phone Numbers
//Users having Optional Texting & Phone Type === Cell, then prompt the user to select one through Radio button & PopUp
//Users having Phone Type === Cell, but no Optional Texting ==> follow the Wireframe
//Users having Phone Type ==/== Cell, but Optional Texting ==> follow the Wireframe
//Users having Phone Type ==/==Cell, no Optional Texting ==> Display only Security Questions

// let situationOne = location?.state?.mfaDetails?.phone_type === 'Cell' && !location?.state?.mfaDetails?.opted_phone_texting && location?.state?.mfaDetails?.securityQuestionsSaved
// let situationTwo = location?.state?.mfaDetails?.phone_type !== 'Cell' && location?.state?.mfaDetails?.opted_phone_texting && location?.state?.mfaDetails?.securityQuestionsSaved
// let situationThree = location?.state?.mfaDetails?.phone_type !== 'Cell' && !location?.state?.mfaDetails?.opted_phone_texting && location?.state?.mfaDetails?.securityQuestionsSaved




//One Phone Number with no security questions
let situationOne = location?.state?.mfaDetails?.phone_type === 'Cell' && !location?.state?.mfaDetails?.opted_phone_texting && !location?.state?.mfaDetails?.securityQuestionsSaved
let situationTwo = location?.state?.mfaDetails?.phone_type !== 'Cell' && location?.state?.mfaDetails?.opted_phone_texting && !location?.state?.mfaDetails?.securityQuestionsSaved

//Phone number options with no security questions
let situationFive = location?.state?.mfaDetails?.phone_type === 'Cell' && location?.state?.mfaDetails?.opted_phone_texting && !location?.state?.mfaDetails?.securityQuestionsSaved



//One Phone number with security questions
let situationThree = location?.state?.mfaDetails?.phone_type === 'Cell' && !location?.state?.mfaDetails?.opted_phone_texting && location?.state?.mfaDetails?.securityQuestionsSaved
let situationFour = location?.state?.mfaDetails?.phone_type !== 'Cell' && location?.state?.mfaDetails?.opted_phone_texting && location?.state?.mfaDetails?.securityQuestionsSaved

//Phone number options with security questions
let situationSix = location?.state?.mfaDetails?.phone_type === 'Cell' && location?.state?.mfaDetails?.opted_phone_texting && location?.state?.mfaDetails?.securityQuestionsSaved

//no Phone Number & No Security Questions has to route to KBA ---> I need to set this in Login component


if(situationOne || situationTwo) console.log("No security Qns");
if(situationFive) console.log("options with no qns");

if(situationThree || situationFour) {
  return (
  <OnePhoneNumber 
  phoneNumber={location?.state?.mfaDetails?.phone_type === 'Cell' ? location?.state?.mfaDetails?.phone_number_primary : location?.state?.mfaDetails?.opted_phone_texting}
  setSelection={setSelection}
  />
  )
}

if(situationSix) {
  return (
    <div>
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
              >
                <FormControlLabel
                  id="FormControlLabel"
                  className={classes.smallRadioButton}
                  value="T"
                  control={<Radio color="primary" />}
                  label={securityCode}
                />
                <FormControlLabel
                  id="FormControlLabel"
                  className={classes.smallRadioButton}
                  value="M"
                  control={<Radio color="primary" />}
                  label={securityQuestions}
                />
              </RadioGroup>
            </FormControl>
            <Grid className={classes.nextButtonGrid} container>
              <ButtonPrimary stylebutton='{"color":""}'>Next</ButtonPrimary>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
}

export default MultiFactorAuthentication;
