import React, {useState} from 'react'
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from "@mui/material";
import { useStylesMFA } from "./Style";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";

const PhoneNumberPopUp = ({cellPhoneNumber, optionalPhoneNumber, setSelection}) => {
  const classes = useStylesMFA();
  const [value, setValue] = useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const securityCode = (number) => {
    return (
    <div className={classes.securityCodeText}>
      <span>{`Get a code on (***) *** ${number.substr(-4)}`}</span>
    </div>
    )
  }

  return (
    <Paper className={classes.twoStepPaper}>
            
            <Typography className={classes.twoStepParagraph}>
              Select one of your preferred phone number to receive your passcode.
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
                  value={cellPhoneNumber}
                  control={<Radio color="primary" onClick={()=>setSelection(`${cellPhoneNumber}`)} />}
                  label={securityCode(cellPhoneNumber)}
                />
                <FormControlLabel
                  id="FormControlLabel"
                  className={classes.smallRadioButton}
                  value={optionalPhoneNumber}
                  control={<Radio color="primary" onClick={()=>setSelection(`${optionalPhoneNumber}`)} />}
                  label={securityCode(optionalPhoneNumber)}
                />
              </RadioGroup>
            </FormControl>
          </Paper>
  )
}

PhoneNumberPopUp.propTypes = {
 
  cellPhoneNumber: PropTypes.string,
  optionalPhoneNumber: PropTypes.string,
  setSelection: PropTypes.func,
};

export default PhoneNumberPopUp