/*#################################################################################################################

File Name           :    Email/index.js
Component Name      :    Email
Functionality       :    To use this component to get only valid Email address.

#################################################################################################################*/
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import React, { useState } from "react";

//Initializing EmailWrapper component
const EmailWrapper = ({ name, suffix, lable, materialProps, id, ...otherProps }) => {

  //Basic Configuration for Email field
  const configTextfield = {
    name: name,
    type: "email",
    lable: lable,
    fullWidth: true,
    InputProps: suffix
      ? {
        endAdornment: (
          <InputAdornment position="end">{ suffix }</InputAdornment>
        ),
      }
      : {},
    ...otherProps,
  };

  const [ setValues ] = useState("");
  const handleChange = (event) => {
    setValues(event.target.value.trim() + suffix);
  };

  return (
    <TextField
      id={ id }
      lable="email"
      type="email"
      fullWidth={ true }
      // value= {value}
      inputProps={ materialProps }
      onChange={ handleChange }
      { ...configTextfield }
    />
  );
};

EmailWrapper.propTypes = {
  name: PropTypes.string,
  suffix: PropTypes.object,
  lable: PropTypes.string,
  id: PropTypes.string,
  materialProps: PropTypes.object
};

export default EmailWrapper;
