/*#################################################################################################################

File Name           :    PhoneNumber/index.js
Component Name      :    PhoneNumber
Functionality       :    To use this component for having Phone Number

#################################################################################################################*/

import FormControl from "@material-ui/core/FormControl";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import React, { useState } from "react";
import InputMask from "react-input-mask";

const theme = createTheme();
const PhoneNumberWrapper = ({ name, onChange, value, label, error, disabled, helperText, ...otherProps }) => {
  //Set Formik field
  // const [field, mata] = useField(name);
  const [ unmaskedval, setUnMaskedVal ] = useState(value);
  const [ phone, setPhone ] = useState(phone);
  const handleChange = (event) => {
    if (onChange) {
      onChange(event);
    }
    let x = event.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    event.target.value = !x[ 2 ] ? x[ 1 ] : '(' + x[ 1 ] + ') ' + x[ 2 ] + (x[ 3 ] ? '-' + x[ 3 ] : '');
    setUnMaskedVal(event.target.value);
    setPhone(event.target.value);
  };

  return (
    <FormControl style={ { width: "100%" } }>

      <MuiThemeProvider theme={ theme }>
        <InputMask
          style={ { width: "100%" } }
          mask="(999) 999-9999"
          value={ phone }
          name={ name }
          onChange={ handleChange }
          data-test-id="phone"
          maskChar=""
          { ...otherProps }
        >
          { () => <TextField label={ label }
            name={ name }
            value={ phone }
            error={ error }
            placeholder="Enter Phone Number"
            helperText={ helperText }
            inputProps={ { "data-test-id": "phone", "unmaskedval": unmaskedval, disabled: disabled } } /> }
        </InputMask>
      </MuiThemeProvider>
    </FormControl>
  );
};

PhoneNumberWrapper.propTypes = {
  name: PropTypes.string.isRequired,
};

export default PhoneNumberWrapper;