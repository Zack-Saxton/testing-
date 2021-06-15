/*#################################################################################################################

File Name           :    PhoneNumber/index.js
Component Name      :    PhoneNumber
Functionality       :    To use this component for having Phone Number

#################################################################################################################*/

import React from "react";
import { useField } from "formik";
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputMask from "react-input-mask";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from "prop-types";
import { Phone } from "@material-ui/icons";

const theme = createMuiTheme();
const PhoneNumberWrapper = ({ name, ...otherProps }) => {
  //Set Formik field
  const [field, mata] = useField({ name });

  //Configuring the field with properties
  const configTextfield = {
    name: name,
    ...field,
    ...otherProps,
    fullWidth: true,
  };

  //Validation part
  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }

  return (
    <FormControl fullWidth={true}>
      <MuiThemeProvider theme={theme}>
        <InputMask
          fullWidth={true}
          mask="1 - (999)  999  9999"
          value={Phone}
          name={name}
          disabled={false}
          maskChar=" "
          {...otherProps}
          {...field}
        >
          {() => <TextField label="Enter Phone Number" name={name} />}
        </InputMask>
      </MuiThemeProvider>
    </FormControl>
  );
};

PhoneNumberWrapper.propTypes = {
  name: PropTypes.string.isRequired,
};

export default PhoneNumberWrapper;
