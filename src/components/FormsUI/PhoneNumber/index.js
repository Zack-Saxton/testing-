/*#################################################################################################################

File Name           :    PhoneNumber/index.js
Component Name      :    PhoneNumber
Functionality       :    To use this component for having Phone Number

#################################################################################################################*/

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import React, { useState } from "react";
import './PhoneNumber.css'

const PhoneNumberWrapper = ({ name, onChange, value, label, error, disabled, helperText, ...otherProps }) => {
  //Set Formik field
  // const [field, mata] = useField(name);
  const [ unmaskedval, setUnMaskedVal ] = useState(value);

  const handleChange = (event) => {
    let phoneNumber = event.target.value.trim().replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    event.target.value = !phoneNumber[ 2 ] ? phoneNumber[ 1 ] : '(' + phoneNumber[ 1 ] + ') ' + phoneNumber[ 2 ] + (phoneNumber[ 3 ] ? '-' + phoneNumber[ 3 ] : '');
    setUnMaskedVal(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <FormControl style={ { width: "100%" } }>
        <TextField label={ label }
          name={ name }
          value={ unmaskedval }
          variant="standard"
          error={ error }
          onChange={ handleChange }
          placeholder="Enter Phone Number"
          helperText={ helperText }
          inputProps={ { "data-test-id": "phone", "unmaskedval": unmaskedval, disabled: disabled } } />
    </FormControl>
  );
};

PhoneNumberWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  helperText: PropTypes.string
};

export default PhoneNumberWrapper;