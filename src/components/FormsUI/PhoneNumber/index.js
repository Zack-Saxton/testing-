/*#################################################################################################################

File Name           :    PhoneNumber/index.js
Component Name      :    PhoneNumber
Functionality       :    To use this component for having Phone Number

#################################################################################################################*/

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import '../iframe';

const phoneNumberMask = (values) => {
  let phoneNumber = values.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
  values = !phoneNumber[ 2 ] ? phoneNumber[ 1 ] : '(' + phoneNumber[ 1 ] + ') ' + phoneNumber[ 2 ] + (phoneNumber[ 3 ] ? '-' + phoneNumber[ 3 ] : '');
  return (values);
}
const maskPhoneNumberWithAsterisk = (phoneNumber) => {
  let firstNumber = phoneNumberMask(phoneNumber).slice(0, 10);
  return firstNumber.replace(/\d/g, '*') + phoneNumber.slice(10);
} 
const PhoneNumberWrapper = ({ name, onChange, value, label, error, disabled, helperText, phoneReset, setPhoneReset, ...otherProps }) => {
  //Set Formik field
  // const [field, mata] = useField(name);
  const [ phoneNumberValue, setPhoneNumberValue ] = useState(value);
  const [ phoneNumberCurrentValue, setPhoneNumberCurrentValue ] = useState(value);
  const handleChange = (event) => {
    let phoneNumber = event.target.value.trim().replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    event.target.value = !phoneNumber[ 2 ] ? phoneNumber[ 1 ] : '(' + phoneNumber[ 1 ] + ') ' + phoneNumber[ 2 ] + (phoneNumber[ 3 ] ? '-' + phoneNumber[ 3 ] : '');
    setPhoneNumberValue(event.target.value);
    setPhoneNumberCurrentValue((event.target.value));
    if (onChange) {
      onChange(event);
    }
  };
  useEffect(() => {
    setPhoneNumberValue(value);
    setPhoneNumberCurrentValue(maskPhoneNumberWithAsterisk(phoneNumberMask(value)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ]);

  useEffect(() => {
    if(phoneReset){
    let manualEvent = {
      target: {
        value: value,
        name: name
      }
    }
    handleChange(manualEvent); 
    setPhoneReset(false);
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ phoneReset ]);

  const updateActualValue = (event) => {
    setPhoneNumberCurrentValue(phoneNumberMask(phoneNumberValue));
  }
  const updateMaskValue = (event) => {
    setPhoneNumberCurrentValue(maskPhoneNumberWithAsterisk(phoneNumberMask(phoneNumberValue))) ;
  }

  return (
    <FormControl style={{ width: "100%" }}>
      <TextField label={label}
        name={name}
        value={phoneNumberCurrentValue}
        variant="standard"
        error={error}
        onChange={(event)=>{
          handleChange(event);
        }}
        placeholder="Enter Phone Number"
        helperText={helperText}
        inputProps={{ "data-testid": "phone", "unmaskedval": phoneNumberCurrentValue, disabled: disabled }}
        onBlur={(event)=>{

          updateMaskValue(event);
        }}
        onFocus={ updateActualValue }
         />
    </FormControl>
  );
};

PhoneNumberWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  setPhoneReset: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  phoneReset: PropTypes.bool
};

export default PhoneNumberWrapper;