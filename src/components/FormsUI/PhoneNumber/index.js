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

const theme = createTheme();
const PhoneNumberWrapper = ({ name, onChange, value, label, error, disabled, helperText, ...otherProps }) => {
  //Set Formik field
  // const [field, mata] = useField(name);
  const [ unmaskedval, setUnMaskedVal ] = useState(value);

  const handleChange = (event) => {
    let phoneNumber = event.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    event.target.value = !phoneNumber[ 2 ] ? phoneNumber[ 1 ] : '(' + phoneNumber[ 1 ] + ') ' + phoneNumber[ 2 ] + (phoneNumber[ 3 ] ? '-' + phoneNumber[ 3 ] : '');
    setUnMaskedVal(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <FormControl style={ { width: "100%" } }>

      <MuiThemeProvider theme={ theme }>
         <TextField label={ label }
            name={ name }
            value={ unmaskedval }
            error={ error }
            onChange={handleChange}
            placeholder="Enter Phone Number"
            helperText={ helperText }
            inputProps={ { "data-test-id": "phone", "unmaskedval": unmaskedval, disabled: disabled } } /> 
      </MuiThemeProvider>
    </FormControl>
  );
};

PhoneNumberWrapper.propTypes = {
  name: PropTypes.string.isRequired,
};

export default PhoneNumberWrapper;