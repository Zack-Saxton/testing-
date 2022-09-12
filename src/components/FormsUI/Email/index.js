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
const EmailWrapper = ({ name, suffix, lable, materialProps, id, disablePaste, ...otherProps }) => {

  //Basic Configuration for Email field
  const configTextfield = {
    name: name,
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

  const [ value, setValues ] = useState("");
  const handleChange = (event) => {
    setValues(event.target.value.trim() + suffix);
  };
  const disablePasteOption = (event) => {
    if (disablePaste) {
      event.preventDefault();
    }
  };

  return (
    <TextField
      id={id}
      lable="email"
      fullWidth={true}
      variant="standard"
      inputProps={materialProps}
      onChange={handleChange}
      onCut={disablePasteOption}
      onCopy={disablePasteOption}
      onPaste={disablePasteOption}
      {...configTextfield}
    />
  );
};

EmailWrapper.propTypes = {
  name: PropTypes.string,
  suffix: PropTypes.object,
  lable: PropTypes.string,
  id: PropTypes.string,
  disablePaste: PropTypes.bool,
  materialProps: PropTypes.object
};

export default EmailWrapper;
