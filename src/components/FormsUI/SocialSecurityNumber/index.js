/*#################################################################################################################

File Name           :    SocialSecurityNumber/index.js
Component Name      :    SocialSecurityNumber
Functionality       :    To use this component to validate and get the SSN in the correct format from the user.

#################################################################################################################*/
import React,{useState} from "react";
import { useField } from "formik";
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import InputMask from "react-input-mask";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from "prop-types";
import Textfield from "../Textfield/index"
import { TextField, FormLabel,FormControlLabel } from "@material-ui/core";
import Content from '../../../assets/Content/content';

const theme = createMuiTheme();
const SSNWrapper = ({ name, ...otherProps }) => {
  const [mobile, setSSN] = React.useState("");
  const[unMaskedVal, setUnMaskedVal] = React.useState('');

  const handleChange = (event) => {
    setSSN(event.target.value);
    const value =
    event.target.value
      .replace(/-/g, "")
      .replace(/ /g, "") || "";
  // setFieldValue("ssn", value);
  setUnMaskedVal(value);
  };

  //Configuring the field with properties
  const config = {
    name: name,
    ...otherProps,
    fullWidth: true,
  };

  //  setError = error ?? setError;
  // setHelperText = helperText ?? setHelperText; 
  // //Basic field configurations
  // const config = {
  //   name: name,
   
  //   error: setError ? setError : isError,
  //   helperText: setError ? setHelperText : helpertext,
  //   ...otherProps,
  // };
  //Validation part
  // check validity

 

  return (
    <FormControl fullWidth={true}>
      <MuiThemeProvider theme={theme}>
        {/* <FormLabel label={label} name={name} {...config} > */}
        <InputMask
          fullWidth={true}
          mask="999 - 99 - 9999"
          value={unMaskedVal}
          name={name}
          onChange={handleChange}
          disabled={false}
          maskChar=" "
          {...otherProps}
        >
          {() => <TextField label={label} name={name}   inputProps={{"data-testid": "ssn", "unmaskedval": unMaskedVal}}/>}
        </InputMask>
        {/* </FormLabel> */}
      </MuiThemeProvider>
    </FormControl>
  );
};

SSNWrapper.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SSNWrapper;
