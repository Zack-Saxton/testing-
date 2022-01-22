/*#################################################################################################################

File Name           :    PhoneNumber/index.js
Component Name      :    PhoneNumber
Functionality       :    To use this component for having Phone Number

#################################################################################################################*/

import React, { useState } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider, } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputMask from "react-input-mask";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from "prop-types";

const theme = createTheme();
const PhoneNumberWrapper = ({ name, onChange, value, label, error, disabled, helperText, ...otherProps }) => {
  //Set Formik field
  // const [field, mata] = useField(name);
  const [unmaskedval, setUnMaskedVal] = useState(value);


  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }

    const tempVal =
      e.target.value
        .replace(/-/g, "")
        .replace(/\)/g, "")
        .replace(/\(/g, "")
        .replace(/ /g, "") || "";
    setUnMaskedVal(tempVal);

  }


  return (
    <FormControl style={{ width: "100%" }}>

      <MuiThemeProvider theme={theme}>
        <InputMask
          style={{ width: "100%" }}
          mask="(999) 999-9999"
          value={value}
          name={name}
          onChange={handleChange}
          data-test-id="phone"
          maskChar=""
          {...otherProps}
        >
          {() => <TextField label={label}
            name={name}

            error={error}
            placeholder="Enter Phone Number"
            helperText={helperText}
            inputProps={{ "data-test-id": "phone", "unmaskedval": unmaskedval, disabled: disabled }} />}
        </InputMask>
      </MuiThemeProvider>
    </FormControl>
  );
};

PhoneNumberWrapper.propTypes = {
  name: PropTypes.string.isRequired,
};

export default PhoneNumberWrapper;
