/*#################################################################################################################

File Name           :    SocialSecurityNumber/index.js
Component Name      :    SocialSecurityNumber
Functionality       :    To use this component to validate and get the SSN in the correct format from the user.

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

  //Validation part
  // check validity

 

  return (
    <FormControl fullWidth={true}>
      <MuiThemeProvider theme={theme}>
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
          {() => <TextField label="Enter Social Security Number" name={name} inputProps={{"data-testid": "ssn", "unmaskedval": unMaskedVal}}/>}
        </InputMask>
      </MuiThemeProvider>
    </FormControl>
  );
};

SSNWrapper.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SSNWrapper;
