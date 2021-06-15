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
const EmailWrapper = ({ name, suffix, lable, ...otherProps }) => {
  const [mata, helpers] = useField(name);

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
    helpers.setValue(event.target.value + suffix);
  };

  //Validation part
  let schema = yup.object().shape({
    email: yup.string().email(),
  });

  schema.isValid({ email: value }).then(function (valid) {
    if (valid) {
      setEmailCheck(true);
    } else {
      setEmailCheck(false);
    }
  });

  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }

  if (!emailCheck) {
    configTextfield.error = true;
    configTextfield.helperText = "Invalid Email";
  }

  //view part
  return (
    <TextField
      id="standard-adornment-weight"
      lable="email"
      type="email"
      onChange={handleChange}
      {...configTextfield}
    />
  );
};

export default EmailWrapper;
