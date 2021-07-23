/*#################################################################################################################

File Name           :    Email/index.js
Component Name      :    Email
Functionality       :    To use this component to get only valid Email address.

#################################################################################################################*/
import React, { useState } from "react";
import { useField } from "formik";
import InputAdornment from "@material-ui/core/InputAdornment";
import * as yup from "yup";
import TextField from "@material-ui/core/TextField";

//Initializing EmailWrapper component
const EmailWrapper = ({ name, suffix, lable,materialProps, id, ...otherProps }) => {

  //Basic Configuration for Email field
  const configTextfield = {
    name: name,
    type: "email",
    lable: lable,
    fullWidth: true,
    InputProps: suffix
      ? {
          endAdornment: (
            <InputAdornment position="end">{suffix}</InputAdornment>
          ),
        }
      : {},
    ...otherProps,
  };

  const [emailCheck, setEmailCheck] = useState(false);
  const [value, setValues] = useState("");
  const handleChange = (event) => {
    setValues(event.target.value + suffix);
    // helpers.setValue(event.target.value + suffix);
  };

  //Validation part
  // let schema = yup.object().shape({
  //   email: yup.string().email(),
  // });

  // schema.isValid({ email: value }).then(function (valid) {
  //   valid ? setEmailCheck(true) : setEmailCheck(false);
  // });

  // configTextfield.error = (!emailCheck) ? true :  configTextfield.error ?? false;
  // configTextfield.helperText = (!emailCheck) ? "Invalid Email" : configTextfield.helperText ?? '';
  //view part
  return (
    <TextField
      id={id}
      lable="email"
      type="email"
      // value= {value}
      InputProps={materialProps}
      onChange={handleChange}
      {...configTextfield}
    />
  );
};

export default EmailWrapper;
