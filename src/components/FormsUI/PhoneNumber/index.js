/*#################################################################################################################

File Name           :    PhoneNumber/index.js
Component Name      :    PhoneNumber
Functionality       :    To use this component for having Phone Number

#################################################################################################################*/

import React, { useState } from "react";
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
  // const [field, mata] = useField(name);
  const[unMaskedVal, setUnMaskedVal] = useState('');

  //Configuring the field with properties
  const configTextfield = {
    name: name,
    ...otherProps,
    fullWidth: true,
  };

  const handleChange = (e) => {
    const value =
    e.target.value
      .replace(/-/g, "")
      .replace(/\)/g, "")
      .replace(/\(/g, "")
      .replace(/ /g, "") || "";
  // setFieldValue("ssn", value);
  setUnMaskedVal(value);
  }

  //Validation part
  // configTextfield.error = (mata && mata.touched && mata.error) ? true :  configTextfield.error ?? false;
  // configTextfield.helperText = (mata && mata.touched && mata.error) ? mata.error : configTextfield.helperText ?? '';


  return (
    <FormControl fullWidth={true}>
      <MuiThemeProvider theme={theme}>
        <InputMask
          fullWidth={true}
          mask="1 - (999) 999 9999"
          value={unMaskedVal}
          name={name}
          disabled={false}
          maskChar=" "
          onChange={handleChange}
          data-testid="phone"
          {...otherProps}
          // {...field}
        >
          {() => <TextField label="Enter Phone Number" value={unMaskedVal} name={name} inputProps={{"data-testid": "phone", "unmaskedval": unMaskedVal}}/>}
        </InputMask>
      </MuiThemeProvider>
    </FormControl>
  );
};

PhoneNumberWrapper.propTypes = {
  name: PropTypes.string.isRequired,
};

export default PhoneNumberWrapper;
