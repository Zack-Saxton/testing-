import React, {useState} from 'react'
import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography
} from "@mui/material";
import { useStylesMFA } from "./Style";
import PropTypes from "prop-types";

const PhoneNumberPopUp = (props) => {

let cellPhoneNumber = props.cellPhoneNumber;
let optionalPhoneNumber = props.optionalPhoneNumber;
let mfaPhoneNumber = props.mfaPhoneNumber;
let setSelection = props.setSelection;

  const classes = useStylesMFA();
  const [value, setValue] = useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const securityCode = (number) => {
      return (
    <div data-testid = "securitycode_func" className={classes.securityCodeText}>
      <span>{`Get a code on (***) *** ${number !== undefined ? number.substr(-4) : ""}`}</span>
    </div>
    )
  }

  return (
    <Grid data-testid = "PhoneNumberPopUp_component">
            
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
                  className={classes.smallRadioButton}
                  value={cellPhoneNumber}
                  control={<Radio data-testid = "radio_primary_phone" color="primary" onClick={()=>setSelection(`${cellPhoneNumber}`)} />}
                  label={securityCode(cellPhoneNumber)}
                />
                <FormControlLabel style={{ display: optionalPhoneNumber ? 'flex' : 'none'}}
                  className={classes.smallRadioButton}
                  value={optionalPhoneNumber}
                  control={<Radio color="primary" onClick={()=>setSelection(`${optionalPhoneNumber}`)} />}
                  label={securityCode(optionalPhoneNumber)}
                />
                <FormControlLabel style={{ display: mfaPhoneNumber ? 'flex' : 'none'}}
                  className={classes.smallRadioButton}
                  value={mfaPhoneNumber}
                  control={<Radio color="primary" onClick={()=>setSelection(`${mfaPhoneNumber}`)} />}
                  label={securityCode(mfaPhoneNumber)}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
  )
}

PhoneNumberPopUp.propTypes = {
  cellPhoneNumber: PropTypes.string,
  optionalPhoneNumber: PropTypes.string,
  mfaPhoneNumber : PropTypes.string,
  setSelection: PropTypes.func,
};

export default PhoneNumberPopUp