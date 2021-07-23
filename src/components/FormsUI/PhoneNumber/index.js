/*#################################################################################################################

File Name           :    PhoneNumber/index.js
Component Name      :    PhoneNumber
Functionality       :    To use this component for having Phone Number

#################################################################################################################*/

import React, { useState } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputMask from "react-input-mask";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from "prop-types";

const theme = createMuiTheme();
const PhoneNumberWrapper = ({ name, onChange, value, label, error, helperText, ...otherProps }) => {
  //Set Formik field
  // const [field, mata] = useField(name);
  const[unMaskedVal, setUnMaskedVal] = useState(value);
  console.log("phonenumber:", value);


  const handleChange = (e) => {
    onChange(e);
    const tempVal =
    e.target.value
      .replace(/-/g, "")
      .replace(/\)/g, "")
      .replace(/\(/g, "")
      .replace(/ /g, "") || "";
  setUnMaskedVal(tempVal);
 
  }


  return (
    <FormControl fullWidth={true}>
      
    <MuiThemeProvider theme={theme}>
      <InputMask
        fullWidth={true}
        mask="1 - (999) 999 9999"
        value={value}
        name={name}
        onChange={handleChange}
        data-testid="phone"
        disabled={false}
        maskChar=" "
        {...otherProps}
      >
        {() => <TextField label={label} 
        name={name} 
       
        error={error} 
        placeholder="Enter Phone Number"
        helperText={helperText}
         inputProps={{"data-testid": "phone", "unmaskedval": unMaskedVal}}/>}
      </InputMask>
    </MuiThemeProvider> 
    </FormControl>
  );
};

PhoneNumberWrapper.propTypes = {
  name: PropTypes.string.isRequired,
};

export default PhoneNumberWrapper;
