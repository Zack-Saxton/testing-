/*#################################################################################################################

File Name           :    Password/index.js
Component Name      :    Password
Functionality       :    To use this component to validate and get the Password with hide and show option.

#################################################################################################################*/
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useState } from "react";
import "./Password.css";


//Initializing component
const PasswordWrapper = ({ name, label, materialProps, id, ...otherProps }) => {
  const [ showPassword, setShowPassword ] = useState({
    password: "",
  });
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleEdit = (event) => {
    event.preventDefault();
  };

  return (
    // <FormControl fullWidth={true} >
    <TextField
      fullWidth={ true }
      label={ label }
      id={ id } name={ name } { ...otherProps }
      type={ !showPassword ? "text" : "password" }
      onCut={ handleEdit }
      onCopy={ handleEdit }
      onPaste={ handleEdit }
      inputProps={ materialProps }
      InputProps={ {
        "data-test-id": "passProps",
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={ handleClickShowPassword }
              data-testid="passButton"
              className="rem1FSize"
            >
              { !showPassword ? "Hide" : "Show" }
            </IconButton>
          </InputAdornment>
        )
      } }
    />
    // </FormControl>
  );
};

export default PasswordWrapper;

PasswordWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  materialProps: PropTypes.object,
  id: PropTypes.string
};