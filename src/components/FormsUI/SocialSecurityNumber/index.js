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
  const [field, mata] = useField(name);
  const [mobile, setSSN] = React.useState("");

  const handleChange = (event) => {
    setSSN(event.target.value);
  };

  //Configuring the field with properties
  const configTextfield = {
    name: name,
    ...field,
    ...otherProps,
    fullWidth: true,
  };

  //Validation part
  // check validity
  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }

  return (
    <FormControl fullWidth={true}>
      <MuiThemeProvider theme={theme}>
        <InputMask
          fullWidth={true}
          mask="999 - 99 - 9999"
          value={mobile}
          name={name}
          onChange={handleChange}
          disabled={false}
          maskChar=" "
          {...otherProps}
          {...field}
        >
          {() => <TextField label="Enter Social Security Number" />}
        </InputMask>
      </MuiThemeProvider>
    </FormControl>
  );
};

SSNWrapper.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SSNWrapper;
