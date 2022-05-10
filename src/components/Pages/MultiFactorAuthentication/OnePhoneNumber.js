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

const OnePhoneNumber = ({phoneNumber, setSelection}) => {

  const classes = useStylesMFA();
  const [value, setValue] = useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const securityCode = (
    <div className={classes.securityCodeText}>
      Security code via SMS :<br />
      <span>Get a code on {phoneNumber}</span>
    </div>
  );
  const securityQuestions = (
    <div className={classes.securityQuestions}>
      Security Questions : <br />
      Answer security questions{" "}
    </div>
  );

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
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  id="FormControlLabel"
                  className={classes.smallRadioButton}
                  value="phone"
                  control={<Radio color="primary" onClick={()=>setSelection({deliveryMethod: 'phone',customerPhone: `${phoneNumber}` })} />}
                  label={securityCode}
                />
                <FormControlLabel
                  id="FormControlLabel"
                  className={classes.smallRadioButton}
                  value="security questions"
                  control={<Radio color="primary" onClick={()=>setSelection({deliveryMethod: 'security questions'})} />}
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
  )
}

OnePhoneNumber.propTypes = {
 
  phoneNumber: PropTypes.string,
  setSelection: PropTypes.func,
};

export default OnePhoneNumber