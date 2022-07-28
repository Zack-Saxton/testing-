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

const PhoneNumberPopUp = ({phoneNumberList, setSelection}) => {
  const classes = useStylesMFA();
  const [value, setValue] = useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const securityCode = (number) => {
      return (
    <div data-testid = "securitycode_func" className={classes.securityCodeText}>
      <span>{`Get a code on (***) *** ${number ? number.substr(-4) : ""}`}</span>
    </div>
    )
  }

  return (
    <Grid data-testid = "PhoneNumberPopUp_component">           
            <Typography className={classes.twoStepParagraph}>
              Select from one of your preferred phone number(s) to receive your passcode.
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
                {phoneNumberList?.map((phoneNumber, index) => 
                   <FormControlLabel style={{ display: 'flex'}}
                      key={index}
                      className={classes.smallRadioButton}
                      value={phoneNumber.number}
                      control={<Radio data-testid ={`radio_primary_phone_${index}`} color="primary" onClick={()=>setSelection(`${phoneNumber.number}`)} />}
                      label={securityCode(phoneNumber.number)}
                 />
                )}
              </RadioGroup>
            </FormControl>
          </Grid>
  )
}

PhoneNumberPopUp.propTypes = {
  setSelection: PropTypes.func,
  phoneNumberList : PropTypes.array
};

export default PhoneNumberPopUp