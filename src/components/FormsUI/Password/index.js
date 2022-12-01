/*#################################################################################################################

File Name           :    Password/index.js
Component Name      :    Password
Functionality       :    To use this component to validate and get the Password with hide and show option.

#################################################################################################################*/
import { IconButton, InputAdornment, TextField } from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";
import "../iframe.css";

//Initializing component
const PasswordWrapper = ({ name, label, materialProps, id, ...otherProps }) => {
  const [ showPassword, setShowPassword ] = useState({
    password: "",
  });
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <TextField
      className="globelPassword"
      fullWidth={true}
      label={label}
      variant="standard"
      id={id} name={name} {...otherProps}
      type={!showPassword ? "text" : "password"}
      inputProps={materialProps}
      InputProps={{
        "data-testid": "passProps",
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              data-testid="passButton"
              className="rem1FSize"
            >
              {!showPassword ? "Hide" : "Show"}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};

export default PasswordWrapper;

PasswordWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  materialProps: PropTypes.object,
  id: PropTypes.string
};